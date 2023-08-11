import { ContactIFace } from "../models/interfaces/contactInterface";
import Service from "./service";
import { API_GATEWAY_URL, PATH, QUERY } from "../constants/api";

class ContactService extends Service<ContactIFace>{
    private query: string;

    /**
     * Constructor of Service object.
     */
    constructor() {
        super(API_GATEWAY_URL, PATH.CONTACT);
        this.query = QUERY.EXPAND_RELATION;
    }

    /**
     * Get list of object from database.
     * @returns {Promise<ContactIFace[]>} list of objects
     */
    getList = async (): Promise<ContactIFace[]> => {
        const data = await this.apiRequest.getList(this.query);
        return data;
    }

    /**
     * Get object by ID from database.
     * @returns {Promise<ContactIFace>} an objects
     */
    getById = async (id: string): Promise<ContactIFace> => {
        const data = await this.apiRequest.getById(id, this.query);
        return data;
    }
}

export default ContactService;