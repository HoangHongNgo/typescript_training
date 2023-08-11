import Contact from "../models/contact";
import ContactTmpl from "../templates/contactTmpl";

interface IFilter {
  searchKey: string;
  filter: {
    relation: string;
  };
}

type ShowInfoFnc = (id?: string) => void;

class ContactView {
  private contactListEl: Element;
  private infoEl: Element;
  private addBtnEl: Element;
  private searchInputEl: Element;
  private filterBtnEl: Element;
  private filterDropDown: Element;
  private deleteBtnEl?: Element;
  private editBtnEl?: Element;
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
   * @param {Contact} contact
   */
  renderContact = (contact: Contact): void => {
    const contactTemplate = ContactTmpl.renderContact(contact);
    this.contactListEl.innerHTML += contactTemplate;
  };

  /**
   * Render contact infomation.
   * @param {Contact | null} contactInfo
   */
  renderContactInfo = (contactInfo: Contact | undefined): void => {
    if (contactInfo) {
      this.infoEl.innerHTML = ContactTmpl.renderContactInfo(contactInfo);
      this.deleteBtnEl = this.infoEl.querySelector(".info__button__delete")!;
      this.editBtnEl = this.infoEl.querySelector(".info__button__edit")!;
      //   this.addEventDeleteContact(this.deleteBtnEl, confirmDelete);
      //   this.addEventEditContact(this.editBtnEl, editContact);
    } else {
      this.infoEl.innerHTML = "";
    }
  };

  //----- EVENT HANDLER -----//

  /**
   * Add delegate lisnter showing contact information actions to each contact element.
   * @param {ShowInfoFnc} showInfo
   */
  addDelegateShowInfo = (showInfo: ShowInfoFnc): void => {
    this.contactListEl.addEventListener("click", (event) => {
      this.contactListEl.querySelector(this.contactEl + ".contact-item--active")?.classList.remove("contact-item--active");
      const el: Element | null = (event.target as Element).closest(this.contactEl);
      if (el) {
        el.classList.add("contact-item--active");
        const contactId = el.getAttribute("data-id");
        showInfo(contactId!);
      }
    });
  };
}

export default ContactView;
