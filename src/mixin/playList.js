import {mapGetters} from 'vuex';

export const playListMixin = {
    computed: {
        ...mapGetters(['playList'])
    },
    mounted() {
        let that = this;
        that.handlePlaylist(that.playList)
    },
    activated() {
        let that = this;
        that.handlePlaylist(that.playList)
    },
    watch: {
        playList(newVal) {
            let that = this;
            that.handlePlaylist(newVal)
        }
    },
    methods: {
        handlePlaylist() {
            throw new Error('component must implement handlePlaylist method')
        }
    }
}