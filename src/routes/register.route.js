import { Router } from "express";
import Register, { metodo } from "../controllers/controller.register";

const routeregister = Router();

routeregister.post("/register", metodo.Register);
routeregister.post("/login", metodo.loginUser);
routeregister.get("/view", metodo.viewRegister);

export default routeregister;