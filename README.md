Visit here [Mai-Bood](https://maibood.onrender.com/home)

# Mai-Bood: Community Food Sharing Platform

Mai-Bood is a web application that enables users to share and manage food items within their community, helping reduce food waste and build local connections.

## Features

- **User Authentication**
  - Secure login and registration system
  - Profile management with customizable user information
  - Profile picture upload with AWS S3 integration

- **Food Management**
  - Personal virtual fridge to track food items
  - Add, edit, and remove food items
  - Track expiration dates and food conditions

- **Community Features**
  - Share food items with the community
  - Browse available food items from other users
  - Filter and search food items
  - Community food sharing section

- **Location Services**
  - Address input and validation
  - Location-based food item discovery
  - Zip code-based community matching

## Tech Stack

- **Frontend**
  - React.js
  - React Router for navigation
  - TanStack Query for data fetching
  - Tailwind CSS for styling

- **Backend**
  - Node.js
  - Express.js
  - MySQL database
  - JWT authentication

- **Cloud Services**
  - AWS S3 for image storage
  - AWS Region configuration for CDN

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MySQL (v8.0 or higher)
- AWS account with S3 bucket configured


### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/mai-bood.git
cd mai-bood
```

2. Install dependencies
```bash
# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install
```

3. Set up environment variables
```bash
# In server directory, create .env file
MYSQL_HOST=your_mysql_host
MYSQL_USER=your_mysql_user
MYSQL_PASSWORD=your_mysql_password
MYSQL_DATABASE=your_database_name
JWT_SECRET=your_jwt_secret
S3_BUCKET_NAME=your_s3_bucket_name
AWS_REGION=your_aws_region
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key

# In client directory, create .env file
VITE_BASE_URL=your_api_base_url
```

4. Initialize the database
```bash
# Run the database schema and initial data
mysql -u your_user -p your_database < server/database/schema.sql
```

5. Start the application
```bash
# Start backend server
cd server
npm start

# Start frontend development server
cd ../client
npm run dev
```



## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

