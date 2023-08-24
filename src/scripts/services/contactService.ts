import { IContact } from '../models/interfaces/contactInterface';
import Service from './service';
import { API_ENDPOINT_URL, PATH, QUERY } from '../constants/api';

class ContactService extends Service<IContact> {
  private query: string;

  /**
   * Constructor of Service object.
   */
  constructor() {
    super(API_ENDPOINT_URL, PATH.CONTACT);
    this.query = QUERY.EXPAND_RELATION;
  }

  /**
   * Get list of object from database.
   * @returns {Promise<IContact[]>} list of objects
   */
  getList = async (): Promise<IContact[]> => {
    const data = await this.apiRequest.getList(this.query);
    return data;
  };

  /**
   * Get object by ID from database.
   * @returns {Promise<IContact>} an objects
   */
  getById = async (id: string): Promise<IContact> => {
    const data = await this.apiRequest.getById(id, this.query);
    return data;
  };
}

export default ContactService;
