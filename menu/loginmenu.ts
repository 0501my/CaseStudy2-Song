import { UserManagement } from "../management/usermanagement";
import { User } from "../model/user";
import * as input from "readline-sync";
import { AdminMenu } from "./adminmenu";
import{Role} from "../model/role";
import { UserChoiceMenu } from "./userchoicemenu";

enum LoginChoice {
    LOGIN=1,
    REGISTER=2
}
export class LoginMenu{
    private userManagement = new UserManagement();
    private adminMenu = new AdminMenu();
    private userChoiceMenu = new UserChoiceMenu()
    run(){
        let choice = -1;
        do{
            console.log("-----Chào mừng tới nhạc của tuiiiiiiii-------")
        console.log("-----Vui lòng đăng nhập-----")
        console.log("1. Đăng nhập")
        console.log("2. Đăng ký")
        console.log("0. Thoát")
        choice = +input.question('Nhap lua chon cua ban :   ')
        switch(choice) {
            case LoginChoice.LOGIN:{
                this.loginForm();
                break;
            }
            case LoginChoice.REGISTER:{
                this.registerForm();
                break;
            }
        }
        }while(choice != 0)
        
    }
    loginForm(){
        let username = input.question('Nhap tai khoan :  ');
        let password = input.question('Nhap mat khau :  ');
        let currentUser = this.userManagement.login(username, password);
        if(currentUser != null ){
            console.log('-----Đăng nhập thành công-----');
            if (currentUser.role == Role.ADMIN) {
                this.adminMenu.run();
            } else {
               this.userChoiceMenu.run(currentUser);
            }
         }  else {
            console.log('----Tài khoản hoặc mật khẩu không đúng!-----');
        }
        
    }

    registerForm(){
        let user = this.inputUser();
        this.userManagement.createNew(user);
        console.log('---Đăng ký thành công!----')
    }

    inputUser(): User {
        let username = this.inputUsername();
        let regexForPassword: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/g;
        let password = this.inputPassword(regexForPassword);
        this.inputConfirmPassword(password);
        let name = input.question('Enter full Name:  ');
        let email = this.inputEmail();
        return new User(name, email,username, password);
    }
    inputEmail(): string {
        let email = '';
        let isValidEmail = true;
        do {
            email = input.question('Enter email (abc@gmail.com): ');
            let regexForEmail: RegExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
            if (!regexForEmail.test(email)) {
                isValidEmail = false;
                console.log('----Định dạng email không hợp lệ!----')
            } else {
                isValidEmail = true;
                let currentUser = this.userManagement.findByEmail(email);
                if (currentUser) {
                    console.log('---Email đã tồn tại---');
                    isValidEmail = false;
                } else {
                    isValidEmail = true;
                }
            }

        } while (!isValidEmail);
        return email;
    }
    inputUsername():string{
        let username = '';
        let isValidUsername = true;
        do {
            username = input.question('Enter user name:  ');
            let currentUser = this.userManagement.findByName(username);
            if (currentUser) {
                isValidUsername = false;
                console.log('----Tài khoản đã tồn tại !----')
            } else {
                isValidUsername = true;
            }
        } while (!isValidUsername);
        return username;
    }

    inputPassword(regexForPassword: RegExp): string {
        let password = '';
        let isValidPassword = true;
        do {
            password = input.question('Enter password(co 1 chu viet hoa, 1 ky tu thuong, 1 ky tu dac biet va 1 so):  ');
            if (!regexForPassword.test(password)) {
                isValidPassword = false;
                console.log('Mật khẩu nhập vào phải có ít nhất 1 ký tự thường 1 hoa 1 đặc biệt 1 số!')
            } else {
                isValidPassword = true;
            }
        } while (!isValidPassword);
        return password;
    }

    inputConfirmPassword(password: string): void {
        let confirmPassword = '';
        do {
            confirmPassword = input.question('Enter password :   ');
            if (password != confirmPassword) {
                console.log('----Mật khẩu không đúng----');
            }
        } while (password != confirmPassword)
    }

}