# LeadPulse Setup and Development Guide

## Overview
LeadPulse is a platform for real estate wholesalers to verify and generate leads using AI-driven tools and a modern UI. It’s built with a monorepo structure using Nx, featuring a Next.js frontend, a Node.js/Express backend, MongoDB for data storage, and deployments on Vercel and Render.

## Prerequisites
- **Node.js** (v18+): [Download here](https://nodejs.org/)
- **Git**: For version control
- **MongoDB Atlas Account**: [Sign up here](https://www.mongodb.com/cloud/atlas)
- **Vercel Account**: [Sign up here](https://vercel.com/)
- **Render Account**: [Sign up here](https://render.com/)
- A code editor (e.g., VS Code)

## Step-by-Step Guide

### Step 1: Set Up Your Development Environment
1. **Install Global Tools**
   - Install Nx CLI:
     ```bash
     npm install -g nx
     ```
   - Install Vercel CLI:
     ```bash
     npm install -g vercel
     ```

2. **Create the Project Directory**
   - Create an Nx workspace:
     ```bash
     npx create-nx-workspace@latest leadpulse
     ```
   - Choose **Integrated monorepo**, **Next.js**, and **Node**.

3. **Navigate to the Project**
   ```bash
   cd leadpulse
   ```

4. **Generate Apps**
   - Frontend:
     ```bash
     nx generate @nx/next:app frontend
     ```
   - Backend:
     ```bash
     nx generate @nx/node:app backend
     ```

5. **Initialize Git**
   ```bash
   git init
   git add .
   git commit -m "Initial project setup"
   git branch -M main
   git remote add origin https://github.com/your-username/leadpulse.git
   git push -u origin main
   ```

### Step 2: Configure the Frontend (Next.js)
1. **Navigate to Frontend**
   ```bash
   cd apps/frontend
   ```

2. **Install Dependencies**
   ```bash
   npm install next@14 react react-dom tailwindcss magic-ui framer-motion
   ```

3. **Set Up Tailwind CSS**
   - Initialize:
     ```bash
     npx tailwindcss init
     ```
   - Edit `tailwind.config.js`:
     ```javascript
     module.exports = {
       content: ['./src/**/*.{js,ts,jsx,tsx}'],
       theme: {
         extend: {
           colors: {
             marigold: '#E89C31',
             'muted-sky-blue': '#A9C7D5',
             'soft-fern': '#92A680',
             'peony-pink': '#F291A2',
             'warm-ivory': '#F8EDE3',
             goldenrod: '#F2C94C',
             'bright-white': '#FEFEFE',
           },
         },
       },
       plugins: [],
     };
     ```

4. **Create a UI Component**
   - File: `apps/frontend/components/GlowingButton.jsx`
     ```jsx
     import { motion } from 'framer-motion';
     import { MagicGlow } from 'magic-ui';

     const GlowingButton = ({ children, color = 'marigold' }) => (
       <motion.button
         className={`bg-${color} text-bright-white px-6 py-3 rounded-lg`}
         whileHover={{ scale: 1.05 }}
         transition={{ duration: 0.3 }}
       >
         <MagicGlow>{children}</MagicGlow>
       </motion.button>
     );
     export default GlowingButton;
     ```

5. **Test Frontend**
   ```bash
   nx serve frontend
   ```

### Step 3: Configure the Backend (Node.js/Express)
1. **Navigate to Backend**
   ```bash
   cd ../../apps/backend
   ```

2. **Install Dependencies**
   ```bash
   npm install express mongoose dotenv cors
   ```

3. **Set Up Express Server**
   - File: `apps/backend/src/index.js`
     ```javascript
     const express = require('express');
     const mongoose = require('mongoose');
     const cors = require('cors');
     require('dotenv').config();

     const app = express();
     app.use(cors());
     app.use(express.json());

     mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });
     app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

     app.listen(5000, () => console.log('Backend running on port 5000'));
     ```

4. **Create .env**
   - File: `apps/backend/.env`
     ```env
     MONGO_URI=mongodb+srv://user:pass@cluster0.mongodb.net/leadpulse_dev
     ```

5. **Test Backend**
   ```bash
   nx serve backend
   ```

### Step 4: Set Up the Database (MongoDB Atlas)
1. **Create Clusters**
   - Sign up at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
   - Create `leadpulse_dev` and `leadpulse_prod` clusters.
   - Get connection strings.

2. **Update .env**
   - Use the development connection string in `apps/backend/.env`.

3. **Verify Connection**
   - Restart backend and check for errors.

### Step 5: Implement Core Features
1. **Lead Verification and Scoring**
   - Backend endpoint:
     ```javascript
     app.post('/api/verify-lead', (req, res) => {
       const { leadData } = req.body;
       res.json({ verified: true, score: 85 });
     });
     ```

2. **Multi-Channel Lead Integration**
   - Backend webhook:
     ```javascript
     app.post('/api/integrate-lead', (req, res) => {
       const lead = req.body;
       res.sendStatus(200);
     });
     ```

3. **Automated Drip Campaigns**
   - Install Twilio/SendGrid and implement logic.

### Step 6: Deploy the Application
1. **Deploy Frontend to Vercel**
   ```bash
   cd apps/frontend
   vercel
   ```

2. **Deploy Backend to Render**
   - Create a Web Service on Render, link repo, set variables.

3. **Test Deployments**
   - Check URLs provided by Vercel and Render.

### Step 7: Establish Workflow and Testing
1. **Local Development**
   ```bash
   vercel dev
   ```

2. **Staging and Production**
   ```bash
   git checkout -b staging
   ```

3. **Admin Account**
   - File: `apps/backend/scripts/seedAdmin.js`
     ```javascript
     const mongoose = require('mongoose');
     const User = require('../models/User');
     require('dotenv').config();

     mongoose.connect(process.env.MONGO_URI).then(async () => {
       const admin = new User({
         email: 'admin@leadpulse.com',
         password: 'hashedPassword',
         role: 'admin',
       });
       await admin.save();
       console.log('Admin account created');
       mongoose.disconnect();
     });
     ```

### Step 8: Maintain the Project
1. **Manage Secrets**
   - Use `.env` and rotate keys every 90 days.

2. **Monitor Performance**
   - Use Sentry and Vercel Analytics.

3. **Update Dependencies**
   - Run `npm update` monthly.