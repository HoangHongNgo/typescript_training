import { IRelation } from "./relationIFace";

export interface IContactCommon {
  id: string | null;
  Cname: string;
  relationId: string;
  phone: string;
  email: string;
  avatar: string;
  about: string;
}

export interface IContactFormInfo extends IContactCommon {
  work: {
    job: string;
    company: string;
  };
}

export interface IContact extends IContactFormInfo {
  relation: IRelation;
}
