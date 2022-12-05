import {iManagement} from "./iManagement"
import {Song} from "../model/song"

export interface ISongManagement extends iManagement<Song> {
    findByName(name: string): Song | null;

}
