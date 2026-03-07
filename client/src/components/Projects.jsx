import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HiArrowRight } from 'react-icons/hi';
import axios from 'axios';
import staticProjects from '../data/projects';
import ProjectModal from './ProjectModal';

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export default function Projects() {
  const [projects, setProjects] = useState(staticProjects);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/projects')
      .then(({ data }) => { if (data.length > 0) setProjects(data); })
      .catch(() => { /* use static fallback */ });
  }, []);

  return (
    <section className="projects" id="projects">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">Portfolio</span>
          <h2 className="section-title">Featured Projects</h2>
          <p className="section-subtitle">
            A showcase of applications and automations I've built
          </p>
        </motion.div>

        <motion.div
          className="projects-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {projects.map((project, idx) => (
            <motion.div
              className="project-card glass-card"
              key={project._id || project.id || idx}
              variants={cardVariants}
              onClick={() => setSelectedProject(project)}
              whileHover={{ y: -6 }}
            >
              <div className="project-card-inner">
                <span className="project-emoji">{project.image}</span>
                <span className="project-category">{project.category}</span>
                <h3 className="project-title">{project.title}</h3>
                <p className="project-desc-preview">{project.description}</p>
                <div className="project-stack">
                  {project.techStack.slice(0, 4).map((tech) => (
                    <span className="project-stack-tag" key={tech}>
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="project-cta">
                  View Details <HiArrowRight />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
}
