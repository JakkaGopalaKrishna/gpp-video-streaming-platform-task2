# 🎬 Video Streaming Platform (Frontend)

A **production-grade frontend video streaming platform** built using **Next.js (App Router)** with a **custom HLS video player**, global state management, accessibility compliance, performance optimizations, and full testing setup.

This project was developed as part of **GPP – Task 2** and follows real-world frontend engineering standards.

---

## 🚀 Features

### 🎥 Custom Video Player
- Built using native HTML5 `<video>` (no third-party player UI)
- HLS adaptive streaming using **hls.js**
- Play / Pause
- Seek bar with time display
- Volume & mute controls
- Playback speed control
- Fullscreen mode
- Picture-in-Picture (PiP)
- Manual quality selector (static / optional)

### 📂 Video Library
- Grid & List view toggle
- Lazy-loaded thumbnails
- Video details page with routing

### 📌 Playlists & Continue Watching
- Create and manage playlists
- Add / remove videos from playlists
- Resume video playback from last watched position
- Data persisted using `localStorage`

### 🌍 Global State Management
- Centralized player state using **Zustand**
- Clean separation of UI and logic

### ♿ Accessibility (WCAG Basics)
- Keyboard navigation support
- ARIA labels for controls
- Focus-visible styles
- Screen reader friendly

### ⚡ Performance Optimizations
- Dynamic imports (code splitting)
- Memoized components
- Optimized images using Next.js `<Image>`
- Video metadata-only preload

### 🧪 Testing
- Unit tests using **Jest + Testing Library**
- End-to-End tests using **Playwright**
- Clean separation of unit and E2E tests

---

## 🛠️ Tech Stack

- **Next.js (App Router)**
- **TypeScript**
- **React**
- **Zustand**
- **hls.js**
- **Jest**
- **Playwright**
- **HTML5 Video API**

---

## 📁 Project Structure

```
src/
 ├─ app/
 │   ├─ page.tsx
 │   └─ video/[id]/page.tsx
 ├─ components/
 │   ├─ VideoPlayer/
 │   ├─ PlayerControls/
 │   ├─ VideoLibrary/
 │   └─ Playlist/
 ├─ store/
 │   ├─ playerStore.ts
 │   └─ playlistStore.ts
 ├─ data/
 ├─ tests/          # Jest unit tests
tests/
 └─ e2e/            # Playwright E2E tests
```

---

## ⚙️ Setup & Installation

### 1️⃣ Clone the Repository
```bash
git clone <your-repo-url>
cd gpp-video-streaming-platform-task2
```

### 2️⃣ Install Dependencies
```bash
npm install
```

### 3️⃣ Run Development Server
```bash
npm run dev
```
Open: `http://localhost:3000`

---

## 🧪 Running Tests

### ▶ Unit Tests (Jest)
```bash
npm test
```

### ▶ End-to-End Tests (Playwright)

Start dev server:
```bash
npm run dev
```

In another terminal:
```bash
npm run test:e2e
```

---

## 🧠 Architectural Decisions

- **No backend**: Data simulated via localStorage as required
- **Client-only video player**: Avoids SSR issues with media APIs
- **Separation of concerns**:
  - Player logic → VideoPlayer
  - UI controls → PlayerControls
  - Global state → Zustand stores

---

## 🔒 Production Considerations (If Deployed)
- Use CDN for HLS segments
- Secure HLS streams with token-based access
- Add error monitoring (Sentry)
- Enable analytics for playback events
- Persist user data in a real backend

---

## 📌 Submission Checklist

- ✅ Custom HLS video player
- ✅ Accessibility support
- ✅ Performance optimizations
- ✅ Local storage persistence
- ✅ Unit & E2E tests
- ✅ Clean Git commit history
- ✅ Production-ready README

---

## 👨‍💻 Author

**J.G. Krishna**  
Frontend / Full Stack Developer  

---

## 📜 License

This project is created for educational and evaluation purposes.
