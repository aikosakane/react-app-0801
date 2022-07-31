import { useState, useEffect } from "react";
import axios from "axios";
import weatherJson from "../static/weather.json";
// 2 ----- google map api
import { GoogleMap, LoadScript } from "@react-google-maps/api";


export const BookCreate = () => {
  // 🔽 追加
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

    // 🔽 追加
    setLoading(false);
  };

  const fail = (error) => console.log(error);
  // 永遠に実行されてしまうため、[空配列]にして最初の一回だけ実行するようにする  
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success, fail);
  }, []);

  // 🔽 追加
  if (loading) {
    return <p>now loading...</p>;
  }

  return (
    <>
      <table>
        <tbody>
          <tr>
            <td>場所</td>
            <td>{place}</td>
          </tr>
          <tr>
            <td>天気</td>
            <td>{weather}</td>
          </tr>
          <tr>
            <td>読んだ本</td>
            <td>{book}</td>
          </tr>
        </tbody>
      </table>
      <p>キーワードで検索する</p>
      <input type="text" onChange={(e) => getBooks(e.target.value)} />
      <table>
        <thead>
          <tr>
            <th></th>
            <th>書籍名</th>
            <th>出版社</th>
            <th>出版年</th>
            <th>リンク</th>
          </tr>
        </thead>
        <tbody>
          {books.map((x, i) => (
            <tr key={i}>
              <td>
                <button type="button" onClick={() => selectBook(x)}>
                  選択
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