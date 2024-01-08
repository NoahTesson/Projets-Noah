import getInfoAllEmploye from './getinfoAllEmploye'
import getInfoEmployeid from './getinfoEmployeId';
import getImageEmploye from './getImageEmploye';
import{ getToken }from './getToken'

function loadedTrombi() {
    return new Promise(async (resolve, reject) => {
        try {
            const api_key='67f712a0383e2f3787223cdcd7405a41'
            const token = await getToken();
            const result = await getInfoAllEmploye(token, api_key);
        
            const promisesInfos = result.map(async (item) => {
                const infos = await getInfoEmployeid(token, api_key, item.id);
                return infos;
            });
            const promisesImages = result.map(async (item) => {
                const image = await getImageEmploye(item.id);
                return image;
            });
            const infosArray = await Promise.all(promisesInfos);
            const imagesArray = await Promise.all(promisesImages);
    
            const mergedArray = result.map((item, index) => ({
                ...item,
                infos: infosArray[index],
                image: imagesArray[index],
            }));
            resolve(mergedArray);
        } catch(error) {
            reject(error);
        }
    }
)};

export default loadedTrombi;