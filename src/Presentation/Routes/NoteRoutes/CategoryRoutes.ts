import { Router } from "express";
import { CategoryController } from "../../Controllers/CategoryController.js";

const categoryRouter = Router();

categoryRouter.post('/v1/categories/register', CategoryController.saveCategory);
categoryRouter.get('/v1/categories/', CategoryController.listAllCategories);
categoryRouter.delete('/v1/categories/:id', CategoryController.deleteCategory);

export default categoryRouter;
