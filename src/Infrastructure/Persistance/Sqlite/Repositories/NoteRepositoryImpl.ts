import { wrap } from "@mikro-orm/sqlite";
import { INote } from "../../../../Domain/Models/INote.js";
import { INoteRepository } from "../../../../Domain/Repositories/INoteRepository.js";
import { Note } from "../Entities/Note.entity.js";
import { getEntityManagerInstance } from "../MikroORM/mikro-orm.config.js";
import { Category } from "../Entities/Category.entity.js";


export class NoteRepositoryImpl implements INoteRepository {

   getAllArchived = async (): Promise<INote[]> => {
      const em = await getEntityManagerInstance();
      try {
         const notes = await em.findAll(Note,{
            populate: ['categories'],
            where: { status: 'ARCHIVED' }
         })
         return notes as unknown as INote[]
      } catch (error) { 
         return []
      }
   }

   getAllActive = async (): Promise<INote[]> =>  {
      const em = await getEntityManagerInstance();
      try {
         const notes = await em.findAll(Note, {
            populate: ['categories'],
            where: { status: 'ACTIVE' }
         })
         return notes as unknown as INote[]
      } catch (error) { 
         return []
      }
   }

   save = async (note: INote): Promise<INote | null> => {
      const em = await getEntityManagerInstance();
      await em.begin();
      console.log("eee")
      try {
         const noteToPersist: Note = em.create(Note, { content: note.content, status: note.status });
         await em.persist(noteToPersist).commit();
         return noteToPersist as unknown as INote;
      } catch (error) {
         em.rollback();
         return null;
      }
   }

   update = async (id: number, note: INote): Promise<INote | null> => {
      const em = await getEntityManagerInstance();
      try {
         let noteToBeUpdated = await em.findOne(Note, { id: id }, {populate: ['categories']});

         if(noteToBeUpdated && note){    
            const toSave = wrap(noteToBeUpdated).assign({ ...note })
            await em.persistAndFlush(toSave);
            noteToBeUpdated = await em.findOne(Note, { id: id }, { populate: ['categories'] });
            return noteToBeUpdated as unknown as INote;
         }
         throw new Error('Note not found');
      } catch (error) {
         console.log(error);
         throw Error('Invalid data')
      }
   }

   delete = async (id: number): Promise<void> => {
      const em = await getEntityManagerInstance();
      try {
         const noteToBeDeleted = em.getReference(Note, id);
         if(noteToBeDeleted){
            await em.remove(noteToBeDeleted).flush();
            return;
         }
         throw new Error('Note not found');
      } catch (error) {
         throw error;
      }
   }

   removeCategory = async(idNote: number, idCategory: number): Promise<INote> => {
      const em = await getEntityManagerInstance();
      try {
         let noteToBeUpdated = await em.findOne(Note, { id: idNote }, {populate: ['categories']});
         if(noteToBeUpdated){    
            const categories = noteToBeUpdated.categories.filter(c => c.id !== idCategory);
            const toSave = wrap(noteToBeUpdated).assign({ ...noteToBeUpdated, categories: categories })
            await em.persistAndFlush(toSave);
            console.log(noteToBeUpdated);
            return noteToBeUpdated as unknown as INote;
         }
         throw new Error('Note not found');
      } catch (error) {
         console.log(error);
         throw('Database error');
      }
   }

   assignCategory = async (idNote: number, idCategory: number): Promise<INote> => {
      const em = await getEntityManagerInstance();
      try {
         let noteToBeUpdated = await em.findOne(Note, { id: idNote }, { populate: ['categories'] });
         if(!noteToBeUpdated){
            throw Error('Note not found')
         }

         let categoryToBeAdded = await em.findOne(Category, { id: idCategory });
         if(!categoryToBeAdded){
            throw Error('Category not found')
         }

         noteToBeUpdated.categories.add(categoryToBeAdded);
         await em.flush();
         return noteToBeUpdated as unknown as INote;

      } catch (error) {
         console.log(error);
         throw Error('Invalid data')
      }
   }

}