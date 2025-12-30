import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import '../styles/CircularSlider.css';

const images = [
    { url: "https://images.unsplash.com/photo-1560750588-73207b1ef5b8?q=80&w=2070&auto=format&fit=crop", title: "Signature Facial" },
    { url: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=2069&auto=format&fit=crop", title: "Bridal Makeup" },
    { url: "https://i.pinimg.com/736x/cd/97/92/cd97929942d2232d0931c2c4c2c69b68.jpg", title: "Hair Styling" },
    { url: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=2070&auto=format&fit=crop", title: "Skin Therapy" },
    { url: "https://images.unsplash.com/photo-1600948836101-f9ffda59d250?q=80&w=2072&auto=format&fit=crop", title: "Nail Art" },
    { url: "https://i.pinimg.com/736x/41/62/81/41628150bc083c8436c083920dd568df.jpg", title: "Global Color" },
];

const CircularSlider = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const scrollSpring = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    // Rotate the entire container based on scroll
    const rotation = useTransform(scrollSpring, [0, 1], [0, 360]);

    return (
        <section ref={containerRef} className="circular-slider-section">
            <div className="circular-slider-sticky">
                <div className="circular-slider-header">
                    {/* <h2 className="circular-title">Curated <br /><span>Experience</span></h2>
                    <p className="circular-subtitle">Scroll to explore our aesthetic journey</p> */}
                </div>

                <div className="circular-wheel-container">
                    <motion.div style={{ rotate: rotation }} className="circular-wheel">
                        {images.map((item, index) => {
                            const angle = (index / images.length) * 360;
                            return (
                                <div
                                    key={index}
                                    className="circular-card-wrapper"
                                    style={{
                                        transform: `rotate(${angle}deg) translateY(var(--slider-radius, -380px))`
                                    }}
                                >
                                    <motion.div
                                        className="circular-card"
                                        style={{
                                            rotate: useTransform(rotation, (r) => -(angle + r))
                                        }}
                                        whileHover={{ scale: 1.05, zIndex: 10 }}
                                    >
                                        <img src={item.url} alt={item.title} className="circular-img" loading="lazy" />
                                        <div className="circular-info">
                                            <span className="circular-item-title">{item.title}</span>
                                        </div>
                                    </motion.div>
                                </div>
                            );
                        })}
                    </motion.div>

                    {/* Center visual element */}
                    <div className="circular-center">
                        <div className="center-glow"></div>
                        <div className="center-content">
                            <span className="center-text">LUXE</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CircularSlider;
