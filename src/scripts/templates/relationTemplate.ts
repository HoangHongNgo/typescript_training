import Relation from '../models/relation';

class RelationTemplate {
  /**
   * Constructor of Template object.
   */
  constructor() {}

  /**
   * HTML Template for the relation list in modal.
   * @param {Relation} relation
   * @returns {String} HTML element for displaying relation in relation list in adding, editing form.
   */
  static renderRelationOpt = (relation: Relation): string => `
    <option value="${relation.id}">${relation.name}</option>
    `;

  /**
   * HTML Template for the relation list filter's dropdown.
   * @param {Relation} relation
   * @returns {String} HTML element for displaying relation in filter options.
   */
  static renderRelationDropDown = (relation: Relation): string => `  
    <input type="radio" id="${relation.id}" name="filter_option" value="${relation.id}">     
    <label class="relation-dropdown__li text text--gray text--normal text--lg" for="${relation.id}">${relation.name}</label>
    `;
}

export default RelationTemplate;
