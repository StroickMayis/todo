import "../index.css"; 
import "../header.css"; 
import "../pageDisplay.css"; 
import "../notebookDropdown.css"; 
import "../dropdown.css"; 
import "../main.css"; 
import { state } from "./state";

const body = document.querySelector(`body`);

body.addEventListener(`click`, (e) => { // TODO: click event to change section color. After that I think I should move on with Odin Project. Because that will basically be the todo app. Can keep working on it though.
    if(state.sectionRenamingElement && !(e.target.classList.contains(`sectionName`) && e.target.dataset.index === state.sectionRenamingElement.dataset.index)) { // ! Needs to be placed near top.
        state.stopSectionRenaming();
    }
    if(e.target.classList.contains(`color`) && e.target.classList.contains(`dropdown`)) {
        state.changeColor(e.target);
    }
    if(e.target.classList.contains(`dropdownRename`)) {
        state.renameSection();
    }
    if(e.target.classList.contains(`dropdownDelete`)) {
        state.deleteSection();
    }
    if(e.target.classList.contains(`pages`)) {
        state.openPage(e.target);
    }
    if(e.target.classList.contains(`addPageButton`)) {
        state.createNewPage();
    }
    if( ( e.target.classList.contains(`section`) || e.target.classList.contains(`sectionName`) ) && !e.target.classList.contains(`add`) && !e.target.classList.contains(`open`)) {
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
    if(e.target.classList.contains(`switchNotebook`)) { // ! Beware: the "else" here hides all dropdowns. Needs to be placed lower.
        if(state.currentDropdownEle) {
            state.hideAllDropdowns();
        } else {
            state.showNotebookDropdown();
        }
    } else {
        state.hideAllDropdowns();
    }
});

body.addEventListener(`input`, (e) => {
    if(e.target.classList.contains(`pageTitle`)) {
        state.updatePageTitle(e.target);
    }
    if(e.target.classList.contains(`pageContent`)) {
        state.updatePageContent(e.target);
    }
});

body.addEventListener(`contextmenu`, (e) => {
    e.preventDefault();
    if(e.target.classList.contains(`section`) || e.target.classList.contains(`sectionName`) && !e.target.classList.contains(`add`)) {
        if(state.currentDropdownEle) {
            state.hideAllDropdowns();
            state.showSectionDropdown(e);
        } else {
            state.showSectionDropdown(e);
        }
    }
});

body.addEventListener(`dblclick`, (e) => {
    if(e.target.classList.contains(`sectionName`)) {
        state.renameSection(e.target);
    }
});

body.addEventListener(`keypress`, (e) => {
    if(e.key === `Enter` && state.sectionRenamingElement) {
        state.stopSectionRenaming();
    }
});

body.addEventListener(`mouseover`, (e) => {
    if(e.target.classList.contains(`openColorDropdown`)) {
        state.showColorDropdown();
    }
    if(e.target.classList.contains(`dropdown`) && !(e.target.classList.contains(`openColorDropdown`) || e.target.classList.contains(`colorDropdownContainer`) || e.target.classList.contains(`color`))) {
        state.hideColorDropdown();
    }
});