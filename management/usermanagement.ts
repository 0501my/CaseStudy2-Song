import {IUserManagement} from "../interface/i-usermanagement";
import {User} from "../model/user";
import {Role} from "../model/role";

export class UserManagement implements IUserManagement {
    private static users: User[] = [];
    private static id: number = 0;

    constructor() {
        let admin = new User('ADMIN', 'admin@gmail.com', 'admin', 'admin')
        admin.id = UserManagement.id;
        admin.role = Role.ADMIN;
        UserManagement.users[0] = admin;
    }

    getAll(): User[] {
        return UserManagement.users;
    }

    createNew(t: User): void {
        UserManagement.id++;
        t.id = UserManagement.id;
        t.role = Role.USER;
        UserManagement.users.push(t);
    }

    updateById(id: number, t: User): void {
        let index = this.findById(id);
        if (index != -1) {
            t.id = UserManagement.users[index].id;
            UserManagement.users[index] = t;
        }

    }

    removeById(id: number): void {
        let index = this.findById(id);
        if (index != -1) {
            UserManagement.users.splice(index, 1);
        }

    }

    findById(id: number): number {
        let index = -1;
        for (let i = 0; i < UserManagement.users.length; i++) {
            if (UserManagement.users[i].id === id) {
                index = i;
            }
        }
        return index;
    }

    login(username: string, password: string): User | null {
        for (let user of UserManagement.users) {
            if (username == user.username && password == user.password) {
                return user;
            }
        }
        return null;
    }

    findByName(username: string): User | null {
        for (let user of UserManagement.users) {
            if (username == user.username) {
                return user;
            }
        }
        return null;
    }

    findByEmail(email: string): User | null {
        for (let user of UserManagement.users) {
            if (email == user.email) {
                return user;
            }
        }
        return null;
    }

}
