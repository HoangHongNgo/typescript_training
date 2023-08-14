import Contact from "../models/contact";
import { VALIDATOR_MESSAGE } from "../constants/constant";
import { IContactFormInfo } from "./../models/interfaces/contactIFace";
import formValidator from "../helpers/formValidator";

type SaveContactFnc = (contact: IContactFormInfo) => Promise<void>;
type DeleteContactFnc = (id: string) => Promise<void>;

class ModalsView {
  private modalEl: HTMLFormElement;
  private confirmModalEl: HTMLElement;
  private overlayEl: HTMLElement;
  private cancelModalBtnEl: NodeListOf<Element>;
  private confirmBtnEl: HTMLElement;
  private cancelConfirmBtnEl: HTMLElement;

  /**
   * Constructor of ModalView object.
   */
  constructor() {
    this.modalEl = document.querySelector(".modal")!;
    this.confirmModalEl = document.querySelector(".confirm-modal")!;

    this.overlayEl = document.querySelector(".overlay")!;
    this.cancelModalBtnEl = this.modalEl.querySelectorAll(".modal__top__btn,.modal__buttons__cancel")!;
    this.confirmBtnEl = this.confirmModalEl.querySelector(".confirm-modal__buttons__confirm")!;
    this.cancelConfirmBtnEl = this.confirmModalEl.querySelector(".confirm-modal__buttons__cancel")!;
  }

  //----- RENDERING -----//

  /**
   * Display the modal for adding and editing a contact.
   * @param {String} contactId
   * @param {Contact} contact
   */
  openModal = (contactId?: string, contact?: Contact): void => {
    this.modalEl.classList.add("modal--active");
    this.overlayEl.classList.add("overlay--active");
    if (contactId && contact) {
      this.modalEl.setAttribute("data-id", contactId);
      (this.modalEl.querySelector('input[name="Cname"]') as HTMLInputElement).value = contact.Cname;
      (this.modalEl.querySelector('select[name="relation"]') as HTMLInputElement).value = contact.relation.id;
      (this.modalEl.querySelector('input[name="phone"]') as HTMLInputElement).value = contact.phone;
      (this.modalEl.querySelector('input[name="avatar"]') as HTMLInputElement).value = contact.avatar;
      (this.modalEl.querySelector('input[name="email"]') as HTMLInputElement).value = contact.email;
    }
  };

  /**
   * Display confirm modal when delete a contact.
   * @param {Contact} contact
   */
  openConfirmModal = (contact: Contact): void => {
    this.confirmModalEl.classList.add("confirm-modal--active");
    this.overlayEl.classList.add("overlay--active");
    this.confirmModalEl.setAttribute("data-id", contact.id);
    (
      this.confirmModalEl.querySelector(".confirm-modal__message") as HTMLElement
    ).innerText = `${VALIDATOR_MESSAGE.CONFIRM_MESSAGE}${contact.Cname}`;
  };

  /**
   * Close adding or editing contact modal
   */
  closeModal = (): void => {
    this.modalEl.classList.remove("modal--active");
    this.overlayEl.classList.remove("overlay--active");
    this.modalEl.removeAttribute("data-id");
    this.modalEl.reset();
    this.modalEl.querySelectorAll("input").forEach((El) => {
      El.classList.remove("input--warning");
      El.nextElementSibling!.classList.remove("warning-text--active");
    });
  };

  /**
   * Close confirm delete modal
   */
  closeConfirmModal = (): void => {
    this.confirmModalEl.classList.remove("confirm-modal--active");
    this.confirmModalEl.removeAttribute("data-id");
    this.overlayEl.classList.remove("overlay--active");
  };

  //----- EVENT HANDLER -----//

  /**
   * Add event listener for form submission.
   * @param {SaveContactFnc} saveContact
   */
  addEventSubmission = (saveContact: SaveContactFnc): void => {
    this.modalEl.addEventListener("submit", async (event) => {
      event.preventDefault();
      const contact: IContactFormInfo = {
        id: this.modalEl.getAttribute("data-id"),
        Cname: this.modalEl.Cname.value,
        relationId: this.modalEl.relation.value,
        phone: this.modalEl.phone.value,
        email: this.modalEl.email.value,
        avatar: this.modalEl.avatar.value,
        work: {
          job: this.modalEl.job.value,
          company: this.modalEl.company.value,
        },
        about: this.modalEl.about.value,
      };
      if (formValidator(contact, this.modalEl)) {
        saveContact(contact);
        this.closeModal();
      }
    });
  };

  /**
   * Add event listener for Yes button in Confirm delete modal.
   * @param {DeleteContactFnc} deleteContact
   */
  addEventDeleteConfirmed = (deleteContact: DeleteContactFnc): void => {
    this.confirmBtnEl.addEventListener("click", () => {
      const id = this.confirmModalEl.getAttribute("data-id")!;
      this.confirmModalEl.classList.remove("confirm-modal--active");
      this.overlayEl.classList.remove("overlay--active");
      deleteContact(id);
    });
  };

  /**
   * Add event listener for Cancel button in Adding or Editing modal.
   */
  addEventCancelModal = (): void => {
    this.cancelModalBtnEl.forEach((el) => el.addEventListener("click", () => this.closeModal()));
  };

  /**
   * Add event listener for Cancel button in Confirming modal
   */
  addEventCancelConfirmed = (): void => {
    this.cancelConfirmBtnEl.addEventListener("click", () => this.closeConfirmModal());
  };

  /**
   * Add event listener for overlay element(click outside the modal).
   */
  addEventClickOutside = (): void => {
    this.overlayEl.addEventListener("click", () => {
      this.closeModal();
      this.closeConfirmModal();
    });
  };
}

export default ModalsView;
