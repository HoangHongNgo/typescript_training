import wait from "../helpers/wait";

class SnackbarView {
  private snackbarEl: HTMLElement;
  private snackbarMsgEl: HTMLElement;

  /**
   * Constructor function for SnackbarView object.
   */
  constructor() {
    this.snackbarEl = document.querySelector(".snackbar")!;
    this.snackbarMsgEl = this.snackbarEl.querySelector(".snackbar__message")!;
  }

  //----- RENDERING -----//

  /**
   * Display the snackbar.
   * @param {String} message
   * @param {String} message
   */
  showSnackbar = async (type: string, message: string): Promise<void> => {
    this.snackbarEl.classList.add(`snackbar--${type}`);
    this.snackbarMsgEl.innerText = message;

    await wait(10);
    this.snackbarEl.classList.add("snackbar--show");

    await wait(3000);
    this.snackbarEl.classList.remove("snackbar--show");
  };
}

export default SnackbarView;
