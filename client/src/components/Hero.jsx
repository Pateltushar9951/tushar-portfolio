import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { HiArrowRight, HiEye } from 'react-icons/hi';

const titles = [
    'Agentic AI Developer',
    'Automation Specialist',
    'Full Stack Builder',
    'AI-Powered Creator',
];

export default function Hero() {
    const [titleIndex, setTitleIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setTitleIndex((prev) => (prev + 1) % titles.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="hero" id="home">
            <div className="container">
                <motion.div
                    className="hero-content"
                    initial={{ opacity: 0, x: -60 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                >
                    <div className="hero-badge">
                        <span className="badge-dot"></span>
                        Available for opportunities
                    </div>

                    <p className="hero-greeting">Hello, I'm</p>

                    <h1 className="hero-name">
                        Tushar{' '}
                        <span className="gradient-text">Patel</span>
                    </h1>

                    <div className="hero-title-wrapper">
                        <motion.h2
                            className="hero-title"
                            key={titleIndex}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5 }}
                        >
                            {titles[titleIndex]}
                        </motion.h2>
                    </div>

                    <p className="hero-description">
                        I build intelligent automations with n8n and create full-stack
                        applications using AI-powered development tools. Turning complex
                        workflows into seamless, automated experiences.
                    </p>

                    <div className="hero-buttons">
                        <a
                            href="#projects"
                            className="btn-primary"
                            onClick={(e) => {
                                e.preventDefault();
                                document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
                            }}
                        >
                            <HiEye /> View Projects
                        </a>
                        <a
                            href="#contact"
                            className="btn-outline"
                            onClick={(e) => {
                                e.preventDefault();
                                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                            }}
                        >
                            <HiArrowRight /> Get In Touch
                        </a>
                    </div>
                </motion.div>

                <motion.div
                    className="hero-image-wrapper"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
                >
                    <div className="hero-avatar-container">
                        <div className="hero-avatar-ring"></div>
                        <img 
                            src="/tushar-photo.jpg" 
                            alt="Tushar Patel" 
                            className="hero-avatar"
                        />
                    </div>
                    <div className="hero-floating-badge badge-1">🤖 n8n Automations</div>
                    <div className="hero-floating-badge badge-2">⚡ AI-Powered Dev</div>
                    <div className="hero-floating-badge badge-3">🚀 Full Stack</div>
                </motion.div>
            </div>

            <div
                className="hero-scroll-indicator"
                onClick={() =>
                    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })
                }
            >
                <div className="scroll-mouse"></div>
                <span>Scroll Down</span>
            </div>
        </section>
    );
}
