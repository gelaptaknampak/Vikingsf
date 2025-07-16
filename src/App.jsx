import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

// --- Components & Pages (Public)
import Home from "./Pages/home";
import Header from "./Components/header";
import Footer from "./Components/footer";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Forgot from "./Components/forgot";
import ResetPassword from "./Components/ResetPassword";
import ServerInfo from "./Pages/GameInfo/serverinfo";
import QuestInfo from "./Pages/GameInfo/questinfo";
import Rules from "./Pages/GameInfo/rules";
import MapInfo from "./Pages/GameInfo/mapinfo";
import Donation from "./Pages/donation";
import News from "./Pages/News/News";
import NewsDetail from "./Pages/News/NewsDetail";
import Download from "./Pages/Download/Download";
import ProtectedRoute from "./Components/ProtectedRoute";
import api from "./Components/api";

// --- Admin Dashboard
import Admin from "../src/Pages/Admin/main";

// Tables
import ServerRules from "./Components/GameInfo/ServerRules";
import MapInfoAdmin from "./Components/MapInfo/MapInfo";

// Feature Info
import PendantInformation from "./Components/ServerInfo/FeatureInformation/PendantInformation";
import GemInformation from "./Components/ServerInfo/FeatureInformation/GemInformation";

// NPC & Drop
import NpcList from "./Components/ServerInfo/NPCList/NpcList";
import DropList from "./Components/ServerInfo/DropList/DropList";
import ItemsInfo from "./Components/GameInfo/ItemsInfo";

// General Info
import ServersInformation from "./Components/ServerInfo/GeneralInfo/ServersInformation";
import SystemInformation from "./Components/ServerInfo/GeneralInfo/SystemInformation";
import FeaturesDisable from "./Components/ServerInfo/GeneralInfo/FeaturesDisable";
import FeaturesEnable from "./Components/ServerInfo/GeneralInfo/FeaturesEnable";

// Quest Info
import DailyQuestAfterWar from "./Components/QuestInfo/DailyQuestAfterWar";
import DailyQuest from "./Components/QuestInfo/DailyQuest";

// Donation
import RetailDonation from "./Components/Donation/RetailDonation";
import SeassonPassDonation from "./Components/Donation/SeassonPassDonation";
import HowToDonation from "./Components/Donation/HowToDonation";
import ServiceDonation from "./Components/Donation/ServiceDonation/ServiceDonation";
import TabGemstone from "./Components/Donation/ServiceDonation/TabGemstone";
import TabResources from "./Components/Donation/ServiceDonation/TabResources";

import PackagesInfo from "./Components/PackagesInfo";
import PackageCategoryInfo from "./Components/PackageCategoryInfo";
import PackageBonusInfo from "./Components/PackageBonusInfo";
import ItemPackageBonusInfo from "./Components/ItemPackageBonusInfo";

// Layout utama dengan Header dan Footer
function MainLayout({ children }) {
  return (
    <>
      <Header />
      <div>{children}</div>
      <Footer />
    </>
  );
}

function App() {
  const [redirectPath, setRedirectPath] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setRedirectPath("/login");
      setLoading(false);
      return;
    }

    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    api
      .get("/me")
      .then((res) => {
        const role = res.data.role?.toLowerCase();
        if (role === "admin") {
          setRedirectPath("/admin");
        } else {
          setRedirectPath("/");
        }
      })
      .catch(() => {
        setRedirectPath("/login");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-white text-center">Loading...</p>;

  return (
    <BrowserRouter>
      <Routes>
        {/* PUBLIC ROUTES */}
        <Route
          path="/"
          element={
            <MainLayout>
              <>
                <div className="section-dark-atas"></div>
                <div className="section-dark-tengah"></div>
                <div className="section-dark-bawah"></div>
                <Home />
              </>
            </MainLayout>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route
          path="/gameinfo/server"
          element={
            <MainLayout>
              <ServerInfo />
            </MainLayout>
          }
        />
        <Route
          path="/gameinfo/quest"
          element={
            <MainLayout>
              <QuestInfo />
            </MainLayout>
          }
        />
        <Route
          path="/gameinfo/map"
          element={
            <MainLayout>
              <MapInfo />
            </MainLayout>
          }
        />
        <Route
          path="/gameinfo/rules"
          element={
            <MainLayout>
              <Rules />
            </MainLayout>
          }
        />
        <Route
          path="/donation"
          element={
            <MainLayout>
              <Donation />
            </MainLayout>
          }
        />
        <Route
          path="/news"
          element={
            <MainLayout>
              <News />
            </MainLayout>
          }
        />
        <Route
          path="/news/:id"
          element={
            <MainLayout>
              <NewsDetail />
            </MainLayout>
          }
        />
        <Route
          path="/download"
          element={
            <MainLayout>
              <Download />
            </MainLayout>
          }
        />

        {/* PROTECTED ADMIN ROUTE */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute roleRequired="admin">
              <Admin />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />

          <Route path="table-list/game-info">
            <Route path="items" element={<ItemsInfo />} />
            <Route path="server-rules" element={<ServerRules />} />
            <Route path="mapinfo" element={<MapInfoAdmin />} />

            <Route path="server-info">
              <Route path="npclist" element={<NpcList />} />
              <Route path="droplist" element={<DropList />} />

              <Route path="featureinfo">
                <Route
                  path="pendant-information"
                  element={<PendantInformation />}
                />
                <Route path="gem-information" element={<GemInformation />} />
              </Route>

              <Route path="GeneralInfo">
                <Route path="systeminfo" element={<SystemInformation />} />
                <Route path="serversinfo" element={<ServersInformation />} />
                <Route path="feature-disable" element={<FeaturesDisable />} />
                <Route path="feature-enable" element={<FeaturesEnable />} />
              </Route>
            </Route>

            <Route path="quest-info">
              <Route
                path="dailyquestafterwar"
                element={<DailyQuestAfterWar />}
              />
              <Route path="dailyquest" element={<DailyQuest />} />
            </Route>
          </Route>

          <Route path="table-list/donation">
            <Route path="service">
              <Route path="services" element={<ServiceDonation />} />
              <Route path="gemstone" element={<TabGemstone />} />
              <Route path="resources" element={<TabResources />} />
            </Route>
            <Route path="retail" element={<RetailDonation />} />
            <Route path="seassonpass" element={<SeassonPassDonation />} />
            <Route path="packages" element={<PackagesInfo />} />
            <Route path="howto" element={<HowToDonation />} />
            <Route
              path="package-categories"
              element={<PackageCategoryInfo />}
            />
            <Route path="package-bonuses" element={<PackageBonusInfo />} />
            <Route path="item-package" element={<ItemPackageBonusInfo />} />
          </Route>
        </Route>

        {/* 404 fallback */}
        <Route
          path="*"
          element={
            <h4 className="text-center mt-5 text-white">
              Halaman Tidak Ditemukan
            </h4>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
