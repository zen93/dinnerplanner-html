class DishDetailsController {
    constructor(view, model) {
        this.view = view;
        this.model = model;

        // TODO lab 3
        this.hash = "#dishDetails";
    }

    updateHash() {
        window.location.hash = this.hash;
    }

    addListeners() {
        let model = this.model;
        this.addToMenuAction = async function (event) {
            await model.addDishToMenu(event.target.id);
        }
        this.view.backToSearchBtn.addEventListener("click", this.backAction);
        this.view.addToMenuBtn.addEventListener("click", this.addToMenuAction);
    }
    removeListeners() {
        if(this.view.backToSearchBtn)
            this.view.backToSearchBtn.removeEventListener("click", this.backAction);
        if(this.view.addToMenuBtn)
            this.view.addToMenuBtn.removeEventListener("click", this.addToMenuAction);
    }
    backAction() {
        window.location.hash = '#search';
    }
    // addToMenuAction(event) {
    //     this.model.addDishToMenu(event.target.id);
    // }
    async renderView() {
        // TODO lab 3
        if(location.hash != this.hash) this.updateHash();
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
