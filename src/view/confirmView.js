class ConfirmView {
    constructor(container, model) {
        this.container = container;
        this.model = model;
    }

    // An example of creating HTML procedurally. Think about the pros and cons of this approach.
    render() {
        var content = `
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <span class="navbar-brand" href="#">My Dinner <span class="visible-xs">${this.model.getTotalMenuPrice()} SEK</span></span>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#confirmForm" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="confirmForm">
                    <ul class="navbar-nav" style="display:block;">
                       
                        <li class="nav-item">   
                            <form class="form-inline">
                                <div class="form-group form-horizontal">
                                    <label for="guests" class="mr-2"    >People</label>
                                    <select class="form-control  mb-2" id="guests">`;
        for(let i = 1; i <= 10; i++) {
            if(i == this.model.getNumberOfGuests()) content += `<option selected="selected">${i}</option>`;
            else content += `<option>${i}</option>`;
        }
        content += `</select>
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
                            <tr><td>Total</td> <td>${this.model.getTotalMenuPrice()} SEK</tr>
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
