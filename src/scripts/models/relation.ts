import { IRelation } from './interfaces/relationIFace';

class Relation implements IRelation {
  id: string;
  name: string;

  /**
   * Constructor of Relation object
   * @param {IRelation} data
   */
  constructor(data: IRelation) {
    this.id = data.id;
    this.name = data.name;
  }
}

export default Relation;
