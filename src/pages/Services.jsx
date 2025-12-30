import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform, animate, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Scissors, Sparkles, Droplet, Clock, Star, Play, ArrowRight, Check, X, Eye, Gift } from 'lucide-react';
import '../styles/Services.css';

gsap.registerPlugin(ScrollTrigger);

// Helper function to get the path offset for a specific index
function getPathOffset(index) {
    return index / 8;
}

// Images for the squares
const images = [
    "https://i.pinimg.com/736x/41/62/81/41628150bc083c8436c083920dd568df.jpg",
    "https://i.pinimg.com/736x/e3/7e/e1/e37ee137d9d7ab7abb31b21519d5f208.jpg",
    "https://i.pinimg.com/736x/59/35/de/5935de819fd1d9f691d00919ab2591c2.jpg",
    "https://i.pinimg.com/736x/0b/dc/1b/0bdc1b13923be2b4686488a874f7b353.jpg",
    "https://i.pinimg.com/1200x/f4/00/c8/f400c82f8f8e20502701b9eae3b49b79.jpg",
    "https://i.pinimg.com/736x/0a/cd/6d/0acd6d97f4fe458e0eb98624c45fdf6a.jpg",
    "https://i.pinimg.com/736x/46/1e/a3/461ea34143ed23b99fd4ef28909619d3.jpg",
    "https://i.pinimg.com/1200x/2f/f9/45/2ff94576563765d88d1360f5e1c78e7b.jpg",
];

function SquareWithOffset({ index, parentIndex }) {
    const image = images[index];
    const firstSquareOffset = useMotionValue(0);

    useEffect(() => {
        const controls = animate(firstSquareOffset, 1, {
            repeat: Infinity,
            repeatType: "loop",
            repeatDelay: 1,
            ease: [0.42, 0, 0.58, 1],
            duration: 7,
        });
        return () => controls.stop();
    }, [firstSquareOffset]);

    const x = useTransform(firstSquareOffset, (offset) => {
        const firstAngle = ((getPathOffset(index) + offset) % 1) * Math.PI * 2;
        const lastAngle = ((getPathOffset(parentIndex) + offset) % 1) * Math.PI * 2;
        return Math.cos(firstAngle) * 180 - Math.cos(lastAngle) * 180;
    });

    const y = useTransform(firstSquareOffset, (offset) => {
        const firstAngle = ((getPathOffset(index) + offset) % 1) * Math.PI * 2;
        const lastAngle = ((getPathOffset(parentIndex) + offset) % 1) * Math.PI * 2;
        return Math.sin(firstAngle) * 180 - Math.sin(lastAngle) * 180;
    });

    return (
        <motion.div
            className="square-content"
            style={{ x, y }}
        >
            <img
                src={image}
                alt={`Square ${index}`}
                className="square-image"
                draggable={false}
                loading="lazy"
            />
        </motion.div>
    );
}

function Square({ index, children, className }) {
    const image = images[index];
    const pathOffset = useMotionValue(getPathOffset(index));

    useEffect(() => {
        const controls = animate(pathOffset, pathOffset.get() + 1, {
            repeat: Infinity,
            repeatType: "loop",
            repeatDelay: 1,
            ease: [0.42, 0, 0.58, 1],
            duration: 7,
        });
        return () => controls.stop();
    }, [pathOffset]);

    const x = useTransform(pathOffset, (offset) => {
        const angle = (offset % 1) * Math.PI * 2;
        return Math.cos(angle) * 180;
    });

    const y = useTransform(pathOffset, (offset) => {
        const angle = (offset % 1) * Math.PI * 2;
        return Math.sin(angle) * 180;
    });

    return (
        <motion.div
            key={index}
            className={`square-motion-div ${className || ''}`}
            style={{
                left: "calc(50% - 75px)",
                top: "calc(50% - 75px)",
                x,
                y,
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
                opacity: { duration: 1, delay: index * 0.12 + 0.35, ease: "easeOut" },
                scale: { duration: 1, delay: index * 0.12 + 0.35, ease: "easeOut" },
            }}
        >
            <img
                src={image}
                alt={`Square ${index}`}
                className="square-image"
                draggable={false}
                loading="lazy"
            />
            <motion.div
                className="square-content"
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1, delay: index * 0.12 + 0.35, ease: "easeOut" }}
            >
                {children}
            </motion.div>
        </motion.div>
    );
}

