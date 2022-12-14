import { useState, useEffect } from "react";
import axios from "axios";
import weatherJson from "../static/weather.json";
// 2 ----- google map api
import { GoogleMap, LoadScript } from "@react-google-maps/api";


export const BookCreate = () => {
  // đ˝ čż˝ĺ 
  const [loading, setLoading] = useState(true);
  const [books, setBooks] = useState([]);
  const [book, setBook] = useState("");
  const [geoLocation, setGeoLocation] = useState(null);
  const [place, setPlace] = useState("");
  const [weather, setWeather] = useState("");

  const getBooks = async (keyword) => {
    const url = "https://www.googleapis.com/books/v1/volumes?q=intitle:";
    const result = await axios.get(`${url}${keyword}`);
    console.log(result.data);
    setBooks(result.data.items ?? []);
  };

  const selectBook = (book) => {
    setBook(book.volumeInfo.title);
  };

  const success = async (position) => {
    const { latitude, longitude } = position.coords;
    setGeoLocation({ latitude, longitude });
    const placeData = await axios.get(
      `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
    );
    console.log(placeData.data);
    setPlace(placeData.data.display_name);

     const weatherData = await axios.get(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset&timezone=Asia%2FTokyo`
    );
    console.log(weatherData.data);
    setWeather(weatherJson[weatherData.data.daily.weathercode[0]]);

    // đ˝ čż˝ĺ 
    setLoading(false);
  };

  const fail = (error) => console.log(error);
  // ć°¸é ăŤĺŽčĄăăăŚăăžăăăă[çŠşéĺ]ăŤăăŚćĺăŽä¸ĺă ăĺŽčĄăăăăăŤăă  
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success, fail);
  }, []);

  // đ˝ čż˝ĺ 
  if (loading) {
    return <p>now loading...</p>;
  }

  return (
    <>
      <table>
        <tbody>
          <tr>
            <td>ĺ ´ć</td>
            <td>{place}</td>
          </tr>
          <tr>
            <td>ĺ¤Šć°</td>
            <td>{weather}</td>
          </tr>
          <tr>
            <td>čŞ­ăă ćŹ</td>
            <td>{book}</td>
          </tr>
        </tbody>
      </table>
      <p>ă­ăźăŻăźăă§ć¤ç´˘ăă</p>
      <input type="text" onChange={(e) => getBooks(e.target.value)} />
      <table>
        <thead>
          <tr>
            <th></th>
            <th>ć¸çąĺ</th>
            <th>ĺşçç¤ž</th>
            <th>ĺşçĺš´</th>
            <th>ăŞăłăŻ</th>
          </tr>
        </thead>
        <tbody>
          {books.map((x, i) => (
            <tr key={i}>
              <td>
                <button type="button" onClick={() => selectBook(x)}>
                  é¸ć
                </button>
              </td>
              <td>{x.volumeInfo.title}</td>
              <td>{x.volumeInfo.publisher}</td>
              <td>{x.volumeInfo.publishedDate}</td>
              <td>
                <a
                  href={x.volumeInfo.infoLink}
                  target="_blank"
                  rel="noreferrer"
                >
                  Link
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};