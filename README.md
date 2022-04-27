# Corporate Social Media "InBetween" / Frontend & Backend (*fictitious company*)

![Corporate Social Media "InBetween" - Presentation image](https://github.com/MaudNY/P7_11022022_InBetween/blob/main/InBetween-photo.jpg "InBetween presentation image")

<h1>Getting started</h1>

Cloning and using this project requires to follow the next steps.

<h2>Prerequisites</h2>

This digital project is running with:

BACKEND:

> Server: Node.js

> Framework: Express

> Database: MySQL (ORM: Sequelize)

FRONTEND:

> Framework: React.js

> CSS Preprocessor: Sass

<h2>Run installation!</h2>

1. Create a local dedicated folder in your computer and open your code editor
2. Open the created folder and open a new terminal
3. Run ` git clone https://github.com/MaudNY/P7_11022022_InBetween.git ` to clone the code
4. Run ` npm install `
5. Open the ` backend ` folder and create your own database
    1. Create a MySQL database (e.g., "inbetween-personal_database")
    2. Open the ` sequelize.js ` file
    3. Line 6, set the following code with your own data
    
    ` const sequelize = new Sequelize('inbetween-personal_database', 'USERNAME', 'PASSWORD', { `
5. Run ` cd backend `, then ` nodemon server ` to set up the backend server (http://localhost:3000) 
6. Open another new terminal
7. Run ` cd frontend `, then ` npm run start ` to set up the frontend server (http://localhost:3080)
8. If your browser didn't automatically reached the homepage, open your browser and copy / paste http://localhost:3080
9. Make sure to open another terminal before either staging, commiting or pushing your potential updates ;)

*This digital project is mobile, tablet and laptop friendly* 🤩

<h2>API & Documentation</h2>

If you're french speaking (🇫🇷), you'll find a short documentation for the REST API of this project.

Open the **backend** folder

Open the **API-documentation** folder, then open the file API-documentation.html

<h2>Author</h2>

Aude-Mélanie NYOUNG - 2022.
