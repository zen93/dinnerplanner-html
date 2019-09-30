class SidebarController {
    constructor(view, model) {
        this.view = view;
        this.model = model;
        // TODO lab 3
        this.hash = "";
    }
    addListeners() {
        let model = this.model;
        this.changeGuestsAction = function (event) {
            model.setNumberOfGuests(event.target.value);
        }
        this.view.guestsInput.addEventListener("input", this.changeGuestsAction);
        
    }
    removeListeners() {
        if(this.view.guestsInput)
            this.view.guestsInput.removeEventListener("input", this.changeGuestsAction);
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
