# Assignment-Submission-Portal
This portal allows students to submit assignments for review, and admins can approve or reject them accordingly.

## Fetures

- **User Authentication** : Secure authentication using JWT(JSON WEB TOKEN) for both User and Admin.
- **Assignment Submission** : Students can submit assignments.
- **Assignment Review** : Admin can review assignments tagged to Admin.
- **Approval/Rejection** : Admin can approve and reject assignment.

## Technology Used

- **Backend** :
  - Node.js with Express (for API development)
- **Database** :
  - MongoDB
- **Authentication** :
  - JWT (JSON Web Tokens) for secure authentication,
- **Other Tools** :
  - Postman (for API testing)
  - Git/GitHub (for version control)

## How to Run the Project Locally

### Prerequisites:
1. Node.js and npm (or yarn) installed for backend development.
2. MongoDB installed (or use cloud databases).
3. A text editor like VSCode or any other IDE.
4. Git installed to clone the repository.

### Steps to Run:
1. **Clone the repository**:
   ```bash
   git clone https://github.com/IamProgrammer24/Assignment-Submission-Portal.git
   cd Assignment-Submission-Portal
   ```
2. **Install dependenices for : Backend**:
   ```bash
   npm install
   ```
3. **Set up environment variables (e.g., database credentials, JWT secrets): Create a .env file in the root directory with the necessary variables, such as**:
```bash
Mongo_URI=mongodb_URL
JWT_SECRET=your_jwt_secret
```
4. **Run the application: For backend**:
```bash
npm run dev
```
5. **Access the application**:
   ```bash
   Open your browser and navigate to http://localhost:3000 (or your custom port) to view the assignment submission portal
   ```
## API Reference

#### User Endpoints

* **POST /api/v1/user/register** : Register a new User account.
* **POST /api/v1/user/login**: Log in to an existing User accound.
* **POST /api/v1/user/upload**: Upload a assignment.
* **GET /api/v1/user/admins**: Fetch all admins details.

### Admin Endpoints

* **POST /api/v1/admin/registraion** : Register a new Admin account.
* **POST /api/v1/admin/login** : Log in to an existing Admin account.
* **GET /api/v1/admin/assignments** : Fetch assignments tagged to the Admin.
* **POST /api/v1/admin/assignments/{id}/accept** : Accept the tagged assignment.
* **POST /api/v1/admin/assignments/{id}/reject** : Reject the tagged assignment.


## Contributing

We welcome contributions to improve this project! Please feel free to fork the repository, make changes, and submit pull requests. If you have any suggestions or found a bug, please open an issue.

```css
This `README.md` provides a complete overview of the Job Portal application, including its purpose, key features, how to run and test the project, details about the APIs, and future 
```
   ---
