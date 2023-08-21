import Relation from '../models/relation';
import RelationTemplate from '../templates/relationTemplate';

class RelationView {
  private relationListEl: HTMLElement;
  private relationDropDownEl: HTMLElement;

  /**
   * Constructor of RelationView object
   */
  constructor() {
    this.relationListEl = document.querySelector('.relation-list')!;
    this.relationDropDownEl = document.querySelector('.relation-dropdown')!;
  }

  //----- RENDERING -----//

  /**
   * Render the relation list in adding or editing modal.
   * @param {Relation[]} relations
   */
  renderRelationList = (relations: Relation[]): void => {
    relations.forEach(relation => {
      this.renderRelation(relation);
    });
  };

  /**
   * Render the relation list in filter dropdown.
   * @param {Relation[]} relations
   */
  renderRelationDropdownList = (relations: Relation[]): void => {
    relations.forEach(relation => {
      this.renderRelationDropdown(relation);
    });
  };

  /**
   * Render a relation in relation list in adding or editing modal.
   * @param {Relation} relation
   */
  renderRelation = (relation: Relation): void => {
    const relationTemplate: string =
      RelationTemplate.renderRelationOpt(relation);
    this.relationListEl.innerHTML += relationTemplate;
  };

  /**
   * Render a relation in relation list in filter dropdown.
   * @param {Relation} relation
   */
  renderRelationDropdown = (relation: Relation): void => {
    const relationDropDownTemplate: string =
      RelationTemplate.renderRelationDropDown(relation);
    this.relationDropDownEl.innerHTML += relationDropDownTemplate;
  };
}

export default RelationView;
