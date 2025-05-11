# LeadPulse

A cutting-edge platform for real estate wholesalers to efficiently verify and generate leads using AI-driven tools and a modern, intuitive user interface.

## Features

- **Lead Verification and Scoring**: AI-driven system to verify and score leads.
- **Multi-Channel Lead Integration**: Collect leads from various sources and centralize them.
- **Automated Drip Campaigns**: Set up automated follow-ups to nurture leads.

## Tech Stack

- **Frontend**: Next.js, Tailwind CSS, Framer Motion
- **Backend**: Node.js, Express.js
- **Database**: MongoDB Atlas
- **Deployment**: Vercel (frontend), Render (backend)

## Getting Started

### Prerequisites

- Node.js (v18+)
- MongoDB (local or Atlas)
- Git

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/leadpulse.git
   cd leadpulse
   ```

2. Install frontend dependencies:
   ```bash
   cd apps/frontend
   npm install
   ```

3. Install backend dependencies:
   ```bash
   cd ../backend
   npm install
   ```

4. Set up environment variables:
   - Create a `.env` file in `apps/backend` with:
     ```
     PORT=5000
     MONGO_URI=your_mongodb_connection_string
     ```

### Running Locally

1. Start the backend:
   ```bash
   cd apps/backend
   npm run dev
   ```

2. Start the frontend:
   ```bash
   cd apps/frontend
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:3000`

## Project Structure

```
leadpulse/
├── apps/
│   ├── frontend/        # Next.js frontend
│   │   ├── src/
│   │   │   ├── app/     # Next.js app router
│   │   │   └── components/ # Reusable UI components
│   │   └── public/      # Static assets
│   └── backend/         # Express.js backend
│       ├── config/      # Configuration files
│       ├── models/      # MongoDB schemas
│       ├── routes/      # API routes
│       └── src/         # Source code
├── documents/           # Documentation
└── .env                 # Environment variables
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

[MIT](LICENSE) 