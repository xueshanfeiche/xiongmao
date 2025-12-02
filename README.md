# Panda Hanzi - 熊猫识字

A fun, gamified Chinese character learning platform for children.

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

1.  Start the development server:
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
4.  **Deploy:** Click **Save and Deploy**.

### Method 2: Direct Upload

1.  **Build Locally:**
    -   Run the build command:
        ```bash
        npm run build
        ```
    -   This will create a `dist` folder.
2.  **Upload to Cloudflare:**
    -   Go to Cloudflare Dashboard > **Workers & Pages** > **Create Application** > **Pages** > **Upload Assets**.
    -   Upload the `dist` folder.
