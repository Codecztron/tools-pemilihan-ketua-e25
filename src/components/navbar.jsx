import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
    const location = useLocation();

    // Helper function to determine link style
    const getLinkClass = (path) => {
        return location.pathname === path
            ? 'text-yellow-300 font-semibold border-b-2 border-yellow-300 pb-1'
            : 'text-white hover:text-yellow-200 transition-colors';
    };

    return (
        <>
            {/* Menggunakan warna latar belakang gelap dan semi-transparan */}
            <div className='sticky top-0 z-50 bg-gray-900/20 backdrop-blur-sm shadow-lg'>
                <div className='flex items-center justify-between p-4 max-w-7xl mx-auto'>
                    {/* Mengubah gaya logo agar lebih menonjol */}
                    <div className='text-2xl font-bold text-white tracking-wider'>
                        <Link to="/">Elektro<span className="text-yellow-400">25</span></Link>
                    </div>
                    {/* Mengubah gaya tombol navigasi */}
                    <div className='flex items-center gap-6 text-lg'>
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
                </div>
            </div>
        </>
    );
}

export default Navbar;