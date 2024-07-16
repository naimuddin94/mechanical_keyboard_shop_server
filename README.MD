# 🔗 Mechanical Keyboard Shop Backend

The backend of the Mechanical Keyboard Shop is designed to provide a robust and secure foundation for the ecommerce platform. Utilizing TypeScript, Express, and Mongoose, it ensures reliable performance, data integrity, and scalability. Additionally, Cloudinary is integrated for efficient media management. The backend follows the MVC (Model-View-Controller) pattern for organized and maintainable code structure.

[![Live Link](https://img.shields.io/badge/API-Live-brightgreen?style=for-the-badge)](https://mechanical-keyboard-shop-server-two.vercel.app/)

[![Live Link](https://img.shields.io/badge/Frontend-Live-brightgreen?style=for-the-badge)](https://keeb-keyboard.vercel.app/)


## Technologies Used

- **TypeScript**: Ensures type safety and improved code maintainability.
- **Express**: A minimal and flexible Node.js web application framework.
- **Mongoose**: Elegant MongoDB object modeling for Node.js.
- **Cloudinary**: Provides comprehensive media management and image optimization solutions.

## Features

### User Management
- **Authentication**: Secure user authentication using JWT.
- **Role-Based Access Control**: Implements role-based handling to differentiate between customers and administrators, ensuring appropriate access levels and security.

### Product Management
- **CRUD Operations**: Comprehensive Create, Read, Update, and Delete operations for product management.
- **Cloudinary Integration**: Efficiently handles image uploads and management.

### Order Management
- **Order Processing**: Manages the entire order lifecycle from creation to completion.
- **Payment Integration**: Integrates Stripe for secure payment processing.

### Review and Rating System
- **User Feedback**: Allows users to submit reviews and ratings, fostering community engagement and informed purchasing decisions.

### Security and Scalability
- **Data Protection**: Implements best practices for data protection and security.
- **Scalability**: Designed to handle increased traffic and expanding product catalog demands.

## Project Structure - MVC Pattern

```
Mechanical Keyboard Shop
├── src
│   ├── app
│   │   ├── modules
│   │   │   ├── controllers
│   │   │   ├── models
│   │   │   ├── services
│   │   │   ├── routes
│   │   └── app.ts
├── .env.example
├── package.json
└── tsconfig.json
```

### Controllers
Handles incoming requests and interacts with the service layer.

### Models
Defines the data schema and structure using Mongoose.

### Routes
Defines the application endpoints and associates them with controllers.

### Services
Contains the business logic and interacts with the data layer.

## Getting Started

### Prerequisites

- Node.js
- npm
- MongoDB

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/naimuddin94/mechanical_keyboard_shop_server.git
   ```

2. **Navigate to the project directory**

   ```bash
   cd mechanical_keyboard_shop_server
   ```

3. **Install dependencies**

   ```bash
   npm install
   ```

4. **Set environment variables**

   Create a `.env` file in the root directory following the `.env.example` file and fill in the required variables.

5. **Start the server**

   ```bash
   npm run dev
   ```

6. **Build the project**

   ```bash
   npm run build
   ```

## API Documentation

The API documentation is available through Postman. It provides detailed information on the available endpoints, request formats, and response structures.

[![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white)](https://documenter.getpostman.com/view/34122341/2sA3kRJ3gC)

## Database Diagram

![Diagram](https://res.cloudinary.com/dxoncladp/image/upload/v1721145024/Mechanical_Keyboard_Shop_f8e22f.png)

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Acknowledgements

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [Mongoose](https://mongoosejs.com/)
- [Cloudinary](https://cloudinary.com/)
- [Stripe](https://stripe.com/)

## Contact

If you have any questions or suggestions, feel free to reach out to me.

---

This backend project not only demonstrates my technical proficiency in web development, including TypeScript and Express, but also highlights my ability to create secure, scalable, and efficient backend solutions using the MVC pattern. It embodies my commitment to delivering high-quality, feature-rich applications that meet both user and business needs effectively.
