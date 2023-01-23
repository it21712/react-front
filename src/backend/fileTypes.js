import { carrierText, certDateText, cityText, countryText, currentlyThereText, departmentText, diplomaDateText, diplomaTitleText, firstNameText, fromDateText, gpaText, institutionText, languageText, lastNameText, levelText, militaryDoneText, positionText, studyTitleText, supervisorText, titleText, universityText, untilDateText } from "../strings";

const FILETYPES = {
    UNDER_GRAD_DIPLOMA: 'UGD',
    POST_GRAD_DIPLOMA: 'PGD',
    PHD_DIPLOMA: 'PHD',
    CV: 'CV',
    WORK_EXPERIENCE: 'WXP',
    REFERENCE_LETTER: 'REF',
    CERTIFICATE: 'CRT',
    FOREIGN_LANG: 'FLN',
    RECOMMENDATION: 'RCM',
    MILITARY_CERT: 'MCT',
    AFFIRMATION: 'AFR',
}
export const FILETYPE_FORM_TEXTS = {
    UGD: [institutionText, universityText, departmentText, countryText, cityText, diplomaDateText, gpaText],
    PGD: [institutionText, universityText, departmentText, countryText, cityText, diplomaDateText, gpaText, diplomaTitleText],
    PHD: [institutionText, universityText, departmentText, countryText, cityText, diplomaDateText, gpaText, diplomaTitleText, supervisorText],
    WXP: [positionText, fromDateText, currentlyThereText, untilDateText, carrierText, countryText, cityText],
    REF: [firstNameText, lastNameText, carrierText, positionText, 'Email'],
    CRT: [titleText, certDateText],
    MCT: [militaryDoneText],
    FLN: [languageText, levelText, studyTitleText],
}
export const FILETYPE_OBJS = {
    UGD: {
        institution: '',
        university: '',
        department: '',
        country: '',
        city: '',
        diplomaDate: '',
        gpa: '',
    }, 
    PGD: {
        institution: '',
        university: '',
        department: '',
        country: '',
        city: '',
        diplomaDate: '',
        gpa: '',
        title: '',
    },
    PHD: {
        institution: '',
        university: '',
        department: '',
        country: '',
        city: '',
        diplomaDate: '',
        gpa: '',
        title: '',
        supervisor: '',
    },
    WXP: {
        position: '',
        from: '',
        currently_working: false,
        until: '',
        carrier: '',
        country: '',
        city: '',
    },
    REF: {
        firstName: '',
        lastName: '',
        carrier: '',
        position: '',
        email: '',
    },
    CRT: {
        title: '',
        date: '',
    },
    MCT: {
        fulfilled: false,
    },
    FLN: {
        lang: '',
        level: '',
        title: '',
    },

}

export default FILETYPES;