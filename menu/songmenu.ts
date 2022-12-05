import {Song} from '../model/song'
import {SongManagement} from '../management/songmanagement'
import * as input from 'readline-sync'
import {AlbumsManagement} from '../management/albumManagement';

enum SongChoice {
    SHOW_ALL_SONG = 1,
    ADD_NEW_SONG = 2,
    UPDATE_SONG = 3,
    DELETE_SONG = 4,
    ADD_SONG_ALBUM = 5
}

export class SongMenu {
    private songManagement = new SongManagement();
    private albumManagement = new AlbumsManagement();

    run() {
        let choice = -1;
        do {
            console.log('----Quản lý bài hát---')
            console.log('1. Hiển thị tất cả bài hát')
            console.log('2.Thêm bài hát mới')
            console.log('3.Chỉnh sửa bài hát')
            console.log('4.Xoá bài hát')
            console.log('5. Thêm bài hát vào album')
            console.log('0.Thoát')
            choice = +input.question('Enter choice :  ')
            switch (choice) {
                case SongChoice.SHOW_ALL_SONG: {
                    this.showAllSong();
                    break;
                }
                case SongChoice.ADD_NEW_SONG: {
                    this.showCreateSong();
                    break;
                }
                case SongChoice.UPDATE_SONG: {
                    this.updateSong();
                    break;
                }
                case SongChoice.DELETE_SONG: {
                    this.deleteSong();
                    break;
                }
                case SongChoice.ADD_SONG_ALBUM: {
                    this.addSongToAlbum()
                    break;
                }
            }
        } while (choice != 0)
    }

    showAllSong() {
        console.log('-------Danh sách bài hát--------')
        let songs = this.songManagement.getAll();
        for (let i = 0; i < songs.length; i++) {
            console.log(`ID :${songs[i].id},Tên bài hát: ${songs[i].name}\t Ca sĩ thể hiện:${songs[i].singer}\t Nhạc sĩ:${songs[i].writer}\t Thể loại: ${songs[i].type}\t Ngày phát hành:${songs[i].debutTime}`)
        }
    }

    addSong() {
        let name = input.question('Nhap ten bai hat :  ')
        let singer = input.question('Nhap ten ca si trinh bay :  ')
        let writer = input.question('Nhap ten nhac si sang tac :  ')
        let type = input.question('Nhap the loai nhac :  ')
        let debutTime = input.question('Nhap ngay phat hanh :  ')
        return new Song(name, singer, writer, type, debutTime);
    }

    showCreateSong() {
        console.log('------Thêm bài hát--------')
        let song = this.addSong();
        this.songManagement.createNew(song)
    }

    updateSong() {
        console.log('------Chỉnh sửa bài hát------')
        let id = +input.question('Nhap id bai hat muon sua :  ')
        let song = this.addSong();
        this.songManagement.updateById(id, song)
    }

    deleteSong() {
        console.log('------Xoá bài hát--------')
        let id = +input.question('Nhap id bai hat muon xoa : ')
        let question = +input.question('Ban co chac muon xoa ( nhap 1 de xoa, nhap 2 de huy bo) : ')
        if (question == 1) {
            this.songManagement.removeById(id);
        } else if (question == 2) {
            return;
        }
    }

    addSongToAlbum() {
        console.log('------Thêm bài hát vào album-------')
        let songs = this.songManagement.getAll();
        let albums = this.albumManagement.getAll()
        if (albums.length == 0) {
            console.log('------Hiện tại chưa có album nào-------')
            return;
        }
        for (let i = 0; i < albums.length; i++) {
            console.log(` ID: ${i + 1}, Tên album: ${albums[i].name}\t `)
        }
        let id = +input.question('Nhap id bai hat muon them :  ');
        let songIndex = this.songManagement.findById(id);
        if (songIndex == -1) {
            console.log('------ID bài hát không tồn tại!------');
            return;
        } else {
            let albumName = input.question('Nhap album can them : ');
            let album = this.albumManagement.findByName(albumName);
            if (album) {
                songs[songIndex].albums = album
                album.song.push(songs[songIndex]);
            } else {
                console.log('------Tên album không tồn tại!------');
            }
            return;
        }
    }

}
