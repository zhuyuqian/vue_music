class Special {
    constructor(special) {
        this.id = special.specialid;
        this.name = special.specialname;
        this.desc = special.intro;
        this.song_count = special.songcount;
        this.play_count = special.playcount;
        this.img_url = special.imgurl.replace('{size}', 100);
        this.user_name = special.username || special.nickname;
        this.user_headimgurl = special.user_avatar;
        this.tag_list = special.tags ? special.tags.map(tag => {
            return {id: tag.tagid, name: tag.tagname}
        }) : [];
    }
}

export default Special;