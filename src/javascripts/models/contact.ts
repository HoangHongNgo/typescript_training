import { IContact } from "./interfaces/contactInterface";
import { IRelation } from "./interfaces/relationInterface";

class Contact implements IContact {
  id: string;
  name: string;
  relationId: string;
  phone: string;
  email: string;
  avatar: string;
  work: {
    job: string;
    company: string;
  };
  about: string;
  relation: IRelation;

  /**
   * Constructor of Contact object.
   */
  constructor({ id, name, relationId, phone, email, avatar, work, about, relation }: IContact) {
    this.id = id;
    this.name = name;
    this.relationId = relationId;
    this.phone = phone;
    this.email = email;
    this.avatar = avatar;
    this.work = work;
    this.about = about;
    this.relation = relation;
  }
}

export default Contact;
