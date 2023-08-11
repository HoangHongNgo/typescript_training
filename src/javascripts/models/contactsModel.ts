import ContactService from "../services/contactService";
import Contact from "./contact";
import { IContact } from "./interfaces/contactInterface";

class ContactsModel {
  service: ContactService;
  contactList: Contact[];

  /**
   * Constructor of Contacts object.
   */
  constructor() {
    this.service = new ContactService();
    this.contactList = [];
  }

  init = async (): Promise<void> => {
    const data: IContact[] = await this.service.getList();
    this.contactList = this.parseData(data);
    console.log(this.contactList);
  };

  parseData = (data: IContact[]): Contact[] => {
    return data.map((item: IContact) => new Contact(item));
  };

  getContactList = () => {
    return this.contactList;
  };
}

export default ContactsModel;
