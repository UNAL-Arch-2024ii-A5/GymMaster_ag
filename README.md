# GymMaster_ag

GymMaster_ag is a **JavaScript-based API Gateway** built with **Express.js** and **GraphQL** to manage communication between microservices in the **GymMaster** ecosystem. It acts as a single entry point for clients, routing requests to the appropriate backend services using **Axios**.

## 🚀 Features

- API Gateway for **GymMaster** microservices
- Uses **GraphQL** for efficient data fetching
- Communicates with backend services via **Axios**
- Dockerized setup for easy deployment
- Supports local development with **npm**

## 🛠️ Technologies Used

- **JavaScript** (Node.js + Express.js)
- **GraphQL**
- **Axios**
- **Docker**
- **NGINX** (for proxying with GymMaster-Proxy_ag)

## 🏗️ Microservices Overview

| Microservice | Description | Technology | Visibility |
|-------------|-------------|------------|------------|
| **GYMMASTER_AUTH_MS** | Authentication microservice | JavaScript | Public |
| **machine_management_ms** | CRUD microservice for gym machines management | Java | Public |
| **progressTracking_ms** | Progress tracking microservice | Java | Public |
| **monitoring-ms** | Monitoring service | TypeScript | Private |
| **reporting-ms** | Reporting service | TypeScript | Private |
| **routineManagement_ms**| Managing exercises and routines | Gp | Public |
| **GymMaster-Proxy_ag** | NGINX proxy for front-end to internal infrastructure | Docker | Public |

## 🏗️ Deployment & Setup

### 🐳 Docker Setup

GymMaster microservices use a shared Docker network for inter-service communication, defined as follows:

```yaml
services:
  gymmaster_ag:
    container_name: gymmaster_ag
    build: .
    env_file:
      - .env.docker
    ports:
      - '4000:4000'
    networks:
      - shared_network

networks:
  shared_network:
    external: true
```

### 🏃 Running with Docker

1. Ensure Docker is installed and running.
2. Build and start the container:
   ```sh
   docker-compose up -d --build
   ```
3. The API Gateway will be available at `http://localhost:4000`.

### 🔧 Running without Docker

1. Install dependencies:
   ```sh
   npm install
   ```
2. Start the server:
   ```sh
   node index.js
   ```
3. The API Gateway will run on port `4000`.

## 📂 Project Structure

```
GymMaster_AG/
├── auth_ms/
│   ├── mutations/
│   ├── queries/
│   ├── typeDefs/
├── machine_management_ms/
│   ├── mutations/
│   ├── queries/
│   ├── typeDefs/
├── progressTracking_ms/
│   ├── mutations/
│   ├── queries/
│   ├── typeDefs/
├── monitoring-ms/
│   ├── mutations/
│   ├── queries/
│   ├── typeDefs/
├── reporting-ms/
│   ├── mutations/
│   ├── queries/
│   ├── typeDefs/
├── routineManagement_ms
│   ├── mutations/
│   ├── queries/
│   ├── typeDefs/
├── index.js
├── .env.docker
├── Dockerfile
├── package.json
└── README.md
```

## 🛡️ Security & Authentication
- API authentication is handled by **GYMMASTER_AUTH_MS**.
- Secure communication is recommended via **HTTPS**.
- Use environment variables for sensitive configuration.

## 📖 Contributing

Contributions are welcome! Feel free to submit a pull request or open an issue.

## 📜 License

This project is licensed under [MIT License](LICENSE).

---

🚀 **GymMaster_ag** simplifies microservices communication while ensuring scalability and maintainability for the GymMaster ecosystem!


