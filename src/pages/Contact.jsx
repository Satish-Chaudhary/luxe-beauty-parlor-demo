import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import '../styles/Contact.css';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
    const containerRef = useRef();

    useGSAP(() => {
        gsap.from('.contact-form-wrapper', {
            x: -100,
            opacity: 0,
            duration: 1.2,
            ease: 'power4.out',
            delay: 0.5
        });

        gsap.from('.contact-info-wrapper', {
            x: 100,
            opacity: 0,
            duration: 1.2,
            ease: 'power4.out',
            delay: 0.7
        });

        gsap.from('.contact-item', {
            y: 30,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: 'power3.out',
            delay: 1
        });
    }, { scope: containerRef });

    return (
        <div className="contact-page" ref={containerRef}>
            <div className="container contact-container">
                <div className="contact-grid">
                    {/* Contact Form */}
                    <div className="contact-form-wrapper">
                        <h1 className="contact-title">Get in Touch</h1>
                        <p className="contact-subtitle">Ready for your glow up? Let's talk about your beauty journey.</p>

                        <form>
                            <div className="form-group-row">
                                <div className="form-group">
                                    <label className="form-label">Name</label>
                                    <input type="text" className="form-input" placeholder="Your name" />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Email</label>
                                    <input type="email" className="form-input" placeholder="your@email.com" />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="form-label">Subject</label>
                                <select className="form-select">
                                    <option>General Inquiry</option>
                                    <option>Book Appointment</option>
                                    <option>Feedback</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label className="form-label">Message</label>
                                <textarea rows="4" className="form-textarea" placeholder="How can we help?"></textarea>
                            </div>
                            <button className="btn btn-full">Send Request</button>
                        </form>
                    </div>

                    {/* Info */}
                    <div className="contact-info-wrapper">
                        <div className="contact-details-grid">
                            <div className="contact-item">
                                <div className="contact-icon-wrapper">
                                    <MapPin size={24} />
                                </div>
                                <div>
                                    <h3 className="contact-item-title">Visit Us</h3>
                                    <p className="contact-item-text">123 Beauty Lane,<br />Glamour City, GC 54321</p>
                                </div>
                            </div>
                            <div className="contact-item">
                                <div className="contact-icon-wrapper">
                                    <Phone size={24} />
                                </div>
                                <div>
                                    <h3 className="contact-item-title">Call Us</h3>
                                    <p className="contact-item-text">(555) 123-4567</p>
                                    <p className="sub-text">Main Reception</p>
                                </div>
                            </div>
                            <div className="contact-item">
                                <div className="contact-icon-wrapper">
                                    <Clock size={24} />
                                </div>
                                <div>
                                    <h3 className="contact-item-title">Business Hours</h3>
                                    <ul className="hours-list">
                                        <li className="hours-row"><span>Mon-Fri:</span> <span>9am - 8pm</span></li>
                                        <li className="hours-row"><span>Saturday:</span> <span>10am - 6pm</span></li>
                                        <li className="hours-row"><span>Sunday:</span> <span>Closed</span></li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Map Placeholder */}
                        <div className="map-container">
                            <img
                                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2074&auto=format&fit=crop"
                                className="map-img"
                                alt="Map Background"
                            />
                            <div className="map-marker">
                                <MapPin size={20} color="var(--color-primary)" />
                                We are here
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
