import { IRelation } from './relationIFace';

export interface IContactCommon {
  id: string | null;
  name: string;
  relationId: string;
  phone: string;
  email: string;
  avatar: string;
  about: string;
  work: {
    job: string;
    company: string;
  };
}

export interface IContact extends IContactCommon {
  relation: IRelation;
}
