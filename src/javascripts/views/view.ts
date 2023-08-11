import ContactView from "./contactView";

class View {
  contact: ContactView;

  /**
   * Constructor function for View object.
   */
  constructor() {
    this.contact = new ContactView();
  }
}

export default View;
