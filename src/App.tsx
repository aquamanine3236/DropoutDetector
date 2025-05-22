import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Predict from './pages/Predict';
import Data from './pages/Data';
import Example from './pages/Example';
import Report from './pages/Report';
import OurTeam from './pages/OurTeam';

// Giao diện chính của ứng dụng
const App: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [prefilledData, setPrefilledData] = useState(null);

  // Kiểm tra kích thước màn hình
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
      // Tự động đóng sidebar trên mobile
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
      }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Toggle sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Xử lý sự kiện khi rê chuột vào sidebar (chỉ trên desktop)
  const handleMouseEnter = () => {
    if (!isMobile) {
      setIsSidebarOpen(true);
    }
  };

  // Xử lý sự kiện khi chuột rời sidebar (chỉ trên desktop)
  const handleMouseLeave = () => {
    if (!isMobile) {
      setIsSidebarOpen(false);
    }
  };

  // Đóng sidebar khi click overlay trên mobile
  const handleOverlayClick = () => {
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  };

  // Hàm xử lý khi sử dụng sample data
  const handleUseSample = (studentData: any) => {
    setPrefilledData(studentData);
  };

  return (
    <BrowserRouter>
      <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-green-50">
        {/* Mobile Overlay */}
        {isMobile && isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
            onClick={handleOverlayClick}
          />
        )}

        {/* Sidebar */}
        <div
          className={`
            ${isMobile ? 'fixed' : 'fixed'} h-full z-50
            transition-all duration-500 ease-out
            ${isSidebarOpen ? 'w-64' : 'w-16'}
            ${isMobile && !isSidebarOpen ? '-translate-x-full w-64' : ''}
          `}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <Sidebar 
            isOpen={isSidebarOpen} 
            onToggle={toggleSidebar}
          />
        </div>

        {/* Nội dung chính */}
        <div
          className={`
            flex-1 transition-all duration-500 ease-out
            ${isMobile 
              ? 'ml-0' 
              : isSidebarOpen 
                ? 'ml-64' 
                : 'ml-16'
            }
          `}
        >
          {/* Mobile Menu Button - Floating */}
          {isMobile && (
            <button
              onClick={toggleSidebar}
              className="fixed top-4 left-4 z-40 p-3 rounded-full bg-green-100 hover:bg-green-200 
                       transition-all duration-200 shadow-lg md:hidden
                       hover:scale-110 active:scale-95"
            >
              <svg
                className="w-6 h-6 text-green-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          )}

          {/* Main Content Area */}
          <main className="p-6 md:p-8 min-h-screen">
            <div className="max-w-7xl mx-auto">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/predict" element={<Predict prefilledData={prefilledData} />} />
                <Route path="/data" element={<Data />} />
                <Route path="/example" element={<Example onUseSample={handleUseSample} />} />
                <Route path="/report" element={<Report />} />
                <Route path="/our-team" element={<OurTeam />} />
              </Routes>
            </div>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;