import { ValidatorResultType } from '../enums/enums';
import { CheckUniqueFieldFnc, IValidatorField } from '../views/modalsView';

interface ValidatorResult {
  name: string;
  inputEl: HTMLInputElement | HTMLTextAreaElement;
  result: ValidatorResultType;
  message: string;
}
/**
 * Form validator check if the information is valid.
 * @param {IContactFormInfo} contact
 * @returns {ValidatorResult[]}
 */
const formValidator = (
  contactId: string | null,
  validatorFields: IValidatorField[],
  checkUniqueField: CheckUniqueFieldFnc,
): ValidatorResult[] => {
  const result: ValidatorResult[] = [];

  // Loop through each field to perform validation
  for (const field of validatorFields) {
    const value: string = field.input.value;
    const isValidField: boolean = field.regex.test(value);
    let fieldResult: ValidatorResultType = ValidatorResultType.valid;
    let errorMsg: string = '';

    // Check if the field value is empty
    if (value.trim() === '') {
      if (field.requiredMsg) {
        fieldResult = ValidatorResultType.missing;
        errorMsg = field.requiredMsg!;
      }
    }

    // Check if the field value matches the regex pattern
    else if (!isValidField) {
      fieldResult = ValidatorResultType.invalid;
      errorMsg = field.invalidMsg;
    }

    // Check if the field value is not unique
    else if (
      field.takenMsg &&
      checkUniqueField(field.name, value) &&
      checkUniqueField(field.name, value) !== contactId
    ) {
      fieldResult = ValidatorResultType.existing;
      errorMsg = field.takenMsg;
    }

    result.push({
      name: field.name,
      inputEl: field.input,
      result: fieldResult,
      message: errorMsg,
    });
  }

  return result;
};

export default formValidator;
