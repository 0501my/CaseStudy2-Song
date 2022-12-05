import {Song} from '../model/song'
import {User} from './user';

export class Albums {
    private _id: number = 0;
    private _name: string;
    private _song: Song[] = [];
    private _user: User | null = null;

    constructor(name: string) {
        this._name = name;

    }

    set id(value: number) {
        this._id = value;
    }

    get id() {
        return this._id;
    }

    set name(value: string) {
        this._name = value;
    }

    get name() {
        return this._name;
    }

    set song(value: Song[]) {
        this._song = value;
    }

    get song() {
        return this._song;
    }

    set user(value: User | null) {
        this._user = value;
    }

    get user() {
        return this._user;
    }


}
