
import { SongManagement } from '../management/songmanagement'
import * as input from 'readline-sync'
import { AlbumsManagement } from '../management/albumManagement';
import { User } from '../model/user';

enum SongChoIse {
    SHOW_ALL_SONG = 1,
    ADD_SONG_ALBUM=2,
    DELETE_ALBUMINOUS = 3
}

export class UserSongMenu{
    private songManagement = new SongManagement();
    private albumsManagement = new AlbumsManagement();
    run(currentUser: User){
        let choice = -1;
        do{
            console.log('----Quản lý bài hát---')
            console.log('1. Hiển thị tất cả bài hát')
            console.log('2. Thêm bài hát vào album')
            console.log('3. Xoá bài hát trong album')
            console.log('0.Thoat')
            choice = +input.question(`\x1b[32m Enter choice : \x1b[0m `)
            switch (choice) {
                case SongChoIse.SHOW_ALL_SONG:{
                    console.log(`\x1b[1m-----Tất cả bài hát hiện có-----\x1b[0m`)
                    this.showAllSong();
                    break;
                }
                case SongChoIse.ADD_SONG_ALBUM:{
                    console.log(`\x1b[1m-----Thêm bài hát vào album-----\x1b[0m`)
                    this.addSongToAlbum(currentUser)
                    break;
                }
                case SongChoIse.DELETE_ALBUMINOUS:{
                    console.log(`\x1b[32m ------Xoá bài hát trong album-----\x1b[0m`)
                    this.deleteSongFromAlbum();
                    break;
                }
            }
        }while(choice != 0)
    }

    showAllSong(){
        console.log(`\x1b[2m -----Danh sách bài hát------\x1b[0m`)
        let songs = this.songManagement.getAll();
        for (let i = 0; i < songs.length; i++) {
            console.log(`Id: ${songs[i].id},Tên bài hát: ${songs[i].name}\t Ca sĩ trình bày: ${songs[i].singer}\t Nhạc sĩ: ${songs[i].writer}\t Thể loại: ${songs[i].type}\t Ngày phát hành: ${songs[i].debutTime}`)
        }
    }

    addSongToAlbum(currentUser: User){
        console.log('-----Thêm bài hát vào album------')
        let songs = this.songManagement.getAll();
        let albums = this.albumsManagement.getAll();
        if(albums.length == 0){
            console.log('-----Hiện chưa có album nào-----')
            return ;
        }
        for (let i = 0; i < currentUser.albums.length; i++) {
            console.log(`ID: ${i+1},Tên album: ${currentUser.albums[i].name}\t `)
        }
        let id = +input.question('Nhap ma ID bai hat muon them vao album :  ');
        let songIndex = this.songManagement.findById(id);
        if (songIndex == -1) {
            console.log('ID bài hát không tồn tại!');
            return;
        } else {
            let albumName = input.question('Nhap ten album can them : ');
            let album = this.albumsManagement.findByName(albumName);
            if (album) {
                songs[songIndex].albums = album
                album.song.push(songs[songIndex]);
            }else {
                console.log('-----Tên album không tồn tại!-----');
            }
            return;
        }
    }

    deleteSongFromAlbum(){
        let albumName = input.question('Nhap ten album muon xoa bai hat :   ')
        let album = this.albumsManagement.findByName(albumName);
        if(album){
            let songName = input.question(' Nhap ten bai hat muon xoa khoi album :  ')
            for (let i = 0; i <album.song.length; i++){
                if(songName == album.song[i].name){
                    album.song.splice(i, 1);
                } else {
                    console.log('-----Bài hát không có trong album-----')
                }
            }
        }
    }
    
}