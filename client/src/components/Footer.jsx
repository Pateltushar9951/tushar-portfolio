import {
    FaLinkedinIn,
    FaGithub,
} from 'react-icons/fa';
import { SiLeetcode } from 'react-icons/si';
import { HiOutlineMail } from 'react-icons/hi';

const footerLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
];

const socials = [
    { icon: <FaLinkedinIn />, href: 'https://linkedin.com/in/Tushar', label: 'LinkedIn' },
    { icon: <FaGithub />, href: 'https://github.com/Tushar', label: 'GitHub' },
    { icon: <SiLeetcode />, href: 'https://leetcode.com/Tushar', label: 'LeetCode' },
    { icon: <HiOutlineMail />, href: 'mailto:pateltushar9951@gmail.com', label: 'Email' },
];

export default function Footer() {
    const scrollTo = (href) => {
        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-logo">{'<TP />'}</div>

                    <div className="footer-links">
                        {footerLinks.map((link) => (
                            <span
                                className="footer-link"
                                key={link.label}
                                onClick={() => scrollTo(link.href)}
                            >
                                {link.label}
                            </span>
                        ))}
                    </div>

                    <div className="footer-socials">
                        {socials.map((s) => (
                            <a
                                className="footer-social"
                                key={s.label}
                                href={s.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={s.label}
                            >
                                {s.icon}
                            </a>
                        ))}
                    </div>
                </div>

                <div className="footer-bottom">
                    © {new Date().getFullYear()} Tushar Patel. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
