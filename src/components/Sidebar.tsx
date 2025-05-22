import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  TrendingUp, 
  Database, 
  FileText, 
  BarChart3, 
  Users,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

// Props cho Sidebar
interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

// Component Sidebar
const Sidebar: React.FC<SidebarProps> = ({ isOpen, onToggle }) => {
  const location = useLocation();
  
  const menuItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Predict', path: '/predict', icon: TrendingUp },
    { name: 'Data', path: '/data', icon: Database },
    { name: 'Example', path: '/example', icon: FileText },
    { name: 'Report', path: '/report', icon: BarChart3 },
    { name: 'Our Team', path: '/our-team', icon: Users },
  ];

  return (
    <div className={`
      relative h-full bg-gradient-to-b from-green-50 to-green-100 
      border-r border-green-200 shadow-lg 
      transition-all duration-500 ease-out transform
      ${isOpen ? 'w-64' : 'w-16'}
    `}>
      {/* Toggle Button */}
      <button
        onClick={onToggle}
        className="absolute -right-3 top-6 bg-green-100 hover:bg-green-200 
                   border border-green-300 rounded-full p-1.5 shadow-md 
                   transition-all duration-300 ease-out hover:scale-110 z-10
                   transform active:scale-95"
      >
        {isOpen ? (
          <ChevronLeft className="w-4 h-4 text-green-700" />
        ) : (
          <ChevronRight className="w-4 h-4 text-green-700" />
        )}
      </button>

      <div className="flex flex-col h-full">
        {/* Logo Section */}
        <div className="p-4 flex justify-center items-center border-b border-green-200">
          <div className={`
            bg-white rounded-xl shadow-md p-2 
            transition-all duration-500 ease-out transform
            ${isOpen ? 'w-36 h-36 scale-100' : 'w-8 h-8 scale-90'}
          `}>
            <img
              src="/logo.png"
              alt="Logo"
              className="w-full h-full object-contain rounded-lg 
                        transition-all duration-500 ease-out"
            />
          </div>
        </div>

        {/* Brand Name - Only show when expanded */}
        <div className={`
          px-4 py-2 text-center overflow-hidden
          transition-all duration-500 ease-out transform
          ${isOpen 
            ? 'max-h-20 opacity-100 translate-y-0' 
            : 'max-h-0 opacity-0 -translate-y-4'
          }
        `}>
          <h2 className="text-green-800 font-bold text-lg transition-all duration-300">
            Group - 8
          </h2>
          <p className="text-green-600 text-sm transition-all duration-300 delay-75">
            Machine Learning - CS114
          </p>
        </div>

        {/* Menu Navigation */}
        <nav className="flex-1 px-2 py-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`
                  group relative flex items-center px-3 py-3 rounded-xl
                  transition-all duration-300 ease-out hover:scale-105
                  transform active:scale-95
                  ${isActive 
                    ? 'bg-green-200 text-green-800 shadow-md scale-105' 
                    : 'text-green-700 hover:bg-green-100 hover:text-green-800'
                  }
                `}
              >
                {/* Icon */}
                <div className={`
                  flex items-center justify-center 
                  transition-all duration-300 ease-out
                  ${isActive ? 'text-green-800' : 'text-green-600 group-hover:text-green-800'}
                `}>
                  <Icon className={`
                    w-5 h-5 transition-all duration-300 ease-out
                    ${isActive ? 'scale-110' : 'group-hover:scale-110'}
                  `} />
                </div>

                {/* Text Label */}
                <span className={`
                  ml-3 font-medium whitespace-nowrap overflow-hidden
                  transition-all duration-500 ease-out
                  ${isOpen 
                    ? 'opacity-100 translate-x-0 max-w-full' 
                    : 'opacity-0 translate-x-4 max-w-0'
                  }
                `}>
                  {item.name}
                </span>

                {/* Active Indicator */}
                <div className={`
                  absolute right-2 transition-all duration-300 ease-out
                  ${isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}
                `}>
                  <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse" />
                </div>

                {/* Tooltip for collapsed state */}
                <div className={`
                  absolute left-16 px-3 py-2 bg-green-800 text-white text-sm 
                  rounded-lg shadow-lg pointer-events-none whitespace-nowrap z-50
                  transition-all duration-300 ease-out transform
                  ${!isOpen 
                    ? 'group-hover:opacity-100 group-hover:translate-x-0 opacity-0 translate-x-2' 
                    : 'opacity-0 pointer-events-none'
                  }
                `}>
                  {item.name}
                  <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 
                                border-4 border-transparent border-r-green-800" />
                </div>
              </Link>
            );
          })}
        </nav>

        {/* Bottom Section */}
        <div className="p-4 border-t border-green-200">
          <div className={`
            bg-white rounded-xl p-3 shadow-sm overflow-hidden
            transition-all duration-500 ease-out transform
            ${isOpen 
              ? 'opacity-100 max-h-20 scale-100' 
              : 'opacity-0 max-h-0 scale-95 p-0'
            }
          `}>
            <div className={`
              text-center transition-all duration-300 delay-100
              ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}
            `}>
              <div className="w-8 h-8 bg-green-200 rounded-full mx-auto mb-2 
                            flex items-center justify-center
                            transition-all duration-300 ease-out">
                <Users className="w-4 h-4 text-green-700" />
              </div>
              <p className="text-xs text-green-600 transition-all duration-300">
                Welcome back!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Sidebar;