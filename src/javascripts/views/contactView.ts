import Contact from "../models/contact";
import ContactTmpl from "../templates/contactTmpl";

export interface IFilter {
  searchKey: string;
  filter: {
    relation: string;
  };
}
type ShowInfoFnc = (id?: string) => void;
type OpenAddModalFnc = (id?: string) => void;
type OpenEditModalFnc = (id: string) => void;
type OpenConfirmModalFnc = (id: string) => void;
type FilterFnc = (param: IFilter) => void;

class ContactView {
  private contactListEl: HTMLElement;
  private infoEl: HTMLElement;
  private addBtnEl: HTMLElement;
  private searchInputEl: HTMLElement;
  private filterBtnEl: HTMLElement;
  private filterDropDown: HTMLElement;
  private deleteBtnEl?: HTMLElement;
  private editBtnEl?: HTMLElement;
  private contactEl: string;
  private filterParams: IFilter;

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
   * @param {Contact[]} contacts
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
   * @param {Contact} contactInfo
   * @param {OpenConfirmModalFnc} openConfirmModal
   * @param {OpenModalFnc} openEditModal
   */
  renderContactInfo = (contactInfo: Contact, openConfirmModal: OpenConfirmModalFnc, openEditModal: OpenEditModalFnc): void => {
    if (contactInfo) {
      this.infoEl.innerHTML = ContactTmpl.renderContactInfo(contactInfo);
      this.deleteBtnEl = this.infoEl.querySelector(".info__button__delete")!;
      this.editBtnEl = this.infoEl.querySelector(".info__button__edit")!;
      this.addEventDeleteContact(this.deleteBtnEl, openConfirmModal);
      this.addEventEditContact(this.editBtnEl, openEditModal);
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

  /**
   * Add event listener adding a contact action to the add contact button.
   * @param {OpenModalFnc} openAddModal
   */
  addEventOpenAddModal = (openAddModal: OpenAddModalFnc): void => {
    this.addBtnEl.addEventListener("click", () => {
      openAddModal();
    });
  };

  /**
   * Add event listener deleting a contact action to the delete contact button.
   * @param {OpenConfirmModalFnc} openConfirmModal
   */
  addEventDeleteContact = (el: HTMLElement, openConfirmModal: OpenConfirmModalFnc): void => {
    el.addEventListener("click", (event) => {
      const contactId = ((event.target as HTMLElement).parentNode as HTMLElement).getAttribute("data-id")!;
      openConfirmModal(contactId);
    });
  };

  /**
   * Add event listener editing a contact action to the edit contact button.
   * @param {OpenModalFnc} openEditModal
   */
  addEventEditContact = (el: HTMLElement, openEditModal: OpenEditModalFnc): void => {
    el.addEventListener("click", (event) => {
      const contactId = ((event.target as HTMLElement).parentNode as HTMLElement).getAttribute("data-id")!;
      openEditModal(contactId);
    });
  };

  /**
   * Add event listener searching contacts to the search input.
   * @param {FilterFnc} searchContact
   */
  addEventSearchContact = (filterContact: FilterFnc): void => {
    this.searchInputEl.addEventListener("keyup", (event) => {
      this.filterParams.searchKey = (event.target as HTMLInputElement).value.toLowerCase();
      filterContact(this.filterParams);
    });
  };

  /**
   * Add event listenter showing filter options to the filter button.
   */
  addEventShowFilterOptions = (): void => {
    this.filterBtnEl.addEventListener("click", () => {
      this.filterBtnEl.querySelector("img")!.classList.toggle("rot-90");
      this.filterDropDown.classList.toggle("relation-dropdown--active");
    });
  };

  /**
   * Add delegate listener filtering contacts to each filter option.
   * @param {FilterFnc} filterContact
   */
  addDelegateFilterContact = (filterContact: FilterFnc): void => {
    this.filterDropDown.addEventListener("change", (event) => {
      const el: HTMLInputElement = (event.target as HTMLElement).closest("input")!;
      this.filterParams.filter.relation = el.value;
      filterContact(this.filterParams);
    });
  };
}

export default ContactView;
