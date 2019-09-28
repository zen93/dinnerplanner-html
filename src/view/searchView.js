class SearchView {
  constructor(container, model) {
      this.container = container;
      this.model = model;
  }

  // An example of creating HTML procedurally. Think about the pros and cons of this approach.
  async render() {
    let dishes = await this.model.getAllDishes();
  var content =
        `
        <div class="row"> 
          <div class="col-sm-12"><h1>Dinner Planner</h1></div>
          <div id="sideBarView" class="col-12 col-sm-4">
          </div>
          <div class="col-12 col-sm-8" id="dishSearchView">
              <h2>Find a dish</h2>
              <form>
                  <div class="form-row">
                      <div class="col-12 col-sm-5">
                          <input class="form-control" type="text" placeholder="Enter keyworkds">
                      </div>
                      <div class="col-12 col-sm-4"> 
                          <select class="form-control" id="value-num-guests">
                              <option>main course</option>
                              <option>side dish</option>
                              <option>dessert</option>
                              <option>appetizer</option>
                              <option>salad</option>
                              <option>bread</option>
                              <option>breakfast</option>
                              <option>soup</option>
                              <option>beverage</option>
                              <option>sauce</option>
                              <option>drink</option>
                          </select>
                      </div>
                      <button type="button" class="btn btn-success">search</button>
                  </div>
              </form>
              <div class="col-12"><hr></div>
              <div class="row" id="dishItems">`
      dishes.forEach((dish) => {
          content += `<div class="col-12 col-sm-3"><p class="value-main-course-name">${dish.title}</p>
          <img style="margin-bottom:10px;" src="${dish.image}" class="img-fluid"></div>`;
      })
      content += `</div>
          </div>
          </div>
      </div>
    `;
    this.container.innerHTML = content;
    let confirmView = new ConfirmView(document.getElementById('sideBarView'), this.model);
    confirmView.render();
    this.afterRender();
  }

  afterRender() {
  }

  update(payload) {
    // TODO lab3
  }
}
