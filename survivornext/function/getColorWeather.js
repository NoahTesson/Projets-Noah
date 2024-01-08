const getColorWeather = (data) => {
    if (data && data.main) {
      if (data.main.temp > 25)
        return "#851414";
      else if (data.main.temp < 10)
        return "#129bb6"
      else 
        return "#b66812"
  
    } else {
      return "white"
    }
}

export default getColorWeather;