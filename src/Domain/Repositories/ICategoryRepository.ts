import { ICategory } from "../Models/ICategory.js";

export interface ICategoryRepository{
   getAll(): Promise<ICategory[]>;
   save(name: string): Promise<ICategory | null>;
   delete(id:number): Promise<void>;
}