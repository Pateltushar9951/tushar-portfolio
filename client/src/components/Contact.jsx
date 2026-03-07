import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    HiOutlineMail,
    HiOutlinePhone,
    HiOutlineLocationMarker,
} from 'react-icons/hi';
import {
    FaLinkedinIn,
    FaGithub,
} from 'react-icons/fa';
import { SiLeetcode } from 'react-icons/si';
import axios from 'axios';

const contactLinks = [
    {
        icon: <HiOutlineMail />,
        label: 'Email',
        value: 'pateltushar9951@gmail.com',
        href: 'mailto:pateltushar9951@gmail.com',
    },
    {
        icon: <HiOutlinePhone />,
        label: 'Phone',
        value: '+91 9328177538',
        href: 'tel:+919328177538',
    },
    {
        icon: <HiOutlineLocationMarker />,
        label: 'Location',
        value: 'Vadodara, Gujarat, India',
        href: null,
    },
    {
        icon: <FaLinkedinIn />,
        label: 'LinkedIn',
        value: 'linkedin.com/in/Tushar',
        href: 'https://linkedin.com/in/Tushar',
    },
    {
        icon: <FaGithub />,
        label: 'GitHub',
        value: 'github.com/Tushar',
        href: 'https://github.com/Tushar',
    },
    {
        icon: <SiLeetcode />,
        label: 'LeetCode',
        value: 'leetcode.com/Tushar',
        href: 'https://leetcode.com/Tushar',
    },
];

export default function Contact() {
    const [form, setForm] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState('idle'); // idle | sending | sent | error

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('sending');
        try {
            await axios.post('https://tushar-portfolio-9jkm.onrender.com/api/contact', form);
            setStatus('sent');
            setForm({ name: '', email: '', message: '' });
            setTimeout(() => setStatus('idle'), 5000);
        } catch {
            setStatus('error');
            setTimeout(() => setStatus('idle'), 4000);
        }
    };

    return (
        <section className="contact" id="contact">
            <div className="container">
                <motion.div
                    className="section-header"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="section-label">Get In Touch</span>
                    <h2 className="section-title">Contact Me</h2>
                    <p className="section-subtitle">
                        Have a project idea or want to collaborate? I'd love to hear from you.
                    </p>
                </motion.div>

                <div className="contact-grid">
                    <motion.div
                        className="contact-info"
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                    >
                        <h3>
                            Let's Build Something{' '}
                            <span style={{ color: 'var(--accent-primary)' }}>Amazing</span>
                        </h3>
                        <p>
                            I'm always excited to work on new projects, build automations, or
                            simply have a conversation about technology. Feel free to reach out
                            through any of the channels below.
                        </p>
                        <div className="contact-links">
                            {contactLinks.map((link) => (
                                <a
                                    key={link.label}
                                    className="contact-link-item"
                                    href={link.href || '#'}
                                    target={link.href?.startsWith('http') ? '_blank' : undefined}
                                    rel={link.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                                >
                                    <div className="contact-link-icon">{link.icon}</div>
                                    <div className="contact-link-text">
                                        <div className="link-label">{link.label}</div>
                                        <div className="link-value">{link.value}</div>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </motion.div>

                    <motion.form
                        className="contact-form glass-card"
                        onSubmit={handleSubmit}
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                    >
                        <div className="form-group">
                            <label className="form-label" htmlFor="name">
                                Your Name
                            </label>
                            <input
                                className="form-input"
                                type="text"
                                id="name"
                                placeholder="John Doe"
                                value={form.name}
                                onChange={(e) => setForm({ ...form, name: e.target.value })}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label" htmlFor="email">
                                Your Email
                            </label>
                            <input
                                className="form-input"
                                type="email"
                                id="email"
                                placeholder="john@example.com"
                                value={form.email}
                                onChange={(e) => setForm({ ...form, email: e.target.value })}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label" htmlFor="message">
                                Message
                            </label>
                            <textarea
                                className="form-textarea"
                                id="message"
                                placeholder="Tell me about your project or idea..."
                                value={form.message}
                                onChange={(e) => setForm({ ...form, message: e.target.value })}
                                required
                            />
                        </div>

                        {status === 'sent' ? (
                            <div className="form-success">✅ Message sent successfully!</div>
                        ) : status === 'error' ? (
                            <div className="form-success" style={{ color: '#ff6b6b' }}>
                                ❌ Failed to send. Make sure the backend is running.
                            </div>
                        ) : (
                            <button
                                type="submit"
                                className="btn-primary form-submit"
                                disabled={status === 'sending'}
                            >
                                {status === 'sending' ? 'Sending...' : 'Send Message'}
                            </button>
                        )}
                    </motion.form>
                </div>
            </div>
        </section>
    );
}
