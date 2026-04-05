import { Router } from "express";

import { authenticate } from "../middleware/authMiddleware.js";

import { AssesmentController } from "../controller/assesment.js";


export const createAssesmentRouter = ({assesmentModel}) => {
    const assesmentRouter = Router();

    const assesmentController = new AssesmentController({assesmentModel});

    assesmentRouter.get('/:id', authenticate, assesmentController.getById); 

    //assesmentRouter.get('/:id', assesmentController.getById); 

    return assesmentRouter;
}