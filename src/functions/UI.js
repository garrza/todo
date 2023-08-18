import generateProject from './projects';
import todo from './todo';

const user = todo();

const createHeader = () => {
    const header = document.createElement("header");
    header.classList.add("header");

    const appLogo = document.createElement("img");
    appLogo.src = "assets/images/todo.png";
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
    title.textContent = "Projects";

    const projectsContainer = document.createElement("ul"); // Changed div to ul for projects
    projectsContainer.classList.add("project-list");

    user.initializeDefaultProject();

    user.getUserProjects().forEach(project => {
        const projectItem = document.createElement("li");
        projectItem.textContent = project.name;
        projectItem.addEventListener("click", () => {
            console.log(project.description)
        });

        projectsContainer.appendChild(projectItem);
    });

    aside.appendChild(title);
    aside.appendChild(projectsContainer);
    return aside;
}




const initialize = () => {
    const content = document.getElementById("content");

    content.appendChild(createSidebar());
}

export default initialize;