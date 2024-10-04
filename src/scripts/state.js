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
    pageDisplayContainer: document.querySelector(`.pageDisplay`),
    dropdownContainer: document.querySelector(`.dropdownContainer`),
    colorDropdownContainer: document.querySelector(`.colorDropdownContainer`),

    currentlyOpenNotebook: null,

    currentDropdownEle: null,
    currentDropdownTargetEle: null,
    currentDropdownEle2: null,

    createNewSectionRenameEle: null, // ! Workaround for the sectionRename not working when I try to call it with createNewSection().

    sectionRenamingElement: null,

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
        this.date = `Tuesday, October 1, 2024&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4:46 PM`;
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
            if(state.currentDropdownEle2) {
                state.currentDropdownEle2.style.display = `none`;
                state.currentDropdownEle2 = null;
            }
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
        state.updatePageDisplay();
    },
    updateSectionSelectContainer: () => {
        state.sectionSelectContainer.innerHTML = ``;
        state.currentlyOpenNotebook.sections.forEach(ele => {
            let section = document.createElement(`div`);
            let sectionName = document.createElement(`div`);
            if(state.currentlyOpenNotebook.openSection === ele) {
                section.className = `section open`
                sectionName.className = `sectionName open`
            } else {
                section.className = `section`;
                sectionName.className = `sectionName`
            }
            section.dataset.index = ele.index;
            
            sectionName.textContent = ele.name;
            sectionName.dataset.index = ele.index;
            section.append(sectionName);
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
        state.updatePageDisplay();
        let lastSectionSelect = document.querySelector(`.sectionSelect .section:nth-last-child(2)`);
        state.createNewSectionRenameEle = document.querySelector(`.sectionSelect .section:nth-last-child(2) .sectionName`); // ! workaround mentioned in the global var's of state obj.
        state.openSection(lastSectionSelect);
        state.renameSection();
    },
    openSection: (clickTarget) => {
        state.currentlyOpenNotebook.openSection = state.currentlyOpenNotebook.sections[clickTarget.dataset.index];
        state.updateSectionSelectContainer();
        state.updatePageList();
        state.updatePageDisplay();
    },
    updatePageList: () => {
        state.pageListContainer.innerHTML = ``;
        state.currentlyOpenNotebook.openSection.pages.forEach(ele => {
            let page = document.createElement(`div`);
            state.currentlyOpenNotebook.openSection.openPage === ele ? page.className = `pages open` : page.className = `pages`;
            if(ele.name.length > 29) {
                let textArray = ele.name.split(``);
                textArray.splice(30, Infinity, `.`, `.`, `.`);
                let joinedtextArray = textArray.join(``);
                page.textContent = joinedtextArray;
            } else if(ele.name.length < 1) {
                page.textContent = `Untitled`;
            } else {
                page.textContent = ele.name;
            }
            page.dataset.index = ele.index;
            state.pageListContainer.append(page);
        });
    },
    createNewPage: () => { // TODO: Make this open the page that was created.
        state.createPage(state.currentlyOpenNotebook.openSection);
        state.updatePageList();
        state.updatePageDisplay();
    },
    openPage: (clickTarget) => { // TODO: make this focus where the cursor left off.
        state.currentlyOpenNotebook.openSection.openPage = state.currentlyOpenNotebook.openSection.pages[clickTarget.dataset.index];
        state.updatePageList();
        state.updatePageDisplay();
    },
    updatePageDisplay: () => {
        state.pageDisplayContainer.innerHTML = ``;
        let page = document.createElement(`div`);
        page.className = `page`;
        let pageInfo = document.createElement(`div`);
        pageInfo.className = `pageInfo`;
        page.append(pageInfo);
        let pageTitle = document.createElement(`div`);
        pageTitle.className = `pageTitle`;
        pageTitle.contentEditable = true;
        pageTitle.textContent = state.currentlyOpenNotebook.openSection.openPage.name;
        pageInfo.append(pageTitle);
        let pageInfoLine = document.createElement(`div`);
        pageInfoLine.className = `pageInfoLine`;
        pageInfo.append(pageInfoLine);
        let pageDate = document.createElement(`div`);
        pageDate.innerHTML = state.currentlyOpenNotebook.openSection.openPage.date;
        pageDate.className = `pageDate`;
        pageInfo.append(pageDate);
        let pageContent = document.createElement(`div`);
        pageContent.className = `pageContent`;
        pageContent.contentEditable = true;
        pageContent.textContent = state.currentlyOpenNotebook.openSection.openPage.content;
        page.append(pageContent);
        state.pageDisplayContainer.append(page);
    },
    updatePageTitle: (inputTarget) => {
        state.currentlyOpenNotebook.openSection.openPage.name = inputTarget.textContent;
        state.updatePageList();
    },
    updatePageContent: (inputTarget) => {
        state.currentlyOpenNotebook.openSection.openPage.content = inputTarget.textContent;
    },
    showSectionDropdown: (e) => {
        state.dropdownContainer.style.display = `flex`;

        if(e.y + state.dropdownContainer.offsetHeight > window.innerHeight) {
            state.dropdownContainer.style.top = `${window.innerHeight - state.dropdownContainer.offsetHeight}px`;
        } else {
            state.dropdownContainer.style.top = `${e.y}px`;
        }

        if(e.x + state.dropdownContainer.offsetWidth > window.innerWidth) {
            state.dropdownContainer.style.left = `${window.innerWidth - state.dropdownContainer.innerWidth}px`;
        } else {
            state.dropdownContainer.style.left = `${e.x}px`;
        }

        state.currentDropdownTargetEle = e.target;
        state.currentDropdownEle = state.dropdownContainer;
    },
    renameSection: (dblclickTarget) => {
        if(dblclickTarget) {
            dblclickTarget.contentEditable = true;
            dblclickTarget.focus();
            state.sectionRenamingElement = dblclickTarget;
        } else if (state.createNewSectionRenameEle) {
            let renameTarget = document.querySelector(`.sectionName[data-index="${state.createNewSectionRenameEle.dataset.index}"]`);
            renameTarget.contentEditable = true;
            renameTarget.focus();
            state.sectionRenamingElement = renameTarget;
            state.createNewSectionRenameEle = null;
        } else {
            let renameTarget = document.querySelector(`.sectionName[data-index="${state.currentDropdownTargetEle.dataset.index}"]`);
            renameTarget.contentEditable = true;
            renameTarget.focus();
            state.sectionRenamingElement = renameTarget;
        }
        
    },
    stopSectionRenaming: () => {
        state.sectionRenamingElement.contentEditable = false;
        state.currentlyOpenNotebook.sections[state.sectionRenamingElement.dataset.index].name = state.sectionRenamingElement.textContent;
        state.sectionRenamingElement = null;
    },
    deleteSection: () => {
        const updateAllSectionIndicies = () => {
            for(let i = 0; i < state.currentlyOpenNotebook.sections.length; i++) {
                state.currentlyOpenNotebook.sections[i].index = i;
            }
        }
        state.currentlyOpenNotebook.sections.splice(state.currentDropdownTargetEle.dataset.index, 1);
        updateAllSectionIndicies(); // * when removing an element from the array, the nested ".index" properties of all of the sections need to be reset.

        let nextSectionToSelect = document.querySelector(`.sectionSelect .section:nth-last-child(3)`);
        console.log(nextSectionToSelect)
        state.openSection(nextSectionToSelect);
        state.updateSectionSelectContainer();
        state.updatePageList();
        state.updatePageDisplay();
    },
    showColorDropdown: () => {
        let parentDropdownContainer = state.currentDropdownEle;
        state.colorDropdownContainer.style.display = `flex`;

        // if(e.y + state.colorDropdownContainer.offsetHeight > window.innerHeight) {
            state.colorDropdownContainer.style.top = `${parentDropdownContainer.offsetTop}px`;
        // } else {
            // state.colorDropdownContainer.style.top = `${e.y}px`;
        // }

        // if(e.x + state.colorDropdownContainer.offsetWidth > window.innerWidth) {
            state.colorDropdownContainer.style.left = `${parentDropdownContainer.offsetWidth + parentDropdownContainer.offsetLeft}px`;
        // } else {
            // state.colorDropdownContainer.style.left = `${e.x}px`;
        // }

        // state.currentDropdownTargetEle = e.target;
        state.currentDropdownEle2 = state.colorDropdownContainer;
    },
    hideColorDropdown: () => {
        if(state.currentDropdownEle2) {
            state.currentDropdownEle2.style.display = `none`;
            state.currentDropdownEle2 = null;
        }
    },
}

state.createNotebook(`Erik's Notebook`)
state.currentlyOpenNotebook = state.notebookArr[0];
state.updateCurrentlyOpenNBNameDisplay();
state.updateSectionSelectContainer();
state.updatePageList();
state.updatePageDisplay();

console.log(state.notebookArr);

export { state };