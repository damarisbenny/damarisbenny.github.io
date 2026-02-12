# Academic Personal Website - Damaris Benny

A modern, responsive academic portfolio built with React, Vite, and TailwindCSS. Features automated publication updates from Google Scholar via GitHub Actions.

## Features

- **Profile**: Introduction, research focus on Toxicology and Microplastics.
- **Publications**: Automatically fetched from Google Scholar.
- **Responsive Design**: Works on desktop and mobile.
- **Zero Maintenance**: Publications update weekly via GitHub Actions.

## Setup

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- [Python](https://www.python.org/) (v3.10+)

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/damarisbenny/damarisbenny.git
    cd damarisbenny
    ```

2.  Install frontend dependencies:
    ```bash
    npm install
    ```

3.  Install Python dependencies (for publication fetching):
    ```bash
    pip install -r requirements.txt
    ```

## Development

To run the website locally:

```bash
npm run dev
```

Visit `http://localhost:5173` in your browser.

To fetch publications locally:

```bash
python scripts/fetch_scholar.py
```

This updates `public/publications.json`.

## Deployment

The website is configured to deploy to **GitHub Pages**.

1.  Go to your GitHub repository settings.
2.  Navigate to **Pages**.
3.  Under **Source**, select **GitHub Actions**.
4.  Push your changes to the `main` branch.

The included workflow `.github/workflows/update-publications.yml` will:
1.  Run weekly (Sundays).
2.  Fetch new publications.
3.  Commit changes to the repo.

You can also trigger a manual deployment by pushing to `main` (if you set up a separate deployment workflow) or simply by letting the publication updater run.

**Note:** Ensure `Content: Read and Write` permissions are enabled for workflows in Repository Settings > Actions > General > Workflow permissions.
