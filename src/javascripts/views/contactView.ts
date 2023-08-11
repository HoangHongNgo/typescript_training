import Contact from "../models/contact";
import ContactTmpl from "../templates/contactTmpl";

interface IFilter {
  searchKey: string;
  filter: {
    relation: string;
  };
}

class ContactView {
  private contactListEl: Element;
  private infoEl: Element;
  private addBtnEl: Element;
  private searchInputEl: Element;
  private filterBtnEl: Element;
  private filterDropDown: Element;
  private contactEl: string;
  filterParams: IFilter;
  /**
   * Constructor of ContactView object
   */
  constructor() {
    this.contactListEl = document.querySelector(".contacts__list")!;
    this.infoEl = document.querySelector(".info")!;
    this.addBtnEl = document.querySelector(".features__add")!;
    this.searchInputEl = document.querySelector(".features__search__input")!;
    this.filterBtnEl = document.querySelector(".features__filter > button")!;
    this.filterDropDown = document.querySelector(".relation-dropdown")!;
    this.contactEl = ".contact-item";
    this.filterParams = {
      searchKey: "",
      filter: {
        relation: "0",
      },
    };
  }

  //----- RENDERING -----//

  /**
   * Display the contact list.
   * @param {Array} contacts
   */
  renderContactList = (contacts: Contact[]): void => {
    this.contactListEl.innerHTML = "";
    contacts.forEach((contact) => {
      this.renderContact(contact);
    });
  };

  /**
   * Render a contact in contact list.
   * @param {Object} contact
   */
  renderContact = (contact: Contact): void => {
    const contactTemplate = ContactTmpl.renderContact(contact);
    this.contactListEl.innerHTML += contactTemplate;
  };
}

export default ContactView;
