import getInfoEmployeMe from './getinfoEmployeme';
import getInfoEmployeid from './getinfoEmployeId';
import getImageEmploye from './getImageEmploye';

const loadedSubordinates = async (onDataLoaded) => {
    const allinfos = [];
    const allimage = [];
    
    const result = await getInfoEmployeMe();
    const resultSub = result['subordinates'];
    
    const promisesInfos = resultSub.map(async (item) => {
        const infos = await getInfoEmployeid(item);
        return infos;
    });
    const promisesImages = resultSub.map(async (item) => {
        const image = await getImageEmploye(item);
        return image;
    });
    const tmpInfos = await Promise.all(promisesInfos);
    const tmpImages = await Promise.all(promisesImages);
    allinfos.push(...tmpInfos);
    allimage.push(...tmpImages);

    const mergedArray = allinfos.map((info, index) => ({
        ...info,
        image: allimage[index]
    }));

    onDataLoaded(mergedArray);
};

export default loadedSubordinates;