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
/* harmony import */ var _projects__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./projects */ "./src/functions/projects.js");
/* harmony import */ var _todo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./todo */ "./src/functions/todo.js");



const user = (0,_todo__WEBPACK_IMPORTED_MODULE_1__["default"])();

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

    return {
        name,
        description,
        id,
        projectTasks,
        addTaskToProject,
        deleteTaskFromProject
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

    const editTask = (task, newName, newDescription, newDate, newPriority) => {
        task.name = newName;
        task.description = newDescription;
        task.date = newDate;
        task.priority = newPriority;
    };

    const toggleTaskStatus = (task) => {
        task.status = !task.status;
    };

    return {
        name,
        description,
        date,
        priority,
        id,
        status,
        editTask,
        toggleTaskStatus
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
    const defaultTask = (0,_tasks__WEBPACK_IMPORTED_MODULE_1__["default"])("Default task", "Hello world!");

    defaultProject.addTaskToProject(defaultTask);

    const addProject = (project) => {
        userProjects.push(project);
    };

    const initializeDefaultProject = () => {
        addProject(defaultProject);
    };

    return {
        initializeDefaultProject,
        addProject,
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


})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQXlDO0FBQ2Y7O0FBRTFCLGFBQWEsaURBQUk7O0FBRWpCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSw0REFBNEQ7QUFDNUQ7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBOzs7OztBQUtBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxpRUFBZSxVQUFVOzs7Ozs7Ozs7Ozs7OztBQzNEekI7QUFDQTtBQUNBOztBQUVBLGlFQUFlLFVBQVU7Ozs7Ozs7Ozs7Ozs7OztBQ0phOztBQUV0QztBQUNBLHNCQUFzQix1REFBVSxHQUFHO0FBQ25DOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGlFQUFlLGVBQWU7Ozs7Ozs7Ozs7Ozs7OztBQzNCUTs7QUFFdEM7QUFDQSxzQkFBc0IsdURBQVUsR0FBRztBQUNuQzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsaUVBQWUsWUFBWTs7Ozs7Ozs7Ozs7Ozs7OztBQzdCYztBQUNOOztBQUVuQztBQUNBO0FBQ0EsMkJBQTJCLHFEQUFlO0FBQzFDLHdCQUF3QixrREFBWTs7QUFFcEM7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsaUVBQWUsSUFBSTs7Ozs7O1VDekJuQjtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7OztBQ05vQztBQUNJOztBQUV4Qyx5REFBVSIsInNvdXJjZXMiOlsid2VicGFjazovL3RvZG8vLi9zcmMvZnVuY3Rpb25zL1VJLmpzIiwid2VicGFjazovL3RvZG8vLi9zcmMvZnVuY3Rpb25zL2dlbmVyYXRlSUQuanMiLCJ3ZWJwYWNrOi8vdG9kby8uL3NyYy9mdW5jdGlvbnMvcHJvamVjdHMuanMiLCJ3ZWJwYWNrOi8vdG9kby8uL3NyYy9mdW5jdGlvbnMvdGFza3MuanMiLCJ3ZWJwYWNrOi8vdG9kby8uL3NyYy9mdW5jdGlvbnMvdG9kby5qcyIsIndlYnBhY2s6Ly90b2RvL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvZG8vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvZG8vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90b2RvL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG9kby8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZ2VuZXJhdGVQcm9qZWN0IGZyb20gJy4vcHJvamVjdHMnO1xuaW1wb3J0IHRvZG8gZnJvbSAnLi90b2RvJztcblxuY29uc3QgdXNlciA9IHRvZG8oKTtcblxuY29uc3QgY3JlYXRlSGVhZGVyID0gKCkgPT4ge1xuICAgIGNvbnN0IGhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoZWFkZXJcIik7XG4gICAgaGVhZGVyLmNsYXNzTGlzdC5hZGQoXCJoZWFkZXJcIik7XG5cbiAgICBjb25zdCBhcHBMb2dvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImltZ1wiKTtcbiAgICBhcHBMb2dvLnNyYyA9IFwiYXNzZXRzL2ltYWdlcy90b2RvLnBuZ1wiO1xuICAgIGFwcExvZ28uYWx0ID0gXCJ0b2RvXCI7XG4gICAgYXBwTG9nby5jbGFzc0xpc3QuYWRkKFwibG9nb1wiKTtcblxuICAgIGNvbnN0IGFwcEludHJvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgyXCIpO1xuICAgIGFwcEludHJvLnRleHRDb250ZW50ID0gXCJPcmdhbml6YXRpb24sIG9uZSBjaGVjayBhdCBhIHRpbWUuXCI7XG5cbiAgICBoZWFkZXIuYXBwZW5kQ2hpbGQoYXBwTG9nbyk7XG4gICAgaGVhZGVyLmFwcGVuZENoaWxkKGFwcEludHJvKTtcblxuICAgIHJldHVybiBoZWFkZXI7XG59XG5cbmNvbnN0IGNyZWF0ZVNpZGViYXIgPSAoKSA9PiB7XG4gICAgY29uc3QgYXNpZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYXNpZGVcIik7XG4gICAgYXNpZGUuY2xhc3NMaXN0LmFkZChcImFzaWRlXCIpO1xuXG4gICAgY29uc3QgdGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDJcIik7XG4gICAgdGl0bGUudGV4dENvbnRlbnQgPSBcIlByb2plY3RzXCI7XG5cbiAgICBjb25zdCBwcm9qZWN0c0NvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ1bFwiKTsgLy8gQ2hhbmdlZCBkaXYgdG8gdWwgZm9yIHByb2plY3RzXG4gICAgcHJvamVjdHNDb250YWluZXIuY2xhc3NMaXN0LmFkZChcInByb2plY3QtbGlzdFwiKTtcblxuICAgIHVzZXIuaW5pdGlhbGl6ZURlZmF1bHRQcm9qZWN0KCk7XG5cbiAgICB1c2VyLmdldFVzZXJQcm9qZWN0cygpLmZvckVhY2gocHJvamVjdCA9PiB7XG4gICAgICAgIGNvbnN0IHByb2plY3RJdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpO1xuICAgICAgICBwcm9qZWN0SXRlbS50ZXh0Q29udGVudCA9IHByb2plY3QubmFtZTtcbiAgICAgICAgcHJvamVjdEl0ZW0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHByb2plY3QuZGVzY3JpcHRpb24pXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHByb2plY3RzQ29udGFpbmVyLmFwcGVuZENoaWxkKHByb2plY3RJdGVtKTtcbiAgICB9KTtcblxuICAgIGFzaWRlLmFwcGVuZENoaWxkKHRpdGxlKTtcbiAgICBhc2lkZS5hcHBlbmRDaGlsZChwcm9qZWN0c0NvbnRhaW5lcik7XG4gICAgcmV0dXJuIGFzaWRlO1xufVxuXG5cblxuXG5jb25zdCBpbml0aWFsaXplID0gKCkgPT4ge1xuICAgIGNvbnN0IGNvbnRlbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvbnRlbnRcIik7XG5cbiAgICBjb250ZW50LmFwcGVuZENoaWxkKGNyZWF0ZVNpZGViYXIoKSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXRpYWxpemU7IiwiY29uc3QgZ2VuZXJhdGVJRCA9ICgpID0+IHtcbiAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogOTAwMCkgKyAxMDAwO1xufVxuXG5leHBvcnQgZGVmYXVsdCBnZW5lcmF0ZUlEOyIsImltcG9ydCBnZW5lcmF0ZUlEIGZyb20gXCIuL2dlbmVyYXRlSURcIjtcblxuY29uc3QgZ2VuZXJhdGVQcm9qZWN0ID0gKG5hbWUsIGRlc2NyaXB0aW9uKSA9PiB7XG4gICAgY29uc3QgaWQgPSBgUEpUIyR7Z2VuZXJhdGVJRCgpfWA7XG4gICAgY29uc3QgcHJvamVjdFRhc2tzID0gW107XG5cbiAgICBjb25zdCBhZGRUYXNrVG9Qcm9qZWN0ID0gKHRhc2spID0+IHtcbiAgICAgICAgcHJvamVjdFRhc2tzLnB1c2godGFzayk7XG4gICAgfTtcblxuICAgIGNvbnN0IGRlbGV0ZVRhc2tGcm9tUHJvamVjdCA9ICh0YXNrSWQpID0+IHtcbiAgICAgICAgY29uc3QgdGFza0luZGV4ID0gcHJvamVjdFRhc2tzLmZpbmRJbmRleCh0YXNrID0+IHRhc2suSUQgPT09IHRhc2tJZCk7XG4gICAgICAgIGlmICh0YXNrSW5kZXggIT09IC0xKSB7XG4gICAgICAgICAgICBwcm9qZWN0VGFza3Muc3BsaWNlKHRhc2tJbmRleCwgMSk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgbmFtZSxcbiAgICAgICAgZGVzY3JpcHRpb24sXG4gICAgICAgIGlkLFxuICAgICAgICBwcm9qZWN0VGFza3MsXG4gICAgICAgIGFkZFRhc2tUb1Byb2plY3QsXG4gICAgICAgIGRlbGV0ZVRhc2tGcm9tUHJvamVjdFxuICAgIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBnZW5lcmF0ZVByb2plY3Q7IiwiaW1wb3J0IGdlbmVyYXRlSUQgZnJvbSBcIi4vZ2VuZXJhdGVJRFwiO1xuXG5jb25zdCBnZW5lcmF0ZVRhc2sgPSAobmFtZSwgZGVzY3JpcHRpb24sIGRhdGUsIHByaW9yaXR5KSA9PiB7XG4gICAgY29uc3QgaWQgPSBgVFNLIyR7Z2VuZXJhdGVJRCgpfWA7XG4gICAgbGV0IHN0YXR1cyA9IGZhbHNlO1xuXG4gICAgY29uc3QgZWRpdFRhc2sgPSAodGFzaywgbmV3TmFtZSwgbmV3RGVzY3JpcHRpb24sIG5ld0RhdGUsIG5ld1ByaW9yaXR5KSA9PiB7XG4gICAgICAgIHRhc2submFtZSA9IG5ld05hbWU7XG4gICAgICAgIHRhc2suZGVzY3JpcHRpb24gPSBuZXdEZXNjcmlwdGlvbjtcbiAgICAgICAgdGFzay5kYXRlID0gbmV3RGF0ZTtcbiAgICAgICAgdGFzay5wcmlvcml0eSA9IG5ld1ByaW9yaXR5O1xuICAgIH07XG5cbiAgICBjb25zdCB0b2dnbGVUYXNrU3RhdHVzID0gKHRhc2spID0+IHtcbiAgICAgICAgdGFzay5zdGF0dXMgPSAhdGFzay5zdGF0dXM7XG4gICAgfTtcblxuICAgIHJldHVybiB7XG4gICAgICAgIG5hbWUsXG4gICAgICAgIGRlc2NyaXB0aW9uLFxuICAgICAgICBkYXRlLFxuICAgICAgICBwcmlvcml0eSxcbiAgICAgICAgaWQsXG4gICAgICAgIHN0YXR1cyxcbiAgICAgICAgZWRpdFRhc2ssXG4gICAgICAgIHRvZ2dsZVRhc2tTdGF0dXNcbiAgICB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgZ2VuZXJhdGVUYXNrOyIsImltcG9ydCBnZW5lcmF0ZVByb2plY3QgZnJvbSBcIi4vcHJvamVjdHNcIjtcbmltcG9ydCBnZW5lcmF0ZVRhc2sgZnJvbSBcIi4vdGFza3NcIjtcblxuY29uc3QgdG9kbyA9ICgpID0+IHtcbiAgICBjb25zdCB1c2VyUHJvamVjdHMgPSBbXTtcbiAgICBjb25zdCBkZWZhdWx0UHJvamVjdCA9IGdlbmVyYXRlUHJvamVjdChcIkRlZmF1bHQgcHJvamVjdFwiLCBcIkhlbGxvIHdvcmxkIVwiKTtcbiAgICBjb25zdCBkZWZhdWx0VGFzayA9IGdlbmVyYXRlVGFzayhcIkRlZmF1bHQgdGFza1wiLCBcIkhlbGxvIHdvcmxkIVwiKTtcblxuICAgIGRlZmF1bHRQcm9qZWN0LmFkZFRhc2tUb1Byb2plY3QoZGVmYXVsdFRhc2spO1xuXG4gICAgY29uc3QgYWRkUHJvamVjdCA9IChwcm9qZWN0KSA9PiB7XG4gICAgICAgIHVzZXJQcm9qZWN0cy5wdXNoKHByb2plY3QpO1xuICAgIH07XG5cbiAgICBjb25zdCBpbml0aWFsaXplRGVmYXVsdFByb2plY3QgPSAoKSA9PiB7XG4gICAgICAgIGFkZFByb2plY3QoZGVmYXVsdFByb2plY3QpO1xuICAgIH07XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBpbml0aWFsaXplRGVmYXVsdFByb2plY3QsXG4gICAgICAgIGFkZFByb2plY3QsXG4gICAgICAgIGdldFVzZXJQcm9qZWN0czogKCkgPT4gdXNlclByb2plY3RzXG4gICAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHRvZG87IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgdG9kbyBmcm9tIFwiLi9mdW5jdGlvbnMvdG9kb1wiO1xuaW1wb3J0IGluaXRpYWxpemUgZnJvbSBcIi4vZnVuY3Rpb25zL1VJXCI7XG5cbmluaXRpYWxpemUoKTtcblxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9