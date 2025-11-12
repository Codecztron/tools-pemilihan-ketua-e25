import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

function Navbar() {
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Helper function to determine link style
    const getLinkClass = (path) => {
        return location.pathname === path
            ? 'text-yellow-300 font-semibold'
            : 'text-white hover:text-yellow-200 transition-colors';
    };
    
    // Close menu on link click
    const handleLinkClick = () => {
        setIsMenuOpen(false);
    };

    return (
        <>
            <div className='sticky top-0 z-50 bg-gray-900/40 backdrop-blur-lg shadow-lg border-b border-white/10'>
                <div className='flex items-center justify-between p-4 max-w-7xl mx-auto'>
                    {/* Logo */}
                    <div className='text-2xl font-bold text-white tracking-wider z-50'>
                        <Link to="/" onClick={handleLinkClick}>Elektro<span className="text-yellow-400">2025</span></Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className='hidden md:flex items-center gap-6 text-lg'>
                        <Link to="/" className={getLinkClass('/')}>
                            Home
                        </Link>
                        <Link to="/counter" className={getLinkClass('/counter')}>
                            Counter
                        </Link>
                        <Link to="/timer" className={getLinkClass('/timer')}>
                            Timer
                        </Link>
                    </div>
                    
                    {/* Mobile Menu Button */}
                    <div className='md:hidden z-50'>
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white">
                            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div 
                        className="md:hidden absolute top-0 left-0 w-full h-screen bg-[#0a0f2c]/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 text-2xl"
                    >
                        <Link to="/" className={getLinkClass('/')} onClick={handleLinkClick}>
                            Home
                        </Link>
                        <Link to="/counter" className={getLinkClass('/counter')} onClick={handleLinkClick}>
                            Counter
                        </Link>
                        <Link to="/timer" className={getLinkClass('/timer')} onClick={handleLinkClick}>
                            Timer
                        </Link>
                    </div>
                )}
            </div>
        </>
    );
}

export default Navbar;