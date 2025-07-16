import React, { useState } from "react";
import Sidebar from "../../Components/Admin_Sidebar";
import NewsPage from "./MasterNews";
import DashboardLayout from "../../Components/DashboardLayout";

// Import semua komponen konten yang akan dipanggil
// import UserTable from "./Tables/UserTable";
import PendantInformation from "../../Components/ServerInfo/FeatureInformation/PendantInformation";
import GemInformation from "../../Components/ServerInfo/FeatureInformation/GemInformation";
import ServersInformation from "../../Components/ServerInfo/GeneralInfo/ServersInformation";
import SystemInformation from "../../Components/ServerInfo/GeneralInfo/SystemInformation";
import FeaturesDisable from "../../Components/ServerInfo/GeneralInfo/FeaturesDisable";
import FeaturesEnable from "../../Components/ServerInfo/GeneralInfo/FeaturesEnable";
import NpcList from "../../Components/ServerInfo/NPCList/NpcList";
import DropList from "../../Components/ServerInfo/DropList/DropList";
import DailyQuestAfterWar from "../../Components/QuestInfo/DailyQuestAfterWar";
import DailyQuest from "../../Components/QuestInfo/DailyQuest";
import MapInfo from "../../Components/MapInfo/MapInfo";
import ServerRules from "../../Components/GameInfo/ServerRules";
import ItemsInfo from "../../Components/GameInfo/ItemsInfo";

import ServiceDonation from "../../Components/Donation/ServiceDonation/ServiceDonation";
import TabGemstone from "../../Components/Donation/ServiceDonation/TabGemstone";
import TabResources from "../../Components/Donation/ServiceDonation/TabResources";
import RetailDonation from "../../Components/Donation/RetailDonation";
import SeassonPassDonation from "../../Components/Donation/SeassonPassDonation";
import PackagesInfo from "../../Components/PackagesInfo";
import HowToDonation from "../../Components/Donation/HowToDonation";
import PackageCategoryInfo from "../../Components/PackageCategoryInfo";
import ItemPackageBonusInfo from "../../Components/ItemPackageBonusInfo";
import PackageBonusInfo from "../../Components/PackageBonusInfo";

const AdminPage = () => {
  const [activePage, setActivePage] = useState("");

  const renderContent = () => {
    switch (activePage) {
      case "news":
        return <NewsPage />;
      // case "userTable":
      //   return <UserTable />;
      case "pendantInformation":
        return <PendantInformation />;
      case "gemInformation":
        return <GemInformation />;
      case "serversinfo":
        return <ServersInformation />;
      case "systeminfo":
        return <SystemInformation />;
      case "feature-disable":
        return <FeaturesDisable />;
      case "feature-enable":
        return <FeaturesEnable />;
      case "npclist":
        return <NpcList />;
      case "droplist":
        return <DropList />;
      case "dailyquestafterwar":
        return <DailyQuestAfterWar />;
      case "dailyquest":
        return <DailyQuest />;
      case "mapinfo":
        return <MapInfo />;
      case "serverrules":
        return <ServerRules />;

      case "services":
        return <ServiceDonation />;
      case "gemstone":
        return <TabGemstone />;
      case "resources":
        return <TabResources />;
      case "retail":
        return <RetailDonation />;
      case "seassonpass":
        return <SeassonPassDonation />;
      case "packages":
        return <PackagesInfo />;
      case "howto":
        return <HowToDonation />;
      case "package-categories":
        return <PackageCategoryInfo />;
      case "item-package":
        return <ItemPackageBonusInfo />;
      case "package-bonuses":
        return <PackageBonusInfo />;
      case "item":
        return <ItemsInfo />;

      default:
        return (
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">
              Welcome to Admin Dashboard
            </h1>
            <p className="text-gray-600">
              Silakan pilih menu di sidebar untuk mengelola data.
            </p>
          </div>
        );
    }
  };

  return (
    <div className="h-screen flex">
      <Sidebar onMenuClick={setActivePage} activePage={activePage} />
      <main className="flex-1 p-8 bg-gray-100 overflow-auto">
        {renderContent()}
      </main>
    </div>
  );
};

export default AdminPage;
