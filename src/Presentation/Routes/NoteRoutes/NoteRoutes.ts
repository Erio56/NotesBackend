import { Router } from "express";
import { NotesController } from "../../Controllers/NoteController.js";

const notesRouter = Router();

notesRouter.post('/v1/notes/register', NotesController.registerNote);
notesRouter.get('/v1/notes/', NotesController.listAllActiveNotes);
notesRouter.get('/v1/notes/archived', NotesController.listAllArchivedNotes);
notesRouter.put('/v1/notes', NotesController.updateNote);
notesRouter.patch('/v1/notes/categories/remove', NotesController.removeCategory);
notesRouter.patch('/v1/notes/categories/add', NotesController.assingCategory);
notesRouter.delete('/v1/notes/:id', NotesController.deleteNote);


export default notesRouter;