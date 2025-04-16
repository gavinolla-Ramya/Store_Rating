Store Rating

A full-stack web application that enables users to rate and review stores. This project comprises a Node.js backend and a frontend interface, facilitating CRUD operations for store ratings.
Features
Authentication & Role-Based Access
Secure Login & Registration:
Users can register and log in securely using their credentials. Passwords are encrypted using hashing techniques (like bcrypt).

Role-Based Access Control:
There are three user roles:

Admin: Can manage all stores, assign store owners, and view all data.

Store Owner: Can view and manage ratings for their own stores.

Normal User: Can view stores and submit ratings and reviews.
Store Management
Add New Stores (Admin Only):
Admin can add stores and assign ownership to specific store owners.

Update & Delete Stores (Admin Only):
Modify or remove store details as required.

View Store List:
All users can browse the list of available stores.

Search Stores:
Users can search stores by name or address using the search functionality.
Rating & Review System
Submit Ratings (Users):
Logged-in users can rate stores and optionally leave a review.

View Store Ratings:

Users can view the average rating and all reviews for a store.

Store Owners can view all ratings for their own stores in their dashboard.

Dashboards
Admin Dashboard:

View all stores.

Manage users and store owners.

Access statistics (optional future feature).

Store Owner Dashboard:

View all ratings submitted to their stores.

Gain insights into customer feedback.

User Dashboard:

See personal reviews.

Update or delete their ratings.

Other Features
Form Validations:

Name (20–60 characters)

Address (max 400 characters)

Password (8–16 characters, must include one uppercase and one special character)

Valid email format

Frontend UI:

Clean and responsive layout using HTML, CSS, and JavaScript.

ReactJS-based components for dynamic UI interaction.

Backend API:

RESTful APIs for managing users, stores, and ratings.

Token-based authentication using JWT.
