import Contact from "../models/contact";

class ContactTmpl {
  /**
   * Constructor of the Template object.
   */
  constructor() {}

  /**
   * HTML Template for render an Contact object.
   * @param {Contact} contact
   * @returns {String} Template for rendering contact list row.
   */
  static renderContact = (contact: Contact): string => `
        <li class="contact-item row" data-id="${contact.id}">
            <div class="contact-item__avatar col-2">
                <img src="${contact.avatar}" alt="avatar" />
            </div>
            <div class="contact-item__info col-3">
                <p class="contact-item__info__name text text--black text--semibold text--lg">${contact.Cname}</p>
                <p class="text text--gray text--xs text--medium">${contact.relation.name}</p>
            </div>
            <p class="contact-item__phone col-3 text text--black text--medium text--sm">${contact.phone}</p>
            <p class="text text--black col-4 text--semibold text--sm">${contact.email}</p>
        </li>
    `;

  /**
   * HTML template for rendering Contact information.
   * @param {Contact} contact
   * @returns {String} HTML element for displaying contact information.
   */
  static renderContactInfo = (contact: Contact): string => `
        <div class="info__head">
        <div class="info__head__avatar">
            <img src="${contact.avatar}" alt="avatar" />
        </div>
        <p class="info__head__name text text--black text--normal text--lg">
            ${contact.Cname}
        </p>
        <p class="info__head__relation text text--gray text--medium text--sm">
            ${contact.relation.name}
        </p>
        </div>
        <div class="info__body">
        <h2 class="info__body__title text text--fantastic text--normal text-sm">
            Contact
        </h2>
        <div class="detail">
            <div class="detail__line detail__line--phone">
            <div class="detail__left">
                <p class="text text--medium text--sm text--gray">
                Phone number
                </p>
                <a
                href="tel:${contact.phone}"
                class="detail__phone text text--medium text--sm text--black">
                    ${contact.phone}
                </a>
            </div>
            <a href=tel:"${contact.phone}" class="detail__right">
                <img src="https://res.cloudinary.com/de59jbjlb/image/upload/v1689827289/phone-icon_pvx8ut.svg" alt="phone" />
            </a>
            </div>
            <div class="detail__line detail__line--email">
            <div class="detail__left">
                <p class="text text--medium text--sm text--gray">
                Email Address
                </p>
                <a
                href="mailto:${contact.email}"
                class="detail__email text text--medium text--sm text--black">
                    ${contact.email}
                </a>
            </div>
            <a href="mailto:${contact.email}" class="detail__right">
                <img src="https://res.cloudinary.com/de59jbjlb/image/upload/v1689827289/mail-icon_kn7qdr.svg" alt="mail" />
            </a>
            </div>
        </div>
        </div>
        <div class="info__buttons" data-id="${contact.id}">
        <button class="info__button__edit btn btn--primary text text--medium text--sm">
            Edit
        </button>
        <button class="info__button__delete btn btn--secondary text text--medium text--sm">
            Delete
        </button>
        </div>
    `;
}

export default ContactTmpl;
