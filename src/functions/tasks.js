import generateID from "./generateID";

const generateTask = (name, description, date, priority) => {
    const id = `TSK#${generateID()}`;
    let status = false;

    const toggleTaskStatus = (task) => {
        task.status = !task.status;
    };


    const editTask = (task, newName, newDescription, newDate, newPriority) => {
        task.name = newName;
        task.description = newDescription;
        task.date = newDate;
        task.priority = newPriority;
    }

    return {
        name,
        description,
        date,
        priority,
        id,
        status,
        toggleTaskStatus,
        editTask
    };
};

export default generateTask;