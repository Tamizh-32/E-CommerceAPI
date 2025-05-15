# 🛒 Real-Time Backend for E-Commerce Cart & Chatbot

This is a secure Node.js backend project built for an e-commerce platform with real-time chatbot support using Socket.IO. It includes product and cart management, search functionality, error handling.



 Features

- ✅   Product API  : Add, view, update, delete, search
- ✅   Cart API  : Add to cart, view cart, update, delete
- ✅   Chatbot  : Real-time support via Socket.IO (responds to predefined queries)
- ✅   Security  : Helmet, CORS, Rate Limiting
- ✅   Error Handling  : Centralized error middleware
- ✅   Deployment Ready  : For AWS EC2 / Linux server

---

## 🛠️ Tech Stack

-   Node.js  
-   Express  
-   MongoDB (Mongoose)  
-   Socket.IO  
-   Helmet + Rate Limiter  
-   AWS EC2 (for deployment)  

---

## 📂 Project Structure

project-root/
├── controllers/
├── middlewares/
├── models/
├── routes/
├── sockets/
│ └── chatSocket.js
├── public/
│ └── chat.html (for Socket.IO test)
├── .env
├── index.js
└── README.md


🧪 API Endpoints
🔹 Product API
Method	        Endpoint	                     Description
GET	            /api/products	                Get all products
POST	        /api/products	                Add new product
PUT	            /api/products/:id	            Update product
DELETE	        /api/products/:id	            Delete product
GET	            /api?search=keyword	            Search products

🔹 Cart API
Method	Endpoint	    Description
GET	    /api/cart	    View cart
POST	/api/cart	    Add to cart
PUT	    /api/cart/:id	Update cart item
DELETE	/api/cart/:id	Remove from cart




AWS EC2 Instence
Public Public IPv4 Address
--------------------

https://13.233.104.187/


get Products List: https://13.233.104.187/api/products
get Cart List: https://13.233.104.187/api/cart
Search Product: https://13.233.104.187/api?search=keyword  eg: iphone
chat bot : https://13.233.104.187/chat




💬 Chatbot Testing
The chatbot uses Socket.IO, not REST. You can test it using the provided chat.html:

Start your server

Open public/chat.html in browser

Type messages like:

hello

delivery

price

return

📌 Socket.IO does not work in Postman or Thunder Client — use a browser or a socket.io-client to test.

🛡️ Security
Helmet headers

Rate limiting (100 requests/min)

CORS enabled

For any queries, please contact:
Tamizharasan 
📧 tamizharasan2000k@gmail.com
📞 7904237706 

