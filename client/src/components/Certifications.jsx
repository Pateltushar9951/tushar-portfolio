import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import staticCertifications from '../data/certifications';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function Certifications() {
  const [certifications, setCertifications] = useState(
    staticCertifications.map(name => ({ name, _id: name }))
  );

  useEffect(() => {
    axios.get('http://localhost:5000/api/certifications')
      .then(({ data }) => { if (data.length > 0) setCertifications(data); })
      .catch(() => { /* use static fallback */ });
  }, []);

  return (
    <section className="certifications" id="certifications">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">Learning</span>
          <h2 className="section-title">Certifications</h2>
          <p className="section-subtitle">
            Continuous learning is at the core of what I do
          </p>
        </motion.div>

        <motion.div
          className="cert-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {certifications.map((cert) => (
            <motion.div
              className="cert-item glass-card"
              key={cert._id}
              variants={itemVariants}
            >
              <span className="cert-icon">🏅</span>
              <span className="cert-name">{cert.name}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
