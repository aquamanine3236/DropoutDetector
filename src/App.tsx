import { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
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

  // Xử lý sự kiện khi rê chuột vào sidebar
  const handleMouseEnter = () => setIsSidebarOpen(true);
  // Xử lý sự kiện khi chuột rời sidebar
  const handleMouseLeave = () => setIsSidebarOpen(false);

  return (
    <BrowserRouter>
      <div className="flex min-h-screen bg-gray-100">
        {/* Sidebar */}
        <div
          className={`fixed h-full transition-all duration-300 ${
            isSidebarOpen ? 'w-64' : 'w-16'
          } bg-blue-800 text-white`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <Sidebar isOpen={isSidebarOpen} />
        </div>

        {/* Nội dung chính */}
        <div
          className={`flex-1 transition-all duration-300 ${
            isSidebarOpen ? 'ml-64' : 'ml-16'
          } p-8`}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/predict" element={<Predict />} />
            <Route path="/data" element={<Data />} />
            <Route path="/example" element={<Example />} />
            <Route path="/report" element={<Report />} />
            <Route path="/our-team" element={<OurTeam />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;