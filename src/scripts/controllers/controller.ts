import Contact from '../models/contact';
import Model from '../models/model';
import View from '../views/view';
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from '../constants/constant';
import { IContact, IContactCommon } from '../models/interfaces/contactInterface';
import { IFilter } from '../views/contactView';
import Relation from '../models/relation';
import { SnackbarType } from '../enums/enums';

class Controller {
  private model: Model;
  private view: View;

  /**
   * Constructor of Controller object
   * @param {Model} model
   * @param {View} view
   */
  constructor(model: Model, view: View) {
    this.model = model;
    this.view = view;
  }

  /**
   * Initializing the controller
   */
  init = async (): Promise<void> => {
    this.displayLoading();
    await this.initContacts();
    await this.initRelations();
    this.closeLoading();
    this.initModal();
  };

  //----- CONTACT CONTROLLER -----//

  /**
   * Initializing the contact list and contact information.
   */
  initContacts = async (): Promise<void> => {
    try {
      await this.model.contact.init();
      this.loadListContacts();
      this.showInfo();
      this.view.contact.addEventOpenAddModal(this.openAddModal);
      this.view.contact.addDelegateShowInfo(this.showInfo);
      this.view.contact.addEventSearchContact(this.filterContact);
      this.view.contact.addEventShowFilterOptions();
      this.view.contact.addDelegateFilterContact(this.filterContact);
    } catch {
      this.displaySnackbar(SnackbarType.Warning, ERROR_MESSAGE.INIT_CONTACT_LIST);
    }
  };

  /**
   * Add or edit a contact and display the new contact list.
   * @param {IContactFormInfo} data
   */
  saveContact = async (data: IContactCommon): Promise<void> => {
    const contact: IContact = {
      ...data,
      relation: this.model.relation.getRelationById(data.relationId)!,
    };

    this.displayLoading();

    if (!contact.id) {
      await this.addContact(contact);
    } else {
      await this.editContact(contact);
    }

    this.closeLoading();
    this.loadListContacts();
    this.showInfo(contact.id);
  };

  /**
   * Add a contact to model
   * @param {IContact} contact
   */
  addContact = async (contact: IContact) => {
    try {
      await this.model.contact.addContact(contact);
      this.displaySnackbar(SnackbarType.Success, SUCCESS_MESSAGE.ADD_CONTACT);
    } catch {
      this.displaySnackbar(SnackbarType.Warning, ERROR_MESSAGE.ADD_CONTACT);
    }
  };

  /**
   * Edit a contact from model
   * @param {IContact} contact
   */
  editContact = async (contact: IContact) => {
    try {
      await this.model.contact.editContact(contact);
      this.displaySnackbar(SnackbarType.Success, SUCCESS_MESSAGE.EDIT_CONTACT);
    } catch {
      this.displaySnackbar(SnackbarType.Warning, ERROR_MESSAGE.EDIT_CONTACT);
    }
  };

  /**
   * Load and display the contact list.
   * @param {IFilter} filterParams(optional)
   */
  loadListContacts = (filterParams?: IFilter): void => {
    const contacts: Contact[] = this.model.contact.filterList(filterParams);

    try {
      this.view.contact.renderContactList(contacts);
    } catch {
      this.displaySnackbar(SnackbarType.Warning, ERROR_MESSAGE.RENDER_CONTACT_LIST);
    }
  };

  /**
   * Display the contact information by contact's id or by default.
   * @param {String | null} contactId
   */
  showInfo = async (contactId?: string | null): Promise<void> => {
    if (contactId) this.model.contact.setContactInfo(contactId);

    const contactInfo: Contact | undefined = this.model.contact.getContactInfo();

    if (contactInfo) {
      this.view.contact.renderContactInfo(
        contactInfo,
        this.openConfirmDltModal,
        this.openEditModal,
      );
    }
  };

  /**
   * Show the confirm modal when delete a contact.
   * @param {String} contactId
   */
  openConfirmDltModal = async (contactId: string): Promise<void> => {
    try {
      this.displayLoading();
      const contact: Contact = await this.model.contact.getContactById(contactId);
      this.view.modal.openConfirmModal(contact);
    } catch {
      this.displaySnackbar(SnackbarType.Warning, ERROR_MESSAGE.GET_CONTACT_INFO);
    } finally {
      this.closeLoading();
    }
  };

  /**
   * Show add modal when click add contact button.
   */
  openAddModal = (): void => {
    this.view.modal.openModal();
  };

  /**
   * Delete a contact by ID action.
   * @param {String} contactId
   */
  deleteContact = async (contactId: string): Promise<void> => {
    try {
      this.displayLoading();
      await this.model.contact.deleteContactById(contactId);
      this.displaySnackbar(SnackbarType.Success, SUCCESS_MESSAGE.DELETE_CONTACT);
    } catch {
      this.displaySnackbar(SnackbarType.Warning, ERROR_MESSAGE.DELETE_CONTACT);
    } finally {
      this.closeLoading();
    }

    this.loadListContacts();
    this.showInfo();
  };

  /**
   * Show a modal for editing when click edit contact.
   * @param {String} contactId
   */
  openEditModal = async (contactId: string): Promise<void> => {
    try {
      this.displayLoading();
      const contact: Contact = await this.model.contact.getContactById(contactId);
      this.view.modal.openModal(contact);
    } catch {
      this.displaySnackbar(SnackbarType.Warning, ERROR_MESSAGE.GET_CONTACT_INFO);
    } finally {
      this.closeLoading();
    }
  };

  /**
   * Display the result while searching in contact list.
   * @param {IFilter} filterParams
   */
  filterContact = (filterParams: IFilter): void => {
    this.loadListContacts(filterParams);
    this.showInfo();
  };

  //----- RELATION CONTROLLER -----//

  /**
   * Initializing the relation lists.
   */
  initRelations = async (): Promise<void> => {
    try {
      await this.model.relation.init();
      const relations: Relation[] = this.model.relation.getRelations();
      this.view.relation.renderRelationList(relations);
      this.view.relation.renderRelationDropdownList(relations);
    } catch {
      this.displaySnackbar(SnackbarType.Warning, ERROR_MESSAGE.INIT_RELATION_LIST);
    }
  };

  //----- MODAL CONTROLLER -----//

  /**
   * Initializing the modals.
   */
  initModal = (): void => {
    this.view.modal.addEventSubmission(this.saveContact, this.model.contact.checkUniqueField);
    this.view.modal.addEventDeleteConfirmed(this.deleteContact);
    this.view.modal.addEventCancelModal();
    this.view.modal.addEventCancelConfirmed();
    this.view.modal.addEventClickOutside();
  };

  //----- SNACKBAR CONTROLLER -----//

  /**
   * Display the snackbar on top of the window.
   * @param {SnackbarType} type
   * @param {String} message
   */
  displaySnackbar = (type: SnackbarType, message: string): void => {
    this.view.snackbar.showSnackbar(type, message);
  };

  //----- LOADING CONTROLLER -----//

  /**
   * Display the loading indicator.
   */
  displayLoading = () => {
    this.view.loading.displayLoading();
  };

  /**
   * Close the loading indicator.
   */
  closeLoading = () => {
    this.view.loading.closeLoading();
  };
}

export default Controller;
