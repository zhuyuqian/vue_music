import CardSquare from './card-square/card-square';
import MusicList from './music-list/music-list';
import Scroll from './scroll/scroll';
import Loading from './loading/loading';

const install = (_Vue) => {
    _Vue.component('CardSquare', CardSquare);
    _Vue.component('MusicList', MusicList);
    _Vue.component('Scroll', Scroll);
    _Vue.component('Loading', Loading);
}

export default install