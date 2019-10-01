class SidebarView  {
  constructor(container, model) {
      this.container = container;
      this.model = model;
      this.confirmBtn = null;
      this.guestsInput = null;
      this.resetBtn = null;
      this.shown = false;
      model.addObserver(this);
  }
  removeObserver() {
    this.model.removeObserver(this);
  }
  // An example of creating HTML procedurally. Think about the pros and cons of this approach.
  render() {
    this.shown = true;
      var content = `
        
          <nav class="navbar navbar-expand-lg navbar-light bg-light">
              <span class="navbar-brand" href="#">My Dinner <span class="d-block d-sm-none">${this.model.getTotalMenuPrice()} SEK</span></span>
              <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#confirmForm" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                  <span class="navbar-toggler-icon"></span>
              </button>
              <div class="collapse navbar-collapse" id="confirmForm">
                  <ul class="navbar-nav" style="display:block;">
                     
                      <li class="nav-item">   
                          <form>
                            <div class="form-row">
                              <div class="col-12">
                                <label for="guests">Guests</label>
                                <input type="number" id="guests" class="input-num-guests form-control" value="${this.model.getNumberOfGuests()}">
                              </div>
                            </div>
                          </form>
                      </li>
                      <li class="nav-item">
                          <table class="table">
                              <thead>
                                  <tr>
                                      <th scope="col">Dish Name</th>
                                      <th>Cost</th>
                                  </tr>
                              </thead>
                              <tbody class="table-body"><span>`;
    
          this.model.getFullMenu().forEach(
              (dish) => {
                  content += `<tr><td class="value-main-course-name">${dish.title}</td><td>${dish.pricePerServing}</td></tr>`
              }
          );
              
          content += `    </span>
                          <tr><td>Total</td> <td><span class="value-total-price">${this.model.getTotalMenuPrice()}</span> SEK</tr>
                          <tr><td><a href="#overview" class="btn btn-primary confirmBtn">Confirm Dinner</a></td>
                          <td><button type="button" class="btn btn-warning resetBtn">Reset Menu</button></td></tr>
                      </tbody>
                  </table>
              </li>
          </div>
          </nav>
        `;
    if(document.getElementById('sideBarView'))
      this.container = document.getElementById('sideBarView');
    this.container.className = "col-12 col-sm-4";
    this.container.innerHTML = content;
    this.afterRender();
  }

  afterRender() {
    this.confirmBtn = this.container.getElementsByClassName("confirmBtn")[0];
    this.guestsInput = this.container.getElementsByClassName("input-num-guests")[0];
    this.resetBtn = this.container.getElementsByClassName("resetBtn")[0];
  }
  
  showView() {
    this.container.style.display = 'block';
  }

  hideView() {
    this.container.style.display = 'none';
  }
  
  update(model, changeDetails) {
    // TODO Lab3
    if(changeDetails.dish && this.shown) {
      let table = this.container.getElementsByClassName('table-body')[0];
      table.innerHTML = "";
      model.getFullMenu().forEach(
        (dish) => {
            table.innerHTML += `<tr><td class="value-main-course-name">${dish.title}</td><td>${dish.pricePerServing}</td></tr>`
        });
        table.innerHTML += `<tr><td>Total</td> <td><span class="value-total-price">${model.getTotalMenuPrice()}</span> SEK</tr>
        <tr><td colspan="2"><a href="#overview" class="btn btn-primary confirmBtn">Confirm Dinner</a></td></tr>`;
        this.container.getElementsByClassName('value-total-price')[0].innerHTML = model.getTotalMenuPrice();
      } 
      if(changeDetails.numOfGuests) {
        this.container.getElementsByClassName('input-num-guests')[0].value = changeDetails.numOfGuests;
        this.container.getElementsByClassName('value-total-price')[0].innerHTML = model.getTotalMenuPrice();
      }
  }

}
