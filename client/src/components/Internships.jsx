import { motion } from "framer-motion";

const internships = [
  {
    company: "AARYOM",
    role: "Software Developer",
    period: "Jan 2026 – Till now",
    bullets: [
      "Assisted in Agile (Scrum) processes, including sprint planning, daily stand-ups, sprint reviews, and retrospectives to ensure smooth project execution.",
      "Collaborated with the Product Owner to manage and prioritize the product backlog, refining user stories for better development flow.",
      "Developed AI-powered automation workflows using tools like n8n, improving process efficiency and reducing manual effort.",
      "Integrated APIs and automated data flows across multiple platforms, ensuring seamless communication between systems.",
      "Identified and resolved workflow bottlenecks, contributing to improved team productivity and faster delivery cycles.",
    ],
  },
  {
    company: "CALCS PVT. LTD",
    role: "Front-End Web Developer",
    period: "Nov 2023 – Apr 2024",
    bullets: [
      "Worked as a Front-End Engineering Intern at CALCS, focusing on building responsive and user-friendly web interfaces.",
      "Developed and maintained web pages using HTML, CSS, and JavaScript, ensuring cross-browser compatibility.",
      "Implemented responsive web design techniques to support mobile, tablet, and desktop devices.",
      "Enhanced user experience by adding interactive UI features, animations, and form validations using JavaScript.",
      "Optimized website performance through code minification, image optimization, and efficient front-end practices.",
    ],
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function Internships() {
  return (
    <section className="internships" id="internships">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">Experience</span>
          <h2 className="section-title">Internships</h2>
          <p className="section-subtitle">
            Hands-on experience from automation, product collaboration, and
            front-end development
          </p>
        </motion.div>

        <motion.div
          className="internships-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {internships.map((internship) => (
            <motion.article
              className="internship-card glass-card"
              key={internship.company}
              variants={cardVariants}
            >
              <div className="internship-card-top">
                <div>
                  <div className="internship-company">{internship.company}</div>
                  <div className="internship-role">{internship.role}</div>
                </div>
                <div className="internship-period">{internship.period}</div>
              </div>

              <ul className="internship-list">
                {internship.bullets.map((bullet) => (
                  <li key={bullet} className="internship-list-item">
                    {bullet}
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
