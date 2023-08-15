import ContactView from "./contactView";
import ModalsView from "./modalsView";
import RelationView from "./relationView";
import SnackbarView from "./snackbarView";

class View {
  contact: ContactView;
  modal: ModalsView;
  relation: RelationView;
  snackbar: SnackbarView;

  /**
   * Constructor function for View object.
   */
  constructor() {
    this.contact = new ContactView();
    this.modal = new ModalsView();
    this.relation = new RelationView();
    this.snackbar = new SnackbarView();
  }
}

export default View;
