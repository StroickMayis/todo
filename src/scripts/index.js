import "../index.css"; 
import "../header.css"; 
import "../pageDisplay.css"; 
import "../notebookDropdown.css"; 
import "../main.css"; 
import { state } from "./state";

const body = document.querySelector(`body`);

body.addEventListener(`click`, (e) => {
    if(e.target.classList.contains(`pages`)) {
        state.openPage(e.target);
    }
    if(e.target.classList.contains(`addPageButton`)) {
        state.createNewPage();
    }
    if(e.target.classList.contains(`section`) && !e.target.classList.contains(`add`) && !e.target.classList.contains(`open`)) {
        state.openSection(e.target);
    }
    if(e.target.classList.contains(`section`) && e.target.classList.contains(`add`)) {
        state.createNewSection();
    }
    if(e.target.classList.contains(`notebookDropdown`) && e.target.classList.contains(`open`)) {
        state.changeOpenNotebook(e.target);
    }
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
});
