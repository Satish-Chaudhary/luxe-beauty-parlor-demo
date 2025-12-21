import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Heart, Users, Armchair, Plus, Instagram, Twitter, Linkedin } from 'lucide-react';
import '../styles/About.css';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
    const containerRef = useRef();

    useGSAP(() => {
        // Hero Content - Using fromTo for absolute state control
        gsap.fromTo('.about-headline',
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 1.2, ease: 'power4.out', delay: 0.3, clearProps: "all" }
        );

        gsap.fromTo('.about-subtext',
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.6, clearProps: "all" }
        );

        gsap.fromTo('.btn-primary-solid',
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out', delay: 0.8, clearProps: "all" }
        );

        gsap.fromTo('.about-hero-image',
            { x: 100, opacity: 0 },
            { x: 0, opacity: 1, duration: 1.5, ease: 'expo.out', delay: 0.5, clearProps: "all" }
        );

        // Story Section
        gsap.from('.story-image-col', {
            scrollTrigger: {
                trigger: '.story-section',
                start: 'top 85%',
                once: true
            },
            x: -100,
            opacity: 0,
            duration: 1.2,
            ease: 'power3.out'
        });

        gsap.from('.story-content-col > *', {
            scrollTrigger: {
                trigger: '.story-section',
                start: 'top 75%',
                once: true
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: 'power2.out'
        });

        // Values Section - Enhanced Trigger
        gsap.from('.value-card-clean', {
            scrollTrigger: {
                trigger: '.values-grid-3',
                start: 'top 90%',
                once: true,
                // markers: true, // Uncomment for debugging if needed
            },
            y: 50,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            ease: 'back.out(1.2)',
            clearProps: "all" // Ensure styles are cleared after animation
        });

        // Team Cards Stagger
        gsap.from('.team-card-portrait', {
            scrollTrigger: {
                trigger: '.team-section',
                start: 'top 80%',
                once: true
            },
            y: 80,
            opacity: 0,
            duration: 1,
            stagger: 0.15,
            ease: 'power3.out'
        });

        // Refresh ScrollTrigger to catch any layout shifts
        ScrollTrigger.refresh();
    }, { scope: containerRef });

    return (
        <div className="about-page" ref={containerRef}>
            {/* 1. Hero Section */}
            <section className="about-hero">
                <div className="container about-hero-grid">
                    <div className="about-hero-content">
                        <h1 className="about-headline">
                            Redefining Beauty <br />
                            <span className="text-primary">& Wellness</span>
                        </h1>
                        <p className="about-subtext">
                            Where relaxation meets expertise. We invite you to experience a sanctuary of calm, designed to bring out your inner glow.
                        </p>
                        <Link to="/services" className="btn btn-primary-solid">View Our Services</Link>
                    </div>
                    <div className="about-hero-image">
                        <img
                            src="https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?q=80&w=2070&auto=format&fit=crop"
                            alt="Salon Interior"
                            className="hero-img-rounded"
                        />
                    </div>
                </div>
            </section>

            {/* 2. Story Section */}
            <section className="story-section section-padding">
                <div className="container story-grid">
                    <div className="story-image-col">
                        <div className="story-img-bg"></div>
                        <img
                            src="https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=1976&auto=format&fit=crop"
                            alt="Organic Products"
                            className="story-img"
                        />
                    </div>
                    <div className="story-content-col">
                        <span className="section-overline">OUR STORY</span>
                        <h2 className="section-heading">Founded on Passion</h2>
                        <p className="section-desc">
                            Started in 2015, our parlour was born from a desire to create a space that felt less like a salon and more like a retreat. We believe in slow beauty—taking the time to understand your needs and delivering results that empower you.
                        </p>
                        <p className="section-desc">
                            Every treatment is curated with the finest organic products, ensuring that your beauty routine is as healthy as it is effective.
                        </p>
                        <button className="link-arrow">Read full history <ArrowRight size={16} /></button>
                    </div>
                </div>
            </section>

            {/* 3. Values Section */}
            <section className="values-section section-padding bg-surface">
                <div className="container">
                    <div className="center-header">
                        <h2 className="section-heading">Our Mission & Values</h2>
                        <p className="section-sub-center">We are dedicated to providing a serene environment where every client feels valued, cared for, and revitalized.</p>
                    </div>
                    <div className="values-grid-3">
                        <div className="value-card-clean">
                            <div className="icon-circle"><Heart size={24} /></div>
                            <h3>Premium Quality</h3>
                            <p>We use only the highest quality, ethically sourced products to ensure safety and superior results for every treatment.</p>
                        </div>
                        <div className="value-card-clean">
                            <div className="icon-circle"><Armchair size={24} /></div>
                            <h3>Ultimate Comfort</h3>
                            <p>Designed as a sanctuary from the busy world, our space prioritizes your relaxation and mental well-being.</p>
                        </div>
                        <div className="value-card-clean">
                            <div className="icon-circle"><Users size={24} /></div>
                            <h3>Inclusive Beauty</h3>
                            <p>We celebrate diversity and offer personalized services tailored to every unique skin type, texture, and style.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. Team Section */}
            <section className="team-section section-padding">
                <div className="container">
                    <div className="section-header-flex">
                        <h2 className="section-heading mb-0">Meet Our Experts</h2>

                    </div>
                    <p className="section-sub-left">The talented hands behind your glow.</p>


                    <div className="team-grid-4">
                        {[
                            { name: "Sarah Jenkins", role: "Lead Stylist", expertise: "Precision Cuts", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop" },
                            { name: "Michael Chen", role: "Color Specialist", expertise: "Balayage & Correction", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887&auto=format&fit=crop" },
                            { name: "Emma Wilson", role: "Esthetician", expertise: "Holistic Facials", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop" },
                            { name: "Olivia Davis", role: "Nail Artist", expertise: "Gel & Nail Art", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1888&auto=format&fit=crop" }
                        ].map((member, i) => (
                            <div className="team-card-portrait" key={i}>
                                <div className="team-portrait-img">
                                    <img src={member.img} alt={member.name} />
                                    <div className="team-overlay">
                                        <span className="expert-badge">{member.expertise}</span>
                                        <div className="social-row">
                                            <a href="#" className="social-icon"><Instagram size={18} /></a>
                                            <a href="#" className="social-icon"><Twitter size={18} /></a>
                                            <a href="#" className="social-icon"><Linkedin size={18} /></a>
                                        </div>
                                    </div>
                                </div>
                                <div className="team-info-center">
                                    <h3 className="team-name">{member.name}</h3>
                                    <p className="team-role">{member.role}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 5. CTA Section */}
            {/* <section className="cta-banner-full">
                <div className="container center-text">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="cta-banner-title"
                    >
                        Ready to Reveal Your Radiance?
                    </motion.h2>
                    <p className="cta-banner-text">Book your appointment today and let our experts take care of the rest. Your journey to relaxation starts here.</p>
                    <div className="cta-actions">
                        <Link to="/contact" className="btn btn-white-solid">Book Now</Link>
                        <Link to="/services" className="btn btn-outline-white">View Price List</Link>
                    </div>
                </div>
            </section> */}
        </div>
    );
};

export default About;
