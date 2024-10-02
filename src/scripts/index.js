import "../index.css"; 
import "../header.css"; 
import "../pageDisplay.css"; 
import "../notebookDropdown.css"; 
import "../main.css"; 
import { state } from "./state";

const body = document.querySelector(`body`);

body.addEventListener(`click`, (e) => {
    if(e.target.classList.contains(`addNotebookButton`)) {
         state.showAddNotebookModal();
    }
    if(e.target.classList.contains(`createNotebookButton`)) {
        let isSuccess = state.createNewNotebook();
        if(isSuccess) {
            state.hideAddNotebookModal();
        }
    }
    if(e.target.classList.contains(`closeAddNotebookModalBtn`)) {
        state.hideAddNotebookModal();
    }
    if(e.target.classList.contains(`switchNotebook`)) { // ! Beware: the "else" here hides all dropdowns.
        if(state.currentDropdownEle) {
            state.hideAllDropdowns();
        } else {
            state.showNotebookDropdown();
        }
    } else {
        state.hideAllDropdowns();
    }

})