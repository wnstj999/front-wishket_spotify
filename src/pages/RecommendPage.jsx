import React, { useState } from "react";
import axios from "axios";

const getAccessToken = async () => {
  const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;

  const tokenUrl = "https://accounts.spotify.com/api/token";
  const authHeader = btoa(`${clientId}:${clientSecret}`);

  const response = await axios.post(
    tokenUrl,
    "grant_type=client_credentials",
    {
      headers: {
        Authorization: `Basic ${authHeader}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  return response.data.access_token;
};

export default function RecommendPage() {
  const [track, setTrack] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);

  // 추천곡 불러오기 (Spotify 글로벌 Top 50에서 랜덤)
  const getRandomTrack = async () => {
    setLoading(true);
    try {
      const token = await getAccessToken();
      const playlistId = "37i9dQZEVXbMDoHDwVN2tF"; // Spotify 글로벌 Top 50

      const res = await axios.get(
        `https://api.spotify.com/v1/playlists/${playlistId}/tracks?limit=50`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const items = res.data.items;
      const randomIndex = Math.floor(Math.random() * items.length);
      const selected = items[randomIndex].track;

      setTrack(selected);

      // 오디오 피처 분석
      const audioRes = await axios.get(
        `https://api.spotify.com/v1/audio-features/${selected.id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setAnalysis(audioRes.data);
    } catch (err) {
      console.error("추천곡 오류:", err);
      alert("추천곡을 불러오는 중 오류가 발생했습니다.");
    }
    setLoading(false);
  };

  // 무드 텍스트 해석
  const interpretMood = (features) => {
    if (!features) return "";
    const { energy, danceability, valence } = features;
    let mood = [];

    if (energy > 0.7) mood.push("에너지가 넘치는");
    if (danceability > 0.7) mood.push("댄스하기 좋은");
    if (valence > 0.6) mood.push("밝고 긍정적인");
    if (valence < 0.4) mood.push("감성적인");

    return mood.length > 0 ? mood.join(" / ") : "독특한 분위기의";
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">🪩 오늘의 추천곡</h1>

      <button
        onClick={getRandomTrack}
        className="bg-pink-500 text-white px-4 py-2 rounded mb-6"
      >
        랜덤 추천 받기 🎲
      </button>

      {loading && <p>⏳ 추천곡 불러오는 중...</p>}

      {track && (
        <div className="border p-4 rounded shadow-sm">
          {/* 앨범 이미지 */}
          {track.album.images[0] && (
            <img
              src={track.album.images[0].url}
              alt={track.name}
              className="w-32 h-32 object-cover rounded mb-4"
            />
          )}

          {/* 곡 정보 */}
          <h2 className="text-xl font-bold">{track.name}</h2>
          <p className="text-gray-600">
            {track.artists.map((a) => a.name).join(", ")}
          </p>

          {/* 미리듣기 */}
          {track.preview_url ? (
            <audio controls src={track.preview_url} className="mt-2" />
          ) : (
            <p className="text-sm text-gray-400 mt-2">미리듣기 불가</p>
          )}

          {/* Spotify 링크 */}
          <a
            href={track.external_urls.spotify}
            target="_blank"
            rel="noreferrer"
            className="text-green-600 underline block mt-2"
          >
            Spotify에서 보기
          </a>

          {/* 분위기 해석 */}
          {analysis && (
            <p className="mt-4 text-blue-600 font-semibold">
              분위기: {interpretMood(analysis)}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
