import { INote } from "../../Domain/Models/INote.js";
import { INoteRepository } from "../../Domain/Repositories/INoteRepository.js";
import { INoteService } from "../interfaces/INoteService.js";


export class NoteService implements INoteService{

   constructor(protected noteRepository: INoteRepository){}


   getAllActive(): Promise<INote[]> {
      return this.noteRepository.getAllActive();
   }

   getAllArchived(): Promise<INote[]> {
      return this.noteRepository.getAllArchived();
   }

   save = async (content: string): Promise<INote| null> => {
      const note = await this.noteRepository.save({
         content: content,
         status: 'ACTIVE',
         categories: [],
      });
      return note;
   }

   update = async (id: number, note: INote): Promise<INote | null> => {
      return await this.noteRepository.update(id,note);
   }

   delete = async (id: number): Promise<void> => {
      return await this.noteRepository.delete(id);
   }

   removeCategory = async (idNote: number, idCategory: number): Promise<INote> => {
      return await this.noteRepository.removeCategory(idNote, idCategory);
   }

   assignCategory = async (idNote: number, idCategory: number): Promise<INote> => {
      return await this.noteRepository.assignCategory(idNote, idCategory);
   }

}