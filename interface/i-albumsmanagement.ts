import {iManagement} from "./iManagement";
import {Albums} from "../model/album"

export interface IAlbumsManagement extends iManagement<Albums> {
    findByName(name: string): Albums | null;

}
