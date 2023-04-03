import { Router } from "express";
import patientRoutes from "./patientRoutes.js"
import doctorRoutes from "./doctorRoutes.js"

const routes = Router();

routes.use("/patients", patientRoutes);
routes.use("/doctors", doctorRoutes);

export default routes;
