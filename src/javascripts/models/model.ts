import ContactsModel from "./contacts";
import RelationsModel from "./relations";

class Model {
  contact: ContactsModel;
  relation: RelationsModel;

  constructor() {
    this.contact = new ContactsModel();
    this.relation = new RelationsModel();
  }
}

export default Model;
