import { API_ENDPOINT_URL, PATH } from '../constants/api';
import { IRelation } from '../models/interfaces/relationInterface';
import Service from './service';

class RelationService extends Service<IRelation> {
  /**
   * Constructor of Service object.
   */
  constructor() {
    super(API_ENDPOINT_URL, PATH.RELATION);
  }
}

export default RelationService;
