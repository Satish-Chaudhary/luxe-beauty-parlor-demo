import React, { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';
import './Preloader.css';

const Preloader = ({ onLoadComplete }) => {
    const [percent, setPercent] = useState(0);
    const preloaderRef = useRef();

    useEffect(() => {
        const tl = gsap.timeline({
            onComplete: () => {
                const revealTl = gsap.timeline({
                    onComplete: onLoadComplete
                });

                // Shutter / Door opening animation
                revealTl.to('.shutter-panel.left', {
                    x: '-100%',
                    duration: 1.2,
                    ease: 'expo.inOut'
                }, 0);

                revealTl.to('.shutter-panel.right', {
                    x: '100%',
                    duration: 1.2,
                    ease: 'expo.inOut'
                }, 0);

                // Fade out logo during opening
                revealTl.to('.preloader-content', {
                    opacity: 0,
                    scale: 0.8,
                    duration: 0.5,
                    ease: 'power2.in'
                }, 0);

                // Remove from DOM after animation
                revealTl.to(preloaderRef.current, {
                    display: 'none',
                    duration: 0
                });
            }
        });

        // Simulate loading progress
        const timer = setInterval(() => {
            setPercent((prev) => {
                if (prev >= 100) {
                    clearInterval(timer);
                    return 100;
                }
                return prev + 1;
            });
        }, 15);

        // Text reveal
        tl.fromTo('.preloader-text span',
            { y: 60, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: 'power4.out', delay: 0.5 }
        );

        // Wait a small moment after 100% before starting reveal
        tl.to({}, { duration: 0.5 });

        return () => {
            clearInterval(timer);
            tl.kill();
        }
    }, [onLoadComplete]);

    return (
        <div className="preloader-shutter-container" ref={preloaderRef}>
            <div className="shutter-panel left"></div>
            <div className="shutter-panel right"></div>

            <div className="preloader-content">
                <div className="preloader-logo">
                    <h1 className="preloader-text">
                        <span>L</span><span>U</span><span>X</span><span>E</span>
                    </h1>
                    <div className="preloader-line-container">
                        <div className="preloader-line" style={{ width: `${percent}%` }}></div>
                    </div>
                    <span className="preloader-percentage">{percent}%</span>
                </div>
            </div>
        </div>
    );
};

export default Preloader;
