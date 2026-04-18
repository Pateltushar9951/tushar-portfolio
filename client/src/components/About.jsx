import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" },
  }),
};

export default function About() {
  return (
    <section className="about" id="about">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">About Me</span>
          <h2 className="section-title">Who I Am</h2>
          <p className="section-subtitle">
            An agentic developer passionate about automating workflows and
            building with AI
          </p>
        </motion.div>

        <div className="about-grid">
          <motion.div
            className="about-text"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
          >
            <p>
              I&apos;m <strong>Tushar Patel</strong>, an agentic AI developer
              based in
              <strong> Vadodara, Gujarat</strong>. I specialize in building
              intelligent automation workflows using <strong>n8n</strong> and
              developing full-stack applications with the power of AI tools like{" "}
              <strong>Antigravity, Cursor, and Claude</strong>.
            </p>
            <p>
              With a strong foundation in computer science from{" "}
              <strong>Parul University</strong> (MCA in AI), I bridge the gap
              between traditional development and AI-powered productivity. I
              believe in the future where developers work <em>with</em> AI — not
              replaced by it — to build smarter, faster, and better.
            </p>
            <p>
              Whether it&apos;s automating repetitive tasks, building responsive
              web applications, or creating end-to-end data pipelines, I bring
              curiosity, adaptability, and a passion for continuous learning to
              every project.
            </p>

            <div className="about-stats">
              {[
                { number: "7+", label: "Months Experience" },
                { number: "7+", label: "Projects Built" },
                { number: "10+", label: "Certifications" },
              ].map((stat, i) => (
                <motion.div
                  className="stat-card glass-card"
                  key={stat.label}
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <div className="stat-number">{stat.number}</div>
                  <div className="stat-label">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="about-details"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="edu-card glass-card">
              <div className="edu-degree">🎓 MCA – Artificial Intelligence</div>
              <div className="edu-school">Parul University, Vadodara</div>
              <div className="edu-info">Expected 2026 · CGPA: 7.03 / 10</div>
            </div>

            <div className="edu-card glass-card">
              <div className="edu-degree">
                📚 BCA – Full Stack Web Development
              </div>
              <div className="edu-school">Parul University, Vadodara</div>
              <div className="edu-info">Graduated 2024 · CGPA: 7.66 / 10</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
