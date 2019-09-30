class DishDetailsView {
    constructor(container, model) {
        this.container = container;
        this.model = model;
        this.backToSearchBtn = null;
    }

    removeObserver() {
        this.model.removeObserver(this);
    }

    updateHash() {
        window.location.hash = this.hash;
    }
    // An example of creating HTML procedurally. Think about the pros and cons of this approach.
    async render() {
        this.container.className = "col-12 col-sm-8";
      let dish = await this.model.getDish(this.model.getCurrentDish());
    var content =
        `     <div class="row">
                <div class="col-12 col-sm-6">
                    <h2>${dish.title}</h2>
                    <img style="margin-bottom:10px;" src="${dish.image}" class="img-fluid"> 
                    <button type="button" class="btn btn-success backToSearchBtn">Back to search</button>
                    <h2>Preparation</h2>
                    <p>${dish.instructions}</p>
                </div>
            <div class="col-12 col-sm-6" >
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col" colspan="2">Ingredients for ${this.model.getNumberOfGuests()} people</th>
                        </tr>
                    </thead>
                    <tbody>`;
        dish.extendedIngredients.forEach((ingredient) => {
        let qty = ingredient.amount * this.model.getNumberOfGuests();
        content += `<tr><td>${qty} ${ingredient.unit}</td>
                    <td>${ingredient.name}</td></tr>`
        });

        content += `
                        <tr>
                            <td><a href="#dishDetails" id=${dish.id} class="btn btn-primary addToMenu">Add to Menu</a>
                            <td>${dish.pricePerServing} SEK</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
      `;
      
      this.container.innerHTML = content;
      //document.getElementById('addToMenu').onclick = () => { this.model.addDishToMenu(dish.id)};
      //let sidebarView = new SidebarView(document.getElementById('sideBarView'), this.model);
      //sidebarView.render();
      this.afterRender();
    }

    showView() {
        this.container.style.display = 'block';
    }
    
    hideView() {
        this.container.style.display = 'none';
    }

    update(model, changeDetails) {       
    }

    afterRender() {
        this.backToSearchBtn = this.container.getElementsByClassName('backToSearchBtn')[0];
        this.addToMenuBtn = this.container.getElementsByClassName('addToMenu')[0];
    }
}
