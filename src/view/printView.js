class PrintView {
    constructor(container, model) {
        this.container = container;
        this.model = model;
    }
    removeObserver() {
      this.model.removeObserver(this);
    }

    // An example of creating HTML procedurally. Think about the pros and cons of this approach.
    render() {
      var content = `
      
        <div class="row"> 
          <div class="col-sm-12"><h1>Dinner Planner</h1></div>
          <div class="col-12 col-sm-4">
            <p>My Dinner: <span id="value-num-guests">${this.model.getNumberOfGuests()}</span> people </p>
          </div>
          <div class="col-12 col-sm-8">
            <a href="#search" class="btn btn-success float-sm-right">Go back and edit dinner</a>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <hr>
          </div>
          <div class="col-12">
            <div class="row" id="dishDetailsPrint"></div>
          </div>
        </div>
      `;
      this.container.innerHTML = content;
     
      let dishDetails = document.getElementById('dishDetailsPrint');
      let menu = this.model.getFullMenu();
      for(let i = 0;i < menu.length; i++) {
        let content = `
        <div class="col-12 col-sm-4">
            <img class="img-fluid" src="${menu[i].image}" >
        </div>
        <div class="col-12 col-sm-4">
            <h2>${menu[i].title}</h2>
            <p>Lorem ipsum dadadadad doo</p>
        </div>
        <div class="col-12 col-sm-4">
            <h3>Preparation</h3>
            <p>${menu[i].instructions}</p>
          </div>
        `;
        dishDetails.innerHTML += content;
      }
      this.afterRender();
    }

    afterRender() {
    }
    showView() {
      this.container.style.display = 'block';
    }
  
    hideView() {
        this.container.style.display = 'none';
    }
    update(model, changeDetails) {
      if(changeDetails.numOfGuests) {
        document.getElementById('value-num-guests').value = changeDetails.numOfGuests;
      }
    }
}
