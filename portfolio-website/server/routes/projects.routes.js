import express, { Router } from "express"
import { getProjects, updateProject, addProject, deleteProject } from "../controllers/projects.controller.js";

const projectRouter = Router()

projectRouter.get("/", getProjects);
projectRouter.post("/", addProject);
projectRouter.put("/:id", updateProject);
projectRouter.delete("/:id", deleteProject);

export default projectRouter;