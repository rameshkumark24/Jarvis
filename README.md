# Jarvis - AI Voice Assistant 🤖

A modern, voice-activated AI assistant built with React, TypeScript, and the Google Gemini API. Jarvis features real-time speech recognition, text-to-speech synthesis, and a futuristic UI with voice visualization.

## ✨ Features

* **🎙️ Voice Interaction:** Speak to Jarvis using your microphone with real-time speech-to-text.
* **🗣️ Natural Responses:** Jarvis speaks back to you using browser-native text-to-speech.
* **🧠 Powered by Gemini:** Utilizes Google's Gemini 2.0 Flash model for fast, intelligent responses.
* **🔊 Visual Feedback:** Includes a dynamic voice visualizer that reacts when the system is listening.
* **🔇 Mute Control:** Toggle voice output on/off with a dedicated mute button.
* **⚡ Fast & Modern:** Built with Vite and Tailwind CSS for high performance and sleek design.

## 🛠️ Tech Stack

* **Frontend:** React 19, TypeScript, Vite
* **Styling:** Tailwind CSS, Lucide React (Icons)
* **AI Model:** Google Gemini API (`gemini-2.0-flash`)
* **Speech:** Web Speech API (SpeechRecognition & SpeechSynthesis)

## 🚀 Getting Started

### Prerequisites

* Node.js (v18 or higher)
* A Google Gemini API Key (Get one [here](https://aistudio.google.com/))

### Installation

1.  **Clone the repository**
    ```bash
    git clone [https://github.com/your-username/jarvis.git](https://github.com/your-username/jarvis.git)
    cd jarvis
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Set up Environment Variables**
    * Create a `.env` file in the root directory.
    * Add your API key:
        ```env
        VITE_GEMINI_API_KEY=your_actual_api_key_here
        ```

4.  **Run the development server**
    ```bash
    npm run dev
    ```

## 🌍 Deployment

You can deploy this project easily on Vercel or Netlify.

**Important:** When deploying, make sure to add your `VITE_GEMINI_API_KEY` in the deployment platform's **Environment Variables** settings. Do not commit your `.env` file to GitHub.

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

---

*Built with ❤️ by Rameshkumar kannan*
