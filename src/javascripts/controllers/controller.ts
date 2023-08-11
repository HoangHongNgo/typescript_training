import Model from "../models/model";
import View from "../views/view";

class Controller {
  model: Model;
  view: View;

  /**
   * Constructor of Controller object
   * @param {Object} model
   * @param {Object} view
   */
  constructor(model: Model, view: View) {
    this.model = model;
    this.view = view;
  }

  /**
   * Initializing the controller
   */
  init = async (): Promise<void> => {
    await this.initContacts();
  };

  //----- CONTACT CONTROLLER -----//

  /**
   * Initializing the contact list and contact information.
   */
  initContacts = async (): Promise<void> => {
    await this.model.contact.init();
  };
}

export default Controller;
