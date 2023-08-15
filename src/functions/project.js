import generateID from "./generateID"

const generateProject = (name) => {
    const ID = `PJT#${generateID()}`;
    let projectTasks = [];

    const addTask = () => {
        projectTasks.push(task);
    }

    return {name, ID, projectTasks, addTask};
}

export default generateProject;