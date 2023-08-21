class LoadingView {
  private loadingEl: HTMLElement;

  /**
   * Constructor function for LoadingView object.
   */
  constructor() {
    this.loadingEl = document.querySelector('.loading')!;
  }

  //----- RENDERING -----//

  /**
   * Display the loading gif.
   */
  displayLoading = () => {
    this.loadingEl.classList.add('loading--show');
  };

  /**
   * Close the loading gif.
   */
  closeLoading = () => {
    this.loadingEl.classList.remove('loading--show');
  };
}

export default LoadingView;