function LoopingImages() {
    const lastIndex = images.length - 1;
    return (
        <div className="looping-images-wrapper">
            <div className="looping-circle-container">
                {Array.from({ length: images.length }).map((_, index) =>
                    index === lastIndex ? null : <Square index={index} key={index} />
                )}
                <Square index={lastIndex}>
                    <SquareWithOffset index={0} parentIndex={lastIndex} />
                </Square>
            </div>
        </div>
    );
}

const servicesData = [
    // Skin Care & Facials (12)
    { id: 1, category: "Skin Care & Facials", title: "Signature Facial", price: "$85", time: "45min", img: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=2070&auto=format&fit=crop", desc: "Comprehensive treatment including deep cleansing, exfoliation, and hydration.", tag: "Top Rated", status: "Available" },
    { id: 2, category: "Skin Care & Facials", title: "Anti-Aging Gold Mask", price: "$120", time: "60min", img: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=1976&auto=format&fit=crop", desc: "Luxurious gold-infused treatment to firm and brighten aging skin.", tag: "Luxury", status: "Available" },
    { id: 3, category: "Skin Care & Facials", title: "Brightening Peel", price: "$95", time: "45min", img: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?q=80&w=2070&auto=format&fit=crop", desc: "Gentle acid peel to reveal smoother, more radiant skin tone.", tag: "Popular", status: "Available" },
    { id: 4, category: "Skin Care & Facials", title: "Hydra-Dermabrasion", price: "$110", time: "50min", img: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=2070&auto=format&fit=crop", desc: "Deep exfoliation paired with infusion of intense hydration serums.", status: "Available" },
    { id: 5, category: "Skin Care & Facials", title: "Acne Clarifying", price: "$90", time: "60min", img: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=2069&auto=format&fit=crop", desc: "Targeted treatment to clear pores and reduce inflammation.", status: "Available" },
    { id: 6, category: "Skin Care & Facials", title: "LED Light Therapy", price: "$60", time: "30min", img: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=2070&auto=format&fit=crop", desc: "Non-invasive treatment to boost collagen and treat acne.", status: "Available" },
    { id: 14, category: "Skin Care & Facials", title: "Diamond Microderm", price: "$130", time: "45min", img: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=2070&auto=format&fit=crop", desc: "Medical-grade diamond tip exfoliation for resurfaced skin.", tag: "Premium", status: "Available" },
    { id: 15, category: "Skin Care & Facials", title: "Chemical Peel", price: "$150", time: "40min", img: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=2069&auto=format&fit=crop", desc: "Professional grade chemical peel for deep cellular renewal.", status: "Available" },
    { id: 16, category: "Skin Care & Facials", title: "Oxygen Infusion", price: "$140", time: "55min", img: "https://images.unsplash.com/photo-1560869713-7d0a29430803?q=80&w=2000&auto=format&fit=crop", desc: "Pure oxygen combined with vitamins for immediate glow.", status: "Available" },
    { id: 17, category: "Skin Care & Facials", title: "Collagen Boost", price: "$125", time: "60min", img: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=2070&auto=format&fit=crop", desc: "Red light and serum therapy to stimulate natural collagen.", tag: "Best Seller", status: "Available" },
    { id: 18, category: "Skin Care & Facials", title: "Men's Cleanse", price: "$80", time: "45min", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1974&auto=format&fit=crop", desc: "Tailored for male skin, focusing on pore clearing and hydration.", status: "Available" },
    { id: 19, category: "Skin Care & Facials", title: "Teen Skin Rescue", price: "$70", time: "40min", img: "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?q=80&w=1974&auto=format&fit=crop", desc: "Gentle introduction to skin care for adolescents.", status: "Available" },

    // Hair Styling (12)
    { id: 7, category: "Hair Styling", title: "Royal Hair Spa", price: "$80", time: "60min", img: "https://images.unsplash.com/photo-1560869713-7d0a29430803?q=80&w=2000&auto=format&fit=crop", desc: "Revitalizing scalp massage and deep conditioning mask.", tag: "Popular", status: "Available" },
    { id: 8, category: "Hair Styling", title: "Keratin Treatment", price: "$200", time: "120min", img: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=2070&auto=format&fit=crop", desc: "Smooth, frizz-free hair that lasts for months.", status: "Available" },
    { id: 9, category: "Hair Styling", title: "Creative Cut", price: "$65", time: "45min", img: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=2069&auto=format&fit=crop", desc: "Expert precision cutting tailored to your face shape.", status: "Available" },
    { id: 20, category: "Hair Styling", title: "Balayage Magic", price: "$250", time: "180min", img: "https://images.unsplash.com/photo-1620331311520-246422fd82f9?q=80&w=1972&auto=format&fit=crop", desc: "Hand-painted highlights for a natural, sun-kissed look.", tag: "Trending", status: "Available" },
    { id: 21, category: "Hair Styling", title: "Bridal Styling", price: "$150", time: "90min", img: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=2069&auto=format&fit=crop", desc: "Elegan up-dos and styles for your special day.", tag: "Premium", status: "Available" },
    { id: 22, category: "Hair Styling", title: "Scalp Detox", price: "$90", time: "50min", img: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?q=80&w=2070&auto=format&fit=crop", desc: "Deep pore cleansing for the scalp to promote hair health.", status: "Available" },
    { id: 23, category: "Hair Styling", title: "Brazilian Blow", price: "$220", time: "150min", img: "https://images.unsplash.com/photo-1559599101-f09722fb4948?q=80&w=2069&auto=format&fit=crop", desc: "Liquid keratin formula that creates a protective layer around hair.", status: "Available" },
    { id: 24, category: "Hair Styling", title: "Full Color", price: "$120", time: "90min", img: "https://images.unsplash.com/photo-1560869713-7d0a29430803?q=80&w=2000&auto=format&fit=crop", desc: "Complete hue transformation with premium Ammonia-free dyes.", status: "Available" },
    { id: 25, category: "Hair Styling", title: "Express Blowdry", price: "$45", time: "30min", img: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?q=80&w=2069&auto=format&fit=crop", desc: "Quick wash and professional blowouts for any occasion.", status: "Available" },
    { id: 26, category: "Hair Styling", title: "Steam Therapy", price: "$55", time: "40min", img: "https://images.unsplash.com/photo-1560869713-7d0a29430803?q=80&w=2000&auto=format&fit=crop", desc: "Warm steam infusion for deep moisture penetration.", status: "Available" },
    { id: 27, category: "Hair Styling", title: "Perm & Wave", price: "$180", time: "120min", img: "https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=2069&auto=format&fit=crop", desc: "Add lasting curls and texture to straight hair.", status: "Available" },
    { id: 28, category: "Hair Styling", title: "Split End Repair", price: "$75", time: "45min", img: "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?q=80&w=2000&auto=format&fit=crop", desc: "Seals split ends for a healthier, smoother appearance.", status: "Available" },

    // Nails & Pedicure (12)
    { id: 10, category: "Nails & Pedicure", title: "Gel Manicure", price: "$50", time: "45min", img: "https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=2000&auto=format&fit=crop", desc: "Long-lasting gel polish cured under UV light.", status: "Available" },
    { id: 11, category: "Nails & Pedicure", title: "Spa Pedicure", price: "$60", time: "50min", img: "https://i.pinimg.com/736x/0a/cd/6d/0acd6d97f4fe458e0eb98624c45fdf6a.jpg", desc: "Relaxing foot soak, scrub, and massage.", status: "Available" },
    { id: 29, category: "Nails & Pedicure", title: "Acrylic Set", price: "$85", time: "75min", img: "https://images.unsplash.com/photo-1632345031435-8727f6897d53?q=80&w=2070&auto=format&fit=crop", desc: "Classic acrylic enhancements for durability and length.", tag: "Popular", status: "Available" },
    { id: 30, category: "Nails & Pedicure", title: "Paraffin Wax", price: "$35", time: "25min", img: "https://images.unsplash.com/photo-1620331311520-246422fd82f9?q=80&w=1972&auto=format&fit=crop", desc: "Soothing warm wax for super soft hands and feet.", status: "Available" },
    { id: 31, category: "Nails & Pedicure", title: "French Mani", price: "$65", time: "55min", img: "https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=2000&auto=format&fit=crop", desc: "Timeless white tips with a clean pink or nude base.", tag: "Classic", status: "Available" },
    { id: 32, category: "Nails & Pedicure", title: "Nail Art", price: "$20", time: "30min", img: "https://images.unsplash.com/photo-1632345031435-8727f6897d53?q=80&w=2070&auto=format&fit=crop", desc: "Custom hand-painted designs and 3D embellishments.", status: "Available" },
    { id: 33, category: "Nails & Pedicure", title: "Deluxe Spedicure", price: "$95", time: "70min", img: "https://i.pinimg.com/736x/0a/cd/6d/0acd6d97f4fe458e0eb98624c45fdf6a.jpg", desc: "Premium pedicure with therapeutic mask and extra massage.", tag: "Luxury", status: "Available" },
    { id: 34, category: "Nails & Pedicure", title: "Gel Extensions", price: "$110", time: "90min", img: "https://images.unsplash.com/photo-1632345031435-8727f6897d53?q=80&w=2070&auto=format&fit=crop", desc: "Flexible yet strong extensions using high-quality gels.", status: "Available" },
    { id: 35, category: "Nails & Pedicure", title: "Callous Removal", price: "$40", time: "30min", img: "https://i.pinimg.com/736x/0a/cd/6d/0acd6d97f4fe458e0eb98624c45fdf6a.jpg", desc: "Smoothing therapy for rough feet and hardened skin.", status: "Available" },
    { id: 36, category: "Nails & Pedicure", title: "Matte Special", price: "$55", time: "45min", img: "https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=2000&auto=format&fit=crop", desc: "Modern velvet-finish look for any color choice.", status: "Available" },
    { id: 37, category: "Nails & Pedicure", title: "Chrome Effect", price: "$65", time: "50min", img: "https://images.unsplash.com/photo-1632345031435-8727f6897d53?q=80&w=2070&auto=format&fit=crop", desc: "High-shine metallic or holographic powder finish.", status: "Available" },
    { id: 38, category: "Nails & Pedicure", title: "Mani-Pedi Duo", price: "$100", time: "90min", img: "https://i.pinimg.com/736x/0a/cd/6d/0acd6d97f4fe458e0eb98624c45fdf6a.jpg", desc: "Balanced combination for ultimate hand and foot care.", tag: "Value", status: "Available" },

    // Massage Therapy (12)
    { id: 12, category: "Massage Therapy", title: "Swedish Bliss", price: "$90", time: "60min", img: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=2000&auto=format&fit=crop", desc: "Brief gentle full-body massage for relaxation.", status: "Available" },
    { id: 13, category: "Massage Therapy", title: "Deep Tissue", price: "$110", time: "60min", img: "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?q=80&w=2000&auto=format&fit=crop", desc: "Focuses on realigning deeper layers of muscles.", status: "Available" },
    { id: 39, category: "Massage Therapy", title: "Hot Stone", price: "$130", time: "75min", img: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?q=80&w=1974&auto=format&fit=crop", desc: "Warmed volcanic stones to melt away deep-seated tension.", tag: "Luxury", status: "Available" },
    { id: 40, category: "Massage Therapy", title: "Aromatherapy", price: "$100", time: "60min", img: "https://images.unsplash.com/photo-1602928321679-560bb453f190?q=80&w=2012&auto=format&fit=crop", desc: "Essential oil blends to balance mind and body energy.", tag: "Best Seller", status: "Available" },
    { id: 41, category: "Massage Therapy", title: "Sports Recovery", price: "$120", time: "60min", img: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?q=80&w=1974&auto=format&fit=crop", desc: "Intense therapy focusing on muscle flexibility and recovery.", status: "Available" },
    { id: 42, category: "Massage Therapy", title: "Prenatal Gentle", price: "$105", time: "60min", img: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=2000&auto=format&fit=crop", desc: "Safe and soothing massage for expecting mothers.", status: "Available" },
    { id: 43, category: "Massage Therapy", title: "Foot Reflexology", price: "$75", time: "45min", img: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?q=80&w=1974&auto=format&fit=crop", desc: "Pressure point therapy on feet for overall wellness.", status: "Available" },
    { id: 44, category: "Massage Therapy", title: "Thai Stretch", price: "$115", time: "90min", img: "https://images.unsplash.com/photo-1602928321679-560bb453f190?q=80&w=2012&auto=format&fit=crop", desc: "Traditional assisted yoga stretching for flexibility.", status: "Available" },
    { id: 45, category: "Massage Therapy", title: "Couples Suite", price: "$190", time: "60min", img: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?q=80&w=1974&auto=format&fit=crop", desc: "Relaxing side-by-side experience in our shared suite.", tag: "Popular", status: "Available" },
    { id: 46, category: "Massage Therapy", title: "Lymphatic Flow", price: "$120", time: "60min", img: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=2000&auto=format&fit=crop", desc: "Light touch technique to encourage detoxification.", status: "Available" },
    { id: 47, category: "Massage Therapy", title: "Scalp & Neck", price: "$65", time: "30min", img: "https://images.unsplash.com/photo-1602928321679-560bb453f190?q=80&w=2012&auto=format&fit=crop", desc: "Targeted release for high-tension desk-bound professionals.", status: "Available" },
    { id: 48, category: "Massage Therapy", title: "Body Salt Polish", price: "$140", time: "75min", img: "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?q=80&w=2000&auto=format&fit=crop", desc: "Invigorating exfoliation followed by a full body moisturize.", tag: "Premium", status: "Available" },
];

const testimonials = [
    { id: 1, name: "Jessica Alba", role: "Model", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop" },
    { id: 2, name: "David Gandy", role: "Model", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop" },
    { id: 3, name: "Emma Watson", role: "Actress", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop" },
    { id: 4, name: "Robert Downey", role: "Actor", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop" },
    { id: 5, name: "Scarlett J", role: "Actress", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1976&auto=format&fit=crop" },
    { id: 6, name: "Chris Evans", role: "Actor", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop" },
    { id: 7, name: "Zendaya", role: "Singer", img: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=2071&auto=format&fit=crop" },
    { id: 8, name: "Tom Holland", role: "Actor", img: "https://images.unsplash.com/photo-1463453091185-61582044d556?q=80&w=2070&auto=format&fit=crop" },
    { id: 9, name: "Gal Gadot", role: "Actress", img: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=1964&auto=format&fit=crop" },
    { id: 10, name: "Ryan Gosling", role: "Actor", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1974&auto=format&fit=crop" },
    { id: 11, name: "Keanu Reeves", role: "Actor", img: "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?q=80&w=1974&auto=format&fit=crop" },
    { id: 12, name: "Natalie P", role: "Actress", img: "https://images.unsplash.com/photo-1554151228-14d9def656e4?q=80&w=1972&auto=format&fit=crop" },
];

const ServiceModal = ({ service, onClose }) => {
    if (!service) return null;

    return (
        <motion.div
            className="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
        >
            <motion.div
                className="modal-content"
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="modal-header-nav">
                    <button className="modal-close-btn" onClick={onClose}><X size={24} /></button>
                </div>
                <div className="modal-inner-grid">
                    <div className="modal-image-side">
                        <img src={service.img} alt={service.title} loading="lazy" />
                        {service.tag && <span className="modal-tag-floating">{service.tag}</span>}
                    </div>
                    <div className="modal-info-side">
                        <div className="modal-title-box">
                            <h2 className="modal-service-name">{service.title}</h2>
                            <div className="modal-badges">
                                <span className="badge-status">Status: {service.status || 'Available'}</span>
                                {service.tag && <span className="badge-tag">{service.tag}</span>}
                            </div>
                        </div>

                        <div className="modal-details-list">
                            <div className="detail-item">
                                <Clock size={18} />
                                <div>
                                    <label>Duration</label>
                                    <span>{service.time}</span>
                                </div>
                            </div>
                            <div className="detail-item">
                                <Sparkles size={18} />
                                <div>
                                    <label>Pricing</label>
                                    <span>{service.price}</span>
                                </div>
                            </div>
                        </div>

                        <div className="modal-description-box">
                            <label>Description</label>
                            <p>{service.desc}</p>
                        </div>

                        <div className="modal-footer-actions">
                            <button className="btn-modal-book" onClick={onClose}>Book Appointment Now</button>
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

const reviewsMarquee = [
    { id: 1, name: "Sarah Johnson", rating: 5, img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150" },
    { id: 2, name: "Michael Chen", rating: 5, img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150" },
    { id: 3, name: "Emily Davis", rating: 4, img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150" },
    { id: 4, name: "Jessica Lee", rating: 5, img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150" },
    { id: 5, name: "David Wilson", rating: 5, img: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=150" },
    { id: 6, name: "Sophie Brown", rating: 5, img: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=150" },
    { id: 7, name: "Alex Rivera", rating: 5, img: "https://images.unsplash.com/photo-1463453091185-61582044d556?q=80&w=150" },
    { id: 8, name: "Olivia Taylor", rating: 5, img: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=150" },
];

const ReviewMarquee = () => {
    return (
        <section className="review-marquee-section">
            <div className="marquee-container">
                <div className="marquee-track">
                    {[...reviewsMarquee, ...reviewsMarquee].map((review, idx) => (
                        <div key={`${review.id}-${idx}`} className="review-glass-card">
                            <img src={review.img} alt={review.name} className="review-avatar" loading="lazy" />
                            <div className="review-info">
                                <span className="review-name">{review.name}</span>
                                <div className="review-stars">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            size={14}
                                            fill={i < review.rating ? "var(--color-primary)" : "none"}
                                            color={i < review.rating ? "var(--color-primary)" : "rgba(255,255,255,0.2)"}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const CategorySlider = ({ category, items, onSelect }) => {
    const scrollRef = useRef();

    const scroll = (direction) => {
        const { current } = scrollRef;
        if (!current) return;
        const scrollAmount = 400;
        if (direction === 'left') {
            current.scrollLeft -= scrollAmount;
        } else {
            current.scrollLeft += scrollAmount;
        }
    };

    return (
        <div className="category-section">
            <div className="category-header">
                <h3 className="category-heading">{category}</h3>
                <div className="slider-controls">
                    <button className="btn-control" onClick={() => scroll('left')}>
                        <ArrowRight size={20} style={{ transform: 'rotate(180deg)' }} />
                    </button>
                    <button className="btn-control" onClick={() => scroll('right')}>
                        <ArrowRight size={20} />
                    </button>
                </div>
            </div>
            <div className="slider-wrapper" ref={scrollRef}>
                <div className="slider-track">
                    {items.map((item) => (
                        <motion.div
                            key={item.id}
                            className="circle-card-item"
                            onClick={() => onSelect(item)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <div className="circle-image-wrapper">
                                <img src={item.img} alt={item.title} className="circle-image" loading="lazy" />
                                <div className="circle-hover-overlay">
                                    <Eye color="white" size={32} />
                                </div>
                            </div>
                            <span className="circle-card-name">{item.title}</span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const Services = () => {
    const containerRef = useRef();
    const [selectedService, setSelectedService] = useState(null);
    const categories = Array.from(new Set(servicesData.map(s => s.category)));

    useGSAP(() => {
        // Hero Content Reveal
        gsap.from('.hero-split-title', {
            y: 80,
            opacity: 0,
            duration: 1,
            ease: 'power4.out',
            delay: 0.5
        });

        gsap.from('.hero-split-desc', {
            y: 30,
            opacity: 0,
            duration: 1,
            ease: 'power3.out',
            delay: 0.8
        });

        gsap.from('.hero-actions', {
            y: 20,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out',
            delay: 1
        });

        // Category Sections Entrance
        gsap.utils.toArray('.category-section').forEach((el) => {
            gsap.from(el, {
                scrollTrigger: {
                    trigger: el,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                },
                y: 50,
                opacity: 0,
                duration: 1,
                ease: 'power3.out'
            });
        });
    }, { scope: containerRef });

    return (
        <div className="services-page" ref={containerRef}>
            {/* 1. Hero Section (Split Layout) */}
            <section className="service-hero-split">
                <div className="container">
                    <div className="hero-split-grid items-center">
                        <div className="hero-split-content">
                            <span className="badge-new">New Seasonal Treatments Available</span>
                            <h1 className="hero-split-title">Elevate Your <br /><span className="highlight-text">Natural Glow</span></h1>
                            <p className="hero-split-desc">
                                Experience professional beauty treatments tailored specifically to your unique needs. Relax, rejuvenate, and let your inner beauty shine through.
                            </p>
                            <div className="hero-actions">
                                <button className="btn-primary">Explore Services</button>
                                <button className="btn-secondary"><Play size={16} fill="currentColor" /> Watch Video</button>
                            </div>
                        </div>
                        <div className="hero-split-image-container relative">
                            <LoopingImages />
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. Main Services Sections */}
            <section className="services-main-section">
                <div className="container">
                    {categories.map((cat) => (
                        <CategorySlider
                            key={cat}
                            category={cat}
                            items={servicesData.filter(s => s.category === cat)}
                            onSelect={setSelectedService}
                        />
                    ))}
                </div>
            </section>

            <ReviewMarquee />

            <AnimatePresence>
                {selectedService && (
                    <ServiceModal
                        service={selectedService}
                        onClose={() => setSelectedService(null)}
                    />
                )}
            </AnimatePresence>

            {/* 4. Promotional Banner */}
            {/* <section className="promo-section">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="promo-banner"
                    >
                        <div className="promo-visual-wrap">
                            <div className="promo-icon-circle">
                                <Gift size={40} />
                            </div>
                        </div>
                        <div className="promo-content-refined">
                            <span className="promo-badge">Limited Time Only</span>
                            <h3>Seasonal Glow Bundle</h3>
                            <p>Unlock our exclusive holiday package designed to make you shine for the festivities.</p>

                            <div className="promo-offer-list">
                                <div className="offer-item">
                                    <Check size={18} className="icon-right" />
                                    <span>Signature Gold Facial</span>
                                </div>
                                <div className="offer-item">
                                    <Check size={18} className="icon-right" />
                                    <span>Royal Hair Spa & Style</span>
                                </div>
                                <div className="offer-item">
                                    <Check size={18} className="icon-right" />
                                    <span>Premium Mani-Pedi Duo</span>
                                </div>
                                <div className="offer-item cross-item">
                                    <X size={18} className="icon-cross" />
                                    <span>No Hidden Appointments Fees</span>
                                </div>
                            </div>

                            <div className="promo-footer-wrap">
                                <div className="promo-pricing">
                                    <span className="old-price">$250</span>
                                    <span className="new-price">$149</span>
                                </div>
                                <button className="btn-promo-action btn-book-animated">Grab This Offer</button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section> */}

            {/* 7. Enhanced Grid Testimonials */}
            <section className="testimonials-grid-section">
                <div className="testimonials-bg-shapes">
                    <div className="bg-shape-1" />
                    <div className="bg-shape-2" />
                </div>

                <div className="container testimonials-container">
                    <div className="testimonials-photo-grid-exact">
                        {/* Background Empty Boxes */}
                        {[...Array(12)].map((_, i) => (
                            <div key={`empty-${i}`} className={`grid-box-empty empty-box-${i + 1}`} />
                        ))}

                        {/* Testimonial Photos */}
                        {testimonials.map((t, idx) => (
                            <motion.div
                                key={t.id}
                                initial={{ opacity: 0, scale: 0.8, y: 30 }}
                                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{
                                    delay: idx * 0.05,
                                    type: "spring",
                                    stiffness: 100,
                                    damping: 20
                                }}
                                className={`testimonial-grid-item-exact photo-item-${idx + 1}`}
                            >
                                <div className="testimonial-photo-wrapper-exact">
                                    <img src={t.img} alt={t.name} className="testimonial-photo-exact" loading="lazy" />
                                    <div className="testimonial-photo-overlay-exact">
                                        <div className="photo-info-exact">
                                            <span className="photo-name-exact">{t.name}</span>
                                            <span className="photo-role-exact">{t.role}</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}

                        {/* Center Content Area */}
                        <div className="testimonials-center-content">
                            <motion.span
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="testimonials-label-refined"
                            >
                                {/* Testimonials */}
                            </motion.span>
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                                className="testimonials-title-refined"
                            >
                                Trusted by leaders <br /> from various industries
                            </motion.h2>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                                className="testimonials-subtitle-refined"
                            >
                                Learn why professionals trust our solutions to <br /> complete their customer journeys.
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3 }}
                                className="mt-8"
                            >
                                {/* <button className="btn-success-stories-refined group">
                                    Read Success Stories <span>→</span>
                                </button> */}
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Services;
