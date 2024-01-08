import axios from "axios";

import{ getToken } from "../function//getToken";

API_KEY = '67f712a0383e2f3787223cdcd7405a41'

const getImageEmploye = async (id, setDatas) => {
    const token_tmp = await getToken();
    axios.get(`https://masurao.fr/api/employees/${id}/image`, {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'include',
        headers: {
            'Content-Type': 'image/png',
            'X-Group-Authorization': API_KEY,
            'Authorization': `Bearer ${token_tmp}`,
        },
    })
        .then((response) => {
            setDatas(response.data);
        })
        .catch((error) => {
        });
};

export default getImageEmploye;