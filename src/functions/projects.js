import generateID from "./generateID";

const generateProject = (name, description) => {
    const id = `PJT#${generateID()}`;
    const projectTasks = [];

    const addTaskToProject = (task) => {
        projectTasks.push(task);
    };

    const deleteTaskFromProject = (taskId) => {
        const taskIndex = projectTasks.findIndex(task => task.ID === taskId);
        if (taskIndex !== -1) {
            projectTasks.splice(taskIndex, 1);
        }
    };

    return {
        name,
        description,
        id,
        projectTasks,
        addTaskToProject,
        deleteTaskFromProject
    };
};

export default generateProject;