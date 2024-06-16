import { NoteRepositoryImpl } from '../../Infrastructure/Persistance/Sqlite/Repositories/NoteRepositoryImpl.js';
import { NoteService } from '../../Application/services/NoteService.js';
import { Request, Response } from "express"
import { CategoryRepositorImpl } from '../../Infrastructure/Persistance/Sqlite/Repositories/CategoryRepositoryImpl.js';
import { CategoryService } from '../../Application/services/CategoryService.js';


const categoryRepository = new CategoryRepositorImpl()
const categoryService = new CategoryService(categoryRepository)

export const CategoryController = {
   
   saveCategory: async (req: Request, res: Response) => {
      const { name } = req.body;
      try {
         const savedNote = await categoryService.save(name);
         
         res.status(201).json(savedNote);
      } catch (error) {
         res.status(500).json({ errorMessage: "Error saving..." })
      }
   },

   listAllCategories: async (req: Request, res: Response) => {
      try {
         const notes = await categoryService.getAll();

         res.status(200).json(notes);
      } catch (error) {
         res.status(500).json({ errorMessage: "Database error" })
      }
   },

   deleteCategory: async (req: Request, res: Response) => {
      const { id } = req.params;
      try {

         if(!id){
            res.status(400).json({ errorMessage: "Please provide an id" })
            return;
         }

         await categoryService.delete(parseInt(id))

         res.status(204).send();

      } catch (error) {
         res.status(500).json({ errorMessage: "Database error" })
      }
   }


}