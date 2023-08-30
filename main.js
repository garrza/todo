/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/functions/UI.js":
/*!*****************************!*\
  !*** ./src/functions/UI.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _todo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./todo */ "./src/functions/todo.js");
/* harmony import */ var _tasks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tasks */ "./src/functions/tasks.js");
/* harmony import */ var _projects__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./projects */ "./src/functions/projects.js");




const user = (0,_todo__WEBPACK_IMPORTED_MODULE_0__["default"])();

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

            user.addProject((0,_projects__WEBPACK_IMPORTED_MODULE_2__["default"])(newName, newDescription));
            renderContent();
            renderProjects();
            localStorage.setItem('userProjects', JSON.stringify(user.userProjects));
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

    user.userProjects.forEach(project => {
        const projectItem = document.createElement("li");
        projectItem.textContent = project.name;
        projectList.appendChild(projectItem);

        projectItem.addEventListener("click", () => {
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
        localStorage.setItem('userProjects', JSON.stringify(user.userProjects));
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
        if (user.userProjects.length > 1) {
            user.deleteProject(project);
            renderContent();
            renderProjects();
            projectContent(user.userProjects[0]);
            localStorage.setItem('userProjects', JSON.stringify(user.userProjects));
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

        const priorities = ["Low", "Medium", "High"];

        const priorityInput = document.createElement("select");
        priorityInput.name = "priority";
        priorityInput.id = "priority";

        priorities.forEach(priority => {
            const option = document.createElement("option");
            option.value = priority.toLowerCase();
            option.textContent = priority;
            priorityInput.appendChild(option);
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


            const newTask = (0,_tasks__WEBPACK_IMPORTED_MODULE_1__["default"])(newName, newDescription, newDate, newPriority);
            project.addTaskToProject(newTask);

            renderContent();
            projectContent(project);
            localStorage.setItem('userProjects', JSON.stringify(user.userProjects));
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

    project.projectTasks.forEach(task => {
        const taskItem = document.createElement("div");
        const taskName = document.createElement("h2");
        const taskDescription = document.createElement("p");
        const taskDate = document.createElement("span");
        const taskPriority = document.createElement("div");
        const taskStatusToggle = document.createElement("div");
        const editButton = document.createElement("img");

        taskName.textContent = task.name;
        taskDescription.textContent = task.description;
        taskDate.textContent = task.date;
        taskPriority.textContent = "!";
        taskPriority.classList.add("task-priority");
        taskStatusToggle.classList.add("task-status");;
        editButton.src = "assets/images/edit.png";
        editButton.alt = "Edit Task";

        if (task.priority === "low") {
            taskPriority.classList.add("low-priority");
        } else if (task.priority === "medium") {
            taskPriority.classList.add("medium-priority");
        } else {
            taskPriority.classList.add("high-priority");
        }

        editButton.addEventListener("click", () => {
            openEditPopup(task, project);
        });

        taskStatusToggle.addEventListener("click", () => {
            task.status = !task.status;
            project.deleteCompletedTasks();
            renderContent();
            projectContent(project);
            localStorage.setItem('userProjects', JSON.stringify(user.userProjects));
        });

        taskItem.appendChild(taskName);
        taskItem.appendChild(taskDescription);
        taskItem.appendChild(taskDate);
        taskItem.appendChild(taskPriority);
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
    projectContent(user.userProjects[0]);
};

const initialize = () => {
    const body = document.querySelector("body");

    body.appendChild(createHeader());
    body.appendChild(createSidebar());
    body.appendChild(createContent());
    body.appendChild(createFooter());

    
    const savedProjects = JSON.parse(localStorage.getItem('userProjects'));

    if (savedProjects) {
        console.log(savedProjects);
        savedProjects.forEach(savedProject => {
            const newProject = (0,_projects__WEBPACK_IMPORTED_MODULE_2__["default"])(savedProject.name, savedProject.description);
            savedProject.projectTasks.forEach(savedTask => {
                const newTask = (0,_tasks__WEBPACK_IMPORTED_MODULE_1__["default"])(savedTask.name, savedTask.description, savedTask.date, savedTask.priority);
                newProject.addTaskToProject(newTask);
            });
            user.addProject(newProject);
        });
    } else {
        user.initializeDefaultProject();
    }

    render();
};



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (initialize);

/***/ }),

/***/ "./src/functions/generateID.js":
/*!*************************************!*\
  !*** ./src/functions/generateID.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const generateID = () => {
    return Math.floor(Math.random() * 9000) + 1000;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (generateID);

/***/ }),

/***/ "./src/functions/projects.js":
/*!***********************************!*\
  !*** ./src/functions/projects.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _generateID__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./generateID */ "./src/functions/generateID.js");


const generateProject = (name, description) => {
    const id = `PJT#${(0,_generateID__WEBPACK_IMPORTED_MODULE_0__["default"])()}`;
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (generateProject);

/***/ }),

/***/ "./src/functions/tasks.js":
/*!********************************!*\
  !*** ./src/functions/tasks.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _generateID__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./generateID */ "./src/functions/generateID.js");


const generateTask = (name, description, date, priority) => {
    const id = `TSK#${(0,_generateID__WEBPACK_IMPORTED_MODULE_0__["default"])()}`;
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (generateTask);

/***/ }),

/***/ "./src/functions/todo.js":
/*!*******************************!*\
  !*** ./src/functions/todo.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _projects__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./projects */ "./src/functions/projects.js");
/* harmony import */ var _tasks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tasks */ "./src/functions/tasks.js");



const todo = () => {
    const userProjects = [];
    const defaultProject = (0,_projects__WEBPACK_IMPORTED_MODULE_0__["default"])("Default project", "Hello world!");
    const defaultTask = (0,_tasks__WEBPACK_IMPORTED_MODULE_1__["default"])("Default task", "Hello world!", "2021-01-01", "low");

    defaultProject.addTaskToProject(defaultTask);

    const addProject = (project) => {
        userProjects.push(project);
    };

    const deleteProject = (project) => {
        const projectIndex = userProjects.findIndex(proj => proj.id === project.id);
        if (projectIndex !== -1) {
            userProjects.splice(projectIndex, 1);
        }
    };

    const initializeDefaultProject = () => {
        addProject(defaultProject);
    };

    const getProject = (projectId) => {
        return userProjects.find(project => project.id === projectId);
    };

    

    return {
        userProjects,
        initializeDefaultProject,
        addProject,
        deleteProject,
        getProject
    };
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (todo);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _functions_UI__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./functions/UI */ "./src/functions/UI.js");


