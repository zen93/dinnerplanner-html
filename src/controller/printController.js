class PrintController {
    constructor(view, model) {
        this.view = view;
        this.model = model;
        // TODO lab 3
        this.hash = "#print";
    }
    addListeners() {        
    }
    removeListeners() {
    }
    async renderView() {
        // TODO lab 3
        this.model.addObserver(this.view);
        this.view.showView();
        await this.view.render();
        this.addListeners();
    }

    // TODO Lab 3
    hideView() {
        this.view.hideView();
        this.view.removeObserver();
        this.removeListeners();
    }
}
