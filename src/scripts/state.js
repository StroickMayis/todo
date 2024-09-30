import { logic } from "./logic";

const state = {
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
    createNotebook: function (name) {
        const index = state.notebookArr.length;
        state.notebookArr[index] = new state.Notebook(index, name);
    },
    createSection: function (notebook, name) {
        const index = notebook.sections.length;
        notebook.sections[index] = new state.Section(index, name);
    },
    createPage: function (notebookSection) {
        const index = notebookSection.pages.length;
        notebookSection.pages[index] = new state.Page(index);
    },
}


state.createNotebook(`nigga`)
state.createNotebook(`nigga1`)
state.createSection(state.notebookArr[1], `blackies`)
state.createPage(state.notebookArr[1].sections[1]);


console.log(state.notebookArr);

export { state };