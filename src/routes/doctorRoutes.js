import { Router } from "express";
import doctorControllers from "../controllers/doctorControllers.js";
import {validateSchema} from "../middlewares/schemaValidationMiddleware.js";
import { doctorSchemma } from "../schemas/User.js";

const doctorRoutes = Router();

doctorRoutes.post('/signup', validateSchema(doctorSchemma) , doctorControllers.create)
doctorRoutes.post("/signin", doctorControllers.signin)

export default doctorRoutes;
