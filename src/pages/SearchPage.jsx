import React, { useState } from "react";
import axios from "axios";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // 토큰 가져오기
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

  // 검색 실행
  const handleSearch = async () => {
    if (!query) return;
    setLoading(true);

    try {
      const token = await getAccessToken();
      const response = await axios.get(
        `https://api.spotify.com/v1/search?q=${encodeURIComponent(
          query
        )}&type=track&limit=10`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setResults(response.data.tracks.items);
    } catch (err) {
      console.error("검색 오류:", err);
      alert("검색 중 오류가 발생했습니다. 콘솔을 확인하세요.");
    }

    setLoading(false);
  };

  // 플레이리스트에 추가
  const addToPlaylist = (track) => {
    const saved = localStorage.getItem("myPlaylist");
    let playlist = saved ? JSON.parse(saved) : [];

    // 중복 확인
    if (playlist.some((t) => t.id === track.id)) {
      alert("이미 플레이리스트에 있습니다!");
      return;
    }

    const newTrack = {
      id: track.id,
      name: track.name,
      artist: track.artists.map((a) => a.name).join(", "),
    };

    playlist.push(newTrack);
    localStorage.setItem("myPlaylist", JSON.stringify(playlist));
    alert("플레이리스트에 추가되었습니다!");
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">🎵 음악 검색</h1>

      {/* 검색창 */}
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          className="border p-2 flex-1 rounded"
          placeholder="노래 제목 또는 아티스트 입력"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <button
          onClick={handleSearch}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          검색
        </button>
      </div>

      {/* 로딩 표시 */}
      {loading && <p>⏳ 검색 중...</p>}

      {/* 검색 결과 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {results.map((track) => (
          <div
            key={track.id}
            className="border rounded p-4 flex gap-4 items-start shadow-sm"
          >
            {/* 앨범 이미지 */}
            {track.album.images[0] && (
              <img
                src={track.album.images[0].url}
                alt={track.name}
                className="w-24 h-24 object-cover rounded"
              />
            )}

            <div className="flex-1">
              <h2 className="font-bold">{track.name}</h2>
              <p className="text-gray-600">
                {track.artists.map((a) => a.name).join(", ")}
              </p>

              {/* 미리듣기 */}
              {track.preview_url ? (
                <audio controls src={track.preview_url} className="mt-2" />
              ) : (
                <p className="text-sm text-gray-400 mt-2">미리듣기 불가</p>
              )}

              {/* Spotify로 이동 */}
              <a
                href={track.external_urls.spotify}
                target="_blank"
                rel="noreferrer"
                className="text-blue-500 underline block mt-2"
              >
                Spotify에서 열기
              </a>

              {/* 플레이리스트 추가 버튼 */}
              <button
                onClick={() => addToPlaylist(track)}
                className="bg-purple-500 text-white px-3 py-1 rounded mt-3"
              >
                플레이리스트에 추가
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
