import axios from "axios";

import { getToken } from "../function/getToken";

API_KEY = '67f712a0383e2f3787223cdcd7405a41'

const getInfoAllEmploye = async (setinfos) => {
    const token = await getToken();
    axios.get('https://masurao.fr/api/employees', {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'X-Group-Authorization': API_KEY,
            'Authorization': `Bearer ${token}`,
        },
    })
    .then((response) => {
        setinfos(response.data);
    })
    .catch((error) => {
    });
}

export default getInfoAllEmploye;