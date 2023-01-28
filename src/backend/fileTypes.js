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

export const FILETYPE_FIELDS = {
    UGD: {
        institution: institutionText,
        university: universityText,
        department: departmentText,
        country: countryText,
        city: cityText,
        diplomaDate: diplomaDateText,
        gpa: gpaText,
    },
    PGD: {
        institution: institutionText,
        university: universityText,
        department: departmentText,
        country: countryText,
        city: cityText,
        diplomaDate: diplomaDateText,
        gpa: gpaText,
        title: titleText,
    },
    PHD: {
        institution: institutionText,
        university: universityText,
        department: departmentText,
        country: countryText,
        city: cityText,
        diplomaDate: diplomaDateText,
        gpa: gpaText,
        title: titleText,
        supervisor: supervisorText,
    },
    WXP: {
        position: positionText,
        from: fromDateText,
        currently_working: currentlyThereText,
        until: untilDateText,
        carrier: carrierText,
        country: countryText,
        city: cityText,
    },
    REF: {
        firstName: firstNameText,
        lastName: lastNameText,
        carrier: carrierText,
        position: positionText,
        email: 'Email',
    },
    CRT: {
        title: titleText,
        date: diplomaDateText,
    },
    MCT: {
        fulfilled: militaryDoneText,
    },
    FLN: {
        lang: languageText,
        level: levelText,
        title: studyTitleText,
    },
}

export default FILETYPES;