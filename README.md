Dashboard Application with Real-Time Chat


Overview


This project is a dashboard application with the following key features:

Authentication with role-based access control (admin, user).

Real-time chat for group and private conversations.

Responsive design using Material-UI.

Project Setup

Prerequisites
Node.js installed on your system.
A package manager like npm or yarn.

INSTALLATION STEPS
1.Clone the repository:
    git clone <repository-link>
    cd <project-directory>


2.Install dependencies:
    npm install

3.Start the React development server (port 3001):
    npm start

4.Run the fake API server for authentication (port 8000): 
     git clone<repository-link>
     cd<fake-api-jwt-json-server>
    npm run start-auth
5.Run the Node.js WebSocket server (port 3005):
    git clone<repository-link>
    cd<chat-server-nodejs>
    node server.js

PROJECT STRUCTURE

src/  
├── components/          # All React components (AdminDashboard, Login, ChatComponent)  
├── services/            # AuthServices and Axios configurations  
├── utils/               # Utility functions (if any)  
├── App.js               # Main application file  
├── index.js             # Entry point  


TESTING THE ROLES

Use the following mock credentials for testing:

1.Admin:
Email: admin@gmail.com.com
Password: admin123

2.User:
Email: user@gmail.com
Password: user123

# livesphere
real time chat application
 4cba0bcd286dd62a20bf6c1a265985809f56b7ff
