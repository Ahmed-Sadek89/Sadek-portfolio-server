# SADEK PORTFOLIO SERVER - Using Node.js and MySQL
# Welcome! 👋

## Database design! 👋
![SYSTEM DESIGN FOR SADEK PORTFOLIO](./uploads/sadek_portfolio_ERP.png)

## Design Pattern! 👋
MVC Pattern

## COVER LETTER
-- this project for two users: visitor and **AHMED SADEK**
-- **AHMED SADEK** use this API for his dashboard for CRUD Operation 
and he is responsible for maneging the website that visitors can see.
-- Visitor here see all AHMED SADEK information like skills, projects, links and more...
-- Database design and imlementation is more easy when dealing with huge scale ORM like prisma
-- here, **AHMED SADEK** can upload medias like images related to his image and projects and more skills icon.
-- it store in cloud like cloudinary
-- and images are upload regardless of its extention, because it convert to webp
-- not all CRUD operation are available, 90% **AHMED SADEK** must have a JWT token and the rest of them its for visitors
-- here, its easy to change sites settings like title, primary and secondary colors, background and its fonts
-- and also visitor must login or register by 3rd party OAuth like facebook, github and google, that because **AHMED SADEK** track visitors information and know how many they are

## TECHNICALS SKILLS
**Node.js** -> `JavaScript Runtime`
**Express.js** -> `Node.js Framework`
**MySQL** -> `for storing relational tables`
**Prisma** -> `ORM for database migration and SQL commands`
**Passport.js** -> `for 2nd party OAuth`
**JWT** -> `for authentication`
**Cloudinary** -> `for store the uploaded images`
**Sharp** -> `for converting the image extention to webp`
**multer** -> `for uploading images to server`
**bcrypt** -> `for hashing passwords`


## SOFT SKILLS
**Searching** -> `for solving the incomming problems`
**Testing** -> `testing the endpoints using portman`
**Descover the new features and technologies** -> `like prisma, sharp, cloudinary and passport.js`
**Patiant** -> `Thanks to god, and me :)`

## Get the project
-- Git clone
-- mkdir sadek-portfolio-server
-- npm install
-- npm run dev
-- npx tsc --w
-- setup .env variables
-- make prisma migration `npx prisma migrate dev name --init`

## N.of entities
13

## Deployment
onrender