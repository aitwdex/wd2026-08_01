// 自作ライブラリのインポート
import { codeToText } from "./weatherText.js";

// 今の天気を取りに行くイベントリスナー
document.getElementById("getBtn").addEventListener("click", () => {
  getWeather();
});

// 天気を取得して表示する
async function getWeather() {
  // 大垣の現在の天気を取得するURL
  const url = "https://api.open-meteo.com/v1/forecast?latitude=35.36&longitude=136.62&current_weather=true";

  try {
    // URLにデータを出してもらう
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error("データの取得に失敗しました");
    }

    // 返ってきたデータをJSONとして取り出す
    const data = await response.json();

    // 必要な値をコーデで取り出す
    const temp = data.current_weather.temperature;
    const code = data.current_weather.weathercode;
    const wind = data.current_weather.windspeed;

    // 自作ライブラリで数値コードを日本語に変換する
    const weather = codeToText(code);

    // 表示する
    document.getElementById("temp").textContent =
      `${weather} / 気温: ${temp}℃ / 風速: ${wind} km/h`;

    // 返ってきた全データをコンソールで確認
    console.log(data);

  } catch (error) {
    // エラー時の処理
    document.getElementById("temp").textContent = `エラー: ${error.message}`;
  }
}