var assert = chai.assert;
var expect = chai.expect;

describe("DinnerPlanner App", () => {
  let model = null;
  let homeView = null;
  let searchView = null;
  let overviewView = null;
  let sidebarView = null;
  let sidebarController = null;

  beforeEach(() => {
    model = new DinnerModel();
    homeView = new HomeView(document.querySelector("#page-content"));
    searchView = new SearchView(document.querySelector("#page-content"), model);
    overviewView = new OverviewView(document.querySelector("#page-content"), model);
    sidebarView = new SidebarView(document.querySelector("#page-content"), model);
  });

  describe("Home View", () => {
    it("has the start button", () => {
      homeView.render();
      const button = document.getElementById("startBtn");
    });
  });

  describe("Home View", () => {
    it("has the start button", () => {
      homeView.render();
      const button = document.getElementById("startBtn");
      expect(button).to.not.be.a("null");
    });
  });

  
  describe("Search view", () => {
    beforeEach(async () => {
      await model.addDishToMenu(559251);
      await searchView.render();
      await sidebarView.render();
    });

    it("has a sidebar", () => {
      
        const sidebar = document.getElementById("sideBarView");
        expect(sidebar).to.not.be.a("null");
      
    });

    it("has a dish search container", () => {
      
        const dishSearch = document.getElementById("dishSearchView");
        expect(dishSearch).to.not.be.a("null");
      
    });

    it("displays a loading message", () => {
     
        const loader = document.getElementById("loader");
        expect(loader).to.not.be.a("null");

    });

    it("displays dishes", () => {
 
        const dishes = document.getElementById("dishItems");
        expect(dishes).to.not.be.a("null");

    });

    it("Has a number of guests value", () => {

        const valueHolders = document.getElementsByClassName("input-num-guests");
        expect(valueHolders.length).to.be.above(0);
        for (let v of valueHolders) {
          expect(v).to.not.be.a("null");
          expect(v.value).to.equal(""+model.getNumberOfGuests());
        }

    });

    it("Has data on current dishes", () => {
        const valueHolders = document.getElementsByClassName("value-main-course-name");
        expect(valueHolders.length).to.be.above(0);
        for (let v of valueHolders) {
          expect(v).to.not.be.a("null");
          expect(v.innerHTML).to.equal("Breakfast Pizza");
        }  
    });

    it("Displays the total price correctly", () => {
        const valueHolders = document.getElementsByClassName("value-total-price");
        expect(valueHolders.length).to.be.above(0);
        for (let v of valueHolders) {
          expect(v).to.not.be.a("null");
          expect(v.innerHTML).to.equal(""+model.getTotalMenuPrice());
        }      
    });
  });

  


  describe("Confirmation page", () => {
    beforeEach(async () => {
      sidebarView.removeObserver();
      await model.addDishToMenu(559251);
      model.setNumberOfGuests(1);
      await overviewView.render();
    });

    it("exists", () => {
      const overviewContainer = document.getElementById("overviewView");
      expect(overviewView).to.not.be.a("null");
    });

    it("has a print button", () => {
      const printBtn = document.getElementById("toPrintBtn");
      expect(printBtn).to.not.be.a("null");
    });


    it("Has a number of guests value", () => {
      const valueHolders = document.getElementsByClassName("value-num-guests");
      expect(valueHolders.length).to.be.above(0);
      for (let v of valueHolders) {
        expect(v).to.not.be.a("null");
        expect(v.innerHTML).to.equal(""+model.getNumberOfGuests());
      }
    });

    it("Has data on current dishes", () => {
      
        const valueHolders = document.getElementsByClassName("value-main-course-name");
        expect(valueHolders.length).to.be.above(0);
        for (let v of valueHolders) {
          expect(v).to.not.be.a("null");
          expect(v.innerHTML).to.equal("Breakfast Pizza");
        }
    });

    it("Displays the total price correctly", () => {
        const valueHolders = document.getElementsByClassName("value-total-price");
        expect(valueHolders.length).to.be.above(0);
        for (let v of valueHolders) {
          expect(v).to.not.be.a("null");
          expect(v.innerHTML).to.equal(""+model.getTotalMenuPrice());
        }
    });
  });

  describe("Sidebar view", () => {
    beforeEach(async () => {
      model = new DinnerModel();
      model.setNumberOfGuests(1);
      sidebarView = new SidebarView(document.getElementById("page-content"), model);
      sidebarController = new SidebarController(sidebarView, model);
      await sidebarController.renderView();
    });

    it("Has a number of guests input", () => {
        const input = document.getElementsByClassName("input-num-guests")[0];
        expect(input).to.not.be.a("null");
        expect(input.tagName).to.equal("INPUT");
        expect(input.value).to.equal("1");
    });

    it("Controller modifies the model", () => {
        const input = document.getElementsByClassName("input-num-guests")[0];
        input.value = 5;
        input.dispatchEvent(new Event("input"));
        expect(""+model.getNumberOfGuests()).to.equal("5");
    });

    it("Observer updates the view", () => {
      model.setNumberOfGuests(6);
      const input = document.getElementsByClassName("input-num-guests")[0];
      expect(""+input.value).to.equal("6");
    });
  });

  describe("DishDetails view", () => {
    beforeEach(async () => {
      model = new DinnerModel();
      model.setCurrentDish(559251);
      let dishDetailsView = new DishDetailsView(document.getElementById("page-content"), model);
      let dishDetailsController = new DishDetailsController(dishDetailsView, model);
      await dishDetailsController.renderView();
    });
    
    it("has number of guests", () => {
      const v = document.getElementById('ddNoOfGuests');
      expect(v).to.not.be.a("null");
      expect(v.innerHTML).to.equal(""+model.getNumberOfGuests());
    });

    it("has dish serving price", () => {
      const v = document.getElementById('ddTotalPrice');
      expect(v).to.not.be.a("null");
      expect(v.innerHTML).to.equal(""+195.59);
    });

    it("Controller modifies the model", () => {
      const menuBtn = document.getElementsByClassName("addToMenu")[0];
      menuBtn.dispatchEvent(new Event("click"));
      const title = document.getElementById('ddTitle');
      expect(title.innerHTML).to.equal("Breakfast Pizza");
    });
  });
});
