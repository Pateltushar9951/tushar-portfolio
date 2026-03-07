import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HiOutlineMenuAlt3, HiX } from 'react-icons/hi';

const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Certifications', href: '#certifications' },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [active, setActive] = useState('#home');

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);

            const sections = navItems.map(item => item.href.slice(1));
            for (let i = sections.length - 1; i >= 0; i--) {
                const el = document.getElementById(sections[i]);
                if (el && el.getBoundingClientRect().top <= 150) {
                    setActive(`#${sections[i]}`);
                    break;
                }
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleClick = (href) => {
        setActive(href);
        setMenuOpen(false);
        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <motion.nav
            className={`navbar ${scrolled ? 'scrolled' : ''}`}
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
        >
            <div className="container">
                <div className="nav-logo" onClick={() => handleClick('#home')}>
                    {'<TP />'}
                </div>

                <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
                    {navItems.map((item) => (
                        <div
                            key={item.href}
                            className={`nav-link ${active === item.href ? 'active' : ''}`}
                            onClick={() => handleClick(item.href)}
                        >
                            {item.label}
                        </div>
                    ))}
                    <a
                        className="nav-cta"
                        href="#contact"
                        onClick={(e) => {
                            e.preventDefault();
                            handleClick('#contact');
                        }}
                    >
                        Contact Me
                    </a>
                </div>

                <button
                    className={`nav-toggle ${menuOpen ? 'active' : ''}`}
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle navigation"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>
        </motion.nav>
    );
}
