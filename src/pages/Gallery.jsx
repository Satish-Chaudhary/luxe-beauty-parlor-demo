import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Masonry from 'react-masonry-css';
import '../styles/Gallery.css';

gsap.registerPlugin(ScrollTrigger);

// Multi-category image pool for 50+ images
const images = [
    { src: "https://images.unsplash.com/photo-1560750588-73207b1ef5b8?q=80&w=800", category: "Treatments", title: "Glass Skin Sculpt", desc: "Advanced facial sculpting." },
    { src: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=800", category: "Bridal", title: "Pearl Bridal Look", desc: "Soft, luminous makeup." },
    { src: "https://images.unsplash.com/photo-1620331311520-246422fd82f9?q=80&w=800", category: "Hair Styling", title: "The Modern Wave", desc: "Effortless precision waves." },
    { src: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=800", category: "Treatments", title: "Renewal Therapy", desc: "Cellular rejuvenation." },
    { src: "https://images.unsplash.com/photo-1600948836101-f9ffda59d250?q=80&w=800", category: "Nail Art", title: "Minimalist Aura", desc: "Hand-painted aura gradient." },
    { src: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?q=80&w=800", category: "Hair Styling", title: "Dimensional Blonde", desc: "Multi-tonal highlights." },
    { src: "https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?q=80&w=800", category: "Hair Styling", title: "Curated Cut", desc: "Custom silhouette design." },
    { src: "https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?q=80&w=800", category: "Bridal", title: "Elegance defined", desc: "Modern bridal artistry." },
    { src: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=800", category: "Bridal", title: "High-Fashion Glam", desc: "Bold contours and shimmer." },
    { src: "https://images.unsplash.com/photo-1526045431048-f857369baa09?q=80&w=800", category: "Nail Art", title: "Petal Nails", desc: "Dried flowers encapsulated." },
    { src: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?q=80&w=800", category: "Treatments", title: "Focus Eye Mask", desc: "Smoothing contour treatment." },
    { src: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?q=80&w=800", category: "Treatments", title: "Oxygen Boost", desc: "Skin plumping system." },
    { src: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?q=80&w=800", category: "Treatments", title: "The Zen Stone", desc: "Warm stone muscle release." },
    { src: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=800", category: "Treatments", title: "Botanical Spa", desc: "Body detox compress." },
    { src: "https://images.unsplash.com/photo-1552693673-1bf958298935?q=80&w=800", category: "Nail Art", title: "Velvet Chrome", desc: "Multi-chrome finish." },
    { src: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=800", category: "Bridal", title: "Radiant Veil", desc: "Long-wear photo finish." },
    { src: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?v=2&q=80&w=800", category: "Hair Styling", title: "Sleek Bun", desc: "Sophisticated updo for evening events." },
    { src: "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?q=80&w=800", category: "Treatments", title: "Gold Ritual", desc: "24k gold infused luxury facial." },
    { src: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?q=80&w=800", category: "Treatments", title: "Herbal Soak", desc: "Calming botanical bath experience." },
    { src: "https://images.unsplash.com/photo-1620331311520-246422fd82f9?q=80&w=800", category: "Nail Art", title: "Abstract Lines", desc: "Geometric artistry on nude base." },
    { src: "https://images.unsplash.com/photo-1596433809252-260c2745dfdd?q=80&w=800", category: "Bridal", title: "Regal Henna", desc: "Intricate traditional patterns." },
    { src: "https://images.unsplash.com/photo-1620331311520-246422fd82f9?q=80&w=800", category: "Hair Styling", title: "Copper Glow", desc: "Vibrant autumnal hair tones." },
    { src: "https://images.unsplash.com/photo-1589710751893-f9a6770ad71b?q=80&w=800", category: "Treatments", title: "Hydro Glow", desc: "Deep hydration serum therapy." },
    { src: "https://images.unsplash.com/photo-1573461160327-b450ce3d8e7f?q=80&w=800", category: "Nail Art", title: "Emerald Shine", desc: "Deep jewel tones with gloss." },
    { src: "https://images.unsplash.com/photo-1620331311520-246422fd82f9?q=80&w=800", category: "Hair Styling", title: "Braided Crown", desc: "Bohemian inspired hair design." },
    { src: "https://images.unsplash.com/photo-1596433809252-260c2745dfdd?q=80&w=800", category: "Bridal", title: "Matte Finish", desc: "Modern matte makeup artistry." },
    { src: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?q=80&w=800", category: "Treatments", title: "Cryo Mask", desc: "Cooling therapy for inflammation." },
    { src: "https://images.unsplash.com/photo-1620331311520-246422fd82f9?q=80&w=800", category: "Nail Art", title: "Ocean Waves", desc: "Blue gradient marble effect." },
    { src: "https://images.unsplash.com/photo-1620331311520-246422fd82f9?q=80&w=800", category: "Treatments", title: "Lash Lift", desc: "Natural lash enhancement." },
    { src: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?q=80&w=800", category: "Bridal", title: "Golden Hour", desc: "Warm sunkissed bridal makeup." },
    { src: "https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?q=80&w=800", category: "Hair Styling", title: "Silk Press", desc: "Ultra smooth glossy hair finish." },
    { src: "https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=800", category: "Nail Art", title: "French Twist", desc: "Modern take on classic tips." },
    { src: "https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=800", category: "Treatments", title: "Steam Therapy", desc: "Deep pore cleansing steam." },
    { src: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=800", category: "Bridal", title: "Soft Curls", desc: "Gentle cascading bridal hair." },
    { src: "https://images.unsplash.com/photo-1600948836101-f9ffda59d250?v=2&q=80&w=800", category: "Nail Art", title: "Nude Elegance", desc: "Clean and classic manicure." },
    { src: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?v=2&q=80&w=800", category: "Hair Styling", title: "Textured Shag", desc: "Edgy 70s inspired layered cut." },
    { src: "https://images.unsplash.com/photo-1560750588-73207b1ef5b8?v=2&q=80&w=800", category: "Treatments", title: "Peel Glow", desc: "Gentle chemical exfoliation." },
    { src: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?v=2&q=80&w=800", category: "Bridal", title: "Vintage Glam", desc: "Hollywood waves and red lip." },
    { src: "https://images.unsplash.com/photo-1481824429379-07aa5e5b0739?q=80&w=800", category: "Nail Art", title: "Pastel Dream", desc: "Mixed shades of summer pastels." },
    { src: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?v=2&q=80&w=800", category: "Treatments", title: "Brows Expert", desc: "Precision brow shaping ritual." },
    { src: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?v=2&q=80&w=800", category: "Treatments", title: "Detox Wrap", desc: "Full body mineral mud wrap." },
    { src: "https://images.unsplash.com/photo-1523983388277-336a66bf9bcd?q=80&w=800", category: "Hair Styling", title: "Silver Ash", desc: "Trendsetting icy hair color." },
    { src: "https://images.unsplash.com/photo-1596433809252-260c2745dfdd?q=80&w=800", category: "Bridal", title: "Classic Pearl", desc: "Traditional bridal hair accessories." },
    { src: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?v=2&q=80&w=800", category: "Treatments", title: "Morning Dew", desc: "Hydrating mist treatment." },
    { src: "https://images.unsplash.com/photo-1590439471364-192aa70c0b53?v=2&q=80&w=800", category: "Treatments", title: "Back Massage", desc: "Targeted shoulder tension relief." },
    { src: "https://images.unsplash.com/photo-1552693673-1bf958298935?v=2&q=80&w=800", category: "Nail Art", title: "Cosmo Chrome", desc: "Intergalactic reflect nails." },
    { src: "https://images.unsplash.com/photo-1620331311520-246422fd82f9?q=80&w=800", category: "Hair Styling", title: "Rose Gold", desc: "Soft metallic pink highlights." },
    { src: "https://images.unsplash.com/photo-1523983388277-336a66bf9bcd?q=80&w=800", category: "Bridal", title: "Lush Lashes", desc: "Full volume lash application." },
    { src: "https://images.unsplash.com/photo-1526045431048-f857369baa09?v=3&q=80&w=800", category: "Nail Art", title: "Summer Fade", desc: "Orange to yellow ombre nails." },
    { src: "https://images.unsplash.com/photo-1526045431048-f857369baa09?v=3&q=80&w=800", category: "Treatments", title: "Led Light", desc: "Blue light therapy for healing." },
    { src: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?v=2&q=80&w=800", category: "Hair Styling", title: "Choppy Bob", desc: "Dynamic and textured bob cut." },
    { src: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?v=2&q=80&w=800", category: "Treatments", title: "Clear Skin", desc: "Intensive clarifying facial." },
    { src: "https://images.unsplash.com/photo-1560750588-73207b1ef5b8?v=3&q=80&w=800", category: "Treatments", title: "Face Sculpt", desc: "Jawline and cheek definition." },
    { src: "https://images.unsplash.com/photo-1510520434124-5bc7e642b61d?q=80&w=800", category: "Bridal", title: "Boho Bride", desc: "Natural and airy makeup style." },
    { src: "https://images.unsplash.com/photo-1620331311520-246422fd82f9?q=80&w=800", category: "Nail Art", title: "Linear Art", desc: "Modern black lines on clean base." },
    { src: "https://images.unsplash.com/photo-1589710751893-f9a6770ad71b?v=2&q=80&w=800", category: "Treatments", title: "Hydra Lips", desc: "Conditioning lip treatment." },
    { src: "https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?q=80&w=800", category: "Hair Styling", title: "Natural Curls", desc: "Defining and hydrating curly hair." },
    { src: "https://images.unsplash.com/photo-1523983388277-336a66bf9bcd?q=80&w=800", category: "Bridal", title: "Smokey Eye", desc: "Dramatic and sultry eye makeup." },
    { src: "https://images.unsplash.com/photo-1600948836101-f9ffda59d250?v=3&q=80&w=800", category: "Nail Art", title: "Classic Red", desc: "Timeless high-gloss red nails." },
    { src: "https://images.unsplash.com/photo-1620331311520-246422fd82f9?v=2&q=80&w=800", category: "Treatments", title: "Lift & Tint", desc: "Complete eye area enhancement." },
    { src: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?v=3&q=80&w=800", category: "Bridal", title: "Champagne Glow", desc: "Soft shimmer and nude palette." },
    { src: "https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?v=2&q=80&w=800", category: "Hair Styling", title: "Pixie Cut", desc: "Sharp and modern short hairstyle." },
    { src: "https://images.unsplash.com/photo-1604654894610-df63bc536371?v=2&q=80&w=800", category: "Nail Art", title: "Marble Tips", desc: "Faint grey and white marble art." },
    { src: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?v=2&q=80&w=800", category: "Treatments", title: "Milky Soak", desc: "Soothing milk and honey body dip." },
    { src: "https://images.unsplash.com/photo-1604654894610-df63bc536371?v=2&q=80&w=800", category: "Hair Styling", title: "Volume Blast", desc: "Maximized height and body." },
    { src: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?v=3&q=80&w=800", category: "Bridal", title: "Divine Veil", desc: "Stunning bridal finishing touches." }
];

const Gallery = () => {
    const containerRef = useRef();
    const [filter, setFilter] = useState("All");

    const categories = ["All", "Hair Styling", "Nail Art", "Bridal", "Treatments"];

    useGSAP(() => {
        // Hero Reveal
        gsap.from('.gallery-badge', { y: -20, opacity: 0, duration: 0.8, ease: 'power3.out', delay: 0.2 });
        gsap.from('.gallery-title', { y: 30, opacity: 0, duration: 1, ease: 'power4.out', delay: 0.4 });
        gsap.from('.gallery-desc', { y: 20, opacity: 0, duration: 1, ease: 'power3.out', delay: 0.5 });
    }, { scope: containerRef });

    // Handle gallery item animations separately to work with filtering
    useEffect(() => {
        // Clear any existing animations on the items
        gsap.killTweensOf('.motion-item');

        // Small delay to ensure Masonry has updated the DOM
        const timer = setTimeout(() => {
            const items = document.querySelectorAll('.motion-item');
            if (items.length > 0) {
                gsap.fromTo('.motion-item',
                    { opacity: 0, y: 20 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.6,
                        stagger: 0.02,
                        ease: 'power2.out',
                        clearProps: 'all'
                    }
                );
            }
        }, 100);

        return () => clearTimeout(timer);
    }, [filter]);

    const filteredImages = filter === "All"
        ? images
        : images.filter(img => img.category === filter);

    const breakpointColumnsObj = {
        default: 4,
        1400: 3,
        900: 2,
        600: 1
    };

    return (
        <div className="gallery-page" ref={containerRef}>
            {/* 1. Hero */}
            <section className="gallery-hero">
                <div className="container center-hero">
                    <span className="gallery-badge">GALLERY</span>
                    <h1 className="gallery-title">Visual Inspiration</h1>
                    <p className="gallery-desc">
                        A curated look at our latest transformations, from holistic treatments to high-fashion bridal artistry.
                    </p>

                    {/* 2. Filters */}
                    <div className="filters-container">
                        <div className="filter-pills">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    className={`filter-pill ${filter === cat ? 'active' : ''}`}
                                    onClick={() => setFilter(cat)}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. Masonry Grid Section */}
            <section className="gallery-section">
                <div className="container-fluid-gallery">
                    <Masonry
                        breakpointCols={breakpointColumnsObj}
                        className="pinterest-grid"
                        columnClassName="pinterest-grid-column"
                    >
                        {filteredImages.map((img, idx) => (
                            <div
                                key={`${img.src}-${idx}`}
                                className="gallery-item-wrapper motion-item"
                            >
                                <div className="premium-pin-card">
                                    <div className="pin-image-box">
                                        <img src={img.src} alt={img.title} className="pin-img" loading="lazy" />
                                        <div className="pin-overlay-bottom">
                                            <Link to="/contact" className="pin-cta-btn">Book Look</Link>
                                        </div>
                                    </div>
                                    <div className="pin-content">
                                        <span className="pin-cat">{img.category}</span>
                                        <h3 className="pin-title">{img.title}</h3>
                                        <p className="pin-description">{img.desc}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Masonry>
                </div>
            </section>

            {/* 4. CTA */}
            <section className="gallery-cta-dark">
                <div className="container">
                    <div className="cta-dark-content">
                        <h2 className="cta-dark-title">Ready for Your Own Transformation?</h2>
                        <p className="cta-dark-text">Our experts are here to help you achieve your desired look. Consultations are complimentary.</p>
                        <Link to="/contact" className="btn-primary-glow">Start Your Journey <ArrowRight size={18} /></Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Gallery;