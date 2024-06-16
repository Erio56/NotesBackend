import { INote } from "../Models/INote.js";

export interface INoteRepository{
   getAllActive(): Promise<INote[]>;
   getAllArchived(): Promise<INote[]>;
   save(note: INote): Promise<INote | null>;
   update(id:number, note: INote): Promise<INote | null>;
   delete(id:number): Promise<void>;
   assignCategory(idNote: number, idCategory: number): Promise<INote>;
   removeCategory(idNote: number, idCategory: number): Promise<INote>;
}