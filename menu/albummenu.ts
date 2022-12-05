import * as input from 'readline-sync'
import {Albums} from '../model/album'
import {AlbumsManagement} from '../management/albumManagement'
import {UserManagement} from '../management/usermanagement';

enum albumChoice {
    SHOW_ALL_ALBUM = 1,
    ADD_NEW_ALBUM = 2,
    UPDATE_ALBUM = 3,
    DELETE_ALBUM = 4,
    SHOW_SONG_ALBUM = 5,
    ADD_ALBUM_USER = 6
}

export class AlbumMenu {
    private albumsManagement = new AlbumsManagement();
    private userManagement = new UserManagement();

    run() {
        let choice = -1;
        do {
            console.log('----Quản lý album----')
            console.log('1. Hiển thị tất cả album')
            console.log('2. Thêm album mới')
            console.log('3. Chỉnh sửa album')
            console.log('4. Xoá album')
            console.log('5. Hiển thị bài hát của album')
            console.log('6. Thêm album cho người dùng')
            console.log('0. Thoát')
            choice = +input.question('Enter choice :   ')
            switch (choice) {
                case albumChoice.SHOW_ALL_ALBUM: {
                    this.showAllAlbums()
                    break;
                }
                case albumChoice.ADD_NEW_ALBUM: {
                    this.showCreateAlbum()
                    break;
                }
                case albumChoice.UPDATE_ALBUM: {
                    this.updateAlbum()
                    break;
                }
                case albumChoice.DELETE_ALBUM: {
                    this.deleteAlbum()
                    break;
                }
                case albumChoice.SHOW_SONG_ALBUM: {
                    this.showSong()
                    break;
                }
                case albumChoice.ADD_ALBUM_USER: {
                    this.addAlbumToUser()
                    break;
                }
            }
        } while (choice != 0)
        1
    }

    showAllAlbums() {
        console.log('---Danh sách album-----')
        let albums = this.albumsManagement.getAll()
        for (let i = 0; i < albums.length; i++) {
            console.log(` ID :${i + 1},Tên album: ${albums[i].name}\t `)
        }
    }

    addAlbum() {
        let name = input.question('Enter name album :  ')
        return new Albums(name)
    }

    showCreateAlbum() {
        console.log('----Thêm album nhạc------')
        let album = this.addAlbum();
        this.albumsManagement.createNew(album)
    }

    updateAlbum() {
        console.log('------Chỉnh sửa album------')
        let id = +input.question('Nhap id Album muon chinh sua:  ')
        let album = this.addAlbum();
        this.albumsManagement.updateById(id, album)
    }

    deleteAlbum() {
        console.log('------Xoá album------')
        let id = +input.question('Enter id Album muon xoa :  ')
        let question = +input.question('ban chac chan muon xoa ????  (Enter 1 de xoa, 2 de quay lai): ')
        if (question == 1) {
            this.albumsManagement.removeById(id);
        } else if (question == 2) {
            return;
        }
    }

    showSong() {
        console.log('---Hiển thị danh sách bài hát---');
        let name = input.question('Enter name album : ');
        let album = this.albumsManagement.findByName(name);
        if (album) {
            for (let i = 0; i < album.song.length; i++) {
                console.log(`ID ${i + 1},Tên bài hát: ${album.song[i].name}\t Ca sĩ trình bày :${album.song[i].singer}\t Nhạc sĩ sáng tác:${album.song[i].writer}\t Thể loại: ${album.song[i].type}\t Ngày phát hành:${album.song[i].debutTime}`);
            }
        } else {
            console.log('-----Album không tồn tại!-----');
        }
    }

    addAlbumToUser() {
        console.log('-----Thêm album cho người dùng----')
        let albums = this.albumsManagement.getAll();
        let users = this.userManagement.getAll()
        if (users.length == 0) {
            console.log('-----Chưa có người dùng-----')
            return;
        }
        for (let i = 0; i < users.length; i++) {
            console.log(` ID ${users[i].id},Tên người dùng: ${users[i].name}\t Email:${users[i].email}\t Tài khoản:${users[i].username}\t Mật khẩu:${users[i].password} `)
        }
        let id = +input.question('Nhap ma album can them vao nguoi dung :  ');
        let albumIndex = this.albumsManagement.findById(id);
        if (albumIndex == -1) {
            console.log('-----Mã album không tồn tại!-----');
            return;
        } else {
            let username = input.question('Nhap ten nguoi dung can them : ');
            let user = this.userManagement.findByName(username);
            if (user) {
                albums[albumIndex].user = user
                user.albums.push(albums[albumIndex]);
            } else {
                console.log('-----Tên người dùng không tồn tại!-----');
            }
            return;
        }
    }


}
