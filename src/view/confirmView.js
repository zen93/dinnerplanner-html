class ConfirmView {
    constructor(container, model) {
        this.container = container;
        this.model = model;
    }

    // An example of creating HTML procedurally. Think about the pros and cons of this approach.
    render() {
        var content = `
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <span class="navbar-brand" href="#">My Dinner <span class="d-block d-sm-none">${this.model.getTotalMenuPrice()} SEK</span></span>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#confirmForm" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="confirmForm">
                    <ul class="navbar-nav" style="display:block;">
                       
                        <li class="nav-item">   
                            <form class="form-row">
                                <div class="col-12">
                                    <label for="guests" class="mr-2"    >Guests</label>
                                    <input type="number" id="guests" class="value-num-guests" value="${this.model.getNumberOfGuests()}">        
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
                                <tbody>`;
      
            this.model.getFullMenu().forEach(
                (dish) => {
                    content += `<tr><td>${dish.title}</td><td>${dish.pricePerServing}</td></tr>`
                }
            );
                
            content += `
                            <tr><td>Total</td> <td><span class="value-total-price">${this.model.getTotalMenuPrice()}</span> SEK</tr>
                            <tr><td colspan="2"><a href="#" class="btn btn-primary">Confirm Dinner</a></td></tr>
                        </tbody>
                    </table>
                </li>
            </div>
            </nav>
          `;
      
      this.container.innerHTML = content;
      this.afterRender();
    }

    afterRender() {
    }
}
