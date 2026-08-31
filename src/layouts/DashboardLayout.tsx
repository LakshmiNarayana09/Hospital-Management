import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";

import Navbar from "../components/common/Navbar";

function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navItems = [
    { name: "Dashboard", path: "/" },
    { name: "Patients", path: "/patients" },
    { name: "Doctors", path: "/doctors" },
    { name: "Appointments", path: "/appointments" },
    { name: "Departments", path: "/departments" },
    { name: "Prescriptions", path: "/prescriptions" },
    { name: "Billing", path: "/bills" },
  ];

  const handleMenuClick = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const handleNavClick = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      
      <Navbar
        isSidebarOpen={isSidebarOpen}
        onMenuClick={handleMenuClick}
      />

      <div className="flex">

        {isSidebarOpen && (
          <div
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 z-30 bg-black/40 lg:hidden"
          />
        )}

        <aside
          className={`
            fixed
            left-0
            top-16
            z-40
            min-h-[calc(100vh-64px)]
            w-64
            bg-white
            border-r
            transition-transform
            duration-300

            lg:static
            lg:z-0
            lg:min-h-[calc(100vh-64px)]
            lg:h-auto
            lg:translate-x-0

            ${
              isSidebarOpen
                ? "translate-x-0"
                : "-translate-x-full"
            }
          `}
        >
          <nav className="p-4 space-y-2">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={handleNavClick}
                className={({ isActive }) =>
                  `block rounded-lg px-4 py-2 ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </nav>
        </aside>

        <main className="flex-1 min-w-0 p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;