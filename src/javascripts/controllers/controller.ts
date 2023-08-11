import Model from "../models/model";
import View from "../views/view";

class Controller {
  private model: Model;
  private view: View;

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
    this.loadListContacts();
  };

  /**
   * Load and display the contact list.
   */
  loadListContacts = (): void => {
    const contactList = this.model.contact.getContactList();
    this.view.contact.renderContactList(contactList);
  };
}

export default Controller;
