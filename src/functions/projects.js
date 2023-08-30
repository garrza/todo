import generateID from "./generateID";

const generateProject = (name, description) => {
    const id = `PJT#${generateID()}`;
    const projectTasks = [];

    const addTaskToProject = (task) => {
        projectTasks.push(task);
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
        projectTasks,
        addTaskToProject,
        deleteCompletedTasks,
    };
};

export default generateProject;