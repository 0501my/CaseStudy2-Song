import { Albums } from "./album";
export class User{
    private _id: number = 0;
    private _role: number =0;
    private _name:string;
    private _email:string;
    private _username:string;
    private _password:string;
    private  _albums: Albums[]=[];
    constructor(name:string, email:string,username:string,password:string){
        this._name = name;
        this._email = email;
        this._username = username;
        this._password = password;
        
    }
    set role(value:number){
        this._role = value;
    }
    get role():number{
        return this._role;
    }
    set id(value:number){
        this._id = value;
    }
    get id(){
        return this._id;
    }
    set name(value:string){
        this._name = value;
    }
    get name(){
        return this._name;
    }
    set email(value:string){
        this._email = value;
    }
    get email(){
        return this._email;
    }
    
    set username(value:string){
        this._username = value;
    }
    get username(){
        return this._username;
    }
    set password(value:string){
        this._password = value;
    }
    get password(){
        return this._password;
    }
    set albums(value:Albums[]){
        this._albums = value;
    }
    get albums(){
        return this._albums;
    }
   
}