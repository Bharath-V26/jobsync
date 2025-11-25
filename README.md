# JobSync - Job Aggregation Platform

JobSync is a modern, "Metallic Chic" job aggregation platform designed to streamline the job search process. It aggregates listings, provides auto-fill tools for applications, and tracks your progress in a unified dashboard.

## 🚀 Features

-   **Job Aggregation:** Centralized feed of job postings from various sources (Adzuna integration included).
-   **Unified Profile:** Single source of truth for your professional data (Resume, Bio, Experience).
-   **Auto-fill Bookmarklet:** A browser tool to auto-fill external job applications with one click.
-   **Application Tracker:** Kanban board to manage your job search pipeline (Applied, Interviewing, Offer).
-   **Social Feed:** Connect with other job seekers, share opportunities, and like posts.
-   **Metallic Chic Design:** A premium, modern UI with glassmorphism, gradients, and dark mode support.

## 🛠️ Tech Stack

-   **Framework:** Next.js 15 (App Router)
-   **Language:** TypeScript
-   **Styling:** Tailwind CSS v4
-   **Icons:** Lucide React
-   **State Management:** React Context (Auth, Profile, Feed, Saved Jobs)
-   **Persistence:** LocalStorage (for prototype data persistence)

## 🏁 Getting Started

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/yourusername/jobsync.git
    cd jobsync
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```

4.  **Open the app:**
    Visit [http://localhost:3000](http://localhost:3000) in your browser.

## 📖 How to Use

1.  **Sign Up:** Create an account (mock authentication).
2.  **Build Profile:** Go to `/profile` and fill in your details. This data drives the auto-fill tools.
3.  **Explore Jobs:** Browse the dashboard for opportunities.
4.  **Use Tools:** Go to `/dashboard/tools`, drag the **JobSync Auto-fill** button to your bookmarks bar.
5.  **Apply:** Click the bookmarklet on any job site to fill forms instantly.
6.  **Track:** Move jobs to your "Tracker" board as you progress.

## 🎨 Design System

The "Metallic Chic" theme is defined in `app/globals.css`. It uses CSS variables for:
-   `--metallic-gradient`: A silver/gunmetal linear gradient.
-   `--glass-bg`: Semi-transparent backgrounds for glassmorphism.
-   `--neon-accent`: Subtle lighting effects.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.
