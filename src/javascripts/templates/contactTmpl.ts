import { ContactIFace } from "../models/interfaces/contactInterface";

class ContactTmpl {

    /**
     * Constructor of the Template object.
     */
    constructor() { }

    /**
     * HTML Template for render an Contact object.
     * @param {Contact} contact
     * @returns {String} Template for rendering contact list row.
     */
    static renderContact = (contact: ContactIFace): string => `
        <li class="contact-item row" data-id="${contact.id}">
            <div class="contact-item__avatar col-2">
                <img src="${contact.avatar}" alt="avatar" />
            </div>
            <div class="contact-item__info col-3">
                <p class="contact-item__info__name text text--black text--semibold text--lg">${contact.name}</p>
                <p class="text text--gray text--xs text--medium">${contact.relation.name}</p>
            </div>
            <p class="contact-item__phone col-3 text text--black text--medium text--sm">${contact.phone}</p>
            <p class="text text--black col-4 text--semibold text--sm">${contact.email}</p>
        </li>
    `;
}

export default ContactTmpl