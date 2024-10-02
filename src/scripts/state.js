// import { logic } from "./logic";

// * NB stands for Notebook

const state = {
    notebookDropdown: document.querySelector(`.notebookDropdownContainer`),
    notebookDropdownList: document.querySelector(`.notebookDropdownListContainer`),
    addNotebookModal: document.querySelector(`.addNotebookModal`),
    inputForNotebookName: document.querySelector(`input.notebookName`),
    currentlyOpenNBNameDisplay: document.querySelector(`.notebookName.switchNotebook`),
    sectionSelectContainer: document.querySelector(`.sectionSelect`),
    pageListContainer: document.querySelector(`.pageList`),

    currentlyOpenNotebook: null,

    currentDropdownEle: null,

    notebookArr: [],

    Notebook: function (index, name) {
        this.index = index;
        this.name = name;
        this.sections = [new state.Section(0, `New Section`)];
        this.openSection = this.sections[0];
        this.color = `white`;
    },
    Section: function (index, name) {
        this.index = index;
        this.name = name;
        this.pages = [new state.Page(0)];
        this.openPage = this.pages[0];
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
            container.className = `notebookDropdown notebook open`;
            container.dataset.index = ele.index;
            let icon = document.createElement(`div`);
            icon.className = `notebookDropdown icon open`;
            icon.dataset.index = ele.index;
            icon.textContent = `📝`;
            let title = document.createElement(`div`);
            title.className = `notebookDropdown title open`;
            title.dataset.index = ele.index;
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
    updateCurrentlyOpenNBNameDisplay: () => {
        state.currentlyOpenNBNameDisplay.textContent = state.currentlyOpenNotebook.name;
    },
    changeOpenNotebook: (clickTarget) => {
        state.currentlyOpenNotebook = state.notebookArr[clickTarget.dataset.index];
        state.updateCurrentlyOpenNBNameDisplay();
        state.updateSectionSelectContainer();
        state.updatePageList();
},
    updateSectionSelectContainer: () => {
        state.sectionSelectContainer.innerHTML = ``;
        state.currentlyOpenNotebook.sections.forEach(ele => {
            let section = document.createElement(`div`);
            if(state.currentlyOpenNotebook.openSection === ele) {
                section.className = `section open`;
            } else {
                section.className = `section`;
            }
            section.textContent = ele.name;
            section.dataset.index = ele.index;
            state.sectionSelectContainer.append(section);
        });
        let section = document.createElement(`div`);
        section.className = `section add`;
        section.textContent = `+`;
        state.sectionSelectContainer.append(section);
    },
    createNewSection: () => {
        state.createSection(state.currentlyOpenNotebook, `New Section 1`);
        state.updateSectionSelectContainer();
    },
    openSection: (clickTarget) => {
        state.currentlyOpenNotebook.openSection = state.currentlyOpenNotebook.sections[clickTarget.dataset.index];
        state.updateSectionSelectContainer();
        state.updatePageList();
    },
    updatePageList: () => {
        state.pageListContainer.innerHTML = ``;
        state.currentlyOpenNotebook.openSection.pages.forEach(ele => {
            let page = document.createElement(`div`);
            if(state.currentlyOpenNotebook.openSection.openPage === ele) {
                page.className = `pages open`;
            } else {
                page.className = `pages`;
            }
            page.textContent = ele.name;
            page.dataset.index = ele.index;
            state.pageListContainer.append(page);
        });
    },
    createNewPage: () => {
        state.createPage(state.currentlyOpenNotebook.openSection);
        state.updatePageList();
    },
    openPage: (clickTarget) => {
        state.currentlyOpenNotebook.openSection.openPage = state.currentlyOpenNotebook.openSection.pages[clickTarget.dataset.index];
        state.updatePageList();
    },
}

state.createNotebook(`Erik's Notebook`)
state.currentlyOpenNotebook = state.notebookArr[0];
state.updateCurrentlyOpenNBNameDisplay();
state.updateSectionSelectContainer();
state.updatePageList();

console.log(state.notebookArr);

export { state };