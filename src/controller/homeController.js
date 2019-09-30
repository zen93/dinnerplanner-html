class HomeController {
    constructor(view, model) {
        this.view = view;
        this.model = model;

        // TODO lab 3
        this.hash = "#home";
    }

    updateHash() {
        window.location.hash = this.hash;
    }

    addListeners() {
        this.view.startBtn.addEventListener("click", this.action)
    }
    removeListeners() {
        this.view.startBtn.removeEventListener("click", this.action);
    }
    action() {
        window.location.hash = '#search';
    }
    renderView() {
        // TODO lab 3
        if(location.hash != this.hash) this.updateHash();
        this.model.addObserver(this.view);
        this.view.showView();
        this.view.render();
        this.addListeners();
        
    }

    // TODO Lab 3
    hideView() {
        this.view.hideView();
        //this.view.removeObserver();
        this.removeListeners();
    }
}
