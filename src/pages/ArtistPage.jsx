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

export default function ArtistPage() {
  const [query, setQuery] = useState("");
  const [artist, setArtist] = useState(null);
  const [topTracks, setTopTracks] = useState([]);
  const [loading, setLoading] = useState(false);

  // 아티스트 검색
  const handleSearch = async () => {
    if (!query) return;
    setLoading(true);

    try {
      const token = await getAccessToken();

      // 아티스트 정보 가져오기
      const res = await axios.get(
        `https://api.spotify.com/v1/search?q=${encodeURIComponent(
          query
        )}&type=artist&limit=1`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.data.artists.items.length === 0) {
        alert("아티스트를 찾을 수 없습니다.");
        setArtist(null);
        setTopTracks([]);
        setLoading(false);
        return;
      }

      const artistData = res.data.artists.items[0];
      setArtist(artistData);

      // 아티스트 인기곡 (Top 5)
      const trackRes = await axios.get(
        `https://api.spotify.com/v1/artists/${artistData.id}/top-tracks?market=KR`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setTopTracks(trackRes.data.tracks.slice(0, 5));
    } catch (err) {
      console.error("아티스트 검색 오류:", err);
      alert("검색 중 오류 발생");
    }

    setLoading(false);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">🧑‍🎤 아티스트 분석</h1>

      {/* 검색창 */}
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          className="border p-2 flex-1 rounded"
          placeholder="아티스트 이름 입력"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          검색
        </button>
      </div>

      {/* 로딩 */}
      {loading && <p>⏳ 검색 중...</p>}

      {/* 아티스트 정보 */}
      {artist && (
        <div className="border p-4 rounded mb-6 shadow-sm">
          {artist.images[0] && (
            <img
              src={artist.images[0].url}
              alt={artist.name}
              className="w-32 h-32 object-cover rounded mb-4"
            />
          )}
          <h2 className="text-xl font-bold">{artist.name}</h2>
          <p>장르: {artist.genres.join(", ") || "정보 없음"}</p>
          <p>팔로워: {artist.followers.total.toLocaleString()}</p>
          <a
            href={artist.external_urls.spotify}
            target="_blank"
            rel="noreferrer"
            className="text-green-600 underline mt-2 block"
          >
            Spotify에서 보기
          </a>
        </div>
      )}

      {/* 인기곡 Top 5 */}
      {topTracks.length > 0 && (
        <div>
          <h3 className="text-lg font-bold mb-2">🔥 인기곡 Top 5</h3>
          <ul className="space-y-3">
            {topTracks.map((track) => (
              <li key={track.id} className="border p-3 rounded shadow-sm">
                <p className="font-bold">{track.name}</p>
                <p className="text-gray-600">
                  {track.artists.map((a) => a.name).join(", ")}
                </p>
                {track.preview_url ? (
                  <audio controls src={track.preview_url} className="mt-2" />
                ) : (
                  <p className="text-sm text-gray-400 mt-2">미리듣기 불가</p>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
