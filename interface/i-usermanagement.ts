import { iManagement } from "./iManagement"
import {User} from "../model/user"
export interface IUserManagement extends iManagement<User> {
    findByName(name: string): User|null;
    findByEmail(email: string): User | null;
    login(username: string, password:string):User|null;

}