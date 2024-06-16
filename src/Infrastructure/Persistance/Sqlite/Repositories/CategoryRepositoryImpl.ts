import { getEntityManagerInstance } from "../MikroORM/mikro-orm.config.js";
import { ICategoryRepository } from "../../../../Domain/Repositories/ICategoryRepository.js";
import { ICategory } from "../../../../Domain/Models/ICategory.js";
import { Category } from "../Entities/Category.entity.js";


export class CategoryRepositorImpl implements ICategoryRepository {

   getAll = async (): Promise<ICategory[]> =>  {
      const em = await getEntityManagerInstance();
      try {
         const categories = await em.findAll(Category, {}) as ICategory[]
         return categories
      } catch (error) { 
         return []
      }
   }

   save = async (name: string): Promise<ICategory | null> => {
      const em = await getEntityManagerInstance();
      await em.begin();
      try {
         const categoryToPersist = em.create(Category, { name: name });
         await em.persist(categoryToPersist).commit();
         return categoryToPersist as ICategory;
      } catch (error) {
         console.log(error)
         em.rollback();
         return null;
      }
   }

   delete = async (id: number): Promise<void> => {
      const em = await getEntityManagerInstance();
      try {
         const categoryToBeDeleted = em.getReference(Category, id);
         if(categoryToBeDeleted){
            await em.remove(categoryToBeDeleted).flush();
            return;
         }
         throw new Error('Category not found');
      } catch (error) {
         throw error;
      }
   }

}