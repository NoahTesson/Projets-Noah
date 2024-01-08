import{ getToken }from "./getToken"

TOKEN_ACCESS='67f712a0383e2f3787223cdcd7405a41'

const post_options = (apiKey, token) => {
    return {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'X-Group-Authorization': apiKey,
            'Authorization': `Bearer ${token}`,
        },
    }
}

const GetMaxId = async () => {
    const token = await GetToken();
    const data = await fetch(`https://masurao.fr/api/employees`, post_options(TOKEN_ACCESS, token));
    const responseData = await data.json();
    return responseData.length;
};

export default GetMaxId;