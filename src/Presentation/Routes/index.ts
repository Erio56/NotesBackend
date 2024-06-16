import { Router } from "express";
import notesRouter from "./NoteRoutes/NoteRoutes.js";
import categoryRouter from "./NoteRoutes/CategoryRoutes.js";

export const router = Router();

router.use(notesRouter);
router.use(categoryRouter);
