# Consultation Recording Manager

A full-stack web application for managing consultation recordings and client sessions.

## Features

* Create consultation records
* Upload video/audio files
* View all recordings
* Edit recording details
* Delete recordings
* Search recordings
* Filter by category
* Dashboard statistics
* Download uploaded files
* Responsive UI with Tailwind CSS

## Tech Stack

### Frontend

* React.js
* Axios
* Tailwind CSS
* React Icons

### Backend

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* Multer

## Installation

### Clone Repository

```bash
git clone <repository-url>
```

### Backend Setup

```bash
cd backend
npm install
npm start
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

## Environment Variables

Create a `.env` file in backend:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

## API Endpoints

### Create Recording

POST

```http
/api/recordings/upload
```

### Get All Recordings

GET

```http
/api/recordings
```

### Get Single Recording

GET

```http
/api/recordings/:id
```

### Update Recording

PUT

```http
/api/recordings/:id
```

### Delete Recording

DELETE

```http
/api/recordings/:id
```

## Future Improvements

* Edit Modal
* Export CSV
* Authentication
* Cloud File Storage
* Advanced Analytics

## Author

Deewanshi Gujral
