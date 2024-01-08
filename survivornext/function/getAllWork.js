const getAllWork = (infos) => {
    const result = []

    infos.map((item) => {
        tmp = 1;
        result.map((work) => {
            if (item.work === work)
                tmp = 0;
        })
        if (tmp === 1)
            result.push(item.work);
    });
    return result;
}

export default getAllWork;