import { Router } from "express";
import patientRoutes from "./patientRoutes.js"

const routes = Router();

routes.use("/patients", patientRoutes);
//routes.use("/books", bookRoutes);

export default routes;
