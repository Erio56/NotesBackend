import { NoteRepositoryImpl } from './../../Infrastructure/Persistance/Sqlite/Repositories/NoteRepositoryImpl.js';
import { NoteService } from './../../Application/services/NoteService.js';
import { Request, Response } from "express"


const noteRepository = new NoteRepositoryImpl()
const noteService = new NoteService(noteRepository)

export const NotesController = {
   
   registerNote: async (req: Request, res: Response) => {
      const { content } = req.body;
      try {
         console.log(req, content);
         const savedNote = await noteService.save(content);
         
         res.status(201).json(savedNote);
      } catch (error) {
         res.status(500).json({ errorMessage: "Error saving..." })
      }
   },

   listAllActiveNotes: async (req: Request, res: Response) => {
      try {
         const notes = await noteService.getAllActive();

         res.status(200).json(notes);
      } catch (error) {
         res.status(500).json({ errorMessage: "Server error" })
      }
   },

   listAllArchivedNotes: async (req: Request, res: Response) => {
      try {
         const notes = await noteService.getAllArchived();

         res.status(200).json(notes);
      } catch (error) {
         res.status(500).json({ errorMessage: "Server error" })
      }
   },

   updateNote: async (req: Request, res: Response) => {
      try {
         const { id, note } = req.body;

         if(!id){
            res.status(400).json({ errorMessage: "Please provide an id" })
            return;
         }

         if(!note){
            res.status(400).json({ errorMessage: "Please provide a note" })
            return;
         }

         const updatedNote = await noteService.update(id, note)

         res.status(200).json(updatedNote);

      } catch (error) {
         const errorMessage = (error as Error).message;
         console.log(error);
         res.status(500).json({ errorMessage: errorMessage })
      }
   },

   deleteNote: async (req: Request, res: Response) => {
      const { id } = req.params;
      try {

         if(!id){
            res.status(400).json({ errorMessage: "Please provide an id" })
            return;
         }

         await noteService.delete(parseInt(id))

         res.status(204).send();

      } catch (error) {
         res.status(500).json({ errorMessage: "Server error" })
      }
   },

   removeCategory: async (req: Request, res: Response) => {
      try {
         const { idNote, idCategory } = req.body;

         if(!idNote){
            res.status(400).json({ errorMessage: "Please provide a note id" })
            return;
         }

         if(!idCategory){
            res.status(400).json({ errorMessage: "Please provide a category id" })
            return;
         }

         const updatedNote = await noteService.removeCategory(idNote, idCategory)

         res.status(200).json(updatedNote);

      } catch (error) {
         console.log(error)
         res.status(500).json({ errorMessage: "Server error" })
      }
   },

   assingCategory: async (req: Request, res: Response) => {
      try {
         const { idNote, idCategory } = req.body;

         if(!idNote){
            res.status(400).json({ errorMessage: "Please provide a note id" })
            return;
         }

         if(!idCategory){
            res.status(400).json({ errorMessage: "Please provide a category id" })
            return;
         }

         const updatedNote = await noteService.assignCategory(idNote, idCategory)

         res.status(200).json(updatedNote);

      } catch (error) {
         console.log(error)
         res.status(500).json({ errorMessage: "Server error" })
      }
   },


}