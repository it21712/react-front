import { emailValidatorText, onlyLettersFieldText, requiredFieldText } from "../strings";


export const TextOnlyValidator = (input) => {
    if (!input)
        return requiredFieldText;

    if (/[^a-zA-Z]/.test(input) || /\d/.test(input))
        return onlyLettersFieldText;
};

export const EmailFieldValidator = (input) => {
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(input))
        return emailValidatorText;
}

export const RequiredFieldValidator = (input) => {
    if (!input)
        return requiredFieldText;
}