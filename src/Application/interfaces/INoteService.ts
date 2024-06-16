import { INote } from "../../Domain/Models/INote.js";
import { Note } from "../../Infrastructure/Persistance/Sqlite/Entities/Note.entity.js";

export interface INoteService {
   getAllArchived(): Promise<INote[]>;
   getAllActive(): Promise<INote[]>;
   save(content: string): Promise<INote| null>;
   update(id:number, note: INote): Promise<INote | null>;
   delete(id:number): Promise<void>;
   removeCategory(idNote: number, idCategory: number): Promise<INote>;
   assignCategory(idNote: number, idCategory: number): Promise<INote>;
}