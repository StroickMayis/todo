// import { logic } from "./logic";

const state = {
    notebookDropdown: document.querySelector(`.notebookDropdownContainer`),
    notebookDropdownList: document.querySelector(`.notebookDropdownListContainer`),
    addNotebookModal: document.querySelector(`.addNotebookModal`),
    inputForNotebookName: document.querySelector(`input.notebookName`),

    currentDropdownEle: null,

    notebookArr: [],

    Notebook: function (index, name) {
        this.index = index;
        this.name = name;
        this.sections = [new state.Section(0, `New Section`)];
        this.color = `white`;
    },
    Section: function (index, name) {
        this.index = index;
        this.name = name;
        this.pages = [new state.Page(0)];
        this.color = `white`;
    },
    Page: function (index) {
        this.index = index;
        this.name = `Untitled`;
        this.date = ``;
        this.content = ``;
    },
    createNotebook: (name) => {
        const index = state.notebookArr.length;
        state.notebookArr[index] = new state.Notebook(index, name);
    },
    createSection: (notebook, name) => {
        const index = notebook.sections.length;
        notebook.sections[index] = new state.Section(index, name);
    },
    createPage: (notebookSection) => {
        const index = notebookSection.pages.length;
        notebookSection.pages[index] = new state.Page(index);
    },
    showNotebookDropdown: () => {
        state.notebookDropdown.style.display = `block`;
        state.notebookDropdownList.innerHTML = ``;
        state.notebookArr.forEach(ele => {
            let container = document.createElement(`div`);
            container.className = `notebookDropdown notebook`;
            let icon = document.createElement(`div`);
            icon.className = `notebookDropdown icon`;
            icon.textContent = `📝`;
            let title = document.createElement(`div`);
            title.className = `notebookDropdown title`;
            icon.textContent = ele.name;
            container.append(icon);
            container.append(title);
            state.notebookDropdownList.append(container);
        });
        state.currentDropdownEle = state.notebookDropdown;
    },
    hideAllDropdowns: () => {
        if(state.currentDropdownEle) {
            state.currentDropdownEle.style.display = `none`;
            state.currentDropdownEle = null;
        }
    },
    showAddNotebookModal: () => {
        state.addNotebookModal.showModal();
    },
    hideAddNotebookModal: () => {
        state.addNotebookModal.close();
    },
    createNewNotebook: () => {
        let isSuccess = false;
        if(state.inputForNotebookName.value) {
            state.createNotebook(state.inputForNotebookName.value);
            isSuccess = true;
        }
        console.log(state.notebookArr) //! Temp debugger
        return isSuccess;
    },
}


state.createNotebook(`nigga`)
state.createNotebook(`nigga1`)
state.createSection(state.notebookArr[1], `blackies`)
state.createPage(state.notebookArr[1].sections[1]);


console.log(state.notebookArr);

export { state };