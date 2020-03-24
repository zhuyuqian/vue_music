class Song {
    constructor(song) {
        this.id = song.audio_id;
        this.name = song.filename.split(' - ')[1];
        this.singers_text = song.filename.split(' - ')[0];
        this.second = song.duration;
        this.album_id = song.album_id;
        this.album_name = song.remark;
        this.hash = song.hash;
    }
}

export default Song;