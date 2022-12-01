export interface iManagement<T> {
    getAll(): T[];

    createNew(t: T): void;

    updateById(id: number, t: T): void;

    removeById(id: number): void;

    findById(id: number): number;
}