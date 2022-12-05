import {Song} from '../model/song'
import {ISongManagement} from '../interface/i-songmanagement'

export class SongManagement implements ISongManagement {
    private static songs: Song[] = [];
    private static id: number = 0;

    getAll(): Song[] {
        return SongManagement.songs
    }

    createNew(t: Song): void {
        SongManagement.id++;
        t.id = SongManagement.id;
        SongManagement.songs.push(t);

    }

    updateById(id: number, t: Song): void {
        let index = this.findById(id);
        if (index != -1) {
            SongManagement.songs[index] = t;
            t.id = id;
            console.log(' chinh sua thanh cong ')
        }

    }

    removeById(id: number): void {
        let index = this.findById(id);
        if (index != -1) {
            SongManagement.songs.splice(index, 1);
        }

    }

    findById(id: number): number {
        let index = -1;
        for (let i = 0; i < SongManagement.songs.length; i++) {
            if (SongManagement.songs[i].id == id) {
                index = i;
                break;
            }
        }
        return index;
    }

    findByName(name: string): Song | null {
        for (let i = 0; i < SongManagement.songs.length; i++) {
            if (SongManagement.songs[i].name == name) {
                return SongManagement.songs[i];

            }
        }
        return null;
    }
}
