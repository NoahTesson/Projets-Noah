const getDay = (data) => {
    switch (data) {
        case 1:
          return "Lundi";
        case 2:
            return "Mardi";
        case 3:
            return "Mercredi";
        case 4:
            return "Jeudi";
        case 5:
            return "Vendredi";
        case 1:
            return "Samedi";
        case 1:
            return "Dimanche";
        default:
          return null;
    }
}

export default getDay;