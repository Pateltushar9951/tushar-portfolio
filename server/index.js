const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const contactRoutes = require('./routes/contact');
const projectRoutes = require('./routes/projects');
const skillRoutes = require('./routes/skills');
const certRoutes = require('./routes/certifications');

// Models for seeding
const Project = require('./models/Project');
const Skill = require('./models/Skill');
const Certification = require('./models/Certification');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/contact', contactRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/certifications', certRoutes);

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'Tushar Portfolio API is running! 🚀' });
});

// Seed endpoint — populate DB with initial data (run once)
app.post('/api/seed', async (req, res) => {
  try {
    // Seed projects
    const projectCount = await Project.countDocuments();
    if (projectCount === 0) {
      await Project.insertMany([
        {
          title: "AI-Powered Workflow Automations",
          category: "Automation",
          techStack: ["n8n", "Webhooks", "APIs", "AI Agents"],
          teamSize: 1,
          image: "🤖",
          description: "Built multiple intelligent automation workflows using n8n to streamline repetitive tasks. Integrated AI agents, webhooks, and third-party APIs to create end-to-end automated pipelines for data processing, notification systems, and content generation.",
        },
        {
          title: "AI-Assisted Portfolio Website",
          category: "Web Development",
          techStack: ["React.js", "MongoDB", "CSS3", "Framer Motion"],
          teamSize: 1,
          image: "🌐",
          description: "Designed and developed this portfolio website using AI-assisted development tools like Antigravity, Cursor, and Claude. Features premium glassmorphism UI, smooth animations, responsive design, and a MongoDB backend.",
        },
        {
          title: "Quick Buy – E-Commerce Platform",
          category: "Full Stack",
          techStack: ["MongoDB", "Express.js", "React.js", "Node.js"],
          teamSize: 3,
          image: "🛒",
          description: "Developed a full-stack e-commerce application for online clothing shopping using the MERN stack. Features include Admin and Customer roles, product management, category browsing, cart functionality, and secure order placement.",
        },
        {
          title: "Property Dealers Platform",
          category: "Web Development",
          techStack: ["HTML", "CSS", "JavaScript", "MySQL"],
          teamSize: 3,
          image: "🏠",
          description: "Built a property listing platform where owners can list properties for sale and customers can browse and purchase properties. Implemented user authentication, price range filtering, and location-based search features.",
        },
        {
          title: "Stock Market Analysis Tool",
          category: "Data & Analytics",
          techStack: ["PHP", "HTML", "CSS", "MySQL"],
          teamSize: 3,
          image: "📈",
          description: "Created a stock analysis platform providing detailed insights into market trends. Features include stock price history visualization, real-time market data display, and multi-stock comparison.",
        },
        {
          title: "Student Result Management System",
          category: "Full Stack",
          techStack: ["MySQL", "PHP", "HTML", "CSS", "JavaScript"],
          teamSize: 3,
          image: "🎓",
          description: "Developed an automated student result management system for schools and colleges. Supports role-based access for Administrators and Students.",
        },
        {
          title: "Browser-Based Code Editor",
          category: "Developer Tool",
          techStack: ["HTML", "CSS", "JavaScript", "LocalStorage"],
          teamSize: 1,
          image: "💻",
          description: "Developed during internship at Calcs Pvt. Ltd. — a browser-based text editor with syntax highlighting for multiple languages. Features real-time saving, line numbering, and essential editor functionalities.",
        },
      ]);
    }

    // Seed skills
    const skillCount = await Skill.countDocuments();
    if (skillCount === 0) {
      await Skill.insertMany([
        { category: "AI & Automation", icon: "🧠", items: ["n8n Workflows", "AI Agents", "Antigravity", "Cursor AI", "Claude AI", "Prompt Engineering", "Workflow Automation"], order: 0 },
        { category: "Frontend", icon: "🎨", items: ["React.js", "HTML5", "CSS3", "JavaScript", "Framer Motion", "Responsive Design"], order: 1 },
        { category: "Backend & Databases", icon: "⚙️", items: ["Node.js", "Express.js", "MongoDB", "MySQL", "PHP", "REST APIs"], order: 2 },
        { category: "Tools & Platforms", icon: "🛠️", items: ["VS Code", "Git & GitHub", "Figma", "Canva", "Photoshop", "Android Studio", "XAMPP"], order: 3 },
        { category: "Programming Languages", icon: "💡", items: ["JavaScript", "Python", "Java", "PHP"], order: 4 },
      ]);
    }

    // Seed certifications
    const certCount = await Certification.countDocuments();
    if (certCount === 0) {
      await Certification.insertMany([
        { name: "Agile For Beginners — Great Learning" },
        { name: "DBMS Master Fundamentals & Advanced — Scaler" },
        { name: "Deep Learning — Simplilearn" },
        { name: "Data Structures in C — Great Learning" },
        { name: "Java Programming — Great Learning" },
        { name: "Data Science Using Python — Swayam" },
        { name: "PHP for Beginners — Great Learning" },
        { name: "ASP.NET Core Foundations — ScholarHat" },
        { name: "ASP.NET MVC with Web API — ScholarHat" },
        { name: "Web Application Development Using Flask" },
      ]);
    }

    res.json({
      success: true,
      message: 'Database seeded successfully!',
      counts: {
        projects: await Project.countDocuments(),
        skills: await Skill.countDocuments(),
        certifications: await Certification.countDocuments(),
      },
    });
  } catch (err) {
    console.error('Seed error:', err.message);
    res.status(500).json({ error: 'Failed to seed database.' });
  }
});

// Stats endpoint for admin dashboard
app.get('/api/stats', async (req, res) => {
  try {
    const [projects, skills, certifications, messages] = await Promise.all([
      Project.countDocuments(),
      Skill.countDocuments(),
      Certification.countDocuments(),
      mongoose.model('Contact').countDocuments(),
    ]);
    res.json({ projects, skills, certifications, messages });
  } catch (err) {
    res.status(500).json({ error: 'Server error.' });
  }
});

// Connect to MongoDB and start server
const startServer = async () => {
  try {
    const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/tushar-portfolio';
    await mongoose.connect(mongoURI);
    console.log('✅ Connected to MongoDB successfully!');

   const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
    console.log('');
    console.log('💡 Make sure MongoDB is running or your MONGO_URI in .env is correct.');
    console.log('📖 Read SETUP_GUIDE.md for step-by-step instructions.');
    process.exit(1);
  }
};

startServer();
