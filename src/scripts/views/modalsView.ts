import Contact from '../models/contact';
import { VALIDATOR_MESSAGE } from '../constants/constant';
import { IContactCommon } from '../models/interfaces/contactInterface';
import formValidator from '../helpers/formValidator';
import { VALIDATOR_MESSAGE as MESSAGE, REGEX } from '../constants/constant';
import { ValidatorResultType } from '../enums/enums';

type SaveContactFnc = (contact: IContactCommon) => Promise<void>;
type DeleteContactFnc = (id: string) => Promise<void>;
export type CheckUniqueFieldFnc = <T>(fieldName: string, data: T) => string | null;
export interface IValidatorField {
  name: string;
  input: HTMLInputElement | HTMLTextAreaElement;
  regex: RegExp;
  requiredMsg?: string;
  invalidMsg: string;
  takenMsg?: string;
}
class ModalsView {
  private modalEl: HTMLFormElement;
  private confirmModalEl: HTMLElement;
  private overlayEl: HTMLElement;
  private cancelModalBtnEl: NodeListOf<Element>;
  private confirmBtnEl: HTMLElement;
  private cancelConfirmBtnEl: HTMLElement;
  private nameInputEl: HTMLInputElement;
  private phoneInputEl: HTMLInputElement;
  private emailInputEl: HTMLInputElement;
  private avatarInputEl: HTMLInputElement;
  private jobInputEl: HTMLInputElement;
  private companyInputEl: HTMLInputElement;
  private aboutInputEl: HTMLTextAreaElement;

  /**
   * Constructor of ModalView object.
   */
  constructor() {
    this.modalEl = document.querySelector('.modal')!;
    this.confirmModalEl = document.querySelector('.confirm-modal')!;

    this.overlayEl = document.querySelector('.overlay')!;
    this.cancelModalBtnEl = this.modalEl.querySelectorAll(
      '.modal__top__btn,.modal__buttons__cancel',
    )!;
    this.confirmBtnEl = this.confirmModalEl.querySelector('.confirm-modal__buttons__confirm')!;
    this.cancelConfirmBtnEl = this.confirmModalEl.querySelector('.confirm-modal__buttons__cancel')!;

    this.nameInputEl = this.modalEl.querySelector('input[name="name"]')!;
    this.phoneInputEl = this.modalEl.phone;
    this.emailInputEl = this.modalEl.email;
    this.avatarInputEl = this.modalEl.avatar;
    this.jobInputEl = this.modalEl.job;
    this.companyInputEl = this.modalEl.company;
    this.aboutInputEl = this.modalEl.about;
  }

  //----- RENDERING -----//

  /**
   * Display the modal for adding and editing a contact.
   * @param {Contact} contact
   */
  openModal = (contact?: Contact): void => {
    this.modalEl.classList.add('modal--active');
    this.overlayEl.classList.add('overlay--active');
    if (contact) {
      this.modalEl.setAttribute('data-id', contact.id);
      (this.modalEl.querySelector('input[name="name"]') as HTMLInputElement).value = contact.name;
      (this.modalEl.querySelector('select[name="relation"]') as HTMLInputElement).value =
        contact.relation.id;
      (this.modalEl.querySelector('input[name="phone"]') as HTMLInputElement).value = contact.phone;
      (this.modalEl.querySelector('input[name="avatar"]') as HTMLInputElement).value =
        contact.avatar;
      (this.modalEl.querySelector('input[name="email"]') as HTMLInputElement).value = contact.email;
      (this.modalEl.querySelector('input[name="company"]') as HTMLInputElement).value =
        contact.work.company;
      (this.modalEl.querySelector('input[name="job"]') as HTMLInputElement).value =
        contact.work.job;
      (this.modalEl.querySelector('textarea[name="about"]') as HTMLInputElement).value =
        contact.about;
    }
  };

  /**
   * Display confirm modal when delete a contact.
   * @param {Contact} contact
   */
  openConfirmModal = (contact: Contact): void => {
    this.confirmModalEl.classList.add('confirm-modal--active');
    this.overlayEl.classList.add('overlay--active');
    this.confirmModalEl.setAttribute('data-id', contact.id);
    (
      this.confirmModalEl.querySelector('.confirm-modal__message') as HTMLElement
    ).innerText = `${VALIDATOR_MESSAGE.CONFIRM_MESSAGE}${contact.name}`;
  };

