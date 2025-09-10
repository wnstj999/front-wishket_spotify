import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// 페이지 import
import SearchPage from "./pages/SearchPage";
import ChartPage from "./pages/ChartPage"; 
import PlaylistPage from "./pages/PlaylistPage"; 
import ArtistPage from "./pages/ArtistPage"; 
import RecommendPage from "./pages/RecommendPage"; 

// 사이드바 import
import Sidebar from "./components/Sidebar";

const App = () => {
  const isLoggedIn = !!localStorage.getItem("token");

  if (!isLoggedIn) {
    window.location.href = "login.html";
    return null;
  }

  return (
    <Router>
      <div className="flex">
        {/* 왼쪽: 사이드바 */}
        <Sidebar />

        {/* 오른쪽: 페이지 컨텐츠 */}
        <div className="flex-1 p-6">
          <Routes>
            <Route path="/" element={<Navigate to="/search" />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/chart" element={<ChartPage />} />
            <Route path="/playlist" element={<PlaylistPage />} />
            <Route path="/artist" element={<ArtistPage />} />
            <Route path="/recommend" element={<RecommendPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
