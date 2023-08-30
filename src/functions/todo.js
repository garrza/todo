import generateProject from "./projects";
import generateTask from "./tasks";

const todo = () => {
    const userProjects = [];
    const defaultProject = generateProject("Default project", "Hello world!");
    const defaultTask = generateTask("Default task", "Hello world!", "2021-01-01", "low");

    defaultProject.addTaskToProject(defaultTask);

    const addProject = (project) => {
        userProjects.push(project);
    };

    const deleteProject = (project) => {
        const projectIndex = userProjects.findIndex(proj => proj.id === project.id);
        if (projectIndex !== -1) {
            userProjects.splice(projectIndex, 1);
        }
    };

    const initializeDefaultProject = () => {
        addProject(defaultProject);
    };

    const getProject = (projectId) => {
        return userProjects.find(project => project.id === projectId);
    };

    

    return {
        initializeDefaultProject,
        addProject,
        deleteProject,
        getProject,
        userProjects
    };
};

export default todo;