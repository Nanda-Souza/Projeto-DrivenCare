import { Router } from "express";
import patientControllers from "../controllers/patientControllers.js";
import {validateSchema} from "../middlewares/schemaValidationMiddleware.js";
import { patientSchemma } from "../schemas/User.js";

const patientRoutes = Router();

patientRoutes.post('/signup', validateSchema(patientSchemma) , patientControllers.create)
patientRoutes.post("/signin", patientControllers.signin)

export default patientRoutes;
