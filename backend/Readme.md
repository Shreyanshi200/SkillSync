# 🚀 SkillSync – Smart Skill-Based Project Recommendation Platform

SkillSync is a full-stack web application that connects users with projects based on their skillsets. Built for job-seekers, learners, and professionals, it allows users to manage skills, get recommended projects, and track skill-project fit.



## 🛠 Tech Stack

| Layer        | Technology                         |
|--------------|------------------------------------|
| Backend      | Spring Boot 3.1, Java 21, JWT Auth |
| Frontend     | Next.js, Tailwind CSS              |
| Database     | MySQL                              |
| Deployment   | (To be added)                      |

---

## ✨ Features

- 🔐 JWT Authentication (Register/Login)
- 👤 Role-based access (Admin / User)
- 🧠 Intelligent project recommendation based on skills
- 💼 Admin-managed project listings with required skills
- 📊 Match percentage shown for project relevance
- 🔍 Filter & search functionality (planned)
- 📈 Designed with system design best practices

---



### 📦 Backend (Spring Boot)

```bash
# Navigate to backend folder
cd backend

# Configure application.properties
spring.datasource.url=jdbc:mysql://localhost:3306/skillsync
spring.datasource.username=root
spring.datasource.password=your_password

# Run the app
./gradlew bootRun


## ✨ Folder Structure
skillsync-backend/
├── controller/
├── dto/
├── entity/
├── repository/
├── security/
├── service/
└── SkillsyncApplication.java
