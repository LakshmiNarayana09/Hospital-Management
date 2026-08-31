
import { Menu, Hospital, User, X } from "lucide-react";

interface NavbarProps {
  isSidebarOpen: boolean;
  onMenuClick: () => void;
}

function Navbar({
  isSidebarOpen,
  onMenuClick,
}: NavbarProps) {
  return (
    <header className="h-16 bg-white border-b flex items-center justify-between px-4 sm:px-6">
      
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="lg:hidden text-gray-600 hover:text-blue-600"
          aria-label="Toggle menu"
        >
          {isSidebarOpen ? (
            <X size={24} />
          ) : (
            <Menu size={24} />
          )}
        </button>

        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-white">
          <Hospital size={24} />
        </div>
      </div>

      <div className="flex items-center gap-3 sm:gap-5">

        <div className="relative hidden sm:block">
          <h2>Hospital Management</h2>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-blue-600">
            <User size={20} />
          </div>

          <div className="hidden md:block">
            <p className="text-sm font-medium text-gray-800">
              Admin
            </p>

            <p className="text-xs text-gray-500">
              Hospital Staff
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;