import { Router } from "express";
import patientControllers from "../controllers/patientControllers.js";
import {validateSchema} from "../middlewares/schemaValidationMiddleware.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import { patientSchemma,
         docNameSchemma } from "../schemas/User.js";

const patientRoutes = Router();

patientRoutes.post('/signup', validateSchema(patientSchemma) , patientControllers.create)
patientRoutes.post("/signin", patientControllers.signin)

patientRoutes.get(
    "/search/doctor-name", 
    authMiddleware.authValidationPatient,
    validateSchema(docNameSchemma),
    patientControllers.searchDoctorName
    )

export default patientRoutes;
