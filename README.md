# MediTrain

MediTrain is a healthcare training and education platform aimed at providing interactive learning experiences by providing a virtual patient and to answer your medical queries. This project is divided into two parts: the backend and the frontend. Below, you’ll find detailed setup instructions for both.

---

## Backend

### Prerequisites

Ensure you have the following installed:

- [Python](https://www.python.org/) (version 3.8 or higher)
- [Render](https://render.com/) (for deployment)

### Requirements

The backend uses the following Python dependencies:

- python-dotenv
- groq
- requests
- Flask_cors
- Flask
- langchain==0.3.13
- langchain-core
- langchain-groq
- gunicorn
- beautifulsoup4
- markdown

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/c4dr-me/meditrain
   cd backend
   ```

2. Create a virtual environment and activate it:

   ```bash
   python3 -m venv venv
   source venv/bin/activate
   ```

3. Install dependencies:

   ```bash
   pip install -r requirements.txt
   ```

4. Configure environment variables:
   Create a `.env` file in the root directory and add the following:

   ```env
   GROQ_API_KEY=
   ALLOWED_ORIGIN=
   ```

5. Start the server:

   ```bash
   python api.py
   ```

   The server will run on `http://127.0.0.1:5000` by default.

### API Endpoints

| Method | Endpoint    | Description                 |
| ------ | ----------- | --------------------------- |
| POST   | `/response` | Get response from langchain |

---

## Frontend

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 14 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/c4dr-me/meditrain-ai
   cd client
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure environment variables:
   Create a `.env` file in the root directory and add the following:

   ```env
   VITE_BACKEND_URL=http://127.0.0.1:5000
   ```

4. Start the development server:

   ```bash
   npm start
   ```

   The app will run on `http://localhost:5173` by default.

### Features

- Virtual Patient simulation with user persona
- Voice input with Web Speech API integration
- Interactive UI

---

## Deployment

### Backend

1. Use [Render](https://render.com/) or any cloud service/backend for deployment.
2. Add your environment variables in the hosting platform’s settings.

### Frontend

1. Host the repo directly through netlify
