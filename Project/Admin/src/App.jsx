import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";

import Users from "./pages/users/Users";
import Climate from "./pages/climate/Climate";
import Laundry from "./pages/Laundry/Laundry";
import Tips from "./pages/tips/Tips";

// News pages
import NewsDetail from "./pages/news/NewsDetail";
import NewsCreate from "./pages/news/NewsCreate";
// User pages
import UserAll from "./pages/users/UserAll"
// Laudry pages
import ShopCreate from "./pages/Laundry/ShopCreate";
// tips pages
import TipsCreate from "./pages/tips/TipsCreate";
// climate page
import AdminClimate from "./pages/climate/adminClimate";



function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/users" element={<Users />} />
          <Route path="/climate" element={<Climate />} />
          <Route path="/laundry" element={<Laundry />} />

          {/* News routes */}

          <Route path="/news/detail" element={<NewsDetail />} />
          <Route path="/user/all" element={<UserAll />} />
          <Route path="/news/post" element={<NewsCreate />} />
          <Route path="/shops" element={<ShopCreate />} />

          <Route path="/tips" element={<Tips />} />
          <Route path="/tips/post" element={<TipsCreate />} />

          <Route path="/climate/admin" element={< AdminClimate />} />



          <Route path="*" element={<Users />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;
