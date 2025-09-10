import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// 토큰 발급 함수 (SearchPage와 공용으로 쓸 수도 있음)
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

export default function ChartPage() {
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(false);

  // Spotify 글로벌 Top50 플레이리스트 (고정 ID 사용)
  const PLAYLIST_ID = "37i9dQZEVXbMDoHDwVN2tF";

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const token = await getAccessToken();
        const response = await axios.get(
          `https://api.spotify.com/v1/playlists/${PLAYLIST_ID}/tracks?limit=10`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        // 데이터 가공
        const items = response.data.items.map((item, index) => ({
          rank: index + 1,
          name: item.track.name,
          artist: item.track.artists.map((a) => a.name).join(", "),
          popularity: item.track.popularity,
        }));

        setTracks(items);
      } catch (err) {
        console.error("차트 로드 오류:", err);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">📊 Spotify 글로벌 Top 10</h1>

      {loading && <p>⏳ 로딩 중...</p>}

      {!loading && (
        <>
          {/* 표 형식 */}
          <table className="w-full border mb-6">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 border">순위</th>
                <th className="p-2 border">곡명</th>
                <th className="p-2 border">아티스트</th>
                <th className="p-2 border">인기도</th>
              </tr>
            </thead>
            <tbody>
              {tracks.map((t) => (
                <tr key={t.rank}>
                  <td className="p-2 border text-center">{t.rank}</td>
                  <td className="p-2 border">{t.name}</td>
                  <td className="p-2 border">{t.artist}</td>
                  <td className="p-2 border text-center">{t.popularity}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Recharts 시각화 */}
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={tracks}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" tick={{ fontSize: 10 }} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="popularity" fill="#4ade80" />
            </BarChart>
          </ResponsiveContainer>
        </>
      )}
    </div>
  );
}
