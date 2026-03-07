# 🚀 Portfolio Website — Setup Guide (Beginner Friendly)

This guide will walk you through setting up and running your portfolio website step by step.

---

## 📋 Prerequisites

You need these installed on your computer:

### 1. Install Node.js
1. Go to [https://nodejs.org](https://nodejs.org)
2. Download the **LTS** (Long Term Support) version
3. Run the installer — click "Next" through everything
4. To verify, open **Command Prompt** or **PowerShell** and type:
   ```
   node --version
   npm --version
   ```
   You should see version numbers. If yes, you're good! ✅

---

## 🗄️ Setting Up MongoDB

You have **two options** — choose the easier one:

### Option A: MongoDB Atlas (Cloud — Recommended for Beginners) ⭐

This is **FREE** and doesn't require installing anything on your computer.

1. Go to [https://www.mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Click **"Try Free"** and create an account (use Google sign-in for ease)
3. Choose the **FREE** tier (M0 Sandbox)
4. Select a region close to you (e.g., Mumbai for India)
5. Click **"Create Cluster"** — wait 2-3 minutes

#### Get your Connection String:
1. In the left sidebar, click **"Database"**
2. Click **"Connect"** on your cluster
3. Choose **"Connect your application"**
4. Select **Driver: Node.js** and **Version: 6.0 or later**
5. Copy the connection string. It looks like:
   ```
   mongodb+srv://yourUsername:yourPassword@cluster0.xxxxx.mongodb.net/tushar-portfolio?retryWrites=true&w=majority
   ```
6. Replace `yourPassword` with the password you set

#### Set up Database Access:
1. Go to **"Database Access"** in the left sidebar
2. Click **"Add New Database User"**
3. Choose a username and password (remember these!)
4. Click **"Add User"**

#### Allow your IP Address:
1. Go to **"Network Access"** in the left sidebar
2. Click **"Add IP Address"**
3. Click **"Allow Access from Anywhere"** (for development)
4. Click **"Confirm"**

### Option B: Local MongoDB (Advanced)

1. Download MongoDB Community Server from [https://www.mongodb.com/try/download/community](https://www.mongodb.com/try/download/community)
2. Install with default settings
3. Your connection string will be:
   ```
   mongodb://localhost:27017/tushar-portfolio
   ```

---

## ⚙️ Configure the Backend

1. Open the `server` folder
2. Open the `.env` file in VS Code or Notepad
3. Replace the `MONGO_URI` value with your connection string:

```env
# If using MongoDB Atlas (Option A):
MONGO_URI=mongodb+srv://yourUsername:yourPassword@cluster0.xxxxx.mongodb.net/tushar-portfolio?retryWrites=true&w=majority

# If using Local MongoDB (Option B):
MONGO_URI=mongodb://localhost:27017/tushar-portfolio

PORT=5000
```

4. Save the file

---

## 🏃 Running the Project

### Step 1: Start the Backend Server
Open a terminal/PowerShell, navigate to the server folder:
```bash
cd "C:\Users\patel\Desktop\TUSHAR PORTFOLIO\server"
npm install
npm start
```
You should see:
```
✅ Connected to MongoDB successfully!
🚀 Server running at http://localhost:5000
```

### Step 2: Start the Frontend (in a new terminal)
Open another terminal/PowerShell:
```bash
cd "C:\Users\patel\Desktop\TUSHAR PORTFOLIO\client"
npm install
npm run dev
```
You should see:
```
  VITE v6.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
```

### Step 3: Open in Browser
Go to **http://localhost:5173/** in your browser 🎉

---

## 🖼️ Adding Your Real Photo

1. Get your photo ready (square image works best, e.g. 400x400px)
2. Name it `tushar.jpg`
3. Place it in: `client/public/tushar.jpg`
4. Open `client/src/components/Hero.jsx`
5. Find this line:
   ```jsx
   <div className="hero-avatar-bg">👨‍💻</div>
   ```
6. Replace it with:
   ```jsx
   <img src="/tushar.jpg" alt="Tushar Patel" className="hero-avatar" />
   ```
7. Save and refresh your browser!

---

## 🌐 Deploying to the Web (Free!)

### Frontend → Vercel
1. Push your code to GitHub
2. Go to [https://vercel.com](https://vercel.com) and sign in with GitHub
3. Click **"New Project"** → select your repo
4. Set **Root Directory** to `client`
5. Click **Deploy** — your site will be live in minutes!

### Backend → Render
1. Go to [https://render.com](https://render.com) and sign in with GitHub
2. Click **"New Web Service"** → select your repo
3. Set **Root Directory** to `server`
4. Set **Build Command** to `npm install`
5. Set **Start Command** to `npm start`
6. Add environment variable: `MONGO_URI` = your MongoDB Atlas connection string
7. Click **Deploy**

### Update Frontend API URL
After deploying the backend to Render, update the API URL in your Contact component:
1. Open `client/src/components/Contact.jsx`
2. Change `http://localhost:5000` to your Render URL (e.g., `https://your-app.onrender.com`)

---

## 🔗 Updating Your Social Links

Open `client/src/components/Contact.jsx` and `client/src/components/Footer.jsx` to update:
- **LinkedIn**: Replace `linkedin.com/in/Tushar` with your actual profile URL
- **GitHub**: Replace `github.com/Tushar` with your actual GitHub URL
- **LeetCode**: Replace `leetcode.com/Tushar` with your actual LeetCode URL

---

## 📁 Project Structure

```
TUSHAR PORTFOLIO/
├── client/                  ← Frontend (React + Vite)
│   ├── public/              ← Static files (put your photo here)
│   ├── src/
│   │   ├── components/      ← All UI components
│   │   ├── data/            ← Projects, skills, certifications data
│   │   ├── App.jsx          ← Main app component
│   │   ├── main.jsx         ← Entry point
│   │   └── index.css        ← All styles
│   ├── index.html
│   └── package.json
│
├── server/                  ← Backend (Express + MongoDB)
│   ├── models/              ← Database schemas
│   ├── routes/              ← API endpoints
│   ├── index.js             ← Server entry point
│   ├── .env                 ← Your secret config (DON'T share!)
│   └── package.json
│
└── SETUP_GUIDE.md           ← This file!
```

---

## ❓ Common Issues

| Problem | Solution |
|---------|----------|
| `npm: command not found` | Reinstall Node.js from nodejs.org |
| `MongoDB connection error` | Check your `.env` file and make sure your Atlas IP is whitelisted |
| `CORS error in browser` | Make sure the backend is running on port 5000 |
| `Contact form doesn't work` | Backend must be running. Check terminal for errors |
| `Page is blank` | Check browser console (F12) for errors |

---

**You're all set! 🎉** If you get stuck, feel free to ask for help.
