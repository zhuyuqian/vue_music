import Song from './song';
import Special from './special';

let pinyin = require('js-pinyin');
pinyin.setOptions({checkPolyphone: false, charCase: 0});

import axios from 'axios';

const apiProxy = {
    'mobilecdn.kugou.com': 'a',
    'm.kugou.com': 'c',
    'wwwapi.kugou.com': 'b',
    'mvsearch.kugou.com': 'd',
    'www.kugou.com': 'e',
    'm3ws.kugou.com': 'f'
}

axios.defaults.baseURL = window.location.origin + '/';

const ajax = {
    // 获取新歌曲榜单
    getNewSongRank: async () => {
        let {data: {data, banner}} = await axios({
            method: 'get',
            url: `${apiProxy['m.kugou.com']}/?json=true`
        })
        return {
            banner_list: banner.map(item => {
                return {id: item.id, jump_link: item.extra.tourl, img_url: item.imgurl}
            }),
            song_list: data.map(song => new Song(song))
        }
    },
    // 获取音乐排行榜
    getRankList: async () => {
        let {data} = await axios({
            method: 'get',
            url: `${apiProxy['mobilecdn.kugou.com']}/api/v5/rank/list`,
            params: {
                withsong: 1,
                with_res_tag: 1
            }
        })
        let {errcode, data: {info}} = JSON.parse(data.replace('<!--KG_TAG_RES_END-->', '').replace('<!--KG_TAG_RES_START-->', ''));
        return info.map(item => {
            return {
                rank_info: {
                    id: item.id,
                    rank_id: item.rankid,
                    name: item.rankname,
                    desc: item.intro,
                    img_url: item.imgurl.replace('{size}', 150),
                    album_img_url: item.album_img_9.replace('{size}', 150),
                    banner_img_url: item.bannerurl.replace('{size}', 150),
                },
                song_list: item.songinfo.map(song => {
                    return {
                        singer_text: song.songname.split(' - ')[0],
                        name: song.songname.split(' - ')[1]
                    }
                })
            }
        })
    },
    // 获取榜单详情
    getRankInfo: async (rankId, page = 1) => {
        let {data: {info, songs: {list}}} = await axios({
            method: 'get',
            url: `${apiProxy['m.kugou.com']}/rank/info/`,
            params: {
                rankid: rankId,
                page: page,
                json: true
            }
        })
        return {
            rank_info: {
                id: info.id,
                rank_id: info.rankid,
                name: info.rankname,
                desc: info.intro,
                img_url: info.imgurl.replace('{size}', 150),
                album_img_url: info.album_img_9.replace('{size}', 150),
                banner_img_url: info.bannerurl.replace('{size}', 150),
            },
            song_list: list.map(song => new Song(song))
        }
    },
    // 获取热门搜索列表
    getSearchHot: async () => {
        let {data: {errcode, data: {info}}} = await axios({
            method: 'get',
            url: `${apiProxy['mobilecdn.kugou.com']}/api/v3/search/hot`,
            params: {
                format: 'json', // 数据结构
                plat: 0, // 开始数
                count: 30 // 返回数
            }
        });
        if (errcode == 0) {
            return info.map(item => {
                return {text: item.keyword}
            })
        }
        return []

    },
    // 获取歌手列表
    getSingerList: async () => {
        let {data: {errcode, data: {info}}} = await axios({
            method: 'get',
            url: `${apiProxy['mobilecdn.kugou.com']}/api/v5/singer/list`,
            params: {
                version: 9108,
                showtype: 1,
                plat: 0,
                sextype: 0,
                sort: 1, // 1热门；2飙升
                page: 1,
                pagesize: 100,
                type: 0,
                musician: 0
            }
        })
        if (errcode == 0) {
            return info.map(item => {
                return {
                    id: item.singerid,
                    name: item.singername,
                    img_url: item.imgurl.replace('{size}', 200),
                    fans_count: item.fanscount,
                    _index: pinyin.getFullChars(item.singername).split('')[0]
                }
            }).sort((a, b) => {
                return a._index.charCodeAt() - b._index.charCodeAt()
            })
        }
        return []
    },
    // 获取歌手信息
    getSingerInfo: async (id) => {
        let {data: {info, songs: {list}}} = await axios({
            method: 'get',
            url: `${apiProxy['m.kugou.com']}/singer/info/${id}`,
            params: {json: true}
        });
        return {
            singer_info: {
                id: info.singerid,
                name: info.singername,
                desc: info.intro,
                album_count: info.albumcount,
                song_count: info.songcount,
                mv_count: info.mvcount,
                img_url: info.imgurl.replace('{size}', 200),
            },
            song_list: list.map(song => new Song(song))
        }
    },
    // 获取歌手mv列表
    getSingerMvList: async (keyword, size = 30, page = 1) => {
        let {data: {error_code, data: {lists}}} = await axios({
            method: 'get',
            url: `${apiProxy['mvsearch.kugou.com']}/mv_search`,
            params: {
                keyword: keyword,
                pagesize: size,
                page: page,
                platform: 'WebFilter',
                tag: 'em',
                iscorrection: 1,
                privilege_filter: 0
            }
        })
        if (error_code == 0) {
            return lists.map(mv => {
                return {
                    hash: mv.MvHash,
                    id: mv.MvID,
                    name: mv.MvName,
                    desc: mv.Description,
                    img_url: `http://imge.kugou.com/mvhdpic/240/${mv.Pic.substring(0, 8)}/${mv.Pic}`,
                    add_time: mv.PublishDate,
                    play_count: mv.HistoryHeat
                }
            })
        }
        return []
    },
    // 获取歌手专辑列表
    getSingerAlbumList: async (singerId, page = 1) => {
        let {data: {data}} = await axios({
            method: 'get',
            url: `${apiProxy['www.kugou.com']}/yy/`,
            params: {
                r: 'singer/album',
                sid: singerId,
                p: page
            }
        })
        return data.map(album => {
            return {
                id: album.albumid,
                name: album.albumname,
                img_url: album.img,
                add_time: album.publish_time,
                song_count: album.song_count,
                singer_text: album.singername
            }
        })
    },
    // 获取专辑下的歌曲列表
    getAlbumSongList: async (albumId, page = 1, size = 20) => {
        let {data} = await axios({
            method: 'get',
            url: `${apiProxy['mobilecdn.kugou.com']}/api/v3/album/song`,
            params: {
                version: 9108,
                albumid: albumId,
                plat: 0,
                pagesize: size,
                area_code: 1,
                page: page,
                with_res_tag: 1
            }
        })
        let {errcode, data: {info}} = JSON.parse(data.replace('<!--KG_TAG_RES_END-->', '').replace('<!--KG_TAG_RES_START-->', ''));
        if (errcode == 0) {
            return info.map(song => new Song(song));
        }
    },
    // 获取歌单
    getPlist: async (page = 1) => {
        let {data: {plist: {list: {info}}}} = await axios({
            method: 'get',
            url: `${apiProxy['m.kugou.com']}/plist/index/${page}`,
            params: {
                json: true,
            }
        })
        return info.map(special => new Special(special))
    },
    // 获取歌单下的音乐列表
    getPlistList: async (specialId) => {
        let {data: {list, info}} = await axios({
            method: 'get',
            url: `${apiProxy['m.kugou.com']}/plist/list/${specialId}`,
            params: {json: true}
        })
        return {
            special_info: new Special(info.list),
            song_list: list.list.info.map(song => new Song(song))
        }
    },
    // 获取音乐信息
    getSongInfo: async (hash, albumId) => {
        let {data: {err_code, data}} = await axios({
            method: 'get',
            url: `${apiProxy['wwwapi.kugou.com']}/yy/index.php`,
            params: {
                r: 'play/getdata',
                hash: hash,
                album_id: albumId,
                mid: '668efb4a820040143fa0407489c5c812'
            }
        })
        if (err_code == 0) {
            return {
                album_id: data.album_id,
                album_name: data.album_name,
                play_url: data.play_url,
                cover_img_url: data.img,
                lyrics: data.lyrics,
                singer_arr: data.authors.map(singer => {
                    return {
                        id: singer.author_id,
                        name: singer.author_name,
                        img_url: singer.avatar
                    }
                })
            }
        }
    },
    // 获取热门歌曲分类
    getTagRecommendList: async () => {
        let {data: {errcode, data: {info}}} = await axios({
            method: 'get',
            url: `${apiProxy['mobilecdn.kugou.com']}/api/v3/tag/recommend`,
            params: {
                apiver: 2,
                plat: 0
            }
        });
        if (errcode == 0) {
            return info.map(tag => {
                return {
                    id: tag.id,
                    special_tag_id: tag.special_tag_id,
                    name: tag.name
                }
            })
        }
    },
    // 获取所有歌曲分类
    getTagList: async (pid = 0) => {
        let {data: {errcode, data: {info}}} = await axios({
            method: 'get',
            url: `${apiProxy['mobilecdn.kugou.com']}/api/v3/tag/list`,
            params: {pid: pid, apiver: 2, plat: 0}
        })
        if (errcode == 0) {
            return info.map(tag => {
                return {
                    id: tag.id,
                    special_tag_id: tag.special_tag_id,
                    name: tag.name,
                    icon_img_url: tag.icon.replace('{size}', 100),
                    children: tag.children.map(item => {
                        return {
                            id: item.id,
                            special_tag_id: item.special_tag_id,
                            name: item.name,
                            has_child: item.has_child
                        }
                    })
                }
            })
        }
    },
    // 获取分类相信信息
    getTagInfo: async (tagId) => {
        let {data: {errcode, data}} = await axios({
            method: 'get',
            url: `${apiProxy['mobilecdn.kugou.com']}/api/v3/tag/info`,
            params: {id: tagId, apiver: 2},
        })
        if (errcode == 0) {
            return {
                id: data.id,
                special_tag_id: data.special_tag_id,
                name: data.name,
                has_child: data.has_child,
                img_url: data.imgurl.replace('{size}', 150)
            }
        }
    },
    // 获取分类歌单信息
    getTagSpecialList: async (tagId, size = 30) => {
        let {data: {errcode, data: {info}}} = await axios({
            method: 'get',
            url: `${apiProxy['mobilecdn.kugou.com']}/api/v3/tag/specialList`,
            params: {
                plat: 0,
                page: 1,
                tagid: tagId,
                pagesize: size,
                ugc: 1,
                sort: 2
            }
        })
        if (errcode == 0) {
            return info.map(special => new Special(special))
        }
    },
    // 搜索歌曲列表
    searchSongList: async (keyword, size = 30, page = 1) => {
        let {data} = await axios({
            method: 'get',
            url: `${apiProxy['mobilecdn.kugou.com']}/api/v3/search/song`,
            params: {
                showtype: 14,
                pagesize: size,
                tag_aggr: 1,
                tagtype: '全部',
                plat: 0,
                sver: 5,
                keyword: keyword,
                correct: 1,
                api_ver: 1,
                version: 9108,
                page: page,
                area_code: 1,
                tag: 1,
                with_res_tag: 1
            }
        });
        let {errcode, data: {info}} = JSON.parse(data.replace('<!--KG_TAG_RES_END-->', '').replace('<!--KG_TAG_RES_START-->', ''));
        if (errcode == 0) {
            return info.map(song => new Song(song))
        }
    }
}

const install = (_vue) => {
    _vue.prototype.$ajax = ajax;
}

export default install


