import { IRelation } from "./relationInterface";

export interface IContactFormInfo {
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
}

export interface IContact extends IContactFormInfo {
  relation: IRelation;
}
