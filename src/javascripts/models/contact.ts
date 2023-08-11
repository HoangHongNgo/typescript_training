import { ContactIFace } from "./interfaces/contactInterface";
import { RelationIFace } from "./interfaces/relationInterface";

class Contact implements ContactIFace {
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
  relation: RelationIFace;

  /**
   * Constructor of Contact object.
   */
  constructor({ id, name, relationId, phone, email, avatar, work, about, relation }: ContactIFace) {
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
