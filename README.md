# Panda Hanzi - 熊猫识字

A fun, gamified Chinese character learning platform for children, featuring AI-generated stories.

## Project Setup

This project is built with React, TypeScript, and Vite.

### Prerequisites

- Node.js (v18 or later recommended)
- npm or yarn

### Installation

1.  Download the project files.
2.  Install dependencies:
    ```bash
    npm install
    ```

### Local Development

1.  Create a `.env` file in the root directory to store your API key:
    ```
    API_KEY=your_google_gemini_api_key
    ```
2.  Start the development server:
    ```bash
    npm run dev
    ```
    The app will be available at `http://localhost:5173`.

## Deploying to Cloudflare Pages

Cloudflare Pages is the recommended hosting platform for this application.

### Method 1: Git Integration (Recommended)

1.  **Push to Git:** Push your code to a GitHub or GitLab repository.
2.  **Create Project:**
    -   Log in to the [Cloudflare Dashboard](https://dash.cloudflare.com/).
    -   Navigate to **Workers & Pages** > **Create Application** > **Pages** > **Connect to Git**.
    -   Select your repository.
3.  **Build Settings:**
    -   **Framework Preset:** Vite
    -   **Build command:** `npm run build`
    -   **Build output directory:** `dist`
4.  **Environment Variables:**
    -   In the setup step, add an environment variable:
        -   **Variable name:** `API_KEY`
        -   **Value:** Your Google Gemini API Key.
5.  **Deploy:** Click **Save and Deploy**.

### Method 2: Direct Upload

1.  **Build Locally:**
    -   Ensure you have your `.env` file setup with your API Key.
    -   Run the build command:
        ```bash
        npm run build
        ```
    -   This will create a `dist` folder.
2.  **Upload to Cloudflare:**
    -   Go to Cloudflare Dashboard > **Workers & Pages** > **Create Application** > **Pages** > **Upload Assets**.
    -   Upload the `dist` folder.

## Important Security Note

This application calls the Google Gemini API directly from the client-side browser.
To prevent unauthorized usage of your quota:
1.  Go to [Google AI Studio](https://aistudio.google.com/) or Google Cloud Console.
2.  Edit your API Key restrictions.
3.  Set **Application restrictions** to **HTTP referrers (web sites)**.
4.  Add your Cloudflare Pages domain (e.g., `https://panda-hanzi.pages.dev/*`) and your local development URL (e.g., `http://localhost:5173/*`).
