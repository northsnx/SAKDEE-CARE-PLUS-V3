import React, { useState } from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
    const [openNews, setOpenNews] = useState(false);
    const [openUsers, setOpenUsers] = useState(false);
    const [openLaundry, setOpenLaundry] = useState(false);
    const [openTips, setOpenTips] = useState(false);
    const [openClimate, setOpenClimate] = useState(false);

    return (
        <div className="w-64 bg-gray-900 text-white h-screen p-4">
            <h1 className="text-xl font-bold mb-6">Admin Panel</h1>
            <nav className="flex flex-col gap-2">
                {/* Users Dropdown */}
                <button
                    onClick={() => setOpenUsers(!openUsers)}
                    className="flex justify-between items-center hover:bg-gray-700 p-2 rounded"
                >
                    <span>Users</span>
                    <span>{openUsers ? "▲" : "▼"}</span>
                </button>
                {openUsers && (
                    <div className="ml-4 flex flex-col gap-1 text-sm">
                        <Link
                            to="/user/all"
                            className="bg-gray-800 hover:bg-blue-600 p-2 rounded transition"
                        >
                            Get All Users
                        </Link>
                    </div>
                )}

                {/* Climate Dropdown */}
                <button
                    onClick={() => setOpenClimate(!openClimate)}
                    className="flex justify-between items-center hover:bg-gray-700 p-2 rounded"
                >
                    <span>Climate</span>
                    <span>{openClimate ? "▲" : "▼"}</span>
                </button>
                {openClimate && (
                    <div className="ml-4 flex flex-col gap-1 text-sm">
                        <Link
                            to="/climate/admin"
                            className="bg-gray-800 hover:bg-blue-600 p-2 rounded transition"
                        >
                            monitor
                        </Link>
                    </div>
                )}

                {/* Laundry Dropdown */}
                <button
                    onClick={() => setOpenTips(!openTips)}
                    className="flex justify-between items-center hover:bg-gray-700 p-2 rounded"
                >
                    <span>Tips</span>
                    <span>{openTips ? "▲" : "▼"}</span>
                </button>
                {openTips && (
                    <div className="ml-4 flex flex-col gap-1 text-sm">
                        <Link
                            to="/tips/post"
                            className="bg-gray-800 hover:bg-blue-600 p-2 rounded transition"
                        >
                            Post Tips
                        </Link>
                    </div>
                )}


                {/* News Dropdown */}
                <button
                    onClick={() => setOpenNews(!openNews)}
                    className="flex justify-between items-center hover:bg-gray-700 p-2 rounded"
                >
                    <span>News</span>
                    <span>{openNews ? "▲" : "▼"}</span>
                </button>
                {openNews && (
                    <div className="ml-4 flex flex-col gap-1 text-sm">
                        <Link
                            to="/news/detail"
                            className="bg-gray-800 hover:bg-blue-600 p-2 rounded transition"
                        >
                            Get News ID
                        </Link>
                        <Link
                            to="/news/post"
                            className="bg-gray-800 hover:bg-blue-600 p-2 rounded transition"
                        >
                            Post News
                        </Link>
                    </div>
                )}

                {/* Laundry Dropdown */}
                <button
                    onClick={() => setOpenLaundry(!openLaundry)}
                    className="flex justify-between items-center hover:bg-gray-700 p-2 rounded"
                >
                    <span>Laundry</span>
                    <span>{openLaundry ? "▲" : "▼"}</span>
                </button>
                {openLaundry && (
                    <div className="ml-4 flex flex-col gap-1 text-sm">
                        <Link
                            to="/shops"
                            className="bg-gray-800 hover:bg-blue-600 p-2 rounded transition"
                        >
                            Post Shops
                        </Link>
                    </div>
                )}


            </nav>
        </div>
    );
};

export default Sidebar;
