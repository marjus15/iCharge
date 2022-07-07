import axios from "axios";

// export const getPlacesData = async (type, sw, ne) => {
//   try {
//     const {
//       data: { data },
//     } = await axios.get(
//       `https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`,
//       {
//         params: {
//           bl_latitude: sw.lat,
//           bl_longitude: sw.lng,
//           tr_longitude: ne.lng,
//           tr_latitude: ne.lat,
//         },
//         headers: {
//           "X-RapidAPI-Key":
//             "54dba9444bmsh31e89919b95d23ap188acejsn1af82193c0bb",
//           "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
//         },
//       }
//     );
//     return data;
//   } catch (error) {
//     console.log(error);
//   }
// };

export const getChargesData = async (lat, lng) => {
  console.log(lat, lng);
  try {
    const { data } = await axios.get("https://api.openchargemap.io/v3/poi", {
      params: {
        latitude: Number(lat),
        longitude: Number(lng),
        key: "123",
      },
      headers: { "Content-Type": "application/json" },
    });

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getWeatherData = async (lat, lng) => {
  try {
    if (lat && lng) {
      const { data } = await axios.get(
        "https://community-open-weather-map.p.rapidapi.com/find",
        {
          params: { lat: "37.983810", lon: "23.727539" },
          headers: {
            "x-rapidapi-key": process.env.REACT_APP_RAPID_API_WEATHER_API_KEY,
            "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
          },
        }
      );

      return data;
    }
  } catch (error) {
    console.log(error);
  }
};
