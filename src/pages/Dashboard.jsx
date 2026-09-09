import React from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "../components/core/Dashboard/Sidebar";

const Dashboard = () => {
    return (
        <div className="flex flex-col md:flex-row min-h-[calc(100vh-56px)] w-full bg-stone-950">
            <Sidebar />
            <div className="flex-1 overflow-y-auto">
                <Outlet />
            </div>
        </div>
    );
};

export default Dashboard;
