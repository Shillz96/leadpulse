# LeadPulse Documentation

## Introduction

Welcome to the LeadPulse documentation! LeadPulse is a cutting-edge platform designed for real estate wholesalers to efficiently verify and generate leads. By leveraging AI-driven tools and a modern, intuitive user interface, LeadPulse streamlines the process of identifying high-quality leads, saving you time and boosting your productivity.

This documentation serves as your comprehensive guide to setting up, developing, and maintaining the LeadPulse project. Whether you're a developer looking to contribute to the platform or a team member seeking to understand the project's architecture, you'll find everything you need here.

### What You'll Find in This Documentation:

- **Project Setup:** Step-by-step instructions to get your development environment up and running.
- **Configuration Guides:** Detailed setup for both the frontend (Next.js) and backend (Node.js/Express).
- **Feature Implementation:** Insights into core functionalities like lead verification, multi-channel integration, and automated drip campaigns.
- **Deployment:** Clear guides for deploying to Vercel and Render.
- **Workflow and Testing:** Best practices for development, testing, and using the admin account.
- **Maintenance:** Tips for keeping your project healthy and up-to-date.

Let's dive in and get started with building LeadPulse!

---

## Prerequisites

Before you begin, ensure you have the following software and accounts set up:

- **Node.js (v18+):** Essential for running JavaScript on the server and client. [Download here](https://nodejs.org/).
- **Git:** For version control and collaboration. [Download here](https://git-scm.com/).
- **MongoDB Atlas Account:** For cloud-based database management. [Sign up here](https://www.mongodb.com/cloud/atlas).
- **Vercel Account:** For frontend deployment. [Sign up here](https://vercel.com/).
- **Render Account:** For backend deployment. [Sign up here](https://render.com/).
- **Code Editor:** We recommend VS Code for its robust features and extensions. [Download here](https://code.visualstudio.com/).

Ensure all tools are installed and accounts are active before proceeding.

---

## Project Setup

Follow these steps to create the LeadPulse project on your local machine:

1. **Install Global Tools**
   - Open your terminal and install the Nx CLI for managing the monorepo:
     ```bash
     npm install -g nx
     ```
   - Install the Vercel CLI for frontend deployment and local testing:
     ```bash
     npm install -g vercel
     ```

2. **Create the Project Directory**
   - Use Nx to create a new workspace named `leadpulse`:
     ```bash
     npx create-nx-workspace@latest leadpulse
     ```
   - When prompted:
     - Choose **Integrated monorepo**
     - Select **Next.js** for the frontend
     - Select **Node** for the backend
   - This will generate the initial project structure in a folder named `leadpulse`.

3. **Navigate to the Project**
   ```bash
   cd leadpulse
   ```

4. **Generate Frontend and Backend Apps**
   - Create the Next.js frontend application:
     ```bash
     nx generate @nx/next:app frontend
     ```
   - Create the Node.js backend application:
     ```bash
     nx generate @nx/node:app backend
     ```

5. **Initialize Git for Version Control**
   - Set up a Git repository and make your first commit:
     ```bash
     git init
     git add .
     git commit -m "Initial project setup"
     git branch -M main
     ```
   - Link to a remote repository (replace `your-username` with your GitHub username):
     ```bash
     git remote add origin https://github.com/your-username/leadpulse.git
     git push -u origin main
     ```

Your project is now set up and ready for development!

---

## Frontend Configuration

The frontend of LeadPulse is built with Next.js, styled with Tailwind CSS, and enhanced with Magic UI components for a dynamic user experience. Follow these steps to configure it:

1. **Navigate to the Frontend Directory**
   ```bash
   cd apps/frontend
   ```

2. **Install Essential Dependencies**
   - Install Next.js, Tailwind CSS, Magic UI, and Framer Motion:
     ```bash
     npm install next@14 react react-dom tailwindcss magic-ui framer-motion
     ```

3. **Set Up Tailwind CSS**
   - Initialize Tailwind in the project:
     ```bash
     npx tailwindcss init
     ```
   - Update `tailwind.config.js` to include LeadPulse's custom color palette:
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

4. **Create a Reusable UI Component**
   - Create a directory for components:
     ```bash
     mkdir components
     ```
   - Add a `GlowingButton.jsx` component for interactive buttons:
     ```bash
     touch components/GlowingButton.jsx
     ```
     ```jsx
     // apps/frontend/components/GlowingButton.jsx
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

5. **Test the Frontend Locally**
   - Start the Next.js development server:
     ```bash
     nx serve frontend
     ```
   - Open `http://localhost:4200` in your browser to verify the setup.

Your frontend is now configured and ready for feature development!

---

## Backend Configuration

The backend of LeadPulse is powered by Node.js and Express, with MongoDB for data storage. Here's how to set it up:

1. **Navigate to the Backend Directory**
   ```bash
   cd ../../apps/backend
   ```

2. **Install Essential Dependencies**
   - Install Express, Mongoose, and other required packages:
     ```bash
     npm install express mongoose dotenv cors
     ```

3. **Set Up the Express Server**
   - Edit `apps/backend/src/index.js` to create a basic server:
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

4. **Configure Environment Variables**
   - Create a `.env` file in `apps/backend/`:
     ```bash
     touch .env
     ```
     ```env
     MONGO_URI=mongodb+srv://user:pass@cluster0.mongodb.net/leadpulse_dev
     ```
     *(Replace with your actual MongoDB Atlas connection string from the Database Setup section.)*

5. **Test the Backend Locally**
   - Start the backend server:
     ```bash
     nx serve backend
     ```
   - Visit `http://localhost:5000/api/health` to confirm it's working (`{ "status": "ok" }`).

Your backend is now set up and connected to the database!

---

## Database Setup

LeadPulse uses MongoDB Atlas for scalable, cloud-based database management. Follow these steps to set up your databases:

1. **Create MongoDB Atlas Clusters**
   - Sign up or log in at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
   - Create two clusters:
     - **Development Cluster**: Name it `leadpulse_dev`
     - **Production Cluster**: Name it `leadpulse_prod`
   - For each cluster:
     - Go to **Network Access** and add your IP address to allow connections.
     - Create a database user under **Database Access** and note the username and password.
     - Obtain the connection string from **Clusters > Connect > Connect your application**.

2. **Update Backend Environment**
   - Replace the `MONGO_URI` in `apps/backend/.env` with the connection string for `leadpulse_dev`.

3. **Verify Database Connection**
   - Restart the backend server:
     ```bash
     nx serve backend
     ```
   - Check the terminal for any connection errors. If none, your database is connected successfully.

Your development and production databases are now ready!

---

## Feature Implementation

LeadPulse's core features include lead verification, multi-channel integration, and automated drip campaigns. Below is a high-level overview of how to implement these:

1. **Lead Verification and Scoring**
   - **Backend**: Add a POST endpoint in `apps/backend/src/index.js`:
     ```javascript
     app.post('/api/verify-lead', (req, res) => {
       const { leadData } = req.body;
       // Implement verification logic (e.g., check email validity, property records)
       res.json({ verified: true, score: 85 });
     });
     ```
   - **Frontend**: Create a form in `apps/frontend/pages/index.js` to submit leads and display verification results.

2. **Multi-Channel Lead Integration**
   - **Backend**: Set up a webhook endpoint to receive leads from external sources:
     ```javascript
     app.post('/api/integrate-lead', (req, res) => {
       const lead = req.body;
       // Save lead to MongoDB
       res.sendStatus(200);
     });
     ```
   - Configure services like Facebook Ads or Google Ads to send leads to this endpoint.

3. **Automated Drip Campaigns**
   - **Backend**: Install Twilio or SendGrid for SMS/email automation:
     ```bash
     npm install twilio sendgrid
     ```
   - Implement campaign logic to send scheduled messages to leads.
   - **Frontend**: Build a campaign management interface in `apps/frontend/pages/campaigns.js`.

*(Note: These are placeholders. Replace with detailed implementation as per your requirements.)*

Your core features are now outlined and ready for development!

---

## Deployment

Deploy LeadPulse to make it accessible to users. The frontend will be hosted on Vercel, and the backend on Render.

1. **Deploy Frontend to Vercel**
   - From the frontend directory:
     ```bash
     cd apps/frontend
     vercel
     ```
   - Follow the prompts to link your GitHub repository and deploy.
   - In the Vercel dashboard, set environment variables (e.g., `NEXT_PUBLIC_API_URL=http://backend-url`).

2. **Deploy Backend to Render**
   - Sign in to [Render](https://render.com/) and create a new **Web Service**.
   - Connect your GitHub repository and select the `apps/backend` folder.
   - Set environment variables (e.g., `MONGO_URI` for the production database).
   - Define the build and start commands:
     - Build: `npm install`
     - Start: `npm start`

3. **Test Your Deployments**
   - Visit the URLs provided by Vercel and Render to ensure both frontend and backend are live.

LeadPulse is now deployed and ready for use!

---

## Workflow and Testing

Establish a smooth development workflow and testing process to maintain code quality.

1. **Local Development with Vercel CLI**
   - Use the Vercel CLI for a production-like local environment:
     ```bash
     cd apps/frontend
     vercel dev
     ```

2. **Staging and Production Environments**
   - Create a `staging` branch for testing:
     ```bash
     git checkout -b staging
     ```
   - Deploy staging for pre-production tests, then merge to `main` for production.

3. **Admin Account Setup**
   - Create a script to seed an admin user:
     ```bash
     mkdir scripts && touch scripts/seedAdmin.js
     ```
     ```javascript
     // apps/backend/scripts/seedAdmin.js
     const mongoose = require('mongoose');
     const User = require('../models/User');
     require('dotenv').config();

     mongoose.connect(process.env.MONGO_URI).then(async () => {
       const admin = new User({
         email: 'admin@leadpulse.com',
         password: 'hashedPassword', // Use a secure hashing method
         role: 'admin',
       });
       await admin.save();
       console.log('Admin account created');
       mongoose.disconnect();
     });
     ```
   - Run the script:
     ```bash
     node apps/backend/scripts/seedAdmin.js
     ```

Your workflow is now set up, and you can test features using the admin account.

---

## Maintenance

Keep LeadPulse running smoothly with these best practices:

1. **Manage Secrets**
   - Store sensitive information in `.env` files locally and in deployment platforms' dashboards.
   - Rotate keys every 90 days for security.

2. **Monitor Performance**
   - Use tools like Sentry for error tracking and Vercel Analytics for performance insights.

3. **Update Dependencies**
   - Run `npm update` monthly to keep packages up-to-date.
   - Use Dependabot on GitHub for automated dependency management.

By following these practices, you'll ensure LeadPulse remains secure and efficient.

---

This documentation provides a complete guide to creating, configuring, and maintaining LeadPulse. Each section offers clear, actionable steps to guide you from start to finish. Happy building!