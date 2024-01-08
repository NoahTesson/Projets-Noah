export const increaseKey = async () => {
    try {
        const value = localStorage.getItem('key');
        if (value !== null) {
            let tempKey = parseInt(value) + 1
            localStorage.setItem('key', tempKey.toString())
        } else {
            localStorage.setItem('key', '1');
        }
    } catch(e) {
        console.log("Failed to load liste");
    }
}