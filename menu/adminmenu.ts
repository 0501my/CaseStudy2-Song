import * as input from 'readline-sync'
import {SongMenu} from './songmenu'
import {AlbumMenu} from './albummenu'
import {UserMenu} from './usermenu'

enum AdminChoice {
    SONG_MANAGEMENT = 1,
    ALBUM_MANAGEMENT = 2,
    USER_MANAGEMENT = 3
}

export class AdminMenu {
    private song = new SongMenu();
    private album = new AlbumMenu()
    private user = new UserMenu()

    run() {
        let choice = -1;
        do {
            console.log('---Ứng dụng quản lý WEB NHẠC---')
            console.log('1. Quản lý bài hát')
            console.log('2. Quản lý album nhạc')
            console.log('3. Quản lý người dùng')
            console.log('0. Đăng xuất')
            choice = +input.question('Enter choice:  ')
            switch (choice) {
                case AdminChoice.SONG_MANAGEMENT: {
                    console.log('---Quản lý bài hát----')
                    this.song.run();
                    break;
                }
                case AdminChoice.ALBUM_MANAGEMENT: {
                    console.log('---Quản lý album---');
                    this.album.run()
                    break;
                }
                case AdminChoice.USER_MANAGEMENT: {
                    console.log('---Quản lý người dùng-----')
                    this.user.run()
                    break;

                }
            }
        } while (choice != 0);

    }
}
