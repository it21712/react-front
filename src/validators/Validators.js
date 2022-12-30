import { emailValidatorText, onlyLettersFieldText, requiredFieldText, wordsOnlyText } from "../strings";


export const WordOnlyValidator = (input) => {
    if (!input)
        return requiredFieldText;

    if (/[^a-zA-Z]/.test(input)) //TODO support greek letters 
        return wordsOnlyText;

    return null;
};

export const TextOnlyValidator = (input) => {
    if(!input)
        return requiredFieldText;

    if(!/^[a-zA-Z\s]*$/.test(input)){
        return onlyLettersFieldText;
    }
}

export const EmailFieldValidator = (input) => {
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(input))
        return emailValidatorText;

    return null;
}

export const RequiredFieldValidator = (input) => {
    if (!input)
        return requiredFieldText;

    return null;
}