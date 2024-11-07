import { Router } from "express";
import routeregister from "./register.route";

const rutas = Router();

rutas.use("/", routeregister)

export default rutas;