import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import {
  FaBars, FaBell, FaUserCircle, FaHome, FaSignInAlt, FaUserPlus,
  FaTable, FaCog, FaSearch, FaChevronDown, FaChevronRight
} from 'react-icons/fa';

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [submenus, setSubmenus] = useState({
    table: false,
    gameInfo: false,
    serverInfo: false,
    questInfo: false,
    donation: false,
    serviceDonationSubmenu: false,
    featureInfo: false,
    generalInfo: false,
    npcList: false,
    dropList: false,
  });

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const toggleSubmenu = (name) =>
    setSubmenus(prev => ({ ...prev, [name]: !prev[name] }));

  const donationTypes = ['Retail', 'SeassonPass', 'Package', 'HowTo'];

  return (
    <div className="flex">
      {sidebarOpen && (
        <div
          className="bg-gray-800 text-gray-100 p-4 hidden md:block fixed h-full overflow-y-auto z-50"
          style={{ width: '250px' }}
        >
          <div className="flex items-center mb-6 pl-3">
            <img src="/vikings.png" alt="Logo Vikings" className="h-16 w-16 mr-2" />
            <span className="text-xl font-light">Vikings</span>
          </div>

          <nav className="flex flex-col mt-5">
            <Link to="/admin" className="text-gray-300 font-light flex items-center mb-3 hover:bg-gray-700 px-3 py-2 rounded-md transition-colors duration-200 no-underline">
              <FaHome className="mr-3 text-lg" /> Dashboard
            </Link>
            <Link to="/login" className="text-gray-300 font-light flex items-center mb-3 hover:bg-gray-700 px-3 py-2 rounded-md transition-colors duration-200 no-underline">
              <FaSignInAlt className="mr-3 text-lg" /> Login
            </Link>
            <Link to="/register" className="text-gray-300 font-light flex items-center mb-3 hover:bg-gray-700 px-3 py-2 rounded-md transition-colors duration-200 no-underline">
              <FaUserPlus className="mr-3 text-lg" /> Register
            </Link>

            <div
              onClick={() => toggleSubmenu('table')}
              className="text-gray-300 font-light flex items-center justify-between mb-3 px-3 py-2 rounded-md hover:bg-gray-700 cursor-pointer transition-colors duration-200"
            >
              <div className="flex items-center">
                <FaTable className="mr-3 text-lg" /> Table Lists
              </div>
              <span>{submenus.table ? <FaChevronDown size={14} /> : <FaChevronRight size={14} />}</span>
            </div>

            {submenus.table && (
              <div className="flex flex-col pl-6 py-1">
                <Link to="/admin/table-list/users" className="text-gray-400 font-light mb-2 hover:bg-gray-700 px-3 py-2 rounded-md transition-colors duration-200 no-underline">
                  User Table
                </Link>

                <div
                  onClick={() => toggleSubmenu('gameInfo')}
                  className="text-gray-300 font-light flex items-center justify-between mb-2 px-3 py-2 rounded-md hover:bg-gray-700 cursor-pointer transition-colors duration-200"
                >
                  <span>Game Info</span>
                  <span>{submenus.gameInfo ? <FaChevronDown size={12} /> : <FaChevronRight size={12} />}</span>
                </div>

                {submenus.gameInfo && (
                  <div className="flex flex-col pl-6 py-1">
                    <div
                      onClick={() => toggleSubmenu('serverInfo')}
                      className="text-gray-300 font-light flex items-center justify-between mb-2 px-3 py-2 rounded-md hover:bg-gray-700 cursor-pointer transition-colors duration-200"
                    >
                      <span>Server Info</span>
                      <span>{submenus.serverInfo ? <FaChevronDown size={12} /> : <FaChevronRight size={12} />}</span>
                    </div>

                    {submenus.serverInfo && (
                      <div className="flex flex-col pl-6 py-1">
                        <div
                          onClick={() => toggleSubmenu('featureInfo')}
                          className="text-gray-300 font-light flex items-center justify-between mb-2 px-3 py-2 rounded-md hover:bg-gray-700 cursor-pointer transition-colors duration-200"
                        >
                          <span>Feature Information</span>
                          <span>{submenus.featureInfo ? <FaChevronDown size={12} /> : <FaChevronRight size={12} />}</span>
                        </div>
                        {submenus.featureInfo && (
                          <div className="flex flex-col pl-6 py-1">
                            <Link to="/admin/table-list/game-info/server-info/featureinfo/pendant-information" className="text-gray-400 font-light mb-2 hover:bg-gray-700 px-3 py-2 rounded-md transition-colors duration-200 no-underline">
                              Pendant Information
                            </Link>
                            <Link to="/admin/table-list/game-info/server-info/featureinfo/gem-information" className="text-gray-400 font-light mb-2 hover:bg-gray-700 px-3 py-2 rounded-md transition-colors duration-200 no-underline">
                              Gem Information
                            </Link>
                          </div>
                        )}

                        <div
                          onClick={() => toggleSubmenu('generalInfo')}
                          className="text-gray-300 font-light flex items-center justify-between mb-2 px-3 py-2 rounded-md hover:bg-gray-700 cursor-pointer transition-colors duration-200"
                        >
                          <span>General Information</span>
                          <span>{submenus.generalInfo ? <FaChevronDown size={12} /> : <FaChevronRight size={12} />}</span>
                        </div>
                        {submenus.generalInfo && (
                          <div className="flex flex-col pl-6 py-1">
                            <Link to="/admin/table-list/game-info/server-info/generalinfo/serversinfo" className="text-gray-400 font-light mb-2 hover:bg-gray-700 px-3 py-2 rounded-md transition-colors duration-200 no-underline">
                              Server Information
                            </Link>
                            <Link to="/admin/table-list/game-info/server-info/generalinfo/systeminfo" className="text-gray-400 font-light mb-2 hover:bg-gray-700 px-3 py-2 rounded-md transition-colors duration-200 no-underline">
                              System Information
                            </Link>
                            <Link to="/admin/table-list/game-info/server-info/generalinfo/feature-disable" className="text-gray-400 font-light mb-2 hover:bg-gray-700 px-3 py-2 rounded-md transition-colors duration-200 no-underline">
                              Feature Disable
                            </Link>
                            <Link to="/admin/table-list/game-info/server-info/generalinfo/feature-enable" className="text-gray-400 font-light mb-2 hover:bg-gray-700 px-3 py-2 rounded-md transition-colors duration-200 no-underline">
                              Feature Enable
                            </Link>
                          </div>
                        )}

                        <div
                          onClick={() => toggleSubmenu('npcList')}
                          className="text-gray-300 font-light flex items-center justify-between mb-2 px-3 py-2 rounded-md hover:bg-gray-700 cursor-pointer transition-colors duration-200"
                        >
                          <span>NPC List Information</span>
                          <span>{submenus.npcList ? <FaChevronDown size={12} /> : <FaChevronRight size={12} />}</span>
                        </div>
                        {submenus.npcList && (
                          <div className="flex flex-col pl-6 py-1">
                            <Link to="/admin/table-list/game-info/server-info/npclist" className="text-gray-400 font-light mb-2 hover:bg-gray-700 px-3 py-2 rounded-md transition-colors duration-200 no-underline">
                              NPC List
                            </Link>
                          </div>
                        )}

                        <div
                          onClick={() => toggleSubmenu('dropList')}
                          className="text-gray-300 font-light flex items-center justify-between mb-2 px-3 py-2 rounded-md hover:bg-gray-700 cursor-pointer transition-colors duration-200"
                        >
                          <span>Drop List Information</span>
                          <span>{submenus.dropList ? <FaChevronDown size={12} /> : <FaChevronRight size={12} />}</span>
                        </div>
                        {submenus.dropList && (
                          <div className="flex flex-col pl-6 py-1">
                            <Link to="/admin/table-list/game-info/server-info/droplist" className="text-gray-400 font-light mb-2 hover:bg-gray-700 px-3 py-2 rounded-md transition-colors duration-200 no-underline">
                              Drop List
                            </Link>
                          </div>
                        )}
                      </div>
                    )}

                    <div
                      onClick={() => toggleSubmenu('questInfo')}
                      className="text-gray-300 font-light flex items-center justify-between mb-2 px-3 py-2 rounded-md hover:bg-gray-700 cursor-pointer transition-colors duration-200"
                    >
                      <span>Quest Info</span>
                      <span>{submenus.questInfo ? <FaChevronDown size={12} /> : <FaChevronRight size={12} />}</span>
                    </div>
                    {submenus.questInfo && (
                      <div className="flex flex-col pl-6 py-1">
                        <Link
                          to="/admin/table-list/game-info/quest-info/dailyquestafterwar"
                          className="text-gray-400 font-light mb-2 hover:bg-gray-700 px-3 py-2 rounded-md transition-colors duration-200 no-underline"
                        >
                          Daily Quest After War
                        </Link>
                        <Link
                          to="/admin/table-list/game-info/quest-info/dailyquest"
                          className="text-gray-400 font-light mb-2 hover:bg-gray-700 px-3 py-2 rounded-md transition-colors duration-200 no-underline"
                        >
                          Daily Quest
                        </Link>
                      </div>
                    )}

                    <Link
                      to="/admin/table-list/game-info/mapinfo"
                      className="text-gray-400 font-light mb-2 hover:bg-gray-700 px-3 py-2 rounded-md transition-colors duration-200 no-underline"
                    >
                      Map Info
                    </Link>

                    <Link to="/admin/table-list/game-info/server-rules" className="text-gray-400 font-light mb-2 hover:bg-gray-700 px-3 py-2 rounded-md transition-colors duration-200 no-underline">
                      Server Rules
                    </Link>
                  </div>
                )}

                <div
                  onClick={() => toggleSubmenu('donation')}
                  className="text-gray-300 font-light flex items-center justify-between mb-2 px-3 py-2 rounded-md hover:bg-gray-700 cursor-pointer transition-colors duration-200"
                >
                  <span>Donation Info</span>
                  <span>{submenus.donation ? <FaChevronDown size={12} /> : <FaChevronRight size={12} />}</span>
                </div>
                {submenus.donation && (
                  <div className="flex flex-col pl-6 py-1">
                    <div
                      onClick={() => toggleSubmenu('serviceDonationSubmenu')}
                      className="text-gray-300 font-light flex items-center justify-between mb-2 px-3 py-2 rounded-md hover:bg-gray-700 cursor-pointer transition-colors duration-200"
                    >
                      <span>Service Donation</span>
                      <span>{submenus.serviceDonationSubmenu ? <FaChevronDown size={12} /> : <FaChevronRight size={12} />}</span>
                    </div>
                    {submenus.serviceDonationSubmenu && (
                      <div className="flex flex-col pl-6 py-1">
                        <Link to="/admin/table-list/donation/service/services" className="text-gray-400 font-light mb-2 hover:bg-gray-700 px-3 py-2 rounded-md transition-colors duration-200 no-underline">
                          Service Donation
                        </Link>
                        <Link to="/admin/table-list/donation/service/gemstone" className="text-gray-400 font-light mb-2 hover:bg-gray-700 px-3 py-2 rounded-md transition-colors duration-200 no-underline">
                          Tab Gemstone
                        </Link>
                        <Link to="/admin/table-list/donation/service/resources" className="text-gray-400 font-light mb-2 hover:bg-gray-700 px-3 py-2 rounded-md transition-colors duration-200 no-underline">
                          Tab Resources
                        </Link>
                      </div>
                    )}

                    {/* Modified section for Donation Types */}
                    {donationTypes.filter(type => type !== 'Service').map(type => (
                      <Link
                        key={type}
                        // Conditionally set the 'to' prop
                        to={type === 'Package' ? '/admin/table-list/donation/packages' : `/admin/table-list/donation/${type.toLowerCase()}`}
                        className="text-gray-400 font-light mb-2 hover:bg-gray-700 px-3 py-2 rounded-md transition-colors duration-200 no-underline"
                      >
                        {type} Donation
                      </Link>
                    ))}

                    <Link
                      to="/admin/table-list/donation/package-categories"
                      className="text-gray-400 font-light mb-2 hover:bg-gray-700 px-3 py-2 rounded-md transition-colors duration-200 no-underline"
                    >
                      Package Category
                    </Link>
                    <Link
                      to="/admin/table-list/donation/item-package"
                      className="text-gray-400 font-light mb-2 hover:bg-gray-700 px-3 py-2 rounded-md transition-colors duration-200 no-underline"
                    >
                      Item Package Bonus
                    </Link>
                    <Link
                      to="/admin/table-list/donation/package-bonuses"
                      className="text-gray-400 font-light mb-2 hover:bg-gray-700 px-3 py-2 rounded-md transition-colors duration-200 no-underline"
                    >
                      Package Bonus
                    </Link>
                  </div>
                )}

                <Link
                  to="/admin/table-list/game-info/items"
                  className="text-gray-300 font-light flex items-center mb-2 px-3 py-2 rounded-md hover:bg-gray-700 cursor-pointer transition-colors duration-200 no-underline"
                >
                  <span>Items</span>
                </Link>

              </div>
            )}

            <Link to="/settings" className="text-gray-300 font-light flex items-center mt-3 mb-3 hover:bg-gray-700 px-3 py-2 rounded-md transition-colors duration-200 no-underline">
              <FaCog className="mr-3 text-lg" /> Settings
            </Link>
          </nav>
        </div>
      )}

      <div
        className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${sidebarOpen ? 'ml-[250px]' : 'ml-0'}`}
        style={{ backgroundColor: '#f8f9fa' }}
      >
        <header className="bg-white px-4 py-3 shadow-sm flex items-center justify-between z-40">
          <div className="flex items-center w-full justify-between md:justify-start">
            <button
              className="text-gray-700 focus:outline-none mr-4 md:hidden"
              onClick={toggleSidebar}
            >
              <FaBars size={24} />
            </button>
            <span className="text-xl font-bold text-gray-800 md:hidden">Vikings</span>

            <div className="hidden md:flex flex-grow justify-end pr-4">
              <div className="relative w-full max-w-sm">
                <input
                  type="search"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 w-full rounded-full border border-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                />
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4 ml-4">
            <FaBell className="text-gray-600 text-xl cursor-pointer hover:text-gray-800 transition-colors duration-200" />
            <FaUserCircle className="text-gray-600 text-2xl cursor-pointer hover:text-gray-800 transition-colors duration-200" />
          </div>
        </header>

        <main className="p-4 flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;