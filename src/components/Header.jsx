import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/Header.css';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Services', path: '/services' },
        { name: 'About Us', path: '/about' },
        { name: 'Gallery', path: '/gallery' },
        { name: 'Contact', path: '/contact' },
    ];

    return (
        <header className="header">
            <div className="container header-container">
                <Link to="/" className="logo">
                    <Star className="logo-icon" fill="currentColor" />
                    <span className="logo-text">
                        Parlour<span>&Co.</span>
                    </span>
                </Link>

                {/* Desktop Nav */}
                <nav className="nav-desktop">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
                        >
                            {link.name}
                            {location.pathname === link.path && (
                                <motion.div
                                    layoutId="underline"
                                    className="underline"
                                />
                            )}
                        </Link>
                    ))}
                    <Link to="/contact" className="btn">
                        Book Now
                    </Link>
                </nav>

                {/* Mobile Menu Button */}
                <button
                    className="menu-btn"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Nav */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mobile-nav"
                    >
                        <nav className="mobile-nav-list">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    onClick={() => setIsOpen(false)}
                                    className={`mobile-nav-link ${location.pathname === link.path ? 'active' : ''}`}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <Link to="/contact" onClick={() => setIsOpen(false)} className="btn btn-book-mobile">
                                Book Appointment
                            </Link>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Header;
