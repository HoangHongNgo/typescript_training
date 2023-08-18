import { VALIDATOR_MESSAGE as MESSAGE, REGEX } from "../constants/constant";
import Contact from "../models/contact";
import { IContactCommon, IContactFormInfo } from "../models/interfaces/contactIFace";
import { CheckUniqueFieldFnc } from "../views/modalsView";
interface IContactValidator extends IContactCommon {
  job: string;
  company: string;
}

interface IValidatorField {
  name: keyof IContactValidator;
  required?: boolean;
  unique?: boolean;
  regex: RegExp;
  input: HTMLElement;
  error: HTMLElement;
  requiredMessage?: string;
  invalidMessage: string;
  takenMessage?: string;
}

/**
 * Form validator check if the information is valid.
 * @param {IContactFormInfo} contact
 * @returns {HTMLFormElement} is the form valid.
 */
const formValidator = (contact: IContactFormInfo, modalEl: HTMLFormElement, checkUniqueField: CheckUniqueFieldFnc): boolean => {
  const data: IContactValidator = {
    id: contact.id,
    name: contact.name,
    relationId: contact.relationId,
    phone: contact.phone,
    email: contact.email,
    avatar: contact.avatar,
    job: contact.work.job,
    company: contact.work.company,
    about: contact.about,
  };

  const nameInput: HTMLInputElement = modalEl.querySelector('input[name="name"]')!;
  const nameError: HTMLElement = nameInput.nextElementSibling as HTMLElement;
  const phoneInput: HTMLInputElement = modalEl.phone;
  const phoneError: HTMLElement = phoneInput.nextElementSibling as HTMLElement;
  const emailInput: HTMLInputElement = modalEl.email;
  const emailError: HTMLElement = emailInput.nextElementSibling as HTMLElement;
  const avatarInput: HTMLInputElement = modalEl.avatar;
  const avatarError: HTMLElement = avatarInput.nextElementSibling as HTMLElement;
  const jobInput: HTMLInputElement = modalEl.job;
  const jobError: HTMLElement = jobInput.nextElementSibling as HTMLElement;
  const companyInput: HTMLInputElement = modalEl.company;
  const companyError: HTMLElement = companyInput.nextElementSibling as HTMLElement;
  const aboutInput: HTMLTextAreaElement = modalEl.about;
  const aboutError: HTMLElement = aboutInput.nextElementSibling as HTMLElement;

  let isValid = true;

  // Object to store field validation data
  const fields: IValidatorField[] = [
    {
      name: "name",
      required: true,
      regex: REGEX.NAME,
      input: nameInput,
      error: nameError,
      requiredMessage: MESSAGE.NAME_REQUIRED,
      invalidMessage: MESSAGE.INVALID_NAME,
    },
    {
      name: "phone",
      required: true,
      unique: true,
      regex: REGEX.PHONE,
      input: phoneInput,
      error: phoneError,
      requiredMessage: MESSAGE.PHONE_REQUIRED,
      invalidMessage: MESSAGE.INVALID_PHONE,
      takenMessage: MESSAGE.PHONE_TAKEN,
    },
    {
      name: "email",
      required: true,
      unique: true,
      regex: REGEX.EMAIL,
      input: emailInput,
      error: emailError,
      requiredMessage: MESSAGE.EMAIL_REQUIRED,
      invalidMessage: MESSAGE.INVALID_EMAIL,
      takenMessage: MESSAGE.EMAIL_TAKEN,
    },
    {
      name: "avatar",
      regex: REGEX.AVATAR,
      input: avatarInput,
      error: avatarError,
      invalidMessage: MESSAGE.INVALID_AVATAR,
    },
    {
      name: "job",
      regex: REGEX.JOB,
      input: jobInput,
      error: jobError,
      invalidMessage: MESSAGE.INVALID_JOB,
    },
    {
      name: "company",
      regex: REGEX.COMPANY,
      input: companyInput,
      error: companyError,
      invalidMessage: MESSAGE.INVALID_COMPANY,
    },
    {
      name: "about",
      regex: REGEX.ABOUT,
      input: aboutInput,
      error: aboutError,
      invalidMessage: MESSAGE.INVALID_ABOUT,
    },
  ];

  // Loop through each field to perform validation
  for (const field of fields) {
    const value: string = data[field.name]!;
    const isValidField: boolean = field.regex.test(value);
    const inputEl: HTMLElement = field.input;
    const errorEl: HTMLElement = field.error;

    // Check if the field value is empty
    if (value.trim() === "") {
      if (field.required) {
        inputEl.classList.add("input--warning");
        errorEl.textContent = field.requiredMessage!;
        errorEl.classList.add("warning-text--active");
        isValid = false;
      }
    }
    // Check if the field value matches the regex pattern
    else if (!isValidField) {
      inputEl.classList.add("input--warning");
      errorEl.textContent = field.invalidMessage;
      errorEl.classList.add("warning-text--active");
      isValid = false;
    }
    // Check if the field value is unique
    else if (field.unique && checkUniqueField(field.name as string, value) !== contact.id) {
      inputEl.classList.add("input--warning");
      errorEl.textContent = field.takenMessage!;
      errorEl.classList.add("warning-text--active");
      isValid = false;
    }

    // If the field is valid, remove any warning styling and message
    else {
      inputEl.classList.remove("input--warning");
      errorEl.textContent = "";
      errorEl.classList.remove("warning-text--active");
    }
  }
  return isValid;
};

export default formValidator;
