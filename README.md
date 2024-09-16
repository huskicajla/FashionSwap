1. Download the Project:
    - Clone the repository: 
	git clone https://github.com/huskicajla/FashionSwap.git
    - Once the project is downloaded, open it in Visual Studio Code
2. Split the Terminal:
    - Open terminal and split it (right-click and select "Split Terminal")
3. Navigate to the API Folder:
    - In the first terminal, navigate to the api folder:
	cd api
    - Install the required dependencies for the API:
	npm install
4. Navigate to the Client Folder:
    - In the second terminal, navigate to the client folder:
	cd client
    - Install the required dependencies for the API:
	npm install
5. Set Up the Database:
    - Open api/connection.js file and replace user, password and database with your actual data
6. Start the API Server:
    - In the terminal where you navigated to the api folder, start the API server:
	npm start
7. Start the Client(Frontend):
    - In the terminal where you navigated to the client folder, start the client application:
	npm start
8. Access the Application:
    - Once both the API and client servers are running, open your browser and go to:
	  http://localhost:3000
    - The client (frontend) should load, and the API will be serving data from your database. 
