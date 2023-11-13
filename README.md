![github](https://github.com/Cassandra-Samonte/Parks-and-Rec/assets/142133887/7ce2f4e6-a273-4b93-8798-7fd68e77f32e)

# Parks & Rec
Parks & Rec is a MERN Stack CRUD application leveraging the National Park Service (NPS) API to present comprehensive information on US National Parks.

# Introduction
The goal of Parks & Rec is to provide a centralized platform for outdoor enthusiasts, park visitors, and nature explorers. It aims to facilitate easy access to detailed information on national parks, recreational activities, and updates on park conditions and news.

This application will serve as the capstone project showcasing proficiency in the MERN stack and integration with third-party APIs, demonstrating a robust full-stack development skill set.

# Installation Instructions
To set up and run Parks & Rec locally on your machine, please follow these steps:

Step 1: Clone the Repository
First, clone the Parks & Rec repository from GitHub to your local machine. You can do this by running the following command in your terminal:
	git clone https://github.com/Cassandra-Samonte/Parks-and-Rec.git
Step 2: Install Dependencies
Navigate to the cloned repository's directory and install the necessary dependencies for the project. Run:
	cd Parks-and-Rec
	npm install
Step 3: Set Up Environment Variables
Create a .env file in the root directory of the project. You will need to set the following environment variables:
* MONGO_URI - your MongoDB connection string
* API_KEY - your National Park Service API key
* JWT_SECRET_KEY - your JWS secret key
Step 4: Start the Application
Once all dependencies are installed and environment variables are set, you can start the application by running:
	npm start
This will start the server and the React application. You should see a message indicating that the server is running on a specific port (usually port 3000).
Step 5: Access the Application
Open your web browser and go to http://localhost:3000 (or the port specified in your terminal). You should now be able to see and interact with the Parks & Rec application.


# User Stories
## User Story 1: Outdoor Adventurer
As an outdoor adventurer, I want to quickly find information about different national parks, including trails, weather, and activity recommendations, so I can effectively plan my trips.

Features enabled by Parks & Rec:
- Search for parks by name, state, or activity.
- View up-to-date news and current weather conditions (stretch goal).
- Get recommendations and insight for park activities from other users 

## User Story 2: Nature Photographer
As a nature photographer, I want to explore parks that are ideal for photography, and be able to share my images on the platform.

Features enabled by Parks & Rec:
- Access user-submitted photos and reviews.
- Share and showcase personal photography.

## User Story 3: Park Conservation Advocate
As a park conservation advocate, I want to stay informed about current park news so I can participate in and contribute to the preservation of national parks.

Features enabled by Parks & Rec:
- View updates on park conservation news and events.
- Engage with a community of conservationists.

# Route Table
<img width="908" alt="route" src="https://github.com/Cassandra-Samonte/Parks-and-Rec/assets/142133887/84c5e618-42ef-49a2-99b6-4ff30599482e">

# Wireframes
![parks-wireframe](https://github.com/Cassandra-Samonte/Parks-and-Rec/assets/142133887/232740c5-6efe-4400-9feb-cc4dcf5a72a3)

# Minimum Viable Product (MVP) 
The MVP of Parks & Rec will deliver a fully functional web application that:

- Utilizes the MERN stack (MongoDB, Express.js, React, Node.js).
- Incorporates full CRUD operations interfaced with a responsive React frontend.
- Displays data from the NPS API in a user-friendly format.
- Includes a model that allows users to share their experiences, rate parks and trails, and provide tips for fellow visitors.

# Deployed App
![Untitled-1-01](https://github.com/Cassandra-Samonte/Parks-and-Rec/assets/142133887/c6bb8705-da57-45a2-bd42-c76a335ff5ba)
![Untitled-1-02](https://github.com/Cassandra-Samonte/Parks-and-Rec/assets/142133887/02ba9b14-227a-4a54-9924-c0765b14ab66)
![Untitled-1](https://github.com/Cassandra-Samonte/Parks-and-Rec/assets/142133887/67494980-e700-4eed-b98b-7da058b9f8b1)
![Untitled-1-03](https://github.com/Cassandra-Samonte/Parks-and-Rec/assets/142133887/b973bbea-6899-4eac-8a37-f5f14fa2ce48)
![Untitled-1-05](https://github.com/Cassandra-Samonte/Parks-and-Rec/assets/142133887/b87fbdcd-1dc3-47e8-94ec-21801d0f190d)

# Technologies Used
MongoDB
Express.js
React
Node.js
National Park Service API
Tailwind CSS

# Stretch Goals
## Secure Login:
Implement JSON Web Tokens (JWT) for authentication to maintain the integrity and confidentiality of user data.

## Enhanced Interactive Maps:
Incorporate interactive maps with detailed overlays of trails, park boundaries, and points of interest for an immersive exploration experience.

## Personalized Itineraries:
Create functionality for users to build and customize their visit itineraries, store past trips, and plan future visits.

# Unsolved Problems & Major Hurdles
