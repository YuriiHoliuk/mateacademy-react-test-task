import { FormGroup } from './src/forms/form-group';
import { lessThanNowValidator, disallowedSymbolsValidator, emailValidator, requiredValidator } from './src/utils/validators';
import {COUNTRIES} from "./src/constants/country-list";

const requiredAndDisallowed = [requiredValidator, disallowedSymbolsValidator];

const formValidators = {
  firstName: requiredAndDisallowed,
  lastName: requiredAndDisallowed,
  birthday: [requiredValidator, lessThanNowValidator],
  sex: requiredAndDisallowed,
  country: requiredAndDisallowed,
  email: [requiredValidator, emailValidator],
  password: requiredAndDisallowed,
  address: requiredAndDisallowed
};

const formEl = document.querySelector('#form');
const countriesSelect = formEl.querySelector('[name="country"]');

const options = ['<option value="" hidden selected disabled>Choose country...</option>'];
COUNTRIES.forEach(({ label, value }) => options.push(`<option value="${value}">${label}</option>`));

countriesSelect.innerHTML = options.join('');

const formGroup = new FormGroup(formEl, formValidators);

formEl.addEventListener('submit', (event) => {
  event.preventDefault();

  const isValid = formGroup.validate();

  if (isValid) {
    alert('Form successfully passed validation!');
  }
});
