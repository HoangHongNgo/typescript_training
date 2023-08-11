import Contact from "../models/contact";
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
    this.showInfo();
    this.view.contact.addDelegateShowInfo(this.showInfo);
  };

  /**
   * Load and display the contact list.
   */
  loadListContacts = (): void => {
    const contactList = this.model.contact.getContactList();
    this.view.contact.renderContactList(contactList);
  };

  /**
   * Display the contact information by contact's id or by default.
   * @param {String} contactId
   */
  showInfo = async (contactId?: string) => {
    if (contactId) this.model.contact.setContactInfo(contactId);
    const contactInfo: Contact | undefined = this.model.contact.getContactInfo();
    this.view.contact.renderContactInfo(contactInfo);
  };
}

export default Controller;
