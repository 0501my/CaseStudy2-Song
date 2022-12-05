import * as rl from 'readline-sync'
import {User} from '../model/user'
import {UserSongMenu} from './usersongmenu';
import {UserAlbumMenu} from './useralbummenu';

enum UserChoice {
    ALBUM_MANAGEMENT = 1,
    SONG_MANAGEMENT = 2
}

export class UserChoiceMenu {
    private song = new UserSongMenu();
    private album = new UserAlbumMenu();

    run(currentUser: User) {
        let choice = -1;
        do {
            console.log('---Người dùng---')
            console.log('1. Album')
            console.log('2. Bài hát ')
            console.log('0. Đăng xuất')
            choice = +rl.question('Enter choice : ');
            switch (choice) {
                case UserChoice.ALBUM_MANAGEMENT: {
                    console.log('------Quản lý album-----')
                    this.album.run(currentUser);
                    break;
                }
                case UserChoice.SONG_MANAGEMENT: {
                    console.log('-------Quản lý bài hát------')
                    this.song.run(currentUser);
                    break;
                }
            }
        } while (choice != 0)

    }

}
