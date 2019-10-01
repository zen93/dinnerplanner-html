class SearchView {
  constructor(container, model) {
      this.container = container;
      this.model = model;
      model.addObserver(this);
      this.searchBtn = null;
      this.dishTitles = [];
      this.keywords = null;
      this.dishType = null;
  }
  removeObserver() {
    this.model.removeObserver(this);
  }
  // An example of creating HTML procedurally. Think about the pros and cons of this approach.
  async render() {
    this.container.className = "col-12 col-sm-8";
    
    //let model = this.model;
  var content =
        `
        
          <div id="loader" class="spinner-border" role="status">
            <span class="sr-only">Loading...</span>
          </div>
          <div id="sideBarView" class="col-12 col-sm-4"></div>
          <div class="col-12" id="dishSearchView">
              <h2>Find a dish</h2>
              
                  <div class="form-row">
                      <div class="col-12 col-sm-5">
                          <input class="form-control keywordInput" type="text" placeholder="Enter keywords">
                      </div>
                      <div class="col-12 col-sm-4"> 
                          <select class="form-control dishType">
                              <option>all</option>
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
                      <button type="button" class="btn btn-success searchBtn">search</button>
                  </div>
              <div class="col-12"><hr></div>
              <div class="row dishItems" id="dishItems">`
      // dishes.forEach((dish) => {
      //     content += `<div class="col-12 col-sm-3" id=${dish.id}><p><a class="dishTitle" href="#dishDetails" id="${dish.id}">${dish.title}</a></p>
      //     <img style="margin-bottom:10px;" src="${dish.image}" class="img-fluid"></div>`;
      // })
      content += `</div>
          </div>
          </div>
     
    `;
    
    this.container.innerHTML = content;
    //let sidebarView = new SidebarView(document.getElementById('sideBarView'), this.model);
    //sidebarView.render();
    let dishes =  await this.model.getAllDishes();
    this.afterRender();
  }

  afterRender() {
    document.getElementById('loader').style.display = 'none';
    this.searchBtn = this.container.getElementsByClassName("searchBtn")[0];
    this.keywords = this.container.getElementsByClassName("keywordInput")[0];
    this.dishType = this.container.getElementsByClassName("dishType")[0];
    let dishTitles = this.container.getElementsByClassName('dishTitle');
    for(let i = 0; i < dishTitles.length; i++) {
      this.dishTitles.push(dishTitles[i]);
    }
  }
  
  showView() {
    this.container.style.display = 'block';
  }

  hideView() {
    this.container.style.display = 'none';
  }

  update(model, changeDetails) {
    // TODO lab3
    if(changeDetails.dishes) {
      if(changeDetails.dishes.length > 0) {
        let dishItems = this.container.getElementsByClassName('dishItems')[0];
        dishItems.innerHTML = "";
        changeDetails.dishes.forEach((dish) => {
          dishItems.innerHTML += `<div class="col-12 col-sm-3" id=${dish.id}><p><a class="dishTitle" href="#dishDetails" id="${dish.id}">${dish.title}</a></p>
          <img style="margin-bottom:10px;" src="${dish.image}" class="img-fluid"></div>`;
        });
        let dishTitles = this.container.getElementsByClassName('dishTitle');
        for(let i = 0; i < dishTitles.length; i++) {
          this.dishTitles.push(dishTitles[i]);
        }
      }
    }
  }
}
