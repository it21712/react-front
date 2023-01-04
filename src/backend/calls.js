import { useAxiosRole } from "../hooks/useAxiosPrivate"
import { APPLICANT_PROFILEPIC_URL } from "./urls";


export const GetApplicantProfilePic = () => {
    const axiosRole = useAxiosRole();
    let url = '';
    axiosRole.get(APPLICANT_PROFILEPIC_URL, { responseType: 'blob' }).then(response => {
        url = URL.createObjectURL(response.data);

    });

    return url;
}