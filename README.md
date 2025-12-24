# Christmas Countdown

## Features

- **Live Countdown Timer** - Real-time countdown to Christmas Day (Dec 25, 00:00) based on your timezone
- **Falling Snow Effect** - Canvas-based animated snowfall with realistic physics
- **Parallax Design** - Mouse-tracking parallax effects on decorative elements
- **Christmas Cards** - Create and share personalized Christmas greeting cards via unique links
- **Fully Responsive** - Optimized for all screen sizes from mobile to desktop
- **Festive Animations** - Animated Santa sleigh, twinkling stars, glowing moon, and interactive gifts

## Tech Stack

- React 19
- Vite
- Tailwind CSS v4
- Lucide React (icons)

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/adam-ctrlc/christmas-countdown-frontend-only.git

# Navigate to project directory
cd christmas-countdown-frontend-only

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` folder.

## Project Structure

```
src/
├── components/
│   ├── CountdownTimer.jsx    # Countdown logic and display
│   ├── GreetingModal.jsx     # Create Christmas card modal
│   ├── ReceivedCard.jsx      # Display received greeting card
│   ├── ParallaxElement.jsx   # Mouse-tracking parallax wrapper
│   ├── SnowEffect.jsx        # Canvas snow animation
│   └── index.js              # Component exports
├── App.jsx                   # Main application component
├── index.css                 # Global styles and Tailwind
└── main.jsx                  # Application entry point
```

## How Christmas Cards Work

1. Click "Send a Christmas Card" button
2. Enter your name (optional) and a personalized message
3. Click "Generate Magic Link" to create a unique URL
4. Share the link with friends and family
5. When they open the link, they'll see your personalized greeting card

The greeting data is encoded in the URL using Base64, so no backend is required.

## License

This project is open source and available under the [MIT License](LICENSE.md).

---

![MIT License](LICENSE.md)
