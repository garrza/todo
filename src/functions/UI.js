import todo from './todo';
import generateTask from "./tasks";
import generateProject from './projects';


const user = todo();
user.initializeDefaultProject();

const createHeader = () => {
    const header = document.createElement("header");
    header.classList.add("header");

    const appLogo = document.createElement("img");
    appLogo.src = "assets/images/todo.svg";
    appLogo.alt = "todo";
    appLogo.classList.add("logo");

    const appIntro = document.createElement("h2");
    appIntro.textContent = "Organization, one check at a time.";

    header.appendChild(appLogo);
    header.appendChild(appIntro);

    return header;
}

const createSidebar = () => {
    const aside = document.createElement("aside");
    aside.classList.add("aside");

    const title = document.createElement("h2");
    title.classList.add("aside-title")
    title.textContent = "Projects";

    const addProject = document.createElement("div");
    addProject.classList.add("add-project");
    addProject.textContent = "Add Project";

    const projectsContainer = document.createElement("div");
    projectsContainer.classList.add("project-container");

    const projectList = document.createElement("ul");
    projectList.classList.add("project-list");

    addProject.addEventListener("click", () => {
        const popupContainer = document.createElement("div");
        popupContainer.className = "popup-container";

        const popup = document.createElement("div");
        popup.className = "popup";

        const closeButton = document.createElement("span");
        closeButton.className = "close-button";
        closeButton.textContent = "x";
        closeButton.addEventListener("click", () => {
            popupContainer.remove();
        });

        const nameLabel = document.createElement("label");
        nameLabel.textContent = "Name:";
        const nameInput = document.createElement("input");

        const descriptionLabel = document.createElement("label");
        descriptionLabel.textContent = "Description:";
        const descriptionInput = document.createElement("input");

        const saveButton = document.createElement("button");
        saveButton.textContent = "Save Changes";
        saveButton.addEventListener("click", () => {
            if (nameInput.value === "" || descriptionInput.value === "") {
                alert("Please fill all the fields");
                return;
            }
            const newName = nameInput.value;
            const newDescription = descriptionInput.value;

            user.addProject(generateProject(newName, newDescription));

            renderContent();
            renderProjects();
            popupContainer.remove();
        });

        popup.appendChild(closeButton);
        popup.appendChild(nameLabel);
        popup.appendChild(nameInput);
        popup.appendChild(descriptionLabel);
        popup.appendChild(descriptionInput);
        popup.appendChild(saveButton);

        popupContainer.appendChild(popup);

        document.body.appendChild(popupContainer);
    });

    projectsContainer.appendChild(projectList);

    aside.appendChild(title);
    aside.appendChild(addProject);
    aside.appendChild(projectsContainer);
    return aside;
}

const renderProjects = () => {
    const projectList = document.querySelector(".project-list");
    projectList.textContent = "";
    
    user.getUserProjects().forEach(project => {
        const projectItem = document.createElement("li");
        projectItem.textContent = project.name;
        projectList.appendChild(projectItem);

        projectItem.addEventListener("click", () => {
            console.log(project.getProjectTasks());
            renderContent();
            projectContent(project);
        });
    });
}

const openEditPopup = (task, project) => {
    const popupContainer = document.createElement("div");
    popupContainer.classList.add("popup-container");

    const popup = document.createElement("div");
    popup.className = "popup";

    const closeButton = document.createElement("span");
    closeButton.className = "close-button";
    closeButton.textContent = "x";
    closeButton.addEventListener("click", () => {
        popupContainer.remove();
    });

    const nameLabel = document.createElement("label");
    nameLabel.textContent = "Name:";
    const nameInput = document.createElement("input");
    nameInput.value = task.name;

    const descriptionLabel = document.createElement("label");
    descriptionLabel.textContent = "Description:";
    const descriptionInput = document.createElement("textarea");
    descriptionInput.value = task.description;

    const dateLabel = document.createElement("label");
    dateLabel.textContent = "Date:";
    const dateInput = document.createElement("input");
    dateInput.type = "date";
    dateInput.value = task.date;

    const priorityLabel = document.createElement("label");
    priorityLabel.textContent = "Priority:";
    const priorityInput = document.createElement("input");
    priorityInput.value = task.priority;

    const saveButton = document.createElement("button");
    saveButton.textContent = "Save Changes";
    saveButton.addEventListener("click", () => {
        if (nameInput.value === "" || descriptionInput.value === "" || dateInput.value === "" || priorityInput.value === "") {
            alert("Please fill all the fields");
            return;
        }
        const newName = nameInput.value;
        const newDescription = descriptionInput.value;
        const newDate = dateInput.value;
        const newPriority = priorityInput.value;

        task.editTask(task, newName, newDescription, newDate, newPriority);

        renderContent();
        projectContent(project);
        popupContainer.remove();
    });

    popup.appendChild(closeButton);
    popup.appendChild(nameLabel);
    popup.appendChild(nameInput);
    popup.appendChild(descriptionLabel);
    popup.appendChild(descriptionInput);
    popup.appendChild(dateLabel);
    popup.appendChild(dateInput);
    popup.appendChild(priorityLabel);
    popup.appendChild(priorityInput);
    popup.appendChild(saveButton);

    popupContainer.appendChild(popup);
    document.body.appendChild(popupContainer);
};

