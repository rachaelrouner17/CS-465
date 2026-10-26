# Travlr Getaways Full Stack Application

## Overview

Travlr Getaways is a full stack travel application built for CS 465. The project includes a public customer-facing website and an Angular administrator single-page application (SPA). The Express server provides the web pages and RESTful API, MongoDB stores trip and user data, and JWT authentication protects administrative actions.

## Architecture

The customer-facing site uses Express routes, controllers, Handlebars views, and static assets to render travel information in the browser. The Angular SPA uses components, routes, services, and an HTTP interceptor to provide administrative trip management without requiring a full page reload after each action.

The backend uses MongoDB because trip data is document-oriented and can be represented naturally as JSON-like records. Mongoose supplies schemas, validation, and a consistent way for the Express controllers to query and update the database. This structure also makes it easier to add fields to trip documents as the application grows.

## Functionality

JSON is a data format, while JavaScript is a programming language. JSON carries structured values between the browser, Express API, and MongoDB, while JavaScript and TypeScript contain the logic that sends requests, processes responses, validates forms, and updates the interface.

During development, the original static travel pages were refactored into Handlebars templates that render data from the API. The administrator interface was then organized into reusable Angular components for login, trip listings, trip cards, and add/edit forms. Authentication was added with a registration and login controller, password hashing, JWT creation, an Angular authentication service, and a JWT interceptor. Reusable UI components reduce duplication, keep behavior consistent, and make future changes easier to maintain.

## Testing

The RESTful API was tested with browser requests, curl, and Postman. GET requests confirmed that trip records could be retrieved from MongoDB. Authenticated POST, PUT, and DELETE requests confirmed that administrators could create, update, and remove trip records. Negative tests confirmed that a protected request without an Authorization header returned HTTP 401 Unauthorized and that invalid or expired tokens were rejected.

The Angular SPA was tested by logging in, viewing the trip listing, adding a trip, editing an existing trip, saving the update, and confirming the changed data appeared after the listing refreshed. Logging out removed the administrative controls and returned the interface to its public state.

In an HTTP API, a method describes the requested action, an endpoint identifies the resource, and authentication determines whether the caller is authorized to perform that action. For example, GET retrieves data, POST creates data, PUT updates data, and DELETE removes data. The Bearer JWT is sent in the Authorization header for protected operations.

## Reflection

This course helped me connect front-end and back-end development into one working application. I practiced designing a MEAN stack architecture, building Express routes and controllers, modeling MongoDB data with Mongoose, creating an Angular SPA, and testing RESTful requests. I also learned how authentication changes the design of an application because login state must be shared between the interface and the API while protected operations must reject unauthorized requests.

The project strengthened my ability to troubleshoot across multiple layers. When an update did not appear in the interface, I had to determine whether the problem was in the form, the Angular service, the API request, the controller, or the database. These skills are useful for software development roles because they support clear debugging, maintainable code, API integration, and secure application design.

## Local Setup

1. Install Node.js, MongoDB, and the project dependencies with `npm install`.
2. Create a local `.env` file with a development `JWT_SECRET`. Do not commit this file.
3. Start the Express server from the project root with `npm start`.
4. Start the Angular administrator application from `app_admin` with `npm start` or `ng serve`.
5. Open `http://localhost:4200/` for the administrator SPA. The Express API runs on `http://localhost:3000/`.
