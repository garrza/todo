import generateProject from "./projects";
import generateTask from "./tasks";

const todo = () => {
    const userProjects = [];
    const defaultProject = generateProject("Default project", "Hello world!");
    const defaultTask = generateTask("Default task", "Hello world!");

    defaultProject.addTaskToProject(defaultTask);

    const addProject = (project) => {
        userProjects.push(project);
    };

    const initializeDefaultProject = () => {
        addProject(defaultProject);
    };

    return {
        initializeDefaultProject,
        addProject,
        getUserProjects: () => userProjects
    };
};

export default todo;