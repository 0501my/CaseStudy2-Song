import { Albums } from "./album";

export class Song{
    private _id:number =0;
    private _name:string;
    private _singer:string;
    private _writer:string;
    private _type:string;
    private _debutTime:string;
    private _albums:Albums|null = null;
    constructor(name:string, singer:string, writer:string,type:string,debutTime:string){
        this._name = name;
        this._singer = singer;
        this._writer = writer;
        this._type = type;
        this._debutTime = debutTime;
        
    }
    set id(value:number){
        this._id = value;
    }
    get id():number{
        return this._id;
    }
    get name():string{
        return this._name;
    }
    set name(value:string){
        this._name = value;
    }
    set type(value:string){
        this._type = value;
    }
    get type():string{
        return this._type;
    }
    set singer(value:string){
        this._singer = value;
    }
    get singer():string{
        return this._singer;
    }
    set writer(value:string){
        this._writer = value;
    }
    get writer():string{
        return this._writer;
    }
    set debutTime(value:string){
        this._debutTime = value;
    }
    get debutTime():string{
        return this._debutTime;
    }
    set albums(value:Albums| null){
        this._albums = value;
    }
    get albums (): Albums| null{
        return this._albums;
    }
}
