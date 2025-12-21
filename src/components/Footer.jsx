import React from 'react';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import '../styles/Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-grid">
                    {/* Brand */}
                    <div className="footer-brand">
                        <h3 className="footer-logo">
                            Parlour<span>&Co.</span>
                        </h3>
                        <p className="footer-desc">
                            Redefining beauty and wellness with a touch of elegance and nature. Your sanctuary for relaxation.
                        </p>
                        <div className="social-links">
                            <a href="#" className="social-icon-wrapper">
                                <Facebook size={18} />
                            </a>
                            <a href="#" className="social-icon-wrapper">
                                <Instagram size={18} />
                            </a>
                            <a href="#" className="social-icon-wrapper">
                                <Twitter size={18} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="footer-heading">Company</h4>
                        <ul className="footer-links">
                            <li><a href="/about" className="footer-link">About Us</a></li>
                            <li><a href="/services" className="footer-link">Services</a></li>
                            <li><a href="/gallery" className="footer-link">Gallery</a></li>
                            <li><a href="/contact" className="footer-link">Contact</a></li>
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="footer-heading">Services</h4>
                        <ul className="footer-links">
                            <li><span className="footer-link">Hair Styling</span></li>
                            <li><span className="footer-link">Facials & Skincare</span></li>
                            <li><span className="footer-link">Manicure & Pedicure</span></li>
                            <li><span className="footer-link">Massage Therapy</span></li>
                            <li><span className="footer-link">Bridal Makeup</span></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="footer-heading">Contact</h4>
                        <div className="footer-contact-list">
                            <div className="footer-contact-item">
                                <MapPin size={18} className="footer-icon-small" />
                                <span>123 Beauty Lane, Suite 100<br />New York, NY 10012</span>
                            </div>
                            <div className="footer-contact-item">
                                <Phone size={18} className="footer-icon-small" />
                                <span>(212) 555-0199</span>
                            </div>
                            <div className="footer-contact-item">
                                <Mail size={18} className="footer-icon-small" />
                                <span>hello@parlour.co</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>&copy; 2025 Parlour & Co. All rights reserved.</p>
                    <div className="footer-bottom-links">
                        <a href="#" className="footer-link">Privacy Policy</a>
                        <a href="#" className="footer-link">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
