class HomeView {
  constructor(container) {
    this.container = container;
    this.startBtn = null;
  }
  
  // An example of creating HTML declaratively. Think about the pros and cons of this approach.
  render() {
    var content = /* template */ `
    <div class="container text-center full-vh d-flex align-items-center justify-content-center flex-column">
        <p class="text-center p-max-width">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vel laoreet orci. Nullam ut iaculis diam. Aliquam
          magna nulla, congue ut elementum hendrerit, dignissim at mauris. Quisque ac felis sed nibh elementum euismod a sit amet
          arcu. Maecenas a efficitur leo.
        </p>
        <div class="spacing-medium"></div>
        <a id="startBtn" class="startBtn btn btn-lg btn-primary">
          Create new dinner
        </a>
      </div>
    `;
    this.container.innerHTML = content;
    this.afterRender();
  }

  afterRender() {
    this.startBtn = this.container.getElementsByClassName("startBtn")[0];
  }
  
  showView() {
    this.container.style.display = 'block';
  }

  hideView() {
    this.container.style.display = 'none';
  }
  update(payload) {
    // TODO Lab3
  }
}
