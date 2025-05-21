import { Link } from 'react-router-dom';

// Props cho Sidebar
interface SidebarProps {
  isOpen: boolean;
}

// Component Sidebar
const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const menuItems = [
    { name: 'Home', path: '/' },
    { name: 'Predict', path: '/predict' },
    { name: 'Data', path: '/data' },
    { name: 'Example', path: '/example' },
    { name: 'Report', path: '/report' },
    { name: 'Our Team', path: '/our-team' },
  ];

  return (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="p-4 flex justify-center">
        <img
          src="/logo.jpg"
          alt="Logo"
          className={`transition-all duration-300 ${
            isOpen ? 'w-32' : 'w-10'
          }`}
        />
      </div>

      {/* Menu */}
      <nav className="flex-1">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className="flex items-center p-4 hover:bg-blue-700 transition-colors"
          >
            <span
              className={`transition-opacity duration-300 ${
                isOpen ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {item.name}
            </span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;