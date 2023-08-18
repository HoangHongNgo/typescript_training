import ContactService from "../services/contactService";
import { IFilter } from "../views/contactView";
import Contact from "./contact";
import { IContact } from "./interfaces/contactIFace";

class ContactsModel {
  private service: ContactService;
  private contactList: Contact[];
  private contactInfo: Contact | undefined;

  /**
   * Constructor of Contacts object.
   */
  constructor() {
    this.service = new ContactService();
    this.contactList = [];
    this.contactInfo = undefined;
  }

  /**
   * Initializing contact list and contact info.
   */
  init = async (): Promise<void> => {
    const data: IContact[] = await this.service.getList();
    if (data) this.contactList = this.parseData(data);
    this.contactInfo = this.contactList[0];
  };

  /**
   * Parsing contact data from database to list of contact objects.
   * @param {IContact[]} data
   * @returns {Contact[]}
   */
  parseData = (data: IContact[]): Contact[] => {
    return data.map((item: IContact) => new Contact(item));
  };

  /**
   * Get the current contact list.
   * @returns {Contact[]} the current contact list.
   */
  getContactList = (): Contact[] => {
    return this.contactList;
  };

  /**
   * Get the current contact info.
   * @returns {Contact | undefined} the current contact info or undefined.
   */
  getContactInfo = (): Contact | undefined => {
    return this.contactInfo;
  };

  /**
   * Setter for contact info.
   * @param {string} id
   */
  setContactInfo = (id: string): void => {
    const data: Contact | undefined = this.contactList.find((contact) => contact.id === id);
    this.contactInfo = data;
  };

  /**
   * Get contact infomation by ID.
   * @param {String} id
   * @returns {Contact} contact object.
   */
  getContactById = async (id: string): Promise<Contact> => {
    const data: IContact = await this.service.getById(id);
    this.contactInfo = new Contact(data);
    return this.contactInfo;
  };

  /**
   * Add contact to contact list and database.
   * @param {IContact} data
   */
  addContact = async (data: IContact): Promise<void> => {
    const contact = new Contact(data);
    await this.service.add(contact);
    this.contactList.push(contact);
    this.contactInfo = contact;
  };

  /**
   * Update contact in contact list and database.
   * @param {IContact} data
   */
  editContact = async (data: IContact): Promise<void> => {
    const contact = new Contact(data);
    await this.service.edit(contact.id, contact);
    this.contactList = this.contactList.map((item) => {
      if (item.id === contact.id) {
        this.contactInfo = contact;
        return contact;
      }
      return item;
    });
  };

  /**
   * Delete contact from contact list and database.
   * @param {String} id
   */
  deleteContactById = async (id: string): Promise<void> => {
    await this.service.delete(id);
    this.contactList = this.contactList.filter((item) => item.id !== id);
    this.contactInfo = this.contactList[0];
  };

  /**
   * Filter and search contact in contact displaying list.
   * @param {IFilter} params
   * @returns {Array} result list after filter
   */
  filterList = (params?: IFilter): Contact[] => {
    if (params) {
      const { filter, searchKey } = params;
      const result: Contact[] = this.contactList.filter((contact) => {
        let isMatchFilter: boolean = true;
        let isMatchSearch: boolean = true;
        // Match with filter
        if (filter.relation !== "0") {
          isMatchFilter = contact.relation.id === filter.relation;
        }
        // Match with search key
        if (searchKey) {
          const fields: (keyof Contact)[] = ["name", "phone", "email", "work"];
          isMatchSearch = fields.some((field) => contact[field].toString().toLowerCase().includes(searchKey));
        }
        return isMatchFilter && isMatchSearch;
      });
      this.contactInfo = result[0];
      return result;
    } else return this.contactList;
  };

  checkUniqueField = <T>(fieldName: string, data: T): string | null => {
    const contact: Contact | undefined = this.contactList.find((contact) => contact[fieldName as keyof Contact] === data);
    return contact ? contact.id : null;
  };
}

export default ContactsModel;
