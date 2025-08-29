# 🍽️ Canteen App



**Canteen App** is a full-stack MERN application for managing canteen orders efficiently. Users can browse the menu, place orders, and track order status. Admins can manage the menu and orders easily.

---

## 🚀 Features

- 🔐 **User Authentication** – Login/Signup with JWT  
- 🍔 **Menu Display** – View food items with images & prices  
- 🛒 **Order Placement** – Add to cart & checkout  
- 📦 **Order Tracking** –  order status  
- 📝 **Admin Panel** – Manage menu items and orders  

---

## 🛠️ Tech Stack

- **Frontend:** React.js, HTML, CSS, Bootstrap ,Tailwind css 
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB  
- **Authentication:** JWT  
- **State Management:** React Context API / Redux  

---

## 💻 Installation

```bash
# Clone repo
git clone https://github.com/pavank025k/online-canteen-food-order-app-mern-
cd canteen-app


# Create .env in backend
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5001

# Run frontend
cd backend
npm run dev

# Run backend
cd ../frontend
npm start