const projectContent = (project) => {
    const currentProject = document.createElement("div");
    currentProject.classList.add("current-project");

    const projectHeader = document.createElement("div")
    projectHeader.classList.add("project-header");

    const projectName = document.createElement("h1");
    projectName.classList.add("project-name");
    projectName.textContent = project.name;

    const projectDescription = document.createElement("p");
    projectDescription.classList.add("project-description");
    projectDescription.textContent = project.description;

    const deleteProject = document.createElement("div");
    deleteProject.classList.add("delete-project");
    deleteProject.textContent = "Delete Project";

    deleteProject.addEventListener("click", () => {
        if(user.getUserProjects().length > 1) {
        user.deleteProject(project);
        renderContent();
        renderProjects();
        projectContent(user.getUserProjects()[0]);
        } else {
            alert("You can't delete the last project");
        }
    });

    const projectAddTask = document.createElement("div");
    projectAddTask.classList.add("project-add-task");
    projectAddTask.textContent = "Add Task";

    projectAddTask.addEventListener("click", () => {
        const popupContainer = document.createElement("div");
        popupContainer.className = "popup-container";

        const popup = document.createElement("div");
        popup.className = "popup";

        const closeButton = document.createElement("span");
        closeButton.className = "close-button";
        closeButton.textContent = "x";
        closeButton.addEventListener("click", () => {
            popupContainer.remove();
        });

        const nameLabel = document.createElement("label");
        nameLabel.textContent = "Name:";
        const nameInput = document.createElement("input");

        const descriptionLabel = document.createElement("label");
        descriptionLabel.textContent = "Description:";
        const descriptionInput = document.createElement("textarea");

        const dateLabel = document.createElement("label");
        dateLabel.textContent = "Date:";
        const dateInput = document.createElement("input");
        dateInput.type = "date";

        const priorityLabel = document.createElement("label");
        priorityLabel.textContent = "Priority:";

        const priorityInput = document.createElement("form");
        const priorities = ["Low", "Medium", "High"];

        priorities.forEach(priority => {
            const radioInput = document.createElement("input");
            radioInput.type = "radio";
            radioInput.name = "priority";
            radioInput.value = priority.toLowerCase();
            priorityInput.appendChild(radioInput);

            const radioLabel = document.createElement("label");
            radioLabel.textContent = priority;
            priorityInput.appendChild(radioLabel);
        });


        const saveButton = document.createElement("button");
        saveButton.textContent = "Save Changes";
        saveButton.addEventListener("click", () => {
            if (nameInput.value === "" || descriptionInput.value === "" || dateInput.value === "" || priorityInput.value === "") {
                alert("Please fill all the fields");
                return;
            }
            const newName = nameInput.value;
            const newDescription = descriptionInput.value;
            const newDate = dateInput.value;
            const newPriority = priorityInput.value;
            

            const newTask = generateTask(newName, newDescription, newDate, newPriority);
            project.addTaskToProject(newTask);

            renderContent();
            projectContent(project);
            popupContainer.remove();
        });

        popup.appendChild(closeButton);
        popup.appendChild(nameLabel);
        popup.appendChild(nameInput);
        popup.appendChild(descriptionLabel);
        popup.appendChild(descriptionInput);
        popup.appendChild(dateLabel);
        popup.appendChild(dateInput);
        popup.appendChild(priorityLabel);
        popup.appendChild(priorityInput);
        popup.appendChild(saveButton);

        popupContainer.appendChild(popup);

        document.body.appendChild(popupContainer);
    });

    projectHeader.appendChild(projectName);
    projectHeader.appendChild(projectDescription);
    projectHeader.appendChild(projectAddTask);
    projectHeader.appendChild(deleteProject);



    const tasksContainer = document.createElement("div");
    tasksContainer.classList.add("tasks-container");

    project.getProjectTasks().forEach(task => {
        const taskItem = document.createElement("div");
        const taskName = document.createElement("h2");
        const taskDescription = document.createElement("p");
        const taskDate = document.createElement("span");
        const taskStatusToggle = document.createElement("div");
        const editButton = document.createElement("img");

        taskName.textContent = task.name;
        taskDescription.textContent = task.description;
        taskDate.textContent = task.date;
        taskStatusToggle.classList.add("task-status");;
        editButton.src = "assets/images/edit.png";
        editButton.alt = "Edit Task";

        editButton.addEventListener("click", () => {
            openEditPopup(task, project);
        });

        taskStatusToggle.addEventListener("click", () => {
            task.status = !task.status;
            project.deleteCompletedTasks();
            renderContent();
            projectContent(project);
        });

        taskItem.appendChild(taskName);
        taskItem.appendChild(taskDescription);
        taskItem.appendChild(taskDate);
        taskItem.appendChild(editButton);
        taskItem.appendChild(taskStatusToggle);
        taskItem.classList.add("task-item");

        tasksContainer.appendChild(taskItem);
    });


    currentProject.appendChild(projectHeader);
    currentProject.appendChild(tasksContainer);

    content.appendChild(currentProject);
}

const createContent = () => {
    const content = document.createElement("div");
    content.classList.add("content");
    content.setAttribute("id", "content");

    return content;
}

const renderContent = () => {
    const content = document.getElementById("content");
    content.textContent = "";
}

const createFooter = () => {
    const footer = document.createElement("footer");
    footer.classList.add("footer");

    const copyright = document.createElement("p");
    copyright.textContent = `Copyright © ${new Date().getFullYear()} @garrza`;

    const githubLink = document.createElement("a");
    githubLink.href = "https://github.com/garrza";

    const githubIcon = document.createElement("i");
    githubIcon.classList.add("fab");
    githubIcon.classList.add("fa-github");
    githubIcon.setAttribute("style", "color : #5363b7");

    githubLink.appendChild(githubIcon);
    footer.appendChild(copyright);
    footer.appendChild(githubLink);

    return footer;
}

const render = () => {
    renderProjects();
    projectContent(user.getUserProjects()[0]);
}

const initialize = () => {
    const body = document.querySelector("body");

    body.appendChild(createHeader());
    body.appendChild(createSidebar());
    body.appendChild(createContent());
    body.appendChild(createFooter());

    render();
}


export default initialize;