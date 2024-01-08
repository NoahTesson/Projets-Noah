
API_KEY = '67f712a0383e2f3787223cdcd7405a41'

const post_options_post = (body, content) => {
    return {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'include',
        headers: {
            'Content-Type': content,
            'X-Group-Authorization': API_KEY
        },
        ...body
    }
};

const post_options_get = async (token, content) => {
    return {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'include',
        headers: {
            'Content-Type': content,
            'X-Group-Authorization': API_KEY,
            'Authorization': `Bearer ${token}`,
        },
    }
};

export { post_options_post, post_options_get };