class SearchController {
    constructor(view, model) {
        this.view = view;
        this.model = model;

        // TODO lab 3
        this.hash = "#search";
    }

    updateHash() {
        window.location.hash = this.hash;
    }

    addListeners() {
        
        let model = this.model;
        let view = this.view;
        let dishDetailsAction = this.dishDetailsAction;
        this.searchAction = async function searchAction() {
            let query = view.keywords.value;
            let dishType = view.dishType.value;
            let type;
            if(dishType == 'all') type = '';
            else type = dishType;
            await model.getAllDishes(type, query);
            view.dishTitles.forEach(dishTitle =>{
                dishTitle.addEventListener("click", dishDetailsAction);
                dishTitle.model = model;
            });
        }
        this.view.searchBtn.addEventListener("click", this.searchAction);
        this.view.dishTitles.forEach(dishTitle =>{
            dishTitle.addEventListener("click", this.dishDetailsAction);
            dishTitle.model = this.model;
        });
    }
    removeListeners() {
        if(this.view.searchBtn)
            this.view.searchBtn.removeEventListener("click", this.searchAction);
        if(this.view.dishTitle)
            this.view.dishTitle.removeEventListener("click", this.dishDetailsAction);
    }
    async searchAction(event) {
        let query = event.target.query;
        let type = event.target.dishType == 'all' ? '': event.target.dishType;
        await event.target.model.getAllDishes(type, query);
                
    }
    dishDetailsAction(event) {
        event.target.model.setCurrentDish(event.target.id);
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
