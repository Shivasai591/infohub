# 🌐 InfoHub

InfoHub is a full-stack single-page web application.  
It brings together **three practical utilities** into one simple, responsive app:

- 🌦️ **Weather Information**  
- 💱 **Currency Conversion (INR → USD / EUR)**  
- 💬 **Motivational Quote Generator**

---

## 🚀 Features

### 1. Weather Information
- Search any city and instantly get:
  - Temperature (°C)
  - Wind Speed (km/h)

### 2. Currency Conversion
- Convert INR to **USD** or **EUR**
- Real-time exchange rates.
- Error handling for invalid or missing inputs.

### 3. Motivational Quotes
- Fetches a random motivational quote on each click.
- Served through a **custom serverless API route** (no external dependency).

---

## 🧩 Tech Stack

| Layer | Technology |
|-------|-------------|
| **Frontend** | React + Next.js 15 (App Router) |
| **Styling** | Tailwind CSS |
| **Backend** | Node.js + Express-like API routes (Next.js serverless) |
| **APIs Used** | Open-Meteo, open.er-api.com |
| **Deployment** | Vercel |

---

## 📁 Project Structure

src/
├─ app/
│ ├─ api/
│ │ ├─ weather/route.ts → Weather API
│ │ ├─ convert/route.ts → Currency API
│ │ └─ quote/route.ts → Quote API
│ ├─ globals.css → Tailwind styles
│ ├─ layout.tsx → App layout
│ └─ page.tsx → Main frontend (Weather, Convert, Quote)
└─ lib/
└─ ui.tsx → Shared UI components

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository
```bash
git clone https://github.com/Shivasai591/infohub.git
cd infohub

##🧠 How It Works

Next.js App Router handles all routing.

Each module (Weather, Convert, Quotes) calls its respective serverless API using fetch().

The backend APIs call external public endpoints, process JSON, and return simplified data.

Tailwind CSS gives responsive and minimal UI styling.
