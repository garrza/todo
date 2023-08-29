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

            user.addProject((0,_projects__WEBPACK_IMPORTED_MODULE_2__["default"])(newName, newDescription));

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
            

            const newTask = (0,_tasks__WEBPACK_IMPORTED_MODULE_1__["default"])(newName, newDescription, newDate, newPriority);
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

    return {
        initializeDefaultProject,
        addProject,
        deleteProject,
        getUserProjects: () => userProjects
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
/* harmony import */ var _functions_todo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./functions/todo */ "./src/functions/todo.js");
/* harmony import */ var _functions_UI__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./functions/UI */ "./src/functions/UI.js");



(0,_functions_UI__WEBPACK_IMPORTED_MODULE_1__["default"])();
console.log("yes");


})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUEwQjtBQUNTO0FBQ007OztBQUd6QyxhQUFhLGlEQUFJO0FBQ2pCOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsNEJBQTRCLHFEQUFlOztBQUUzQztBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLEtBQUs7O0FBRUw7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7O0FBR1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLDRCQUE0QixrREFBWTtBQUN4Qzs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTs7OztBQUlBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEtBQUs7OztBQUdMO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDJDQUEyQywwQkFBMEI7O0FBRXJFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7QUFHQSxpRUFBZSxVQUFVOzs7Ozs7Ozs7Ozs7OztBQzNaekI7QUFDQTtBQUNBOztBQUVBLGlFQUFlLFVBQVU7Ozs7Ozs7Ozs7Ozs7OztBQ0phOztBQUV0QztBQUNBLHNCQUFzQix1REFBVSxHQUFHO0FBQ25DOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVCxzREFBc0QsUUFBUTtBQUM5RDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsaUVBQWUsZUFBZTs7Ozs7Ozs7Ozs7Ozs7O0FDekNROztBQUV0QztBQUNBLHNCQUFzQix1REFBVSxHQUFHO0FBQ25DOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxpRUFBZSxZQUFZOzs7Ozs7Ozs7Ozs7Ozs7O0FDN0JjO0FBQ047O0FBRW5DO0FBQ0E7QUFDQSwyQkFBMkIscURBQWU7QUFDMUMsd0JBQXdCLGtEQUFZOztBQUVwQzs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxpRUFBZSxJQUFJOzs7Ozs7VUNqQ25CO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7O0FDTm9DO0FBQ0k7O0FBRXhDLHlEQUFVO0FBQ1YiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvLy4vc3JjL2Z1bmN0aW9ucy9VSS5qcyIsIndlYnBhY2s6Ly90b2RvLy4vc3JjL2Z1bmN0aW9ucy9nZW5lcmF0ZUlELmpzIiwid2VicGFjazovL3RvZG8vLi9zcmMvZnVuY3Rpb25zL3Byb2plY3RzLmpzIiwid2VicGFjazovL3RvZG8vLi9zcmMvZnVuY3Rpb25zL3Rhc2tzLmpzIiwid2VicGFjazovL3RvZG8vLi9zcmMvZnVuY3Rpb25zL3RvZG8uanMiLCJ3ZWJwYWNrOi8vdG9kby93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90b2RvL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90b2RvL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG9kby93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvZG8vLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHRvZG8gZnJvbSAnLi90b2RvJztcbmltcG9ydCBnZW5lcmF0ZVRhc2sgZnJvbSBcIi4vdGFza3NcIjtcbmltcG9ydCBnZW5lcmF0ZVByb2plY3QgZnJvbSAnLi9wcm9qZWN0cyc7XG5cblxuY29uc3QgdXNlciA9IHRvZG8oKTtcbnVzZXIuaW5pdGlhbGl6ZURlZmF1bHRQcm9qZWN0KCk7XG5cbmNvbnN0IGNyZWF0ZUhlYWRlciA9ICgpID0+IHtcbiAgICBjb25zdCBoZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaGVhZGVyXCIpO1xuICAgIGhlYWRlci5jbGFzc0xpc3QuYWRkKFwiaGVhZGVyXCIpO1xuXG4gICAgY29uc3QgYXBwTG9nbyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIik7XG4gICAgYXBwTG9nby5zcmMgPSBcImFzc2V0cy9pbWFnZXMvdG9kby5zdmdcIjtcbiAgICBhcHBMb2dvLmFsdCA9IFwidG9kb1wiO1xuICAgIGFwcExvZ28uY2xhc3NMaXN0LmFkZChcImxvZ29cIik7XG5cbiAgICBjb25zdCBhcHBJbnRybyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMlwiKTtcbiAgICBhcHBJbnRyby50ZXh0Q29udGVudCA9IFwiT3JnYW5pemF0aW9uLCBvbmUgY2hlY2sgYXQgYSB0aW1lLlwiO1xuXG4gICAgaGVhZGVyLmFwcGVuZENoaWxkKGFwcExvZ28pO1xuICAgIGhlYWRlci5hcHBlbmRDaGlsZChhcHBJbnRybyk7XG5cbiAgICByZXR1cm4gaGVhZGVyO1xufVxuXG5jb25zdCBjcmVhdGVTaWRlYmFyID0gKCkgPT4ge1xuICAgIGNvbnN0IGFzaWRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImFzaWRlXCIpO1xuICAgIGFzaWRlLmNsYXNzTGlzdC5hZGQoXCJhc2lkZVwiKTtcblxuICAgIGNvbnN0IHRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgyXCIpO1xuICAgIHRpdGxlLmNsYXNzTGlzdC5hZGQoXCJhc2lkZS10aXRsZVwiKVxuICAgIHRpdGxlLnRleHRDb250ZW50ID0gXCJQcm9qZWN0c1wiO1xuXG4gICAgY29uc3QgYWRkUHJvamVjdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgYWRkUHJvamVjdC5jbGFzc0xpc3QuYWRkKFwiYWRkLXByb2plY3RcIik7XG4gICAgYWRkUHJvamVjdC50ZXh0Q29udGVudCA9IFwiQWRkIFByb2plY3RcIjtcblxuICAgIGNvbnN0IHByb2plY3RzQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBwcm9qZWN0c0NvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwicHJvamVjdC1jb250YWluZXJcIik7XG5cbiAgICBjb25zdCBwcm9qZWN0TGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ1bFwiKTtcbiAgICBwcm9qZWN0TGlzdC5jbGFzc0xpc3QuYWRkKFwicHJvamVjdC1saXN0XCIpO1xuXG4gICAgYWRkUHJvamVjdC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICBjb25zdCBwb3B1cENvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIHBvcHVwQ29udGFpbmVyLmNsYXNzTmFtZSA9IFwicG9wdXAtY29udGFpbmVyXCI7XG5cbiAgICAgICAgY29uc3QgcG9wdXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICBwb3B1cC5jbGFzc05hbWUgPSBcInBvcHVwXCI7XG5cbiAgICAgICAgY29uc3QgY2xvc2VCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcbiAgICAgICAgY2xvc2VCdXR0b24uY2xhc3NOYW1lID0gXCJjbG9zZS1idXR0b25cIjtcbiAgICAgICAgY2xvc2VCdXR0b24udGV4dENvbnRlbnQgPSBcInhcIjtcbiAgICAgICAgY2xvc2VCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgICAgIHBvcHVwQ29udGFpbmVyLnJlbW92ZSgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCBuYW1lTGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGFiZWxcIik7XG4gICAgICAgIG5hbWVMYWJlbC50ZXh0Q29udGVudCA9IFwiTmFtZTpcIjtcbiAgICAgICAgY29uc3QgbmFtZUlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xuXG4gICAgICAgIGNvbnN0IGRlc2NyaXB0aW9uTGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGFiZWxcIik7XG4gICAgICAgIGRlc2NyaXB0aW9uTGFiZWwudGV4dENvbnRlbnQgPSBcIkRlc2NyaXB0aW9uOlwiO1xuICAgICAgICBjb25zdCBkZXNjcmlwdGlvbklucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xuXG4gICAgICAgIGNvbnN0IHNhdmVCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgICAgICBzYXZlQnV0dG9uLnRleHRDb250ZW50ID0gXCJTYXZlIENoYW5nZXNcIjtcbiAgICAgICAgc2F2ZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICAgICAgaWYgKG5hbWVJbnB1dC52YWx1ZSA9PT0gXCJcIiB8fCBkZXNjcmlwdGlvbklucHV0LnZhbHVlID09PSBcIlwiKSB7XG4gICAgICAgICAgICAgICAgYWxlcnQoXCJQbGVhc2UgZmlsbCBhbGwgdGhlIGZpZWxkc1wiKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBuZXdOYW1lID0gbmFtZUlucHV0LnZhbHVlO1xuICAgICAgICAgICAgY29uc3QgbmV3RGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbklucHV0LnZhbHVlO1xuXG4gICAgICAgICAgICB1c2VyLmFkZFByb2plY3QoZ2VuZXJhdGVQcm9qZWN0KG5ld05hbWUsIG5ld0Rlc2NyaXB0aW9uKSk7XG5cbiAgICAgICAgICAgIHJlbmRlckNvbnRlbnQoKTtcbiAgICAgICAgICAgIHJlbmRlclByb2plY3RzKCk7XG4gICAgICAgICAgICBwb3B1cENvbnRhaW5lci5yZW1vdmUoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcG9wdXAuYXBwZW5kQ2hpbGQoY2xvc2VCdXR0b24pO1xuICAgICAgICBwb3B1cC5hcHBlbmRDaGlsZChuYW1lTGFiZWwpO1xuICAgICAgICBwb3B1cC5hcHBlbmRDaGlsZChuYW1lSW5wdXQpO1xuICAgICAgICBwb3B1cC5hcHBlbmRDaGlsZChkZXNjcmlwdGlvbkxhYmVsKTtcbiAgICAgICAgcG9wdXAuYXBwZW5kQ2hpbGQoZGVzY3JpcHRpb25JbnB1dCk7XG4gICAgICAgIHBvcHVwLmFwcGVuZENoaWxkKHNhdmVCdXR0b24pO1xuXG4gICAgICAgIHBvcHVwQ29udGFpbmVyLmFwcGVuZENoaWxkKHBvcHVwKTtcblxuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHBvcHVwQ29udGFpbmVyKTtcbiAgICB9KTtcblxuICAgIHByb2plY3RzQ29udGFpbmVyLmFwcGVuZENoaWxkKHByb2plY3RMaXN0KTtcblxuICAgIGFzaWRlLmFwcGVuZENoaWxkKHRpdGxlKTtcbiAgICBhc2lkZS5hcHBlbmRDaGlsZChhZGRQcm9qZWN0KTtcbiAgICBhc2lkZS5hcHBlbmRDaGlsZChwcm9qZWN0c0NvbnRhaW5lcik7XG4gICAgcmV0dXJuIGFzaWRlO1xufVxuXG5jb25zdCByZW5kZXJQcm9qZWN0cyA9ICgpID0+IHtcbiAgICBjb25zdCBwcm9qZWN0TGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJvamVjdC1saXN0XCIpO1xuICAgIHByb2plY3RMaXN0LnRleHRDb250ZW50ID0gXCJcIjtcbiAgICBcbiAgICB1c2VyLmdldFVzZXJQcm9qZWN0cygpLmZvckVhY2gocHJvamVjdCA9PiB7XG4gICAgICAgIGNvbnN0IHByb2plY3RJdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpO1xuICAgICAgICBwcm9qZWN0SXRlbS50ZXh0Q29udGVudCA9IHByb2plY3QubmFtZTtcbiAgICAgICAgcHJvamVjdExpc3QuYXBwZW5kQ2hpbGQocHJvamVjdEl0ZW0pO1xuXG4gICAgICAgIHByb2plY3RJdGVtLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhwcm9qZWN0LmdldFByb2plY3RUYXNrcygpKTtcbiAgICAgICAgICAgIHJlbmRlckNvbnRlbnQoKTtcbiAgICAgICAgICAgIHByb2plY3RDb250ZW50KHByb2plY3QpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn1cblxuY29uc3Qgb3BlbkVkaXRQb3B1cCA9ICh0YXNrLCBwcm9qZWN0KSA9PiB7XG4gICAgY29uc3QgcG9wdXBDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIHBvcHVwQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJwb3B1cC1jb250YWluZXJcIik7XG5cbiAgICBjb25zdCBwb3B1cCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgcG9wdXAuY2xhc3NOYW1lID0gXCJwb3B1cFwiO1xuXG4gICAgY29uc3QgY2xvc2VCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcbiAgICBjbG9zZUJ1dHRvbi5jbGFzc05hbWUgPSBcImNsb3NlLWJ1dHRvblwiO1xuICAgIGNsb3NlQnV0dG9uLnRleHRDb250ZW50ID0gXCJ4XCI7XG4gICAgY2xvc2VCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgcG9wdXBDb250YWluZXIucmVtb3ZlKCk7XG4gICAgfSk7XG5cbiAgICBjb25zdCBuYW1lTGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGFiZWxcIik7XG4gICAgbmFtZUxhYmVsLnRleHRDb250ZW50ID0gXCJOYW1lOlwiO1xuICAgIGNvbnN0IG5hbWVJbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcbiAgICBuYW1lSW5wdXQudmFsdWUgPSB0YXNrLm5hbWU7XG5cbiAgICBjb25zdCBkZXNjcmlwdGlvbkxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxhYmVsXCIpO1xuICAgIGRlc2NyaXB0aW9uTGFiZWwudGV4dENvbnRlbnQgPSBcIkRlc2NyaXB0aW9uOlwiO1xuICAgIGNvbnN0IGRlc2NyaXB0aW9uSW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGV4dGFyZWFcIik7XG4gICAgZGVzY3JpcHRpb25JbnB1dC52YWx1ZSA9IHRhc2suZGVzY3JpcHRpb247XG5cbiAgICBjb25zdCBkYXRlTGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGFiZWxcIik7XG4gICAgZGF0ZUxhYmVsLnRleHRDb250ZW50ID0gXCJEYXRlOlwiO1xuICAgIGNvbnN0IGRhdGVJbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcbiAgICBkYXRlSW5wdXQudHlwZSA9IFwiZGF0ZVwiO1xuICAgIGRhdGVJbnB1dC52YWx1ZSA9IHRhc2suZGF0ZTtcblxuICAgIGNvbnN0IHByaW9yaXR5TGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGFiZWxcIik7XG4gICAgcHJpb3JpdHlMYWJlbC50ZXh0Q29udGVudCA9IFwiUHJpb3JpdHk6XCI7XG4gICAgY29uc3QgcHJpb3JpdHlJbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcbiAgICBwcmlvcml0eUlucHV0LnZhbHVlID0gdGFzay5wcmlvcml0eTtcblxuICAgIGNvbnN0IHNhdmVCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgIHNhdmVCdXR0b24udGV4dENvbnRlbnQgPSBcIlNhdmUgQ2hhbmdlc1wiO1xuICAgIHNhdmVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgaWYgKG5hbWVJbnB1dC52YWx1ZSA9PT0gXCJcIiB8fCBkZXNjcmlwdGlvbklucHV0LnZhbHVlID09PSBcIlwiIHx8IGRhdGVJbnB1dC52YWx1ZSA9PT0gXCJcIiB8fCBwcmlvcml0eUlucHV0LnZhbHVlID09PSBcIlwiKSB7XG4gICAgICAgICAgICBhbGVydChcIlBsZWFzZSBmaWxsIGFsbCB0aGUgZmllbGRzXCIpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IG5ld05hbWUgPSBuYW1lSW5wdXQudmFsdWU7XG4gICAgICAgIGNvbnN0IG5ld0Rlc2NyaXB0aW9uID0gZGVzY3JpcHRpb25JbnB1dC52YWx1ZTtcbiAgICAgICAgY29uc3QgbmV3RGF0ZSA9IGRhdGVJbnB1dC52YWx1ZTtcbiAgICAgICAgY29uc3QgbmV3UHJpb3JpdHkgPSBwcmlvcml0eUlucHV0LnZhbHVlO1xuXG4gICAgICAgIHRhc2suZWRpdFRhc2sodGFzaywgbmV3TmFtZSwgbmV3RGVzY3JpcHRpb24sIG5ld0RhdGUsIG5ld1ByaW9yaXR5KTtcblxuICAgICAgICByZW5kZXJDb250ZW50KCk7XG4gICAgICAgIHByb2plY3RDb250ZW50KHByb2plY3QpO1xuICAgICAgICBwb3B1cENvbnRhaW5lci5yZW1vdmUoKTtcbiAgICB9KTtcblxuICAgIHBvcHVwLmFwcGVuZENoaWxkKGNsb3NlQnV0dG9uKTtcbiAgICBwb3B1cC5hcHBlbmRDaGlsZChuYW1lTGFiZWwpO1xuICAgIHBvcHVwLmFwcGVuZENoaWxkKG5hbWVJbnB1dCk7XG4gICAgcG9wdXAuYXBwZW5kQ2hpbGQoZGVzY3JpcHRpb25MYWJlbCk7XG4gICAgcG9wdXAuYXBwZW5kQ2hpbGQoZGVzY3JpcHRpb25JbnB1dCk7XG4gICAgcG9wdXAuYXBwZW5kQ2hpbGQoZGF0ZUxhYmVsKTtcbiAgICBwb3B1cC5hcHBlbmRDaGlsZChkYXRlSW5wdXQpO1xuICAgIHBvcHVwLmFwcGVuZENoaWxkKHByaW9yaXR5TGFiZWwpO1xuICAgIHBvcHVwLmFwcGVuZENoaWxkKHByaW9yaXR5SW5wdXQpO1xuICAgIHBvcHVwLmFwcGVuZENoaWxkKHNhdmVCdXR0b24pO1xuXG4gICAgcG9wdXBDb250YWluZXIuYXBwZW5kQ2hpbGQocG9wdXApO1xuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQocG9wdXBDb250YWluZXIpO1xufTtcblxuY29uc3QgcHJvamVjdENvbnRlbnQgPSAocHJvamVjdCkgPT4ge1xuICAgIGNvbnN0IGN1cnJlbnRQcm9qZWN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBjdXJyZW50UHJvamVjdC5jbGFzc0xpc3QuYWRkKFwiY3VycmVudC1wcm9qZWN0XCIpO1xuXG4gICAgY29uc3QgcHJvamVjdEhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIilcbiAgICBwcm9qZWN0SGVhZGVyLmNsYXNzTGlzdC5hZGQoXCJwcm9qZWN0LWhlYWRlclwiKTtcblxuICAgIGNvbnN0IHByb2plY3ROYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgxXCIpO1xuICAgIHByb2plY3ROYW1lLmNsYXNzTGlzdC5hZGQoXCJwcm9qZWN0LW5hbWVcIik7XG4gICAgcHJvamVjdE5hbWUudGV4dENvbnRlbnQgPSBwcm9qZWN0Lm5hbWU7XG5cbiAgICBjb25zdCBwcm9qZWN0RGVzY3JpcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcbiAgICBwcm9qZWN0RGVzY3JpcHRpb24uY2xhc3NMaXN0LmFkZChcInByb2plY3QtZGVzY3JpcHRpb25cIik7XG4gICAgcHJvamVjdERlc2NyaXB0aW9uLnRleHRDb250ZW50ID0gcHJvamVjdC5kZXNjcmlwdGlvbjtcblxuICAgIGNvbnN0IGRlbGV0ZVByb2plY3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGRlbGV0ZVByb2plY3QuY2xhc3NMaXN0LmFkZChcImRlbGV0ZS1wcm9qZWN0XCIpO1xuICAgIGRlbGV0ZVByb2plY3QudGV4dENvbnRlbnQgPSBcIkRlbGV0ZSBQcm9qZWN0XCI7XG5cbiAgICBkZWxldGVQcm9qZWN0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgIGlmKHVzZXIuZ2V0VXNlclByb2plY3RzKCkubGVuZ3RoID4gMSkge1xuICAgICAgICB1c2VyLmRlbGV0ZVByb2plY3QocHJvamVjdCk7XG4gICAgICAgIHJlbmRlckNvbnRlbnQoKTtcbiAgICAgICAgcmVuZGVyUHJvamVjdHMoKTtcbiAgICAgICAgcHJvamVjdENvbnRlbnQodXNlci5nZXRVc2VyUHJvamVjdHMoKVswXSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBhbGVydChcIllvdSBjYW4ndCBkZWxldGUgdGhlIGxhc3QgcHJvamVjdFwiKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3QgcHJvamVjdEFkZFRhc2sgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIHByb2plY3RBZGRUYXNrLmNsYXNzTGlzdC5hZGQoXCJwcm9qZWN0LWFkZC10YXNrXCIpO1xuICAgIHByb2plY3RBZGRUYXNrLnRleHRDb250ZW50ID0gXCJBZGQgVGFza1wiO1xuXG4gICAgcHJvamVjdEFkZFRhc2suYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgY29uc3QgcG9wdXBDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICBwb3B1cENvbnRhaW5lci5jbGFzc05hbWUgPSBcInBvcHVwLWNvbnRhaW5lclwiO1xuXG4gICAgICAgIGNvbnN0IHBvcHVwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgcG9wdXAuY2xhc3NOYW1lID0gXCJwb3B1cFwiO1xuXG4gICAgICAgIGNvbnN0IGNsb3NlQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG4gICAgICAgIGNsb3NlQnV0dG9uLmNsYXNzTmFtZSA9IFwiY2xvc2UtYnV0dG9uXCI7XG4gICAgICAgIGNsb3NlQnV0dG9uLnRleHRDb250ZW50ID0gXCJ4XCI7XG4gICAgICAgIGNsb3NlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgICAgICBwb3B1cENvbnRhaW5lci5yZW1vdmUoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3QgbmFtZUxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxhYmVsXCIpO1xuICAgICAgICBuYW1lTGFiZWwudGV4dENvbnRlbnQgPSBcIk5hbWU6XCI7XG4gICAgICAgIGNvbnN0IG5hbWVJbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcblxuICAgICAgICBjb25zdCBkZXNjcmlwdGlvbkxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxhYmVsXCIpO1xuICAgICAgICBkZXNjcmlwdGlvbkxhYmVsLnRleHRDb250ZW50ID0gXCJEZXNjcmlwdGlvbjpcIjtcbiAgICAgICAgY29uc3QgZGVzY3JpcHRpb25JbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0ZXh0YXJlYVwiKTtcblxuICAgICAgICBjb25zdCBkYXRlTGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGFiZWxcIik7XG4gICAgICAgIGRhdGVMYWJlbC50ZXh0Q29udGVudCA9IFwiRGF0ZTpcIjtcbiAgICAgICAgY29uc3QgZGF0ZUlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xuICAgICAgICBkYXRlSW5wdXQudHlwZSA9IFwiZGF0ZVwiO1xuXG4gICAgICAgIGNvbnN0IHByaW9yaXR5TGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGFiZWxcIik7XG4gICAgICAgIHByaW9yaXR5TGFiZWwudGV4dENvbnRlbnQgPSBcIlByaW9yaXR5OlwiO1xuXG4gICAgICAgIGNvbnN0IHByaW9yaXR5SW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZm9ybVwiKTtcbiAgICAgICAgY29uc3QgcHJpb3JpdGllcyA9IFtcIkxvd1wiLCBcIk1lZGl1bVwiLCBcIkhpZ2hcIl07XG5cbiAgICAgICAgcHJpb3JpdGllcy5mb3JFYWNoKHByaW9yaXR5ID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHJhZGlvSW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XG4gICAgICAgICAgICByYWRpb0lucHV0LnR5cGUgPSBcInJhZGlvXCI7XG4gICAgICAgICAgICByYWRpb0lucHV0Lm5hbWUgPSBcInByaW9yaXR5XCI7XG4gICAgICAgICAgICByYWRpb0lucHV0LnZhbHVlID0gcHJpb3JpdHkudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgIHByaW9yaXR5SW5wdXQuYXBwZW5kQ2hpbGQocmFkaW9JbnB1dCk7XG5cbiAgICAgICAgICAgIGNvbnN0IHJhZGlvTGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGFiZWxcIik7XG4gICAgICAgICAgICByYWRpb0xhYmVsLnRleHRDb250ZW50ID0gcHJpb3JpdHk7XG4gICAgICAgICAgICBwcmlvcml0eUlucHV0LmFwcGVuZENoaWxkKHJhZGlvTGFiZWwpO1xuICAgICAgICB9KTtcblxuXG4gICAgICAgIGNvbnN0IHNhdmVCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgICAgICBzYXZlQnV0dG9uLnRleHRDb250ZW50ID0gXCJTYXZlIENoYW5nZXNcIjtcbiAgICAgICAgc2F2ZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICAgICAgaWYgKG5hbWVJbnB1dC52YWx1ZSA9PT0gXCJcIiB8fCBkZXNjcmlwdGlvbklucHV0LnZhbHVlID09PSBcIlwiIHx8IGRhdGVJbnB1dC52YWx1ZSA9PT0gXCJcIiB8fCBwcmlvcml0eUlucHV0LnZhbHVlID09PSBcIlwiKSB7XG4gICAgICAgICAgICAgICAgYWxlcnQoXCJQbGVhc2UgZmlsbCBhbGwgdGhlIGZpZWxkc1wiKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBuZXdOYW1lID0gbmFtZUlucHV0LnZhbHVlO1xuICAgICAgICAgICAgY29uc3QgbmV3RGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbklucHV0LnZhbHVlO1xuICAgICAgICAgICAgY29uc3QgbmV3RGF0ZSA9IGRhdGVJbnB1dC52YWx1ZTtcbiAgICAgICAgICAgIGNvbnN0IG5ld1ByaW9yaXR5ID0gcHJpb3JpdHlJbnB1dC52YWx1ZTtcbiAgICAgICAgICAgIFxuXG4gICAgICAgICAgICBjb25zdCBuZXdUYXNrID0gZ2VuZXJhdGVUYXNrKG5ld05hbWUsIG5ld0Rlc2NyaXB0aW9uLCBuZXdEYXRlLCBuZXdQcmlvcml0eSk7XG4gICAgICAgICAgICBwcm9qZWN0LmFkZFRhc2tUb1Byb2plY3QobmV3VGFzayk7XG5cbiAgICAgICAgICAgIHJlbmRlckNvbnRlbnQoKTtcbiAgICAgICAgICAgIHByb2plY3RDb250ZW50KHByb2plY3QpO1xuICAgICAgICAgICAgcG9wdXBDb250YWluZXIucmVtb3ZlKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHBvcHVwLmFwcGVuZENoaWxkKGNsb3NlQnV0dG9uKTtcbiAgICAgICAgcG9wdXAuYXBwZW5kQ2hpbGQobmFtZUxhYmVsKTtcbiAgICAgICAgcG9wdXAuYXBwZW5kQ2hpbGQobmFtZUlucHV0KTtcbiAgICAgICAgcG9wdXAuYXBwZW5kQ2hpbGQoZGVzY3JpcHRpb25MYWJlbCk7XG4gICAgICAgIHBvcHVwLmFwcGVuZENoaWxkKGRlc2NyaXB0aW9uSW5wdXQpO1xuICAgICAgICBwb3B1cC5hcHBlbmRDaGlsZChkYXRlTGFiZWwpO1xuICAgICAgICBwb3B1cC5hcHBlbmRDaGlsZChkYXRlSW5wdXQpO1xuICAgICAgICBwb3B1cC5hcHBlbmRDaGlsZChwcmlvcml0eUxhYmVsKTtcbiAgICAgICAgcG9wdXAuYXBwZW5kQ2hpbGQocHJpb3JpdHlJbnB1dCk7XG4gICAgICAgIHBvcHVwLmFwcGVuZENoaWxkKHNhdmVCdXR0b24pO1xuXG4gICAgICAgIHBvcHVwQ29udGFpbmVyLmFwcGVuZENoaWxkKHBvcHVwKTtcblxuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHBvcHVwQ29udGFpbmVyKTtcbiAgICB9KTtcblxuICAgIHByb2plY3RIZWFkZXIuYXBwZW5kQ2hpbGQocHJvamVjdE5hbWUpO1xuICAgIHByb2plY3RIZWFkZXIuYXBwZW5kQ2hpbGQocHJvamVjdERlc2NyaXB0aW9uKTtcbiAgICBwcm9qZWN0SGVhZGVyLmFwcGVuZENoaWxkKHByb2plY3RBZGRUYXNrKTtcbiAgICBwcm9qZWN0SGVhZGVyLmFwcGVuZENoaWxkKGRlbGV0ZVByb2plY3QpO1xuXG5cblxuICAgIGNvbnN0IHRhc2tzQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICB0YXNrc0NvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwidGFza3MtY29udGFpbmVyXCIpO1xuXG4gICAgcHJvamVjdC5nZXRQcm9qZWN0VGFza3MoKS5mb3JFYWNoKHRhc2sgPT4ge1xuICAgICAgICBjb25zdCB0YXNrSXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIGNvbnN0IHRhc2tOYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgyXCIpO1xuICAgICAgICBjb25zdCB0YXNrRGVzY3JpcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcbiAgICAgICAgY29uc3QgdGFza0RhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcbiAgICAgICAgY29uc3QgdGFza1N0YXR1c1RvZ2dsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIGNvbnN0IGVkaXRCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW1nXCIpO1xuXG4gICAgICAgIHRhc2tOYW1lLnRleHRDb250ZW50ID0gdGFzay5uYW1lO1xuICAgICAgICB0YXNrRGVzY3JpcHRpb24udGV4dENvbnRlbnQgPSB0YXNrLmRlc2NyaXB0aW9uO1xuICAgICAgICB0YXNrRGF0ZS50ZXh0Q29udGVudCA9IHRhc2suZGF0ZTtcbiAgICAgICAgdGFza1N0YXR1c1RvZ2dsZS5jbGFzc0xpc3QuYWRkKFwidGFzay1zdGF0dXNcIik7O1xuICAgICAgICBlZGl0QnV0dG9uLnNyYyA9IFwiYXNzZXRzL2ltYWdlcy9lZGl0LnBuZ1wiO1xuICAgICAgICBlZGl0QnV0dG9uLmFsdCA9IFwiRWRpdCBUYXNrXCI7XG5cbiAgICAgICAgZWRpdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICAgICAgb3BlbkVkaXRQb3B1cCh0YXNrLCBwcm9qZWN0KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGFza1N0YXR1c1RvZ2dsZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICAgICAgdGFzay5zdGF0dXMgPSAhdGFzay5zdGF0dXM7XG4gICAgICAgICAgICBwcm9qZWN0LmRlbGV0ZUNvbXBsZXRlZFRhc2tzKCk7XG4gICAgICAgICAgICByZW5kZXJDb250ZW50KCk7XG4gICAgICAgICAgICBwcm9qZWN0Q29udGVudChwcm9qZWN0KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGFza0l0ZW0uYXBwZW5kQ2hpbGQodGFza05hbWUpO1xuICAgICAgICB0YXNrSXRlbS5hcHBlbmRDaGlsZCh0YXNrRGVzY3JpcHRpb24pO1xuICAgICAgICB0YXNrSXRlbS5hcHBlbmRDaGlsZCh0YXNrRGF0ZSk7XG4gICAgICAgIHRhc2tJdGVtLmFwcGVuZENoaWxkKGVkaXRCdXR0b24pO1xuICAgICAgICB0YXNrSXRlbS5hcHBlbmRDaGlsZCh0YXNrU3RhdHVzVG9nZ2xlKTtcbiAgICAgICAgdGFza0l0ZW0uY2xhc3NMaXN0LmFkZChcInRhc2staXRlbVwiKTtcblxuICAgICAgICB0YXNrc0NvbnRhaW5lci5hcHBlbmRDaGlsZCh0YXNrSXRlbSk7XG4gICAgfSk7XG5cblxuICAgIGN1cnJlbnRQcm9qZWN0LmFwcGVuZENoaWxkKHByb2plY3RIZWFkZXIpO1xuICAgIGN1cnJlbnRQcm9qZWN0LmFwcGVuZENoaWxkKHRhc2tzQ29udGFpbmVyKTtcblxuICAgIGNvbnRlbnQuYXBwZW5kQ2hpbGQoY3VycmVudFByb2plY3QpO1xufVxuXG5jb25zdCBjcmVhdGVDb250ZW50ID0gKCkgPT4ge1xuICAgIGNvbnN0IGNvbnRlbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGNvbnRlbnQuY2xhc3NMaXN0LmFkZChcImNvbnRlbnRcIik7XG4gICAgY29udGVudC5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBcImNvbnRlbnRcIik7XG5cbiAgICByZXR1cm4gY29udGVudDtcbn1cblxuY29uc3QgcmVuZGVyQ29udGVudCA9ICgpID0+IHtcbiAgICBjb25zdCBjb250ZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb250ZW50XCIpO1xuICAgIGNvbnRlbnQudGV4dENvbnRlbnQgPSBcIlwiO1xufVxuXG5jb25zdCBjcmVhdGVGb290ZXIgPSAoKSA9PiB7XG4gICAgY29uc3QgZm9vdGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImZvb3RlclwiKTtcbiAgICBmb290ZXIuY2xhc3NMaXN0LmFkZChcImZvb3RlclwiKTtcblxuICAgIGNvbnN0IGNvcHlyaWdodCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuICAgIGNvcHlyaWdodC50ZXh0Q29udGVudCA9IGBDb3B5cmlnaHQgwqkgJHtuZXcgRGF0ZSgpLmdldEZ1bGxZZWFyKCl9IEBnYXJyemFgO1xuXG4gICAgY29uc3QgZ2l0aHViTGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJhXCIpO1xuICAgIGdpdGh1YkxpbmsuaHJlZiA9IFwiaHR0cHM6Ly9naXRodWIuY29tL2dhcnJ6YVwiO1xuXG4gICAgY29uc3QgZ2l0aHViSWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpXCIpO1xuICAgIGdpdGh1Ykljb24uY2xhc3NMaXN0LmFkZChcImZhYlwiKTtcbiAgICBnaXRodWJJY29uLmNsYXNzTGlzdC5hZGQoXCJmYS1naXRodWJcIik7XG4gICAgZ2l0aHViSWNvbi5zZXRBdHRyaWJ1dGUoXCJzdHlsZVwiLCBcImNvbG9yIDogIzUzNjNiN1wiKTtcblxuICAgIGdpdGh1YkxpbmsuYXBwZW5kQ2hpbGQoZ2l0aHViSWNvbik7XG4gICAgZm9vdGVyLmFwcGVuZENoaWxkKGNvcHlyaWdodCk7XG4gICAgZm9vdGVyLmFwcGVuZENoaWxkKGdpdGh1YkxpbmspO1xuXG4gICAgcmV0dXJuIGZvb3Rlcjtcbn1cblxuY29uc3QgcmVuZGVyID0gKCkgPT4ge1xuICAgIHJlbmRlclByb2plY3RzKCk7XG4gICAgcHJvamVjdENvbnRlbnQodXNlci5nZXRVc2VyUHJvamVjdHMoKVswXSk7XG59XG5cbmNvbnN0IGluaXRpYWxpemUgPSAoKSA9PiB7XG4gICAgY29uc3QgYm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJib2R5XCIpO1xuXG4gICAgYm9keS5hcHBlbmRDaGlsZChjcmVhdGVIZWFkZXIoKSk7XG4gICAgYm9keS5hcHBlbmRDaGlsZChjcmVhdGVTaWRlYmFyKCkpO1xuICAgIGJvZHkuYXBwZW5kQ2hpbGQoY3JlYXRlQ29udGVudCgpKTtcbiAgICBib2R5LmFwcGVuZENoaWxkKGNyZWF0ZUZvb3RlcigpKTtcblxuICAgIHJlbmRlcigpO1xufVxuXG5cbmV4cG9ydCBkZWZhdWx0IGluaXRpYWxpemU7IiwiY29uc3QgZ2VuZXJhdGVJRCA9ICgpID0+IHtcbiAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogOTAwMCkgKyAxMDAwO1xufVxuXG5leHBvcnQgZGVmYXVsdCBnZW5lcmF0ZUlEOyIsImltcG9ydCBnZW5lcmF0ZUlEIGZyb20gXCIuL2dlbmVyYXRlSURcIjtcblxuY29uc3QgZ2VuZXJhdGVQcm9qZWN0ID0gKG5hbWUsIGRlc2NyaXB0aW9uKSA9PiB7XG4gICAgY29uc3QgaWQgPSBgUEpUIyR7Z2VuZXJhdGVJRCgpfWA7XG4gICAgY29uc3QgcHJvamVjdFRhc2tzID0gW107XG5cbiAgICBjb25zdCBhZGRUYXNrVG9Qcm9qZWN0ID0gKHRhc2spID0+IHtcbiAgICAgICAgcHJvamVjdFRhc2tzLnB1c2godGFzayk7XG4gICAgfTtcblxuICAgIGNvbnN0IGRlbGV0ZVRhc2tGcm9tUHJvamVjdCA9ICh0YXNrSWQpID0+IHtcbiAgICAgICAgY29uc3QgdGFza0luZGV4ID0gcHJvamVjdFRhc2tzLmZpbmRJbmRleCh0YXNrID0+IHRhc2suSUQgPT09IHRhc2tJZCk7XG4gICAgICAgIGlmICh0YXNrSW5kZXggIT09IC0xKSB7XG4gICAgICAgICAgICBwcm9qZWN0VGFza3Muc3BsaWNlKHRhc2tJbmRleCwgMSk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgY29uc3QgZGVsZXRlQ29tcGxldGVkVGFza3MgPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGNvbXBsZXRlZFRhc2tJbmRpY2VzID0gW107XG4gICAgICAgIHByb2plY3RUYXNrcy5mb3JFYWNoKCh0YXNrLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgaWYgKHRhc2suc3RhdHVzID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgY29tcGxldGVkVGFza0luZGljZXMucHVzaChpbmRleCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSBjb21wbGV0ZWRUYXNrSW5kaWNlcy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICAgICAgcHJvamVjdFRhc2tzLnNwbGljZShjb21wbGV0ZWRUYXNrSW5kaWNlc1tpXSwgMSk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgbmFtZSxcbiAgICAgICAgZGVzY3JpcHRpb24sXG4gICAgICAgIGlkLFxuICAgICAgICBhZGRUYXNrVG9Qcm9qZWN0LFxuICAgICAgICBkZWxldGVUYXNrRnJvbVByb2plY3QsXG4gICAgICAgIGRlbGV0ZUNvbXBsZXRlZFRhc2tzLFxuICAgICAgICBnZXRQcm9qZWN0VGFza3M6ICgpID0+IHByb2plY3RUYXNrc1xuICAgIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBnZW5lcmF0ZVByb2plY3Q7IiwiaW1wb3J0IGdlbmVyYXRlSUQgZnJvbSBcIi4vZ2VuZXJhdGVJRFwiO1xuXG5jb25zdCBnZW5lcmF0ZVRhc2sgPSAobmFtZSwgZGVzY3JpcHRpb24sIGRhdGUsIHByaW9yaXR5KSA9PiB7XG4gICAgY29uc3QgaWQgPSBgVFNLIyR7Z2VuZXJhdGVJRCgpfWA7XG4gICAgbGV0IHN0YXR1cyA9IGZhbHNlO1xuXG4gICAgY29uc3QgdG9nZ2xlVGFza1N0YXR1cyA9ICh0YXNrKSA9PiB7XG4gICAgICAgIHRhc2suc3RhdHVzID0gIXRhc2suc3RhdHVzO1xuICAgIH07XG5cbiAgICBjb25zdCBlZGl0VGFzayA9ICh0YXNrLCBuZXdOYW1lLCBuZXdEZXNjcmlwdGlvbiwgbmV3RGF0ZSwgbmV3UHJpb3JpdHkpID0+IHtcbiAgICAgICAgdGFzay5uYW1lID0gbmV3TmFtZTtcbiAgICAgICAgdGFzay5kZXNjcmlwdGlvbiA9IG5ld0Rlc2NyaXB0aW9uO1xuICAgICAgICB0YXNrLmRhdGUgPSBuZXdEYXRlO1xuICAgICAgICB0YXNrLnByaW9yaXR5ID0gbmV3UHJpb3JpdHk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgbmFtZSxcbiAgICAgICAgZGVzY3JpcHRpb24sXG4gICAgICAgIGRhdGUsXG4gICAgICAgIHByaW9yaXR5LFxuICAgICAgICBpZCxcbiAgICAgICAgc3RhdHVzLFxuICAgICAgICB0b2dnbGVUYXNrU3RhdHVzLFxuICAgICAgICBlZGl0VGFza1xuICAgIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBnZW5lcmF0ZVRhc2s7IiwiaW1wb3J0IGdlbmVyYXRlUHJvamVjdCBmcm9tIFwiLi9wcm9qZWN0c1wiO1xuaW1wb3J0IGdlbmVyYXRlVGFzayBmcm9tIFwiLi90YXNrc1wiO1xuXG5jb25zdCB0b2RvID0gKCkgPT4ge1xuICAgIGNvbnN0IHVzZXJQcm9qZWN0cyA9IFtdO1xuICAgIGNvbnN0IGRlZmF1bHRQcm9qZWN0ID0gZ2VuZXJhdGVQcm9qZWN0KFwiRGVmYXVsdCBwcm9qZWN0XCIsIFwiSGVsbG8gd29ybGQhXCIpO1xuICAgIGNvbnN0IGRlZmF1bHRUYXNrID0gZ2VuZXJhdGVUYXNrKFwiRGVmYXVsdCB0YXNrXCIsIFwiSGVsbG8gd29ybGQhXCIsIFwiMjAyMS0wMS0wMVwiLCBcImxvd1wiKTtcblxuICAgIGRlZmF1bHRQcm9qZWN0LmFkZFRhc2tUb1Byb2plY3QoZGVmYXVsdFRhc2spO1xuXG4gICAgY29uc3QgYWRkUHJvamVjdCA9IChwcm9qZWN0KSA9PiB7XG4gICAgICAgIHVzZXJQcm9qZWN0cy5wdXNoKHByb2plY3QpO1xuICAgIH07XG5cbiAgICBjb25zdCBkZWxldGVQcm9qZWN0ID0gKHByb2plY3QpID0+IHtcbiAgICAgICAgY29uc3QgcHJvamVjdEluZGV4ID0gdXNlclByb2plY3RzLmZpbmRJbmRleChwcm9qID0+IHByb2ouaWQgPT09IHByb2plY3QuaWQpO1xuICAgICAgICBpZiAocHJvamVjdEluZGV4ICE9PSAtMSkge1xuICAgICAgICAgICAgdXNlclByb2plY3RzLnNwbGljZShwcm9qZWN0SW5kZXgsIDEpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIGNvbnN0IGluaXRpYWxpemVEZWZhdWx0UHJvamVjdCA9ICgpID0+IHtcbiAgICAgICAgYWRkUHJvamVjdChkZWZhdWx0UHJvamVjdCk7XG4gICAgfTtcblxuICAgIHJldHVybiB7XG4gICAgICAgIGluaXRpYWxpemVEZWZhdWx0UHJvamVjdCxcbiAgICAgICAgYWRkUHJvamVjdCxcbiAgICAgICAgZGVsZXRlUHJvamVjdCxcbiAgICAgICAgZ2V0VXNlclByb2plY3RzOiAoKSA9PiB1c2VyUHJvamVjdHNcbiAgICB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgdG9kbzsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB0b2RvIGZyb20gXCIuL2Z1bmN0aW9ucy90b2RvXCI7XG5pbXBvcnQgaW5pdGlhbGl6ZSBmcm9tIFwiLi9mdW5jdGlvbnMvVUlcIjtcblxuaW5pdGlhbGl6ZSgpO1xuY29uc29sZS5sb2coXCJ5ZXNcIik7XG5cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==