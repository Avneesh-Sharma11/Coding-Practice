# Mini Airbnb

## 📌 Description
Mini Airbnb is a web application where users can create and manage property listings.  
Users can add a listing with a **title, price, location, and image**.  
All listings are displayed on the main page, and users can view detailed information on the **show route**.

Users can also **edit or delete listings** directly from the show page.  
The application also includes **error handling using middleware and Bootstrap alerts** for better user experience.

---

## 🚀 Tech Stack
- Node.js
- Express.js
- MongoDB
- EJS (Embedded JavaScript Templates)
- Bootstrap
- JavaScript

---

## ✨ Features
- View all listings
- Add a new listing
- View listing details (Show Route)
- Edit existing listings
- Delete listings
- Image, price, location, and title support
- Error handling with middleware
- Bootstrap styled UI

---
## 📂 Folder Structure
    mini-airbnb
    │
    ├── init
    ├── models
    ├── public
    ├── utils
    ├── views
    │   ├── includes
    │   ├── layouts
    │   └── listings
    │
    ├── app.js
    └── package.json

---

## ⚙️ Installation

```bash
mkdir mini-airbnb
cd mini-airbnb
git clone https://github.com/Avneesh-Sharma11/mini-Airbnb.git
npm install

# initialize database
nodemon init/index.js

# start server
nodemon app.js

```
