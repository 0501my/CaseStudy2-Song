import * as input from 'readline-sync'
import { User } from '../model/user'
import { UserManagement } from '../management/usermanagement'


enum userChoice {
    SHOW_ALL_USER = 1,
    ADD_NEW_USER = 2,
    UPDATE_USER= 3,
    DELETE_USER = 4,
    SHOW_ALBUM = 5
}

export class UserMenu{
    private userManagement = new UserManagement();
    

    run(){
        let choice = -1;
        do{
            console.log('----Quản lý người dùng----')
            console.log('1. Hiển thị tất cả người dùng')
            console.log('2. Thêm người dùng mới')
            console.log('3. Chỉnh sửa thông tin người dùng')
            console.log('4. Xoá người dùng')
            console.log('5. Hiển thị album của người dùng')
            console.log('0. Thoát')
            choice = +input.question('Enter choice :  ')
            switch(choice) {
                case userChoice.SHOW_ALL_USER:{
                    this.showAllUser()
                    break;
                }
                case userChoice.ADD_NEW_USER:{
                    this.showCreateUser()
                    break;
                }
                case userChoice.UPDATE_USER:{
                    this.updateUser()
                    break;
                }
                case userChoice.DELETE_USER:{
                    this.deleteUser()
                    break;
                }
                case userChoice.SHOW_ALBUM:{
                    this.showAlbum()
                    break;
                }
            }
        }while(choice !=0)
    }
    showAllUser() {
        console.log('------Danh sách người dùng------')
        let users = this.userManagement.getAll()
        for(let user of users) {
            console.log(`ID: ${user.id}, Tên người dùng: ${user.name}\t Email: ${user.email}\t Tài khoản: ${user.username}\t Mật khẩu: ${user.password}`)
        }
    }
    addUser(){
        let name = input.question('Nhap ten nguoi dung : ')
        let email = input.question('Nhap  email: ')
        let username = input.question('Nhap tai khoan :  ')
        let password = input.question('Nhap mat khau :  ')
        return new User(name,email,username,password)
    }
   
    showCreateUser(){
        console.log('-------Thêm người dùng------')
        let user= this.addUser();
        this.userManagement.createNew(user)
    }
    updateUser(){
        console.log('-------Chỉnh sửa thông tin người dùng-----')
        let id= +input.question('Nhap ID nguoi dung muon sua : ')
        let user = this.addUser();
        this.userManagement.updateById(id ,user)
    }
    deleteUser(){
        console.log('------Xoá người dùng-----')
        let id= +input.question('Nhap ID nguoi dung muon xoa: ')
        let question= +input.question('Ban chac chan muon xoa (Nhap 1 de xoa, nhap 2 de huy ): ')
        if(question == 1){
            this.userManagement.removeById(id);
        }else if(question == 2){
            return ;
        }    
    }
    showAlbum(){
        console.log('---Hiển thị danh sách album---');
        let name = input.question('Nhap ten tai khoan can tim: ');
        let user = this.userManagement.findByName(name);
        if (user) {
            for (let i = 0; i < user.albums.length; i++) {
                console.log(`ID:  ${i+1},Tên album: ${user.albums[i].name}\t `);
            }
        } else {
            console.log('------Album không tồn tại!-------');
        }
    }
}
