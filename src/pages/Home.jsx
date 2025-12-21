import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Heart, ShieldCheck, Sparkles, Calendar, Users, Star, Instagram, Facebook, Twitter, MessageCircle, ArrowDownCircle, CheckCircle2, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import CircularSlider from '../components/CircularSlider';
import '../styles/Home.css';

gsap.registerPlugin(ScrollTrigger);

const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2
        }
    }
};

const Home = () => {
    const containerRef = useRef();
    const heroTitleRef = useRef();

    useGSAP(() => {
        // Hero Content Animation
        gsap.from('.hero-title span, .hero-title', {
            y: 100,
            opacity: 0,
            duration: 1.2,
            stagger: 0.2,
            ease: 'power4.out',
            delay: 0.5
        });

        gsap.from('.hero-subtitle', {
            opacity: 0,
            y: 20,
            duration: 1,
            delay: 1.2,
            ease: 'power3.out'
        });

        gsap.from('.hero-buttons', {
            opacity: 0,
            y: 30,
            duration: 1,
            delay: 1.4,
            ease: 'power3.out'
        });

        // Section Title Animations
        gsap.utils.toArray('.section-title').forEach((title) => {
            gsap.from(title, {
                scrollTrigger: {
                    trigger: title,
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                },
                opacity: 0,
                y: 50,
                duration: 1,
                ease: 'power3.out'
            });
        });
    }, { scope: containerRef });

    const heroImages = [
        "https://images.unsplash.com/photo-1560750588-73207b1ef5b8?q=80&w=2070&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?q=80&w=2070&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?q=80&w=2070&auto=format&fit=crop"
    ];

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
        }, 5000); // Change every 5 seconds

        return () => clearInterval(interval);
    }, [heroImages.length]);
    return (
        <div className="home-page" ref={containerRef}>
            {/* Hero Section */}
            <section className="hero-section">
                {/* Background Slideshow */}
                <div className="hero-background">
                    <AnimatePresence>
                        <motion.div
                            key={currentImageIndex}
                            initial={{ opacity: 0, scale: 1.1 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 1.5 }}
                            className="hero-bg-image"
                            style={{ backgroundImage: `url(${heroImages[currentImageIndex]})` }}
                        />
                    </AnimatePresence>
                    <div className="hero-overlay"></div>
                </div>

                {/* Social Media Sidebar */}
                <div className="social-sidebar">
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-link" title="Instagram"><Instagram size={24} /></a>
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-link" title="Facebook"><Facebook size={24} /></a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-link" title="Twitter"><Twitter size={24} /></a>

                </div>

                {/* Floating Makeup Items */}
                {/* <div className="floating-elements">
                    <motion.img
                        src="https://images.unsplash.com/photo-1596462502278-27bfdd403348?q=80&w=400&auto=format&fit=crop"
                        className="floating-item item-1"
                        alt="Lipstick"
                        animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <motion.img
                        src="https://images.unsplash.com/photo-1621251996775-47f3ca696417?q=80&w=400&auto=format&fit=crop"
                        className="floating-item item-2"
                        alt="Makeup Brush"
                        animate={{ y: [0, 25, 0], rotate: [0, -5, 0] }}
                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    />
                    <motion.img
                        src="https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=400&auto=format&fit=crop"
                        className="floating-item item-3"
                        alt="Cosmetic Palette"
                        animate={{ y: [0, -15, 0], rotate: [0, 3, 0] }}
                        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                    />
                    <motion.img
                        src="https://images.unsplash.com/photo-1542452255191-c85a98f2c5d1?q=80&w=400&auto=format&fit=crop"
                        className="floating-item item-4"
                        alt="Face Powder"
                        animate={{ y: [0, 20, 0], rotate: [0, -3, 0] }}
                        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                    />
                </div> */}

                {/* Main Content */}
                <div className="container hero-container">
                    <div className="hero-content centered">
                        <h1 className="hero-title" ref={heroTitleRef}>
                            Redefining <br />
                            <span>Beauty</span> & Wellness
                        </h1>
                        <h3 className="hero-subtitle">
                            Where relaxation meets expertise.
                        </h3>

                        <div className="hero-buttons centered-buttons">
                            <Link to="/services" className="btn btn-primary group">
                                View Our Services <ArrowRight className="inline-block ml-2 group-hover:translate-x-1 transition-transform" size={18} />
                            </Link>
                            <Link to="/contact" className="btn btn-outline-light group">
                                Contact Us <MessageCircle className="inline-block ml-2 group-hover:scale-110 transition-transform" size={18} />
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Navigation Buttons */}
                <div className="hero-navigation">
                    <button
                        className="nav-btn prev-btn"
                        onClick={() => setCurrentImageIndex((prev) => (prev - 1 + heroImages.length) % heroImages.length)}
                    >
                        Prev
                    </button>
                    <button
                        className="nav-btn next-btn"
                        onClick={() => setCurrentImageIndex((prev) => (prev + 1) % heroImages.length)}
                    >
                        Next
                    </button>
                </div>
            </section>

            {/* Philosophy Section */}
            <section className="section-padding philosophy-section">
                <div className="container">
                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="philosophy-grid"
                    >
                        <motion.div variants={fadeInUp} className="philosophy-image-container relative h-[500px]">
                            <div className="philosophy-blob" />
                            <img
                                src="https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=1976&auto=format&fit=crop"
                                alt="Natural Products"
                                className="philosophy-img-1"
                            />
                            <img
                                src="https://images.unsplash.com/photo-1560750588-73207b1ef5b8?q=80&w=2070&auto=format&fit=crop"
                                alt="Spa Treatment"
                                className="philosophy-img-2"
                            />
                        </motion.div>
                        <motion.div variants={fadeInUp}>
                            <span className="section-label">Our Story</span>
                            <h2 className="section-title">Founded on Passion</h2>
                            <p className="text-paragraph">
                                Started in 2015, our parlour was born from a desire to create a space that felt less like a salon and more like a retreat. We believe in slow beauty—taking the time to understand your needs and delivering results that empower you.
                            </p>

                            {/* Cylinder Stats */}
                            <div className="stats-container">
                                <div className="stat-cylinder">
                                    <div className="stat-icon-bg"><Calendar size={18} /></div>
                                    <div className="stat-info">
                                        <span className="stat-value">10+</span>
                                        <span className="stat-label">Years Exp.</span>
                                    </div>
                                </div>
                                <div className="stat-cylinder">
                                    <div className="stat-icon-bg"><Users size={18} /></div>
                                    <div className="stat-info">
                                        <span className="stat-value">5k+</span>
                                        <span className="stat-label">Happy Clients</span>
                                    </div>
                                </div>
                                <div className="stat-cylinder">
                                    <div className="stat-icon-bg"><Sparkles size={18} /></div>
                                    <div className="stat-info">
                                        <span className="stat-value">20+</span>
                                        <span className="stat-label">Services</span>
                                    </div>
                                </div>
                                <div className="stat-cylinder">
                                    <div className="stat-icon-bg"><Star size={18} /></div>
                                    <div className="stat-info">
                                        <span className="stat-value">4.9</span>
                                        <span className="stat-label">Avg Rating</span>
                                    </div>
                                </div>
                            </div>

                            <Link to="/about" className="read-more-link mt-8">
                                Read full history <ArrowRight size={18} className="ml-2" />
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Premium Circular Gallery Slider */}
            <CircularSlider />

            {/* Values Section */}
            <section className="section-padding values-section">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="values-header"
                    >
                        <h2 className="section-title">Our Mission & Values</h2>
                        <p className="text-paragraph">We are dedicated to providing a serene environment where every client feels valued, cared for, and revitalized.</p>
                    </motion.div>

                    <div className="values-grid">
                        {[
                            { icon: Heart, title: 'Premium Quality', desc: 'We use only the highest quality, ethically sourced products to ensure safety and superior results.' },
                            { icon: ShieldCheck, title: 'Deep Hygiene', desc: 'Your safety is our priority. We maintain hospital-grade sterilization standards for all tools.' },
                            { icon: Sparkles, title: 'Inclusive Beauty', desc: 'We celebrate diversity and offer personalized services tailored to every unique skin type and style.' }
                        ].map((feature, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                whileHover={{ y: -10 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ delay: idx * 0.2, duration: 0.6, ease: "easeOut" }}
                                className="value-card"
                            >
                                <div className="value-icon-wrapper">
                                    <feature.icon size={32} />
                                </div>
                                <h3 className="font-bold text-xl mb-3">{feature.title}</h3>
                                <p className="text-paragraph">{feature.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section">
                <div className="cta-bg">
                    <div className="cta-blob-1" />
                    <div className="cta-blob-2" />
                </div>
                <div className="container cta-content">
                    <motion.h2
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="cta-title"
                    >
                        Ready to Reveal Your Radiance?
                    </motion.h2>
                    <p className="cta-text">
                        Book your appointment today and let our experts take care of the rest. Your journey to relaxation starts here.
                    </p>
                    <div className="cta-buttons">
                        <Link to="/contact" className="btn btn-white group">
                            <Calendar className="mr-2 inline-block group-hover:rotate-12 transition-transform" size={18} /> Book Now
                        </Link>
                        <Link to="/services" className="btn btn-transparent-white group">
                            <Zap className="mr-2 inline-block group-hover:scale-125 transition-transform" size={18} /> View Price List
                        </Link>
                    </div>
                </div>
            </section>
            {/* Floating WhatsApp Button */}
            <a
                href="https://wa.me/919670203017?text=Hello! I would like to book an appointment."
                className="whatsapp-float"
                target="_blank"
                rel="noopener noreferrer"
                title="Book Appointment via WhatsApp"
            >
                <div className="whatsapp-icon-container">
                    <MessageCircle size={32} />
                    <span className="whatsapp-tooltip">Book Appointment</span>
                </div>
            </a>
        </div>
    );
};

export default Home;
