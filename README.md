This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

 
# 📚 School SaaS Platform (LMS + AI Analytics)

> A production-ready, AI-powered, multi-tenant School Management System supporting elementary (Grades 1–8) and high school (Grades 9–12) institutions.

![Node.js](https://img.shields.io/badge/Node.js-20+-339933?logo=node.js\&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5+-3178C6?logo=typescript\&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-4169E1?logo=postgresql\&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-ML-009688?logo=fastapi\&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-blue)

---

# 🚀 Overview

The **School SaaS Platform** is a scalable, AI-powered Learning Management System (LMS) designed for educational institutions. It combines modern web technologies with machine learning to provide intelligent academic management, analytics, and predictive insights.

The platform consists of:

* 🌐 **Web Application** — Next.js
* 📱 **Mobile Application** — Expo React Native
* ⚙️ **Backend API** — Node.js, Express, Prisma
* 🤖 **Machine Learning Service** — FastAPI + Scikit-learn
* 🗄️ **Database & Infrastructure** — PostgreSQL, Redis, BullMQ

---

# 🏗️ System Architecture

```text
                 ┌──────────────┐
                 │  Web (Next)  │
                 └──────┬───────┘
                        │
                 ┌──────▼───────┐
                 │ Mobile (Expo)│
                 └──────┬───────┘
                        │
                ┌───────▼────────┐
                │ API Gateway     │
                │ Node.js/Express │
                └───────┬────────┘
                        │
        ┌───────────────┼────────────────┐
        │               │                │
 ┌──────▼──────┐ ┌──────▼──────┐ ┌──────▼──────┐
 │ PostgreSQL  │ │ Redis Cache │ │ BullMQ Jobs │
 └──────┬──────┘ └──────┬──────┘ └──────┬──────┘
        │               │                │
        └───────────────┼────────────────┘
                        │
                ┌───────▼────────┐
                │ ML Service      │
                │ FastAPI + RF    │
                └─────────────────┘
```

---

# ✨ Features

## 🏫 Multi-Tenant SaaS

* Fully isolated school tenants
* School onboarding
* Subscription-ready architecture
* Role-Based Access Control (RBAC)

---

## 👥 User Management

Supported roles:

* Super Admin
* School Admin
* Teacher
* Student
* Parent

---

## 🎓 Academic Management

* Student Management
* Teacher Management
* Class Management
* Subject Management
* Enrollment System
* Attendance Tracking
* Assignment Management
* Submission System
* Gradebook

---

## 📊 Analytics & AI

* Student performance analytics
* Attendance trend analysis
* Dropout prediction
* Failure risk prediction
* AI-powered recommendations
* ML-based insights

---

## 💬 Communication

* Thread-based messaging
* School announcements
* Email notifications
* Event-driven communication

---

## ⚡ Production Features

* Redis caching
* BullMQ background jobs
* File uploads
* Rate limiting
* Centralized logging
* Modular architecture

---

# 🏛 Backend Architecture

## Architecture Pattern

```text
Controller
      │
      ▼
Service Layer
      │
      ▼
Repository Layer
      │
      ▼
Database
```

---

## Project Structure

```text
src/
└── modules/
    ├── auth/
    ├── schools/
    ├── users/
    ├── students/
    ├── teachers/
    ├── classes/
    ├── enrollment/
    ├── attendance/
    ├── assignments/
    ├── submissions/
    ├── gradebook/
    ├── messaging/
    ├── analytics/
    ├── dashboard/
    ├── ml/
    └── predictions/
```

---

# 🤖 Machine Learning

## Purpose

The ML service predicts students who may require academic intervention.

### Prediction Features

* Attendance rate
* Average grade
* Assignment submission rate
* Late submission count

---

## ML Pipeline

```text
PostgreSQL
      │
      ▼
Analytics Layer
      │
      ▼
ML Gateway
      │
      ▼
FastAPI
      │
      ▼
Prediction
      │
      ▼
Database Storage
```

---

## Example Prediction

```json
{
  "studentId": "abc123",
  "riskLevel": 2,
  "confidence": 0.87,
  "attendanceRate": 0.62,
  "avgGrade": 58.4
}
```

---

# 🛠 Tech Stack

| Layer                | Technologies                            |
| -------------------- | --------------------------------------- |
| **Backend**          | Node.js, Express.js, Prisma ORM         |
| **Database**         | PostgreSQL                              |
| **Caching**          | Redis                                   |
| **Queue**            | BullMQ                                  |
| **Frontend**         | Next.js (App Router), React, TypeScript |
| **Styling**          | Tailwind CSS                            |
| **State Management** | Zustand                                 |
| **Data Fetching**    | React Query                             |
| **Mobile**           | Expo React Native                       |
| **Machine Learning** | FastAPI, Python, Scikit-learn, Joblib   |

---

# 🔐 Security

* JWT Authentication
* Role-Based Access Control (RBAC)
* Multi-tenant isolation (`schoolId`)
* Rate limiting
* Input validation
* Secure password hashing
* Environment-based configuration

---

# ⚡ Performance Strategy

* Redis caching
* Background ML inference
* Lazy dashboard aggregation
* Optimized PostgreSQL indexes
* Read/compute separation
* Queue-based processing

---

# 📦 Background Jobs

Handled with **BullMQ**

* ML prediction processing
* Email notifications
* Analytics batch computation

---

# 📁 File Uploads

Supported uploads:

```text
/uploads/
├── assignments/
└── submissions/
```

---

# 🌐 API

## Base URL

```http
/api/v1
```

### Authentication

```http
POST /api/v1/auth/login
```

### Students

```http
GET  /api/v1/students
POST /api/v1/students
```

### Attendance

```http
POST /api/v1/attendance/mark
```

### Assignments

```http
POST /api/v1/assignments
```

### Predictions

```http
GET /api/v1/predictions/student/:id
```

### Dashboard

```http
GET /api/v1/dashboard/overview
```

---

# 🚀 Deployment

## Environment Variables

```env
DATABASE_URL=
JWT_SECRET=
REDIS_HOST=
ML_SERVICE_URL=
SMTP_HOST=
```

---

## Services

| Service    | Technology        |
| ---------- | ----------------- |
| API        | Node.js + Express |
| ML Service | FastAPI           |
| Database   | PostgreSQL        |
| Cache      | Redis             |
| Queue      | BullMQ Worker     |

---

# 📈 Project Status

| Module                    | Status |
| ------------------------- | ------ |
| Authentication            | ✅      |
| School Management         | ✅      |
| LMS Features              | ✅      |
| Messaging                 | ✅      |
| Analytics                 | ✅      |
| AI & Machine Learning     | ✅      |
| Production Infrastructure | ✅      |

---

# 🔮 Future Enhancements

* 🔄 Real-time attendance (WebSockets)
* 📲 Push notifications
* 🤖 AI-powered auto grading
* 📅 Smart timetable optimization
* 👨‍👩‍👧 Parent portal enhancements
* 📡 Offline mobile support

---

# 🏗 Project Philosophy

* Feature-first architecture
* Domain-driven design
* Modular backend
* API-first development
* AI as an isolated microservice
* Scalable multi-tenant SaaS architecture

---

# 📌 Summary

The **School SaaS Platform** is a modern, enterprise-grade educational management system that combines:

* 📚 Complete LMS functionality
* 🤖 AI-powered predictive analytics
* 📊 Real-time dashboards
* 🏫 Multi-tenant architecture
* 🌐 Web & Mobile applications
* ⚡ Scalable backend infrastructure

Built to support educational institutions with intelligent automation, data-driven decision-making, and a scalable cloud-native architecture. 