(0,_functions_UI__WEBPACK_IMPORTED_MODULE_0__["default"])();


})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUEwQjtBQUNTO0FBQ007O0FBRXpDLGFBQWEsaURBQUk7O0FBRWpCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsNEJBQTRCLHFEQUFlO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxLQUFLOztBQUVMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQSw0QkFBNEIsa0RBQVk7QUFDeEM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTs7OztBQUlBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQSxVQUFVO0FBQ1Y7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsS0FBSzs7O0FBR0w7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsMkNBQTJDLDBCQUEwQjs7QUFFckU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsK0JBQStCLHFEQUFlO0FBQzlDO0FBQ0EsZ0NBQWdDLGtEQUFZO0FBQzVDO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsU0FBUztBQUNULE1BQU07QUFDTjtBQUNBOztBQUVBO0FBQ0E7Ozs7QUFJQSxpRUFBZSxVQUFVOzs7Ozs7Ozs7Ozs7OztBQ3RiekI7QUFDQTtBQUNBOztBQUVBLGlFQUFlLFVBQVU7Ozs7Ozs7Ozs7Ozs7OztBQ0phOztBQUV0QztBQUNBLHNCQUFzQix1REFBVSxHQUFHO0FBQ25DOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVULHNEQUFzRCxRQUFRO0FBQzlEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsaUVBQWUsZUFBZTs7Ozs7Ozs7Ozs7Ozs7O0FDakNROztBQUV0QztBQUNBLHNCQUFzQix1REFBVSxHQUFHO0FBQ25DOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxpRUFBZSxZQUFZOzs7Ozs7Ozs7Ozs7Ozs7O0FDN0JjO0FBQ047O0FBRW5DO0FBQ0E7QUFDQSwyQkFBMkIscURBQWU7QUFDMUMsd0JBQXdCLGtEQUFZOztBQUVwQzs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxpRUFBZSxJQUFJOzs7Ozs7VUN4Q25CO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7QUNOd0M7O0FBRXhDLHlEQUFVIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG9kby8uL3NyYy9mdW5jdGlvbnMvVUkuanMiLCJ3ZWJwYWNrOi8vdG9kby8uL3NyYy9mdW5jdGlvbnMvZ2VuZXJhdGVJRC5qcyIsIndlYnBhY2s6Ly90b2RvLy4vc3JjL2Z1bmN0aW9ucy9wcm9qZWN0cy5qcyIsIndlYnBhY2s6Ly90b2RvLy4vc3JjL2Z1bmN0aW9ucy90YXNrcy5qcyIsIndlYnBhY2s6Ly90b2RvLy4vc3JjL2Z1bmN0aW9ucy90b2RvLmpzIiwid2VicGFjazovL3RvZG8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG9kby93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG9kby93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvZG8vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90b2RvLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB0b2RvIGZyb20gJy4vdG9kbyc7XG5pbXBvcnQgZ2VuZXJhdGVUYXNrIGZyb20gXCIuL3Rhc2tzXCI7XG5pbXBvcnQgZ2VuZXJhdGVQcm9qZWN0IGZyb20gJy4vcHJvamVjdHMnO1xuXG5jb25zdCB1c2VyID0gdG9kbygpO1xuXG5jb25zdCBjcmVhdGVIZWFkZXIgPSAoKSA9PiB7XG4gICAgY29uc3QgaGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImhlYWRlclwiKTtcbiAgICBoZWFkZXIuY2xhc3NMaXN0LmFkZChcImhlYWRlclwiKTtcblxuICAgIGNvbnN0IGFwcExvZ28gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW1nXCIpO1xuICAgIGFwcExvZ28uc3JjID0gXCJhc3NldHMvaW1hZ2VzL3RvZG8uc3ZnXCI7XG4gICAgYXBwTG9nby5hbHQgPSBcInRvZG9cIjtcbiAgICBhcHBMb2dvLmNsYXNzTGlzdC5hZGQoXCJsb2dvXCIpO1xuXG4gICAgY29uc3QgYXBwSW50cm8gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDJcIik7XG4gICAgYXBwSW50cm8udGV4dENvbnRlbnQgPSBcIk9yZ2FuaXphdGlvbiwgb25lIGNoZWNrIGF0IGEgdGltZS5cIjtcblxuICAgIGhlYWRlci5hcHBlbmRDaGlsZChhcHBMb2dvKTtcbiAgICBoZWFkZXIuYXBwZW5kQ2hpbGQoYXBwSW50cm8pO1xuXG4gICAgcmV0dXJuIGhlYWRlcjtcbn1cblxuY29uc3QgY3JlYXRlU2lkZWJhciA9ICgpID0+IHtcbiAgICBjb25zdCBhc2lkZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJhc2lkZVwiKTtcbiAgICBhc2lkZS5jbGFzc0xpc3QuYWRkKFwiYXNpZGVcIik7XG5cbiAgICBjb25zdCB0aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMlwiKTtcbiAgICB0aXRsZS5jbGFzc0xpc3QuYWRkKFwiYXNpZGUtdGl0bGVcIilcbiAgICB0aXRsZS50ZXh0Q29udGVudCA9IFwiUHJvamVjdHNcIjtcblxuICAgIGNvbnN0IGFkZFByb2plY3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGFkZFByb2plY3QuY2xhc3NMaXN0LmFkZChcImFkZC1wcm9qZWN0XCIpO1xuICAgIGFkZFByb2plY3QudGV4dENvbnRlbnQgPSBcIkFkZCBQcm9qZWN0XCI7XG5cbiAgICBjb25zdCBwcm9qZWN0c0NvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgcHJvamVjdHNDb250YWluZXIuY2xhc3NMaXN0LmFkZChcInByb2plY3QtY29udGFpbmVyXCIpO1xuXG4gICAgY29uc3QgcHJvamVjdExpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidWxcIik7XG4gICAgcHJvamVjdExpc3QuY2xhc3NMaXN0LmFkZChcInByb2plY3QtbGlzdFwiKTtcblxuICAgIGFkZFByb2plY3QuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgY29uc3QgcG9wdXBDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICBwb3B1cENvbnRhaW5lci5jbGFzc05hbWUgPSBcInBvcHVwLWNvbnRhaW5lclwiO1xuXG4gICAgICAgIGNvbnN0IHBvcHVwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgcG9wdXAuY2xhc3NOYW1lID0gXCJwb3B1cFwiO1xuXG4gICAgICAgIGNvbnN0IGNsb3NlQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG4gICAgICAgIGNsb3NlQnV0dG9uLmNsYXNzTmFtZSA9IFwiY2xvc2UtYnV0dG9uXCI7XG4gICAgICAgIGNsb3NlQnV0dG9uLnRleHRDb250ZW50ID0gXCJ4XCI7XG4gICAgICAgIGNsb3NlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgICAgICBwb3B1cENvbnRhaW5lci5yZW1vdmUoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3QgbmFtZUxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxhYmVsXCIpO1xuICAgICAgICBuYW1lTGFiZWwudGV4dENvbnRlbnQgPSBcIk5hbWU6XCI7XG4gICAgICAgIGNvbnN0IG5hbWVJbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcblxuICAgICAgICBjb25zdCBkZXNjcmlwdGlvbkxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxhYmVsXCIpO1xuICAgICAgICBkZXNjcmlwdGlvbkxhYmVsLnRleHRDb250ZW50ID0gXCJEZXNjcmlwdGlvbjpcIjtcbiAgICAgICAgY29uc3QgZGVzY3JpcHRpb25JbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcblxuICAgICAgICBjb25zdCBzYXZlQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICAgICAgc2F2ZUJ1dHRvbi50ZXh0Q29udGVudCA9IFwiU2F2ZSBDaGFuZ2VzXCI7XG4gICAgICAgIHNhdmVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgICAgIGlmIChuYW1lSW5wdXQudmFsdWUgPT09IFwiXCIgfHwgZGVzY3JpcHRpb25JbnB1dC52YWx1ZSA9PT0gXCJcIikge1xuICAgICAgICAgICAgICAgIGFsZXJ0KFwiUGxlYXNlIGZpbGwgYWxsIHRoZSBmaWVsZHNcIik7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgbmV3TmFtZSA9IG5hbWVJbnB1dC52YWx1ZTtcbiAgICAgICAgICAgIGNvbnN0IG5ld0Rlc2NyaXB0aW9uID0gZGVzY3JpcHRpb25JbnB1dC52YWx1ZTtcblxuICAgICAgICAgICAgdXNlci5hZGRQcm9qZWN0KGdlbmVyYXRlUHJvamVjdChuZXdOYW1lLCBuZXdEZXNjcmlwdGlvbikpO1xuICAgICAgICAgICAgcmVuZGVyQ29udGVudCgpO1xuICAgICAgICAgICAgcmVuZGVyUHJvamVjdHMoKTtcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd1c2VyUHJvamVjdHMnLCBKU09OLnN0cmluZ2lmeSh1c2VyLnVzZXJQcm9qZWN0cykpO1xuICAgICAgICAgICAgcG9wdXBDb250YWluZXIucmVtb3ZlKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHBvcHVwLmFwcGVuZENoaWxkKGNsb3NlQnV0dG9uKTtcbiAgICAgICAgcG9wdXAuYXBwZW5kQ2hpbGQobmFtZUxhYmVsKTtcbiAgICAgICAgcG9wdXAuYXBwZW5kQ2hpbGQobmFtZUlucHV0KTtcbiAgICAgICAgcG9wdXAuYXBwZW5kQ2hpbGQoZGVzY3JpcHRpb25MYWJlbCk7XG4gICAgICAgIHBvcHVwLmFwcGVuZENoaWxkKGRlc2NyaXB0aW9uSW5wdXQpO1xuICAgICAgICBwb3B1cC5hcHBlbmRDaGlsZChzYXZlQnV0dG9uKTtcblxuICAgICAgICBwb3B1cENvbnRhaW5lci5hcHBlbmRDaGlsZChwb3B1cCk7XG5cbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChwb3B1cENvbnRhaW5lcik7XG4gICAgfSk7XG5cbiAgICBwcm9qZWN0c0NvbnRhaW5lci5hcHBlbmRDaGlsZChwcm9qZWN0TGlzdCk7XG5cbiAgICBhc2lkZS5hcHBlbmRDaGlsZCh0aXRsZSk7XG4gICAgYXNpZGUuYXBwZW5kQ2hpbGQoYWRkUHJvamVjdCk7XG4gICAgYXNpZGUuYXBwZW5kQ2hpbGQocHJvamVjdHNDb250YWluZXIpO1xuICAgIHJldHVybiBhc2lkZTtcbn1cblxuY29uc3QgcmVuZGVyUHJvamVjdHMgPSAoKSA9PiB7XG4gICAgY29uc3QgcHJvamVjdExpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByb2plY3QtbGlzdFwiKTtcbiAgICBwcm9qZWN0TGlzdC50ZXh0Q29udGVudCA9IFwiXCI7XG5cbiAgICB1c2VyLnVzZXJQcm9qZWN0cy5mb3JFYWNoKHByb2plY3QgPT4ge1xuICAgICAgICBjb25zdCBwcm9qZWN0SXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKTtcbiAgICAgICAgcHJvamVjdEl0ZW0udGV4dENvbnRlbnQgPSBwcm9qZWN0Lm5hbWU7XG4gICAgICAgIHByb2plY3RMaXN0LmFwcGVuZENoaWxkKHByb2plY3RJdGVtKTtcblxuICAgICAgICBwcm9qZWN0SXRlbS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICAgICAgcmVuZGVyQ29udGVudCgpO1xuICAgICAgICAgICAgcHJvamVjdENvbnRlbnQocHJvamVjdCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufVxuXG5jb25zdCBvcGVuRWRpdFBvcHVwID0gKHRhc2ssIHByb2plY3QpID0+IHtcbiAgICBjb25zdCBwb3B1cENvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgcG9wdXBDb250YWluZXIuY2xhc3NMaXN0LmFkZChcInBvcHVwLWNvbnRhaW5lclwiKTtcblxuICAgIGNvbnN0IHBvcHVwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBwb3B1cC5jbGFzc05hbWUgPSBcInBvcHVwXCI7XG5cbiAgICBjb25zdCBjbG9zZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuICAgIGNsb3NlQnV0dG9uLmNsYXNzTmFtZSA9IFwiY2xvc2UtYnV0dG9uXCI7XG4gICAgY2xvc2VCdXR0b24udGV4dENvbnRlbnQgPSBcInhcIjtcbiAgICBjbG9zZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICBwb3B1cENvbnRhaW5lci5yZW1vdmUoKTtcbiAgICB9KTtcblxuICAgIGNvbnN0IG5hbWVMYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsYWJlbFwiKTtcbiAgICBuYW1lTGFiZWwudGV4dENvbnRlbnQgPSBcIk5hbWU6XCI7XG4gICAgY29uc3QgbmFtZUlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xuICAgIG5hbWVJbnB1dC52YWx1ZSA9IHRhc2submFtZTtcblxuICAgIGNvbnN0IGRlc2NyaXB0aW9uTGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGFiZWxcIik7XG4gICAgZGVzY3JpcHRpb25MYWJlbC50ZXh0Q29udGVudCA9IFwiRGVzY3JpcHRpb246XCI7XG4gICAgY29uc3QgZGVzY3JpcHRpb25JbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0ZXh0YXJlYVwiKTtcbiAgICBkZXNjcmlwdGlvbklucHV0LnZhbHVlID0gdGFzay5kZXNjcmlwdGlvbjtcblxuICAgIGNvbnN0IGRhdGVMYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsYWJlbFwiKTtcbiAgICBkYXRlTGFiZWwudGV4dENvbnRlbnQgPSBcIkRhdGU6XCI7XG4gICAgY29uc3QgZGF0ZUlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xuICAgIGRhdGVJbnB1dC50eXBlID0gXCJkYXRlXCI7XG4gICAgZGF0ZUlucHV0LnZhbHVlID0gdGFzay5kYXRlO1xuXG4gICAgY29uc3QgcHJpb3JpdHlMYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsYWJlbFwiKTtcbiAgICBwcmlvcml0eUxhYmVsLnRleHRDb250ZW50ID0gXCJQcmlvcml0eTpcIjtcbiAgICBjb25zdCBwcmlvcml0eUlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xuICAgIHByaW9yaXR5SW5wdXQudmFsdWUgPSB0YXNrLnByaW9yaXR5O1xuXG4gICAgY29uc3Qgc2F2ZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgc2F2ZUJ1dHRvbi50ZXh0Q29udGVudCA9IFwiU2F2ZSBDaGFuZ2VzXCI7XG4gICAgc2F2ZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICBpZiAobmFtZUlucHV0LnZhbHVlID09PSBcIlwiIHx8IGRlc2NyaXB0aW9uSW5wdXQudmFsdWUgPT09IFwiXCIgfHwgZGF0ZUlucHV0LnZhbHVlID09PSBcIlwiIHx8IHByaW9yaXR5SW5wdXQudmFsdWUgPT09IFwiXCIpIHtcbiAgICAgICAgICAgIGFsZXJ0KFwiUGxlYXNlIGZpbGwgYWxsIHRoZSBmaWVsZHNcIik7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgbmV3TmFtZSA9IG5hbWVJbnB1dC52YWx1ZTtcbiAgICAgICAgY29uc3QgbmV3RGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbklucHV0LnZhbHVlO1xuICAgICAgICBjb25zdCBuZXdEYXRlID0gZGF0ZUlucHV0LnZhbHVlO1xuICAgICAgICBjb25zdCBuZXdQcmlvcml0eSA9IHByaW9yaXR5SW5wdXQudmFsdWU7XG5cbiAgICAgICAgdGFzay5lZGl0VGFzayh0YXNrLCBuZXdOYW1lLCBuZXdEZXNjcmlwdGlvbiwgbmV3RGF0ZSwgbmV3UHJpb3JpdHkpO1xuICAgICAgICByZW5kZXJDb250ZW50KCk7XG4gICAgICAgIHByb2plY3RDb250ZW50KHByb2plY3QpO1xuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndXNlclByb2plY3RzJywgSlNPTi5zdHJpbmdpZnkodXNlci51c2VyUHJvamVjdHMpKTtcbiAgICAgICAgcG9wdXBDb250YWluZXIucmVtb3ZlKCk7XG4gICAgfSk7XG5cbiAgICBwb3B1cC5hcHBlbmRDaGlsZChjbG9zZUJ1dHRvbik7XG4gICAgcG9wdXAuYXBwZW5kQ2hpbGQobmFtZUxhYmVsKTtcbiAgICBwb3B1cC5hcHBlbmRDaGlsZChuYW1lSW5wdXQpO1xuICAgIHBvcHVwLmFwcGVuZENoaWxkKGRlc2NyaXB0aW9uTGFiZWwpO1xuICAgIHBvcHVwLmFwcGVuZENoaWxkKGRlc2NyaXB0aW9uSW5wdXQpO1xuICAgIHBvcHVwLmFwcGVuZENoaWxkKGRhdGVMYWJlbCk7XG4gICAgcG9wdXAuYXBwZW5kQ2hpbGQoZGF0ZUlucHV0KTtcbiAgICBwb3B1cC5hcHBlbmRDaGlsZChwcmlvcml0eUxhYmVsKTtcbiAgICBwb3B1cC5hcHBlbmRDaGlsZChwcmlvcml0eUlucHV0KTtcbiAgICBwb3B1cC5hcHBlbmRDaGlsZChzYXZlQnV0dG9uKTtcblxuICAgIHBvcHVwQ29udGFpbmVyLmFwcGVuZENoaWxkKHBvcHVwKTtcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHBvcHVwQ29udGFpbmVyKTtcbn07XG5cbmNvbnN0IHByb2plY3RDb250ZW50ID0gKHByb2plY3QpID0+IHtcbiAgICBjb25zdCBjdXJyZW50UHJvamVjdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgY3VycmVudFByb2plY3QuY2xhc3NMaXN0LmFkZChcImN1cnJlbnQtcHJvamVjdFwiKTtcblxuICAgIGNvbnN0IHByb2plY3RIZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpXG4gICAgcHJvamVjdEhlYWRlci5jbGFzc0xpc3QuYWRkKFwicHJvamVjdC1oZWFkZXJcIik7XG5cbiAgICBjb25zdCBwcm9qZWN0TmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMVwiKTtcbiAgICBwcm9qZWN0TmFtZS5jbGFzc0xpc3QuYWRkKFwicHJvamVjdC1uYW1lXCIpO1xuICAgIHByb2plY3ROYW1lLnRleHRDb250ZW50ID0gcHJvamVjdC5uYW1lO1xuXG4gICAgY29uc3QgcHJvamVjdERlc2NyaXB0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG4gICAgcHJvamVjdERlc2NyaXB0aW9uLmNsYXNzTGlzdC5hZGQoXCJwcm9qZWN0LWRlc2NyaXB0aW9uXCIpO1xuICAgIHByb2plY3REZXNjcmlwdGlvbi50ZXh0Q29udGVudCA9IHByb2plY3QuZGVzY3JpcHRpb247XG5cbiAgICBjb25zdCBkZWxldGVQcm9qZWN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBkZWxldGVQcm9qZWN0LmNsYXNzTGlzdC5hZGQoXCJkZWxldGUtcHJvamVjdFwiKTtcbiAgICBkZWxldGVQcm9qZWN0LnRleHRDb250ZW50ID0gXCJEZWxldGUgUHJvamVjdFwiO1xuXG4gICAgZGVsZXRlUHJvamVjdC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICBpZiAodXNlci51c2VyUHJvamVjdHMubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgdXNlci5kZWxldGVQcm9qZWN0KHByb2plY3QpO1xuICAgICAgICAgICAgcmVuZGVyQ29udGVudCgpO1xuICAgICAgICAgICAgcmVuZGVyUHJvamVjdHMoKTtcbiAgICAgICAgICAgIHByb2plY3RDb250ZW50KHVzZXIudXNlclByb2plY3RzWzBdKTtcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd1c2VyUHJvamVjdHMnLCBKU09OLnN0cmluZ2lmeSh1c2VyLnVzZXJQcm9qZWN0cykpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYWxlcnQoXCJZb3UgY2FuJ3QgZGVsZXRlIHRoZSBsYXN0IHByb2plY3RcIik7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IHByb2plY3RBZGRUYXNrID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBwcm9qZWN0QWRkVGFzay5jbGFzc0xpc3QuYWRkKFwicHJvamVjdC1hZGQtdGFza1wiKTtcbiAgICBwcm9qZWN0QWRkVGFzay50ZXh0Q29udGVudCA9IFwiQWRkIFRhc2tcIjtcblxuICAgIHByb2plY3RBZGRUYXNrLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHBvcHVwQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgcG9wdXBDb250YWluZXIuY2xhc3NOYW1lID0gXCJwb3B1cC1jb250YWluZXJcIjtcblxuICAgICAgICBjb25zdCBwb3B1cCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIHBvcHVwLmNsYXNzTmFtZSA9IFwicG9wdXBcIjtcblxuICAgICAgICBjb25zdCBjbG9zZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuICAgICAgICBjbG9zZUJ1dHRvbi5jbGFzc05hbWUgPSBcImNsb3NlLWJ1dHRvblwiO1xuICAgICAgICBjbG9zZUJ1dHRvbi50ZXh0Q29udGVudCA9IFwieFwiO1xuICAgICAgICBjbG9zZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICAgICAgcG9wdXBDb250YWluZXIucmVtb3ZlKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IG5hbWVMYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsYWJlbFwiKTtcbiAgICAgICAgbmFtZUxhYmVsLnRleHRDb250ZW50ID0gXCJOYW1lOlwiO1xuICAgICAgICBjb25zdCBuYW1lSW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XG5cbiAgICAgICAgY29uc3QgZGVzY3JpcHRpb25MYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsYWJlbFwiKTtcbiAgICAgICAgZGVzY3JpcHRpb25MYWJlbC50ZXh0Q29udGVudCA9IFwiRGVzY3JpcHRpb246XCI7XG4gICAgICAgIGNvbnN0IGRlc2NyaXB0aW9uSW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGV4dGFyZWFcIik7XG5cbiAgICAgICAgY29uc3QgZGF0ZUxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxhYmVsXCIpO1xuICAgICAgICBkYXRlTGFiZWwudGV4dENvbnRlbnQgPSBcIkRhdGU6XCI7XG4gICAgICAgIGNvbnN0IGRhdGVJbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcbiAgICAgICAgZGF0ZUlucHV0LnR5cGUgPSBcImRhdGVcIjtcblxuICAgICAgICBjb25zdCBwcmlvcml0eUxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxhYmVsXCIpO1xuICAgICAgICBwcmlvcml0eUxhYmVsLnRleHRDb250ZW50ID0gXCJQcmlvcml0eTpcIjtcblxuICAgICAgICBjb25zdCBwcmlvcml0aWVzID0gW1wiTG93XCIsIFwiTWVkaXVtXCIsIFwiSGlnaFwiXTtcblxuICAgICAgICBjb25zdCBwcmlvcml0eUlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNlbGVjdFwiKTtcbiAgICAgICAgcHJpb3JpdHlJbnB1dC5uYW1lID0gXCJwcmlvcml0eVwiO1xuICAgICAgICBwcmlvcml0eUlucHV0LmlkID0gXCJwcmlvcml0eVwiO1xuXG4gICAgICAgIHByaW9yaXRpZXMuZm9yRWFjaChwcmlvcml0eSA9PiB7XG4gICAgICAgICAgICBjb25zdCBvcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwib3B0aW9uXCIpO1xuICAgICAgICAgICAgb3B0aW9uLnZhbHVlID0gcHJpb3JpdHkudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgIG9wdGlvbi50ZXh0Q29udGVudCA9IHByaW9yaXR5O1xuICAgICAgICAgICAgcHJpb3JpdHlJbnB1dC5hcHBlbmRDaGlsZChvcHRpb24pO1xuICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCBzYXZlQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICAgICAgc2F2ZUJ1dHRvbi50ZXh0Q29udGVudCA9IFwiU2F2ZSBDaGFuZ2VzXCI7XG4gICAgICAgIHNhdmVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgICAgIGlmIChuYW1lSW5wdXQudmFsdWUgPT09IFwiXCIgfHwgZGVzY3JpcHRpb25JbnB1dC52YWx1ZSA9PT0gXCJcIiB8fCBkYXRlSW5wdXQudmFsdWUgPT09IFwiXCIgfHwgcHJpb3JpdHlJbnB1dC52YWx1ZSA9PT0gXCJcIikge1xuICAgICAgICAgICAgICAgIGFsZXJ0KFwiUGxlYXNlIGZpbGwgYWxsIHRoZSBmaWVsZHNcIik7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgbmV3TmFtZSA9IG5hbWVJbnB1dC52YWx1ZTtcbiAgICAgICAgICAgIGNvbnN0IG5ld0Rlc2NyaXB0aW9uID0gZGVzY3JpcHRpb25JbnB1dC52YWx1ZTtcbiAgICAgICAgICAgIGNvbnN0IG5ld0RhdGUgPSBkYXRlSW5wdXQudmFsdWU7XG4gICAgICAgICAgICBjb25zdCBuZXdQcmlvcml0eSA9IHByaW9yaXR5SW5wdXQudmFsdWU7XG5cblxuICAgICAgICAgICAgY29uc3QgbmV3VGFzayA9IGdlbmVyYXRlVGFzayhuZXdOYW1lLCBuZXdEZXNjcmlwdGlvbiwgbmV3RGF0ZSwgbmV3UHJpb3JpdHkpO1xuICAgICAgICAgICAgcHJvamVjdC5hZGRUYXNrVG9Qcm9qZWN0KG5ld1Rhc2spO1xuXG4gICAgICAgICAgICByZW5kZXJDb250ZW50KCk7XG4gICAgICAgICAgICBwcm9qZWN0Q29udGVudChwcm9qZWN0KTtcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd1c2VyUHJvamVjdHMnLCBKU09OLnN0cmluZ2lmeSh1c2VyLnVzZXJQcm9qZWN0cykpO1xuICAgICAgICAgICAgcG9wdXBDb250YWluZXIucmVtb3ZlKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHBvcHVwLmFwcGVuZENoaWxkKGNsb3NlQnV0dG9uKTtcbiAgICAgICAgcG9wdXAuYXBwZW5kQ2hpbGQobmFtZUxhYmVsKTtcbiAgICAgICAgcG9wdXAuYXBwZW5kQ2hpbGQobmFtZUlucHV0KTtcbiAgICAgICAgcG9wdXAuYXBwZW5kQ2hpbGQoZGVzY3JpcHRpb25MYWJlbCk7XG4gICAgICAgIHBvcHVwLmFwcGVuZENoaWxkKGRlc2NyaXB0aW9uSW5wdXQpO1xuICAgICAgICBwb3B1cC5hcHBlbmRDaGlsZChkYXRlTGFiZWwpO1xuICAgICAgICBwb3B1cC5hcHBlbmRDaGlsZChkYXRlSW5wdXQpO1xuICAgICAgICBwb3B1cC5hcHBlbmRDaGlsZChwcmlvcml0eUxhYmVsKTtcbiAgICAgICAgcG9wdXAuYXBwZW5kQ2hpbGQocHJpb3JpdHlJbnB1dCk7XG4gICAgICAgIHBvcHVwLmFwcGVuZENoaWxkKHNhdmVCdXR0b24pO1xuXG4gICAgICAgIHBvcHVwQ29udGFpbmVyLmFwcGVuZENoaWxkKHBvcHVwKTtcblxuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHBvcHVwQ29udGFpbmVyKTtcbiAgICB9KTtcblxuICAgIHByb2plY3RIZWFkZXIuYXBwZW5kQ2hpbGQocHJvamVjdE5hbWUpO1xuICAgIHByb2plY3RIZWFkZXIuYXBwZW5kQ2hpbGQocHJvamVjdERlc2NyaXB0aW9uKTtcbiAgICBwcm9qZWN0SGVhZGVyLmFwcGVuZENoaWxkKHByb2plY3RBZGRUYXNrKTtcbiAgICBwcm9qZWN0SGVhZGVyLmFwcGVuZENoaWxkKGRlbGV0ZVByb2plY3QpO1xuXG5cblxuICAgIGNvbnN0IHRhc2tzQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICB0YXNrc0NvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwidGFza3MtY29udGFpbmVyXCIpO1xuXG4gICAgcHJvamVjdC5wcm9qZWN0VGFza3MuZm9yRWFjaCh0YXNrID0+IHtcbiAgICAgICAgY29uc3QgdGFza0l0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICBjb25zdCB0YXNrTmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMlwiKTtcbiAgICAgICAgY29uc3QgdGFza0Rlc2NyaXB0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG4gICAgICAgIGNvbnN0IHRhc2tEYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG4gICAgICAgIGNvbnN0IHRhc2tQcmlvcml0eSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIGNvbnN0IHRhc2tTdGF0dXNUb2dnbGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICBjb25zdCBlZGl0QnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImltZ1wiKTtcblxuICAgICAgICB0YXNrTmFtZS50ZXh0Q29udGVudCA9IHRhc2submFtZTtcbiAgICAgICAgdGFza0Rlc2NyaXB0aW9uLnRleHRDb250ZW50ID0gdGFzay5kZXNjcmlwdGlvbjtcbiAgICAgICAgdGFza0RhdGUudGV4dENvbnRlbnQgPSB0YXNrLmRhdGU7XG4gICAgICAgIHRhc2tQcmlvcml0eS50ZXh0Q29udGVudCA9IFwiIVwiO1xuICAgICAgICB0YXNrUHJpb3JpdHkuY2xhc3NMaXN0LmFkZChcInRhc2stcHJpb3JpdHlcIik7XG4gICAgICAgIHRhc2tTdGF0dXNUb2dnbGUuY2xhc3NMaXN0LmFkZChcInRhc2stc3RhdHVzXCIpOztcbiAgICAgICAgZWRpdEJ1dHRvbi5zcmMgPSBcImFzc2V0cy9pbWFnZXMvZWRpdC5wbmdcIjtcbiAgICAgICAgZWRpdEJ1dHRvbi5hbHQgPSBcIkVkaXQgVGFza1wiO1xuXG4gICAgICAgIGlmICh0YXNrLnByaW9yaXR5ID09PSBcImxvd1wiKSB7XG4gICAgICAgICAgICB0YXNrUHJpb3JpdHkuY2xhc3NMaXN0LmFkZChcImxvdy1wcmlvcml0eVwiKTtcbiAgICAgICAgfSBlbHNlIGlmICh0YXNrLnByaW9yaXR5ID09PSBcIm1lZGl1bVwiKSB7XG4gICAgICAgICAgICB0YXNrUHJpb3JpdHkuY2xhc3NMaXN0LmFkZChcIm1lZGl1bS1wcmlvcml0eVwiKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRhc2tQcmlvcml0eS5jbGFzc0xpc3QuYWRkKFwiaGlnaC1wcmlvcml0eVwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGVkaXRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgICAgIG9wZW5FZGl0UG9wdXAodGFzaywgcHJvamVjdCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRhc2tTdGF0dXNUb2dnbGUuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgICAgIHRhc2suc3RhdHVzID0gIXRhc2suc3RhdHVzO1xuICAgICAgICAgICAgcHJvamVjdC5kZWxldGVDb21wbGV0ZWRUYXNrcygpO1xuICAgICAgICAgICAgcmVuZGVyQ29udGVudCgpO1xuICAgICAgICAgICAgcHJvamVjdENvbnRlbnQocHJvamVjdCk7XG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndXNlclByb2plY3RzJywgSlNPTi5zdHJpbmdpZnkodXNlci51c2VyUHJvamVjdHMpKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGFza0l0ZW0uYXBwZW5kQ2hpbGQodGFza05hbWUpO1xuICAgICAgICB0YXNrSXRlbS5hcHBlbmRDaGlsZCh0YXNrRGVzY3JpcHRpb24pO1xuICAgICAgICB0YXNrSXRlbS5hcHBlbmRDaGlsZCh0YXNrRGF0ZSk7XG4gICAgICAgIHRhc2tJdGVtLmFwcGVuZENoaWxkKHRhc2tQcmlvcml0eSk7XG4gICAgICAgIHRhc2tJdGVtLmFwcGVuZENoaWxkKGVkaXRCdXR0b24pO1xuICAgICAgICB0YXNrSXRlbS5hcHBlbmRDaGlsZCh0YXNrU3RhdHVzVG9nZ2xlKTtcbiAgICAgICAgdGFza0l0ZW0uY2xhc3NMaXN0LmFkZChcInRhc2staXRlbVwiKTtcblxuICAgICAgICB0YXNrc0NvbnRhaW5lci5hcHBlbmRDaGlsZCh0YXNrSXRlbSk7XG4gICAgfSk7XG5cblxuICAgIGN1cnJlbnRQcm9qZWN0LmFwcGVuZENoaWxkKHByb2plY3RIZWFkZXIpO1xuICAgIGN1cnJlbnRQcm9qZWN0LmFwcGVuZENoaWxkKHRhc2tzQ29udGFpbmVyKTtcblxuICAgIGNvbnRlbnQuYXBwZW5kQ2hpbGQoY3VycmVudFByb2plY3QpO1xufVxuXG5jb25zdCBjcmVhdGVDb250ZW50ID0gKCkgPT4ge1xuICAgIGNvbnN0IGNvbnRlbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGNvbnRlbnQuY2xhc3NMaXN0LmFkZChcImNvbnRlbnRcIik7XG4gICAgY29udGVudC5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBcImNvbnRlbnRcIik7XG5cbiAgICByZXR1cm4gY29udGVudDtcbn1cblxuY29uc3QgcmVuZGVyQ29udGVudCA9ICgpID0+IHtcbiAgICBjb25zdCBjb250ZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb250ZW50XCIpO1xuICAgIGNvbnRlbnQudGV4dENvbnRlbnQgPSBcIlwiO1xufVxuXG5jb25zdCBjcmVhdGVGb290ZXIgPSAoKSA9PiB7XG4gICAgY29uc3QgZm9vdGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImZvb3RlclwiKTtcbiAgICBmb290ZXIuY2xhc3NMaXN0LmFkZChcImZvb3RlclwiKTtcblxuICAgIGNvbnN0IGNvcHlyaWdodCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuICAgIGNvcHlyaWdodC50ZXh0Q29udGVudCA9IGBDb3B5cmlnaHQgwqkgJHtuZXcgRGF0ZSgpLmdldEZ1bGxZZWFyKCl9IEBnYXJyemFgO1xuXG4gICAgY29uc3QgZ2l0aHViTGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJhXCIpO1xuICAgIGdpdGh1YkxpbmsuaHJlZiA9IFwiaHR0cHM6Ly9naXRodWIuY29tL2dhcnJ6YVwiO1xuXG4gICAgY29uc3QgZ2l0aHViSWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpXCIpO1xuICAgIGdpdGh1Ykljb24uY2xhc3NMaXN0LmFkZChcImZhYlwiKTtcbiAgICBnaXRodWJJY29uLmNsYXNzTGlzdC5hZGQoXCJmYS1naXRodWJcIik7XG4gICAgZ2l0aHViSWNvbi5zZXRBdHRyaWJ1dGUoXCJzdHlsZVwiLCBcImNvbG9yIDogIzUzNjNiN1wiKTtcblxuICAgIGdpdGh1YkxpbmsuYXBwZW5kQ2hpbGQoZ2l0aHViSWNvbik7XG4gICAgZm9vdGVyLmFwcGVuZENoaWxkKGNvcHlyaWdodCk7XG4gICAgZm9vdGVyLmFwcGVuZENoaWxkKGdpdGh1YkxpbmspO1xuXG4gICAgcmV0dXJuIGZvb3Rlcjtcbn1cblxuY29uc3QgcmVuZGVyID0gKCkgPT4ge1xuICAgIHJlbmRlclByb2plY3RzKCk7XG4gICAgcHJvamVjdENvbnRlbnQodXNlci51c2VyUHJvamVjdHNbMF0pO1xufTtcblxuY29uc3QgaW5pdGlhbGl6ZSA9ICgpID0+IHtcbiAgICBjb25zdCBib2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImJvZHlcIik7XG5cbiAgICBib2R5LmFwcGVuZENoaWxkKGNyZWF0ZUhlYWRlcigpKTtcbiAgICBib2R5LmFwcGVuZENoaWxkKGNyZWF0ZVNpZGViYXIoKSk7XG4gICAgYm9keS5hcHBlbmRDaGlsZChjcmVhdGVDb250ZW50KCkpO1xuICAgIGJvZHkuYXBwZW5kQ2hpbGQoY3JlYXRlRm9vdGVyKCkpO1xuXG4gICAgXG4gICAgY29uc3Qgc2F2ZWRQcm9qZWN0cyA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3VzZXJQcm9qZWN0cycpKTtcblxuICAgIGlmIChzYXZlZFByb2plY3RzKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKHNhdmVkUHJvamVjdHMpO1xuICAgICAgICBzYXZlZFByb2plY3RzLmZvckVhY2goc2F2ZWRQcm9qZWN0ID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG5ld1Byb2plY3QgPSBnZW5lcmF0ZVByb2plY3Qoc2F2ZWRQcm9qZWN0Lm5hbWUsIHNhdmVkUHJvamVjdC5kZXNjcmlwdGlvbik7XG4gICAgICAgICAgICBzYXZlZFByb2plY3QucHJvamVjdFRhc2tzLmZvckVhY2goc2F2ZWRUYXNrID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBuZXdUYXNrID0gZ2VuZXJhdGVUYXNrKHNhdmVkVGFzay5uYW1lLCBzYXZlZFRhc2suZGVzY3JpcHRpb24sIHNhdmVkVGFzay5kYXRlLCBzYXZlZFRhc2sucHJpb3JpdHkpO1xuICAgICAgICAgICAgICAgIG5ld1Byb2plY3QuYWRkVGFza1RvUHJvamVjdChuZXdUYXNrKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdXNlci5hZGRQcm9qZWN0KG5ld1Byb2plY3QpO1xuICAgICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgICB1c2VyLmluaXRpYWxpemVEZWZhdWx0UHJvamVjdCgpO1xuICAgIH1cblxuICAgIHJlbmRlcigpO1xufTtcblxuXG5cbmV4cG9ydCBkZWZhdWx0IGluaXRpYWxpemU7IiwiY29uc3QgZ2VuZXJhdGVJRCA9ICgpID0+IHtcbiAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogOTAwMCkgKyAxMDAwO1xufVxuXG5leHBvcnQgZGVmYXVsdCBnZW5lcmF0ZUlEOyIsImltcG9ydCBnZW5lcmF0ZUlEIGZyb20gXCIuL2dlbmVyYXRlSURcIjtcblxuY29uc3QgZ2VuZXJhdGVQcm9qZWN0ID0gKG5hbWUsIGRlc2NyaXB0aW9uKSA9PiB7XG4gICAgY29uc3QgaWQgPSBgUEpUIyR7Z2VuZXJhdGVJRCgpfWA7XG4gICAgY29uc3QgcHJvamVjdFRhc2tzID0gW107XG5cbiAgICBjb25zdCBhZGRUYXNrVG9Qcm9qZWN0ID0gKHRhc2spID0+IHtcbiAgICAgICAgcHJvamVjdFRhc2tzLnB1c2godGFzayk7XG4gICAgfTtcblxuICAgIGNvbnN0IGRlbGV0ZUNvbXBsZXRlZFRhc2tzID0gKCkgPT4ge1xuICAgICAgICBjb25zdCBjb21wbGV0ZWRUYXNrSW5kaWNlcyA9IFtdO1xuICAgICAgICBwcm9qZWN0VGFza3MuZm9yRWFjaCgodGFzaywgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIGlmICh0YXNrLnN0YXR1cyA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIGNvbXBsZXRlZFRhc2tJbmRpY2VzLnB1c2goaW5kZXgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBmb3IgKGxldCBpID0gY29tcGxldGVkVGFza0luZGljZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgICAgIHByb2plY3RUYXNrcy5zcGxpY2UoY29tcGxldGVkVGFza0luZGljZXNbaV0sIDEpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIHJldHVybiB7XG4gICAgICAgIG5hbWUsXG4gICAgICAgIGRlc2NyaXB0aW9uLFxuICAgICAgICBpZCxcbiAgICAgICAgcHJvamVjdFRhc2tzLFxuICAgICAgICBhZGRUYXNrVG9Qcm9qZWN0LFxuICAgICAgICBkZWxldGVDb21wbGV0ZWRUYXNrcyxcbiAgICB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgZ2VuZXJhdGVQcm9qZWN0OyIsImltcG9ydCBnZW5lcmF0ZUlEIGZyb20gXCIuL2dlbmVyYXRlSURcIjtcblxuY29uc3QgZ2VuZXJhdGVUYXNrID0gKG5hbWUsIGRlc2NyaXB0aW9uLCBkYXRlLCBwcmlvcml0eSkgPT4ge1xuICAgIGNvbnN0IGlkID0gYFRTSyMke2dlbmVyYXRlSUQoKX1gO1xuICAgIGxldCBzdGF0dXMgPSBmYWxzZTtcblxuICAgIGNvbnN0IHRvZ2dsZVRhc2tTdGF0dXMgPSAodGFzaykgPT4ge1xuICAgICAgICB0YXNrLnN0YXR1cyA9ICF0YXNrLnN0YXR1cztcbiAgICB9O1xuXG4gICAgY29uc3QgZWRpdFRhc2sgPSAodGFzaywgbmV3TmFtZSwgbmV3RGVzY3JpcHRpb24sIG5ld0RhdGUsIG5ld1ByaW9yaXR5KSA9PiB7XG4gICAgICAgIHRhc2submFtZSA9IG5ld05hbWU7XG4gICAgICAgIHRhc2suZGVzY3JpcHRpb24gPSBuZXdEZXNjcmlwdGlvbjtcbiAgICAgICAgdGFzay5kYXRlID0gbmV3RGF0ZTtcbiAgICAgICAgdGFzay5wcmlvcml0eSA9IG5ld1ByaW9yaXR5O1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAgIG5hbWUsXG4gICAgICAgIGRlc2NyaXB0aW9uLFxuICAgICAgICBkYXRlLFxuICAgICAgICBwcmlvcml0eSxcbiAgICAgICAgaWQsXG4gICAgICAgIHN0YXR1cyxcbiAgICAgICAgdG9nZ2xlVGFza1N0YXR1cyxcbiAgICAgICAgZWRpdFRhc2tcbiAgICB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgZ2VuZXJhdGVUYXNrOyIsImltcG9ydCBnZW5lcmF0ZVByb2plY3QgZnJvbSBcIi4vcHJvamVjdHNcIjtcbmltcG9ydCBnZW5lcmF0ZVRhc2sgZnJvbSBcIi4vdGFza3NcIjtcblxuY29uc3QgdG9kbyA9ICgpID0+IHtcbiAgICBjb25zdCB1c2VyUHJvamVjdHMgPSBbXTtcbiAgICBjb25zdCBkZWZhdWx0UHJvamVjdCA9IGdlbmVyYXRlUHJvamVjdChcIkRlZmF1bHQgcHJvamVjdFwiLCBcIkhlbGxvIHdvcmxkIVwiKTtcbiAgICBjb25zdCBkZWZhdWx0VGFzayA9IGdlbmVyYXRlVGFzayhcIkRlZmF1bHQgdGFza1wiLCBcIkhlbGxvIHdvcmxkIVwiLCBcIjIwMjEtMDEtMDFcIiwgXCJsb3dcIik7XG5cbiAgICBkZWZhdWx0UHJvamVjdC5hZGRUYXNrVG9Qcm9qZWN0KGRlZmF1bHRUYXNrKTtcblxuICAgIGNvbnN0IGFkZFByb2plY3QgPSAocHJvamVjdCkgPT4ge1xuICAgICAgICB1c2VyUHJvamVjdHMucHVzaChwcm9qZWN0KTtcbiAgICB9O1xuXG4gICAgY29uc3QgZGVsZXRlUHJvamVjdCA9IChwcm9qZWN0KSA9PiB7XG4gICAgICAgIGNvbnN0IHByb2plY3RJbmRleCA9IHVzZXJQcm9qZWN0cy5maW5kSW5kZXgocHJvaiA9PiBwcm9qLmlkID09PSBwcm9qZWN0LmlkKTtcbiAgICAgICAgaWYgKHByb2plY3RJbmRleCAhPT0gLTEpIHtcbiAgICAgICAgICAgIHVzZXJQcm9qZWN0cy5zcGxpY2UocHJvamVjdEluZGV4LCAxKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBjb25zdCBpbml0aWFsaXplRGVmYXVsdFByb2plY3QgPSAoKSA9PiB7XG4gICAgICAgIGFkZFByb2plY3QoZGVmYXVsdFByb2plY3QpO1xuICAgIH07XG5cbiAgICBjb25zdCBnZXRQcm9qZWN0ID0gKHByb2plY3RJZCkgPT4ge1xuICAgICAgICByZXR1cm4gdXNlclByb2plY3RzLmZpbmQocHJvamVjdCA9PiBwcm9qZWN0LmlkID09PSBwcm9qZWN0SWQpO1xuICAgIH07XG5cbiAgICBcblxuICAgIHJldHVybiB7XG4gICAgICAgIHVzZXJQcm9qZWN0cyxcbiAgICAgICAgaW5pdGlhbGl6ZURlZmF1bHRQcm9qZWN0LFxuICAgICAgICBhZGRQcm9qZWN0LFxuICAgICAgICBkZWxldGVQcm9qZWN0LFxuICAgICAgICBnZXRQcm9qZWN0XG4gICAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHRvZG87IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgaW5pdGlhbGl6ZSBmcm9tIFwiLi9mdW5jdGlvbnMvVUlcIjtcblxuaW5pdGlhbGl6ZSgpO1xuXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=