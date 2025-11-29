import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

function Navbar() {
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navLinks = [
        { path: '/', label: 'Home' },
        { path: '/counter-sutet', label: 'Counter Sutet' },
        { path: '/counter-dpm', label: 'Counter DPM' },
        { path: '/timer', label: 'Timer' },
    ];

    // Style Link: Active = Oranye (#e67e22), Inactive = Putih
    const getLinkClass = (path) => {
        return location.pathname === path
            ? 'text-[#e67e22] font-bold'
            : 'text-white hover:text-[#e67e22] transition-colors';
    };
    
    const handleLinkClick = () => {
        setIsMenuOpen(false);
    };

    return (
        <>
            {/* Background Biru Tua (#2c3e50) */}
            <div className='sticky top-0 z-50 bg-[#2c3e50] shadow-md border-b border-[#5e87a8]/30'>
                <div className='flex items-center justify-between p-4 max-w-7xl mx-auto'>
                    {/* Logo */}
                    <div className='text-2xl font-bold text-white tracking-wider z-50'>
                        <Link to="/" onClick={handleLinkClick}>
                            Musyawarah Besar 
                            <span className="text-[#e67e22]"> 2025</span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className='hidden md:flex items-center gap-6 text-lg'>
                        {navLinks.map((link) => (
                            <Link 
                                key={link.path} 
                                to={link.path} 
                                className={getLinkClass(link.path)}
                            >
                                {link.label}
                            </Link>
                        ))}
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
                        className="md:hidden absolute top-0 left-0 w-full h-screen bg-[#2c3e50] flex flex-col items-center justify-center gap-8 text-2xl"
                    >
                        {navLinks.map((link) => (
                            <Link 
                                key={link.path}
                                to={link.path} 
                                className={getLinkClass(link.path)} 
                                onClick={handleLinkClick}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}

export default Navbar;