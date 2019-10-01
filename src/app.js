class GeneralStateController {
  constructor(model) {
    this.model = model;
    this.controllers = [];
    model.addObserver(this);
  }

  update(model, changeDetails) {
    this.store();
  }
  addController(controller) {
    this.controllers.push(controller);
  }
  addListeners() {
    window.onhashchange = async () => {
      let controllers = this.controllers.filter((controller) => controller.hash == location.hash);
      switch(location.hash) {
        case "#dishDetails":
        case "#search":
          controllers.push(this.controllers.filter(controller => controller.hash == "")[0]);
          let hide = this.controllers.filter(controller => controller.hash != "" && controller.hash != controllers[0].hash);
          hide.forEach((controller) => controller.hideView());
          await controllers[1].renderView();
          await controllers[0].renderView();
          this.store();
          break;
        default:
          let hide1 = this.controllers.filter(controller => controller.hash != controllers[0].hash);
          hide1.forEach((controller) => controller.hideView());
          await controllers[0].renderView();
          this.store();
          break;
      }
      
    }
  }

  store() {
    let storage = window.localStorage;
    storage.setItem('guests', this.model.guests);
    storage.setItem('menu', JSON.stringify(this.model.menu));
    storage.setItem('currentDish', this.model.currentDish);
    storage.setItem('hash', window.location.hash);
  }
  read() {
    let storage = window.localStorage;
    if(storage.getItem('guests') !== null) {
      this.model.guests = parseInt(storage.getItem('guests'), 10);
    }
    if(storage.getItem('menu') !== null) {
      this.model.menu = JSON.parse(storage.getItem('menu'));
    }
    if(storage.getItem('currentDish') !== null) {
      this.model.currentDish = parseInt(storage.getItem('currentDish'), 10);
    }
    if(storage.getItem('hash') !== null) {
      window.location.hash = storage.getItem('hash');
    }
  }
  async initialize() {
    let container = document.getElementById("homeView");
    let view = new HomeView(container, this.model);
    let controller = new HomeController(view, this.model);
    this.addController(controller);;
    controller.renderView();

    container = document.getElementById("searchView");
    view = new SearchView(container, this.model);
    controller = new SearchController(view, this.model);
    this.addController(controller);

    container = document.getElementById("sideBarView");
    view = new SidebarView(container, this.model);
    controller = new SidebarController(view, this.model);
    this.addController(controller);

    container = document.getElementById("dishDetailsView");
    view = new DishDetailsView(container, this.model);
    controller = new DishDetailsController(view, this.model);
    this.addController(controller);

    container = document.getElementById("overviewView");
    view = new OverviewView(container, this.model);
    controller = new OverviewController(view, this.model);
    this.addController(controller);

    container = document.getElementById("printView");
    view = new PrintView(container, this.model);
    controller = new PrintController(view, this.model);
    this.addController(controller);

    this.addListeners();
  }
 
}
window.onload = async function () {
  console.log("start");
  //We instantiate our model
  const model = new DinnerModel();

  generalStateController = new GeneralStateController(model);
  generalStateController.initialize();
  generalStateController.read();
  // const container = document.getElementById("homeView");
  // const view = new HomeView(container, model);
  // view.render();

  /**
   * IMPORTANT: app.js is the only place where you are allowed to
   * query for elements in the whole document.
   * In other places you should limit the search only to the children
   * of the specific view you're working with.
   */

};
