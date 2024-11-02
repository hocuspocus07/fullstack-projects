import { Project } from "../models/project.models.js";

const getProjects = async(req, res) => {
    const projects = await Project.find();
    res.json(projects);
};

const addProject = async(req, res) => {
    const { title, description, techstack, githubLink, liveLink, image, status, category, tags } = req.body;
    const newProject = new Project({
        title,
        description,
        techstack,
        githubLink,
        liveLink,
        image,
        status,
        category,
        tags
    });
    await newProject.save();
    res.json(newProject);
};

const updateProject = async(req, res) => {
    const project = await Project.findById(req.params.id);
    if (project) {
        project.title = req.body.title || project.title;
        project.description = req.body.description || project.description;
        project.techstack = req.body.category || project.category;
        project.githubLink = req.body.githubLink || project.githubLink;
        project.liveLink = req.body.liveLink || project.liveLink;
        project.image = req.body.image || project.image;
        project.status = req.body.status || project.status;
        project.category = req.body.category || project.category;
        project.tags = req.body.tags || project.tags;
        await project.save();
        res.json(project);
    } else {
        res.status(404).json({ message: 'project not found' });
    }
}
const deleteProject = async(req, res) => {
    const project = await Project.findById(req.params.id);
    if (project) {
        await project.deleteOne();
        res.json({ message: "project removed" });
    } else {
        res.status(404).json({ message: "no such project was found" });
    }
}
export { getProjects, addProject, updateProject, deleteProject };