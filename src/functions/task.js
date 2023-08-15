import generateID from "./generateID"

const generateTask = (name, description, date, priority) => {
    const ID = `TSK#${generateID()}`;
    return {name, description, date, priority, ID};
}

export default generateTask;