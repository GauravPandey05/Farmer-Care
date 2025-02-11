import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaLeaf, FaMoneyBill, FaLandmark, FaSignOutAlt, FaBars, FaTimes } from 'react-icons/fa';

function Navbar({ onLogout }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-green-600 text-white p-4 shadow-lg">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold">FarmerCare</div>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center gap-4">
            <Link to="/dashboard" className="flex items-center gap-2 hover:text-green-200">
              <FaHome /> Home
            </Link>
            <Link to="/loan-schemes" className="flex items-center gap-2 hover:text-green-200">
              <FaMoneyBill /> Loans
            </Link>
            <Link to="/crop-recommendations" className="flex items-center gap-2 hover:text-green-200">
              <FaLeaf /> Crops
            </Link>
            <Link to="/gov-schemes" className="flex items-center gap-2 hover:text-green-200">
              <FaLandmark /> Schemes
            </Link>
            <button
              onClick={onLogout}
              className="flex items-center gap-2 hover:text-green-200"
            >
              <FaSignOutAlt /> Logout
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`md:hidden ${isOpen ? 'block' : 'hidden'} pt-4`}>
          <div className="flex flex-col gap-4">
            <Link 
              to="/dashboard" 
              className="flex items-center gap-2 hover:text-green-200 py-2"
              onClick={() => setIsOpen(false)}
            >
              <FaHome /> Home
            </Link>
            <Link 
              to="/loan-schemes" 
              className="flex items-center gap-2 hover:text-green-200 py-2"
              onClick={() => setIsOpen(false)}
            >
              <FaMoneyBill /> Loans
            </Link>
            <Link 
              to="/crop-recommendations" 
              className="flex items-center gap-2 hover:text-green-200 py-2"
              onClick={() => setIsOpen(false)}
            >
              <FaLeaf /> Crops
            </Link>
            <Link 
              to="/gov-schemes" 
              className="flex items-center gap-2 hover:text-green-200 py-2"
              onClick={() => setIsOpen(false)}
            >
              <FaLandmark /> Schemes
            </Link>
            <button
              onClick={() => {
                setIsOpen(false);
                onLogout();
              }}
              className="flex items-center gap-2 hover:text-green-200 py-2"
            >
              <FaSignOutAlt /> Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;