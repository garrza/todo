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

    const deleteCompletedTasks = () => {
        const completedTaskIndices = [];
        projectTasks.forEach((task, index) => {
            if (task.status === true) {
                completedTaskIndices.push(index);
            }
        });

        for (let i = completedTaskIndices.length - 1; i >= 0; i--) {
            projectTasks.splice(completedTaskIndices[i], 1);
        }
    };

    return {
        name,
        description,
        id,
        addTaskToProject,
        deleteTaskFromProject,
        deleteCompletedTasks,
        getProjectTasks: () => projectTasks
    };
};

export default generateProject;