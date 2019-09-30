class OverviewController {
    constructor(view, model) {
        this.view = view;
        this.model = model;

        // TODO lab 3
        this.hash = "#overview";
    }
    
    updateHash() {
        window.location.hash = this.hash;
    }
    
    addListeners() {
        //this.view.backToSearchBtn.addEventListener("click", this.printAction)
    }
    
    removeListeners() {
        // if(this.view.backToSearchBtn)
        //     this.view.backToSearchBtn.removeEventListener("click", this.printAction);
    }
    printAction() {
        window.location.hash = '#print';
    }
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
