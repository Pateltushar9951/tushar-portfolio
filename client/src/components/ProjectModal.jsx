import { AnimatePresence, motion } from 'framer-motion';
import { HiX } from 'react-icons/hi';

export default function ProjectModal({ project, onClose }) {
    if (!project) return null;

    return (
        <AnimatePresence>
            <motion.div
                className="modal-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
            >
                <motion.div
                    className="modal-content"
                    initial={{ opacity: 0, scale: 0.85, y: 40 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.85, y: 40 }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                    onClick={(e) => e.stopPropagation()}
                >
                    <button className="modal-close" onClick={onClose} aria-label="Close modal">
                        <HiX />
                    </button>

                    <div className="modal-emoji">{project.image}</div>
                    <span className="modal-category">{project.category}</span>
                    <h2 className="modal-title">{project.title}</h2>
                    <p className="modal-team">
                        👥 Team Size: {project.teamSize}{' '}
                        {project.teamSize === 1 ? '(Solo Project)' : 'Members'}
                    </p>
                    <p className="modal-description">{project.description}</p>

                    <div className="modal-stack-label">Tech Stack</div>
                    <div className="modal-stack">
                        {project.techStack.map((tech) => (
                            <span className="modal-stack-tag" key={tech}>
                                {tech}
                            </span>
                        ))}
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
