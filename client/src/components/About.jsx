export default function About() {
  return (
    <section className="about" id="about">
      <div className="container">
        <div className="section-header">
          <span className="section-label">About Me</span>
          <h2 className="section-title">Who I Am</h2>
          <p className="section-subtitle">
            An agentic developer passionate about automating workflows and
            building with AI
          </p>
        </div>

        <div className="about-grid">
          <div className="about-text">
            <p>
              Full-Stack Developer specializing in MERN stack with hands-on
              experience in building scalable web applications and REST APIs.
              Skilled in developing responsive user interfaces, backend
              services, and AI-powered automation workflows using tools like
              <strong> n8n</strong>. Strong understanding of modern web
              technologies, deployment pipelines, and agile development
              practices. Seeking an opportunity to contribute to impactful
              projects while continuously enhancing technical expertise.
            </p>

            <div className="about-stats">
              {[
                { number: "7+", label: "Months Experience" },
                { number: "7+", label: "Projects Builds" },
                { number: "10+", label: "Certifications" },
              ].map((stat, i) => (
                <div
                  className="stat-card glass-card"
                  key={stat.label}
                  style={{ animationDelay: `${i * 0.15}s` }}
                >
                  <div className="stat-number">{stat.number}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
