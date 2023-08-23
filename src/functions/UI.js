import todo from './todo';

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

    const projectsContainer = document.createElement("ul");
    projectsContainer.classList.add("project-list");

    user.getUserProjects().forEach(project => {
        const projectItem = document.createElement("li");
        projectItem.textContent = project.name;
        projectsContainer.appendChild(projectItem);

        projectItem.addEventListener("click", () => {
            console.log(project.getProjectTasks());
            renderMain();
            projectContent(project);
        });
    });

    aside.appendChild(title);
    aside.appendChild(projectsContainer);
    return aside;
}

const openEditPopup = (task, project) => {
    const popup = document.createElement("div");
    popup.className = "popup";

    const closeButton = document.createElement("span");
    closeButton.className = "close-button";
    closeButton.textContent = "x";
    closeButton.addEventListener("click", () => {
        popup.remove();
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
        const newName = nameInput.value;
        const newDescription = descriptionInput.value;
        const newDate = dateInput.value;
        const newPriority = priorityInput.value;

        task.editTask(task, newName, newDescription, newDate, newPriority);

        renderMain();
        projectContent(project);
        popup.remove();
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

    document.body.appendChild(popup);
};

const projectContent = (project) => {
    const main = document.getElementById("main");

    const currentProject = document.createElement("div");

    const projectHeader = document.createElement("div");

    const projectName = document.createElement("h1");
    projectName.classList.add("project-name");
    projectName.textContent = project.name;

    const projectDescription = document.createElement("p");
    projectDescription.classList.add("project-description");
    projectDescription.textContent = project.description;

    projectHeader.appendChild(projectName);
    projectHeader.appendChild(projectDescription);


    const tasksContainer = document.createElement("div");

    project.getProjectTasks().forEach(task => {
        const taskItem = document.createElement("div");
        const taskName = document.createElement("h2");
        const taskDescription = document.createElement("p");
        const taskDate = document.createElement("span");
        const taskStatus = document.createElement("span");
        const editButton = document.createElement("img");

        taskName.textContent = task.name;
        taskDescription.textContent = task.description;
        taskDate.textContent = task.date;
        taskStatus.textContent = task.status ? "Completed" : "Not Completed";
        editButton.src = "assets/images/edit.png";
        editButton.alt = "Edit Task";

        editButton.addEventListener("click", () => {
            openEditPopup(task, project);
        });

        taskItem.appendChild(taskName);
        taskItem.appendChild(taskDescription);
        taskItem.appendChild(taskDate);
        taskItem.appendChild(taskStatus);
        taskItem.appendChild(editButton);
        
        tasksContainer.appendChild(projectHeader);
        tasksContainer.appendChild(taskItem);
    });

    
    currentProject.appendChild(tasksContainer);

    main.appendChild(currentProject);
}

const createMain = () => {
    const main = document.createElement("main");
    main.classList.add("main");
    main.setAttribute("id", "main");

    return main;
}

const renderMain = () => {
    const main = document.getElementById("main");
    main.textContent = "";
}

const createContent = () => {
    const content = document.createElement("div");
    content.classList.add("content");

    content.appendChild(createSidebar());
    content.appendChild(createMain());

    
    return content;
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


const initialize = () => {
    const body = document.querySelector("body");

    body.appendChild(createHeader());
    body.appendChild(createContent());
    body.appendChild(createFooter());
}


export default initialize;