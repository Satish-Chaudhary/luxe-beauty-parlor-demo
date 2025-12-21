import React from 'react';
import { motion } from 'framer-motion';
import '../styles/FloatingShapes.css';

const FloatingShapes = () => {
    return (
        <div className="floating-shapes-container">
            {/* Decorative Line 1 */}
            <svg className="shape-line line-1" viewBox="0 0 100 100" preserveAspectRatio="none">
                <motion.path
                    d="M0,50 Q25,0 50,50 T100,50"
                    fill="none"
                    stroke="var(--color-primary)"
                    strokeWidth="0.5"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.2 }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                />
            </svg>

            {/* Decorative Line 2 */}
            <svg className="shape-line line-2" viewBox="0 0 100 100" preserveAspectRatio="none">
                <motion.path
                    d="M0,20 Q50,80 100,20"
                    fill="none"
                    stroke="var(--color-secondary)"
                    strokeWidth="0.5"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.1 }}
                    transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                />
            </svg>

            {/* Ribbon Shape */}
            <motion.div
                className="ribbon-glow ribbon-1"
                animate={{
                    y: [0, -50, 0],
                    rotate: [0, 10, 0],
                    scale: [1, 1.1, 1]
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            />

            <motion.div
                className="ribbon-glow ribbon-2"
                animate={{
                    x: [0, 100, 0],
                    rotate: [0, -15, 0],
                    scale: [1, 1.2, 1]
                }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear", delay: 2 }}
            />
        </div>
    );
};

export default FloatingShapes;
