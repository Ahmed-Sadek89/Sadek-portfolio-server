# SADEK PORTFOLIO SERVER - Using Node.js and MySQL
# Welcome! 👋

## Database design! 👋
![SYSTEM DESIGN FOR SADEK PORTFOLIO](./uploads/sadek_portfolio_ERP.png)

## Design Pattern! 👋
MVC Pattern

## COVER LETTER
1. this project for two users: visitor and **AHMED SADEK**
2. **AHMED SADEK** use this API for his dashboard for CRUD Operation 
and he is responsible for maneging the website that visitors can see.
3. Visitor here see all AHMED SADEK information like skills, projects, links and more...
4. Database design and imlementation is more easy when dealing with huge scale ORM like prisma
5. here, **AHMED SADEK** can upload medias like images related to his image and projects and more skills icon.
6. it store in cloud like cloudinary
7. and images are upload regardless of its extention, because it convert to webp
8. not all CRUD operation are available, 90% **AHMED SADEK** must have a JWT token and the rest of them its for visitors
9. here, its easy to change sites settings like title, primary and secondary colors, background and its fonts
10. and also visitor must login or register by 3rd party OAuth like facebook, github and google, that because **AHMED SADEK** track visitors information and know how many they are

## TECHNICALS SKILLS
- **Node.js** -> `JavaScript Runtime`
- **Express.js** -> `Node.js Framework`
- **PostgreSQL** -> `for storing relational tables`
- **Prisma** -> `ORM for database migration and SQL commands`
- **Passport.js** -> `for 2nd party OAuth`
- **JWT** -> `for authentication`
- **Cloudinary** -> `for store the uploaded images`
- **Sharp** -> `for converting the image extention to webp`
- **multer** -> `for uploading images to server`
- **bcrypt** -> `for hashing passwords`


## SOFT SKILLS
- **Searching** -> `for solving the incomming problems`
- **Testing** -> `testing the endpoints using portman`
- **Descover the new features and technologies** -> `like prisma, sharp, cloudinary and passport.js`
- **Patiant** -> `Thanks to god, and me :)`

## Get the project
-  Git clone
-  mkdir sadek-portfolio-server
-  npm install
-  npm run dev
-  npx tsc --w
-  setup .env variables
-  make pull from prisma migration `npx prisma db pull`
-  make generate from prisma migration `npx prisma generate`
-  make push from prisma migration `npx prisma db push`


## N.of entities
13

## Deployment
- API LINK -> Vercel.com
- Database -> Neon using `ahmed.mohamed.sadek.100.com`

## vercel.json
for deploy the project in vercel `using only TypeScript code`

## API DOCUMENTATION
https://documenter.getpostman.com/view/18043505/2sA3BszosV#c2a6c47b-42e3-40f3-b885-110a05b09ee3

## notes
- make sure that DATABASE_LINK in production mode is the `Connection string` `not the prisma DB_URL`
- package.json -> scripts `
"scripts": {
    "start": "node src/index.ts",
    "dev": "nodemon src/index.ts",
    "postinstall": "prisma generate"
  },
`
