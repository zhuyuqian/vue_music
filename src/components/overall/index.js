// 全局注册组件

import CardSquare from './card-square';
import MusicList from './music-list';
import Scroll from './scroll';
import Loading from './loading';

const install = (_Vue) => {
    _Vue.component('CardSquare', CardSquare);
    _Vue.component('MusicList', MusicList);
    _Vue.component('Scroll', Scroll);
    _Vue.component('Loading', Loading);
}

export default install