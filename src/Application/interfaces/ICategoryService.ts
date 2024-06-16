import { ICategory } from "../../Domain/Models/ICategory.js";

export interface ICategoryService {
   getAll(): Promise<ICategory[]>;
   save(name: string): Promise<ICategory | null>;
   delete(id:number): Promise<void>;
}