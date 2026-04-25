# 🌿 KeshCare  AI-Based Hair Care Recommendation System

> **“Your Hair, Understood by AI”**

KeshCare is an AI-powered web application that provides **personalized hair care routines** using natural and Ayurvedic solutions. It analyzes user inputs such as hair type, scalp condition, and lifestyle to generate **custom treatment plans**.

---

## 🚀 Features

- 🧠 AI-Powered Recommendations (Google Gemini)
- 🧾 4-Step Hair Assessment Form
- 🔁 Fallback Engine (Works without AI)
- 📅 Weekly Hair Care Routine
- 📊 History Tracking (last 10 results)
- 🔐 Optional Firebase Authentication
- 📤 Share & Print (PDF support)
- ⭐ Feedback System

---

## 🛠 Tech Stack

| Category | Technology |
|----------|-----------|
| Frontend | React + Vite |
| Styling | Tailwind CSS |
| State Management | Zustand |
| Forms | React Hook Form + Zod |
| AI | Google Gemini API |
| Backend (Optional) | Firebase |

---

## 🏗 Architecture


User Input → React UI → Zustand Store → AI Engine
↓
Gemini API OR Fallback Logic
↓
Personalized Results


---

## 🧠 Core Logic

### Dual Engine System

- Primary Engine: Google Gemini AI  
- Fallback Engine: Rule-based system  

### Example Logic

| Problem | Solution |
|--------|---------|
| Hair Fall | Bhringraj Oil |
| Dandruff | Neem Mask |
| Dryness | Aloe Vera Mask |
| Oiliness | Apple Cider Vinegar Rinse |

---

## 📂 Project Structure


AI_Based_HairCare_Recommendation_System/
├── index.html
├── vite.config.js
├── tailwind.config.js
├── package.json
└── src/
├── components/
├── pages/
├── hooks/
├── services/
├── store/
├── utils/
├── constants/


---

## ⚙️ Installation & Setup

### 1. Clone Repository


git clone https://github.com/your-username/keshcare.git

cd keshcare


### 2. Install Dependencies


npm install


### 3. Setup Environment Variables

Create a `.env` file:


VITE_GEMINI_API_KEY=your_api_key_here

Optional Firebase

VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=


---

## ▶️ Run the Project


npm run dev


App runs at:
http://localhost:5173

---

## 🧪 Build for Production


npm run build


---

## 📌 Routes

| Route | Description |
|------|------------|
| `/` | Landing Page |
| `/assess` | Hair Assessment |
| `/results` | Results Page |
| `/profile` | User Profile |
| `/about` | About Page |

---

## 🔐 Firebase (Optional)

- Authentication (Login/Signup)  
- Firestore Database  
- Analytics Tracking  

---

## 📊 Data Flow


User Form Input
↓
Validation (Zod)
↓
State Stored (Zustand)
↓
AI Engine (Gemini / Fallback)
↓
Results Display


---

## 🎯 Key Strengths

- Works without backend  
- AI + fallback = high reliability  
- Clean UI/UX  
- Real-world problem solving  
- Scalable architecture  

---

## ⚠️ Limitations

- Depends on Gemini API for best results  
- Not medically certified  
- Fallback logic is rule-based (not ML)  

---

## 📈 Future Improvements

- AI-based hair image analysis  
- Mobile app (React Native)  
- Expert consultation system  
- Subscription model  
- Notifications & reminders  

---

## 🤝 Contributing

1. Fork the repository  
2. Clone your fork  
3. Create a new branch  
4. Make changes  
5. Commit and push  
6. Create Pull Request  

---

## 📜 License

MIT License  

---

## 👨‍💻 Author

**Siddharth Parihar**  
Web Developer | AI Builder  

---

## 💡 Final Note

KeshCare combines:

- AI  
- Ayurveda  
- Personalization  

to create a smart, practical, and user-friendly hair care solution.

🚀 With further improvements, this can evolve into a full startup product.
