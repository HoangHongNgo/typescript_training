import { RelationIFace } from "./relationInterface";

export interface ContactFormInfoIFace {
    id: string;
    name: string;
    relationId: string;
    phone: string;
    email: string;
    avatar: string;
    work: {
        job: string;
        company: string;
    }
    about: string
}

export interface ContactIFace extends ContactFormInfoIFace {
    relation: RelationIFace;
}