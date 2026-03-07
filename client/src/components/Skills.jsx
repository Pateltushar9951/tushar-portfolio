import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import staticSkills from '../data/skills';

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export default function Skills() {
  const [skills, setSkills] = useState(staticSkills);

  useEffect(() => {
    axios.get('http://localhost:5000/api/skills')
      .then(({ data }) => { if (data.length > 0) setSkills(data); })
      .catch(() => { /* use static fallback */ });
  }, []);

  return (
    <section className="skills" id="skills">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">Skills & Tools</span>
          <h2 className="section-title">My Tech Stack</h2>
          <p className="section-subtitle">
            From AI automation to full-stack development — the tools I use to build
          </p>
        </motion.div>

        <motion.div
          className="skills-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {skills.map((category) => (
            <motion.div
              className="skill-category glass-card"
              key={category._id || category.category}
              variants={cardVariants}
            >
              <div className="skill-category-header">
                <span className="skill-category-icon">{category.icon}</span>
                <h3 className="skill-category-name">{category.category}</h3>
              </div>
              <div className="skill-tags">
                {category.items.map((skill) => (
                  <span className="skill-tag" key={skill}>
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
