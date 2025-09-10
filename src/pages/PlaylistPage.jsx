import React, { useState, useEffect } from "react";

export default function PlaylistPage() {
  const [playlist, setPlaylist] = useState([]);

  // LocalStorage에서 불러오기
  useEffect(() => {
    const saved = localStorage.getItem("myPlaylist");
    if (saved) {
      setPlaylist(JSON.parse(saved));
    }
  }, []);

  // LocalStorage에 저장하기
  const savePlaylist = (updated) => {
    setPlaylist(updated);
    localStorage.setItem("myPlaylist", JSON.stringify(updated));
  };

  // 곡 삭제
  const removeTrack = (id) => {
    const updated = playlist.filter((track) => track.id !== id);
    savePlaylist(updated);
  };

  // 랜덤 추천곡 추가 (임시 더미)
  const addRandomTrack = () => {
    const dummyTrack = {
      id: Date.now(),
      name: "랜덤 추천곡 🎲",
      artist: "AI",
    };
    savePlaylist([...playlist, dummyTrack]);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">🎧 내 플레이리스트</h1>

      <button
        onClick={addRandomTrack}
        className="bg-purple-500 text-white px-4 py-2 rounded mb-4"
      >
        랜덤 추천곡 추가
      </button>

      {playlist.length === 0 ? (
        <p>아직 저장된 곡이 없습니다.</p>
      ) : (
        <ul className="space-y-3">
          {playlist.map((track) => (
            <li
              key={track.id}
              className="border p-4 rounded flex justify-between items-center"
            >
              <div>
                <p className="font-bold">{track.name}</p>
                <p className="text-sm text-gray-600">{track.artist}</p>
              </div>
              <button
                onClick={() => removeTrack(track.id)}
                className="text-red-500 font-bold"
              >
                삭제
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
