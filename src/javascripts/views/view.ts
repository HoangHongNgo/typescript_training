import ContactView from "./contactView";
import LoadingView from "./loadingView";
import ModalsView from "./modalsView";
import RelationView from "./relationView";
import SnackbarView from "./snackbarView";

class View {
  contact: ContactView;
  modal: ModalsView;
  relation: RelationView;
  snackbar: SnackbarView;
  loading: LoadingView;

  /**
   * Constructor function for View object.
   */
  constructor() {
    this.contact = new ContactView();
    this.modal = new ModalsView();
    this.relation = new RelationView();
    this.snackbar = new SnackbarView();
    this.loading = new LoadingView();
  }
}

export default View;
