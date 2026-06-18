# 🗄️ DBMS Learning Hub

> **Interactive Educational Platform for Database Management Systems**

A production-ready, modern Next.js 15 web application that converts traditional DBMS notes into a rich, interactive learning experience for Computer Science students.

---

## 🌟 Features

| Feature | Description |
|---|---|
| 📚 **Interactive Topic** | Module 1 · Topic 1 with 13 collapsible sections |
| 🎮 **DBMS Playground** | Full CRUD simulator — Insert, Update, Delete, Search, Sort, Export/Import |
| 🧩 **Quiz Center** | 15 MCQs with instant feedback, explanations, scoring, and confetti |
| 🎤 **Viva Corner** | Random viva generator with category filter and flip-to-reveal answers |
| 🚀 **Revision Cards** | 10 swipeable one-minute revision cards |
| 📈 **Progress Tracker** | Dashboard with achievements, badges, quiz history |
| 🔍 **Global Search** | Fuse.js powered fuzzy search across all content |
| 🌙 **Dark/Light Mode** | Animated theme toggle with localStorage persistence |
| 📱 **Fully Responsive** | Mobile drawer, tablet, desktop permanent sidebar |

---

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **UI**: React 19 + TypeScript
- **Component Library**: Material UI v7 (MUI)
- **Animations**: Framer Motion
- **State Management**: Zustand (with localStorage persistence)
- **Search**: Fuse.js (fuzzy search)
- **Confetti**: canvas-confetti

---

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open in browser
http://localhost:3000
```

---

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx            # Landing / Dashboard
│   ├── module1/topic1/     # Topic 1: Introduction to DBMS
│   ├── playground/         # DBMS Simulator
│   ├── quiz/               # Quiz Center
│   ├── viva/               # Viva Corner
│   ├── revision/           # Revision Cards
│   ├── progress/           # Progress Dashboard
│   └── about/              # About page
├── components/
│   ├── layout/             # AppShell, Sidebar, TopBar
│   ├── topic1/             # 8 interactive topic components
│   ├── playground/         # DbmsSimulator
│   └── quiz/               # QuizEngine
├── data/                   # Quiz, Viva, Revision, Search data
├── store/                  # Zustand stores (progress, playground)
├── theme/                  # MUI theme (light/dark)
└── types/                  # TypeScript interfaces
```

---

## 🌐 Deploy to Vercel

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com) → Import Project
3. Select your repository
4. Click **Deploy** — Vercel auto-detects Next.js!

```bash
# Or deploy via CLI
npx vercel --prod
```

---

## 📖 Content Coverage

- **Module 1 · Topic 1**: Introduction to DBMS
- 13+ interactive sections with visualizations
- 15 MCQ questions with explanations
- 15 Viva questions with detailed answers
- 10 Revision cards

---

## 🎨 Design

- Material Design 3 color system
- Glassmorphism cards
- Smooth Framer Motion animations
- Inter typeface (Google Fonts)
- Responsive grid layouts

---

*Built with ❤️ for DBMS students*
