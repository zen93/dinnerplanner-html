class DishDetailsView {
    constructor(container, model) {
        this.container = container;
        this.model = model;
    }

    // An example of creating HTML procedurally. Think about the pros and cons of this approach.
    async render() {
      let dish = await this.model.getDish(this.model.getCurrentDish());
    var content =
          `
          <div class="row"> 
            <div class="col-sm-12"><h1>Dinner Planner</h1></div>
            <div id="sideBarView" class="col-12 col-sm-4">
            </div>
            <div class="col-12 col-sm-4">
                <h2>${dish.title}</h2>
                <img style="margin-bottom:10px;" src="${dish.image}" class="img-fluid"> 
                <button type="button" class="btn btn-success">Back to search</button>
                <h2>Preparation</h2>
                <p>${dish.instructions}</p>
            </div>
            <div class="col-12 col-sm-4" >
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
                            <td><a id="addToMenu" href="#" class="btn btn-primary">Add to Menu</a>
                            <td>${dish.pricePerServing} SEK</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
      `;
      this.container.innerHTML = content;
      document.getElementById('addToMenu').onclick = () => { this.model.addDishToMenu(dish.id)};
      let confirmView = new ConfirmView(document.getElementById('sideBarView'), this.model);
      confirmView.render();
      this.afterRender();
    }

    afterRender() {
    }
}