  /**
   * Close adding or editing contact modal
   */
  closeModal = (): void => {
    this.modalEl.classList.remove('modal--active');
    this.overlayEl.classList.remove('overlay--active');
    this.modalEl.removeAttribute('data-id');
    this.modalEl.reset();
    this.modalEl.querySelectorAll('input').forEach(el => {
      el.classList.remove('input--warning');
      el.nextElementSibling!.classList.remove('warning-text--active');
    });
  };

  /**
   * Close confirm delete modal
   */
  closeConfirmModal = (): void => {
    this.confirmModalEl.classList.remove('confirm-modal--active');
    this.confirmModalEl.removeAttribute('data-id');
    this.overlayEl.classList.remove('overlay--active');
  };

  //----- EVENT HANDLER -----//

  /**
   * Add event listener for form submission.
   * @param {SaveContactFnc} saveContact
   */
  addEventSubmission = (
    saveContact: SaveContactFnc,
    checkUniqueField: CheckUniqueFieldFnc,
  ): void => {
    this.modalEl.addEventListener('submit', async event => {
      event.preventDefault();
      const contact: IContactCommon = {
        id: this.modalEl.getAttribute('data-id'),
        name: (this.modalEl.querySelector("input[name='name']") as HTMLInputElement).value,
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

      if (this.submissionValidator(contact.id, checkUniqueField)) {
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
    this.confirmBtnEl.addEventListener('click', () => {
      const id = this.confirmModalEl.getAttribute('data-id')!;
      this.confirmModalEl.classList.remove('confirm-modal--active');
      this.overlayEl.classList.remove('overlay--active');
      deleteContact(id);
    });
  };

  /**
   * Add event listener for Cancel button in Adding or Editing modal.
   */
  addEventCancelModal = (): void => {
    this.cancelModalBtnEl.forEach(el => el.addEventListener('click', () => this.closeModal()));
  };

  /**
   * Add event listener for Cancel button in Confirming modal
   */
  addEventCancelConfirmed = (): void => {
    this.cancelConfirmBtnEl.addEventListener('click', () => this.closeConfirmModal());
  };

  /**
   * Add event listener for overlay element(click outside the modal).
   */
  addEventClickOutside = (): void => {
    this.overlayEl.addEventListener('click', () => {
      this.closeModal();
      this.closeConfirmModal();
    });
  };

  submissionValidator = (
    contactId: string | null,
    checkUniqueField: CheckUniqueFieldFnc,
  ): boolean => {
    let isValid: boolean = true;
    const validatorFields: IValidatorField[] = [
      {
        name: 'name',
        input: this.nameInputEl,
        regex: REGEX.NAME,
        requiredMsg: MESSAGE.NAME_REQUIRED,
        invalidMsg: MESSAGE.INVALID_NAME,
      },
      {
        name: 'phone',
        input: this.phoneInputEl,
        regex: REGEX.PHONE,
        requiredMsg: MESSAGE.PHONE_REQUIRED,
        invalidMsg: MESSAGE.INVALID_PHONE,
        takenMsg: MESSAGE.PHONE_TAKEN,
      },
      {
        name: 'email',
        input: this.emailInputEl,
        regex: REGEX.EMAIL,
        requiredMsg: MESSAGE.EMAIL_REQUIRED,
        invalidMsg: MESSAGE.INVALID_EMAIL,
        takenMsg: MESSAGE.EMAIL_TAKEN,
      },
      {
        name: 'avatar',
        input: this.avatarInputEl,
        regex: REGEX.AVATAR,
        invalidMsg: MESSAGE.INVALID_AVATAR,
      },
      {
        name: 'job',
        input: this.jobInputEl,
        regex: REGEX.JOB,
        invalidMsg: MESSAGE.INVALID_JOB,
      },
      {
        name: 'company',
        input: this.companyInputEl,
        regex: REGEX.COMPANY,
        invalidMsg: MESSAGE.INVALID_COMPANY,
      },
      {
        name: 'about',
        input: this.aboutInputEl,
        regex: REGEX.ABOUT,
        invalidMsg: MESSAGE.INVALID_ABOUT,
      },
    ];

    formValidator(contactId, validatorFields, checkUniqueField).forEach(field => {
      const inputEl: HTMLInputElement | HTMLTextAreaElement = field.inputEl;
      const errorEl: HTMLElement = inputEl.nextElementSibling as HTMLElement;

      switch (field.result) {
        case ValidatorResultType.valid:
          inputEl.classList.remove('input--warning');
          errorEl.textContent = '';
          errorEl.classList.remove('warning-text--active');
          break;
        default:
          inputEl.classList.add('input--warning');
          errorEl.textContent = field.message;
          errorEl.classList.add('warning-text--active');
          isValid = false;
      }
    });

    return isValid;
  };
}

export default ModalsView;
