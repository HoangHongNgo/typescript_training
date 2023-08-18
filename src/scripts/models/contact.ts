import { IContact } from "./interfaces/contactIFace";
import { IRelation } from "./interfaces/relationIFace";
import { v4 as uuidv4 } from "uuid";
import { DEFAULT_AVATAR } from "../constants/constant";

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
  constructor(data: IContact) {
    this.id = data.id ? data.id : uuidv4();
    this.name = data.name;
    this.relationId = data.relationId;
    this.phone = data.phone;
    this.email = data.email;
    this.avatar = data.avatar ? data.avatar : DEFAULT_AVATAR.DEFAULT;
    this.work = data.work;
    this.about = data.about;
    this.relation = data.relation;
  }
}

export default Contact;
