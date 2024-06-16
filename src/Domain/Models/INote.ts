import { ICategory } from "./ICategory.js";

export interface INote{
   id?: number,
   content: string,
   status: string,
   categories: ICategory[];
}