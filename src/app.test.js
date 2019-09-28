var assert = chai.assert;
var expect = chai.expect;

describe("DinnerPlanner App", () => {
  let model = null;
  let homeView = null;
  let searchView = null;
  let overviewView = null;

  beforeEach(() => {
    model = new DinnerModel();
    homeView = new HomeView(document.querySelector("#page-content"));
    searchView = new SearchView(document.querySelector("#page-content"), model);
    overviewView = new OverviewView(document.querySelector("#page-content"), model);
  });

  describe("Home View", () => {
    it("has the start button", () => {
      homeView.render();
      const button = document.getElementById("startBtn");
      expect(button).to.not.be.a("null");
    });
  });

  describe("Search view", () => {
    beforeEach(() => {
      model.addDishToMenu(559251);
      searchView.render();
    });

    it("has a sidebar", () => {
      setTimeout(()=> {
        const sidebar = document.getElementById("sideBarView");
        expect(sidebar).to.not.be.a("null");
      }, 10000);
    });

    it("has a dish search container", () => {
      setTimeout(()=> {
        const dishSearch = document.getElementById("dishSearchView");
        expect(dishSearch).to.not.be.a("null");
      }, 10000);
    });

    it("displays a loading message", () => {
      setTimeout(()=> {
        const loader = document.getElementById("loader");
        expect(loader).to.not.be.a("null");
          
      }, 10000);
    });

    it("displays dishes", () => {
      setTimeout(()=> {
        const dishes = document.getElementById("dishItems");
        expect(dishes).to.not.be.a("null");
      }, 10000);
    });

    it("Has a number of guests value", () => {
      setTimeout(()=> {
        const valueHolders = document.getElementsByClassName("value-num-guests");
        expect(valueHolders.length).to.be.above(0);
        for (let v of valueHolders) {
          expect(v).to.not.be.a("null");
          expect(v.innerHTML).to.equal(""+model.getNumberOfGuests());
        }
      }, 10000);
    });

    it("Has data on current dishes", () => {
      setTimeout(()=> {

        const valueHolders = document.getElementsByClassName("value-main-course-name");
        expect(valueHolders.length).to.be.above(0);
        for (let v of valueHolders) {
          expect(v).to.not.be.a("null");
          expect(v.innerHTML).to.equal("Breakfast Pizza");
        }
      }, 10000);  
    });

    it("Displays the total price correctly", () => {
      setTimeout(()=> {
        const valueHolders = document.getElementsByClassName("value-total-price");
        expect(valueHolders.length).to.be.above(0);
        for (let v of valueHolders) {
          expect(v).to.not.be.a("null");
          expect(v.innerHTML).to.equal(""+model.getTotalMenuPrice());
        }
      }, 10000);
      
    });
  });

  describe("Confirmation page", () => {
    beforeEach(() => {
      model.addDishToMenu(559251);
      model.setNumberOfGuests(1);
      overviewView.render();
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
      setTimeout(() => {
        const valueHolders = document.getElementsByClassName("value-main-course-name");
        expect(valueHolders.length).to.be.above(0);
        for (let v of valueHolders) {
          expect(v).to.not.be.a("null");
          expect(v.innerHTML).to.equal("Breakfast Pizza");
        }
      }, 10000);
    });

    it("Displays the total price correctly", () => {
      setTimeout(() => {
        const valueHolders = document.getElementsByClassName("value-total-price");
        expect(valueHolders.length).to.be.above(0);
        for (let v of valueHolders) {
          expect(v).to.not.be.a("null");
          expect(v.innerHTML).to.equal(""+model.getTotalMenuPrice());
        }
      }, 10000);
    });
  });
});
