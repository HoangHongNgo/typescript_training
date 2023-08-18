import RelationService from "../services/relationService";
import { IRelation } from "./interfaces/relationIFace";
import Relation from "./relation";

class RelationsModel {
  service: RelationService;
  relationList: Relation[];

  /**
   * Constructor of Relations object.
   */
  constructor() {
    this.service = new RelationService();
    this.relationList = [];
  }

  /**
   * Initializing the Relations model.
   */
  init = async (): Promise<void> => {
    const data: IRelation[] = await this.service.getList();
    if (data) this.relationList = this.parseData(data);
  };

  /**
   * Parsing data from array to array of Relation object.
   * @param {IRelation[]} data
   * @returns {Relation[]} array of Relation objects.
   */
  parseData = (data: IRelation[]): Relation[] => {
    return data.map((item) => new Relation(item));
  };

  /**
   * Get list of Relation objects.
   * @returns {IRelation[]} list of Relation objects
   */
  getRelations = (): Relation[] => {
    return this.relationList;
  };

  /**
   * Get relation object by ID.
   * @param {String} id
   * @returns {Relation | undefined} a relation object.
   */
  getRelationById = (id: string): Relation | undefined => {
    return this.relationList.find((relation) => relation.id === id);
  };
}

export default RelationsModel;
