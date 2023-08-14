import { VALIDATOR_MESSAGE as MESSAGE, REGEX } from "../constants/constant";
import { IContactCommon, IContactFormInfo } from "../models/interfaces/contactIFace";

interface IContactValidator extends IContactCommon {
  job: string;
  company: string;
}

interface field {
  name: keyof IContactValidator;
  regex: RegExp;
  error: HTMLElement;
  requiredMessage: string;
  invalidMessage: string;
}

/**
 * Form validator check if the information is valid.
 * @param {IContactFormInfo} contact
 * @returns {HTMLFormElement} is the form valid.
 */
const formValidator = (contact: IContactFormInfo, modalEl: HTMLFormElement): boolean => {
  const data: IContactValidator = {
    id: contact.id,
    Cname: contact.Cname,
    relationId: contact.relationId,
    phone: contact.phone,
    email: contact.email,
    avatar: contact.avatar,
    job: contact.work.job,
    company: contact.work.company,
    about: contact.about,
  };

  const nameInput: HTMLInputElement = modalEl.Cname;
  const nameError: HTMLElement = nameInput.nextElementSibling as HTMLElement;
  const phoneInput: HTMLInputElement = modalEl.phone;
  const phoneError: HTMLElement = phoneInput.nextElementSibling as HTMLElement;
  const emailInput: HTMLInputElement = modalEl.email;
  const emailError: HTMLElement = emailInput.nextElementSibling as HTMLElement;
  const avatarInput: HTMLInputElement = modalEl.avatar;
  const avatarError: HTMLElement = avatarInput.nextElementSibling as HTMLElement;

  let isValid = true;

  // Object to store field validation data
  const fields: field[] = [
    { name: "Cname", regex: REGEX.NAME, error: nameError, requiredMessage: MESSAGE.NAME_REQUIRED, invalidMessage: MESSAGE.INVALID_NAME },
    {
      name: "phone",
      regex: REGEX.PHONE,
      error: phoneError,
      requiredMessage: MESSAGE.PHONE_REQUIRED,
      invalidMessage: MESSAGE.INVALID_PHONE,
    },
    {
      name: "email",
      regex: REGEX.EMAIL,
      error: emailError,
      requiredMessage: MESSAGE.EMAIL_REQUIRED,
      invalidMessage: MESSAGE.INVALID_EMAIL,
    },
    {
      name: "avatar",
      regex: REGEX.AVATAR,
      error: avatarError,
      requiredMessage: MESSAGE.AVATAR_REQUIRED,
      invalidMessage: MESSAGE.INVALID_AVATAR,
    },
  ];

  // Loop through each field to perform validation
  for (const field of fields) {
    const value: string = data[field.name]!;
    const isValidField: boolean = field.regex.test(value);
    const inputEl: HTMLInputElement = modalEl[field.name];
    const errorEl: HTMLElement = field.error;

    // Check if the field value is empty
    if (value.trim() === "") {
      inputEl.classList.add("input--warning");
      errorEl.textContent = field.requiredMessage;
      errorEl.classList.add("warning-text--active");
      isValid = false;
    }
    // Check if the field value matches the regex pattern
    else if (!isValidField) {
      inputEl.classList.add("input--warning");
      errorEl.textContent = field.invalidMessage;
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
