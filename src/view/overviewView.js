class OverviewView {
    constructor(container, model) {
        this.container = container;
        this.model = model;
    }

    // An example of creating HTML procedurally. Think about the pros and cons of this approach.
    render() {
      var content = `
      
        <div class="row"> 
          <div class="col-sm-12"><h1>Dinner Planner</h1></div>
          <div id="loader" class="spinner-border" role="status">
            <span class="sr-only">Loading...</span>
          </div>
          <div class="col-12 col-sm-4">
            <p>My Dinner: <span class="value-num-guests">${this.model.getNumberOfGuests()}</span> people </p>
          </div>
          <div class="col-12 col-sm-8">
            <button type="button" class="btn btn-success float-sm-right">Go back and edit dinner</button>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <hr>
          </div>
          <div class="col-9">
            <div class="row" id="dishDetails"></div>
          </div>
          <div class="col-12 col-sm-3">
            <p class="value-total-price"></p>
          </div>
          <div class="col-12">
            <hr>
          </div>
          <div class="col-12 text-center">
            <button type="button" id="toPrintBtn" class="btn btn-warning">Print Recipe</button>
          </div>
        </div>
      `;
      this.container.innerHTML = content;
      // const paragraph = this.container.appendChild(document.createElement('P'))
      // paragraph.innerHTML = "This dinner will be Awesome!";

      // const num_people_val = this.model.getNumberOfGuests();
      // const paragraph2 = this.container.appendChild(document.createElement('P'))
      // const num_people = paragraph2.appendChild(document.createElement('SPAN'))
      // num_people.innerHTML = num_people_val;
      // paragraph2.innerHTML += " people are coming!";

      // const paragraph3 = this.container.appendChild(document.createElement('P'))
      // paragraph3.innerHTML = "We will be eating the following:";

      // const list = this.container.appendChild(document.createElement('UL'))

      // for(const food of ["Bread!", "Ham!", "Pizza!"]) {
      //   list.appendChild(document.createElement('UL')).innerHTML = food;
      // }
      let dishDetails = document.getElementById('dishDetails');
      let menu = this.model.getFullMenu();
      for(let i = 0;i < menu.length; i++) {
        let content = `
          <div class="col-12 col-sm-3">
            <img class="img-fluid" src="${menu[i].image}" >
            <p class="value-main-course-name">${menu[i].title}</p>
            <p>${menu[i].pricePerServing} SEK</p>
          </div>
        `;
        dishDetails.innerHTML += content;
      }
      // .forEach(dish => {
      //   let content = `
      //     <div class="col-12 col-sm-3">
      //       <img class="img-fluid" src="${dish.image}" >
      //       <p>${dish.title}</p>
      //       <p>${dish.pricePerServing} SEK</p>
      //     </div>
      //   `;
      //   dishDetails.innerHTML += content;
      // });
      let totalPrice = document.getElementsByClassName('value-total-price')[0];
      totalPrice.innerHTML = this.model.getTotalMenuPrice();
      this.afterRender();
    }

    afterRender() {
      let loader = document.getElementById('loader');
      loader.style.display = 'none';
    }

    update(payload) {
      // TODO Lab3
    }
}
