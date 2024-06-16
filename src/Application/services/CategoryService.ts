import { ICategory } from "../../Domain/Models/ICategory.js";
import { ICategoryRepository } from "../../Domain/Repositories/ICategoryRepository.js";
import { ICategoryService } from "../interfaces/ICategoryService.js";


export class CategoryService implements ICategoryService{

   constructor(protected noteRepository: ICategoryRepository){}
   getAll(): Promise<ICategory[]> {
      return this.noteRepository.getAll();
   }
   save = async (name: string): Promise<ICategory | null> => {
      return await this.noteRepository.save(name);
   }
   delete = async (id: number): Promise<void> =>{
      return await this.noteRepository.delete(id);
   }

}