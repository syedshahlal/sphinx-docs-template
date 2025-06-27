# Complete Local Setup Guide for GRA Core Platform Documentation

Welcome! This guide provides all the steps necessary to set up, run, and develop for the GRA Core Platform documentation project on your local machine. The project is a hybrid system, combining a **Next.js frontend** for the main user interface and a **Sphinx (Python)** backend for generating static API documentation.

## 1. Prerequisites

Before you begin, ensure you have the following software installed on your system:

- **Git**: For cloning the repository.
- **Node.js**: Version 18.x or higher.
- **Python**: Version 3.8 or higher, along with `pip`.
- **Make**: A build automation tool. (Pre-installed on macOS/Linux. For Windows, it's available through [WSL](https://learn.microsoft.com/en-us/windows/wsl/install) or tools like [Chocolatey](https://chocolatey.org/packages/make)).

You can verify your installations by running:
\`\`\`bash
git --version
node --version
python --version
make --version
\`\`\`

---

## 2. Initial Setup

Follow these steps to get the project running.

### Step 2.1: Clone the Repository

First, clone the project repository from your source control system to your local machine.

\`\`\`bash
git clone <your-repository-url>
cd gra-core-docs
\`\`\`

### Step 2.2: Install Dependencies

This project has both Python and Node.js dependencies.

#### A) Install Python Dependencies (for Sphinx)

From the root directory of the project, run:

\`\`\`bash
pip install -r requirements.txt
\`\`\`
This installs Sphinx and all necessary extensions.

#### B) Install Node.js Dependencies (for Next.js Frontend)

Navigate to the `frontend` directory and install the required npm packages:

\`\`\`bash
cd frontend
npm install
cd .. 
\`\`\`
This installs React, Next.js, Tailwind CSS, and other frontend libraries.

---

## 3. Configure Environment Variables

The application, especially the "Create Doc" feature, requires GitHub credentials to function.

1.  Navigate to the `frontend` directory.
2.  Create a new file named `.env.local` by copying the example file:
    \`\`\`bash
    cp frontend/.env.local.example frontend/.env.local
    \`\`\`
    *(If `.env.local.example` doesn't exist, create `.env.local` manually).*

3.  Open `frontend/.env.local` and add the following variables:

    \`\`\`env
    # GitHub Personal Access Token (PAT) with 'repo' scope.
    # Generate one here: https://github.com/settings/tokens
    NEXT_PUBLIC_GITHUB_TOKEN=ghp_YourGitHubPersonalAccessToken

    # The owner of the GitHub repository (your username or organization)
    NEXT_PUBLIC_GITHUB_OWNER=your-github-owner

    # The name of the repository
    NEXT_PUBLIC_GITHUB_REPO=gra-core-docs

    # The default branch for creating pull requests (e.g., main, master)
    NEXT_PUBLIC_GITHUB_DEFAULT_BRANCH=main
    \`\`\`

**Important**: Never commit your `.env.local` file to version control. It is already included in the `.gitignore` file.

---

## 4. Running the Application in Development Mode

The project has two separate development servers that you can run simultaneously.

### A) Running the Next.js Frontend

This server handles the main UI, the markdown editor, and the overall user experience.

- **Command**:
  \`\`\`bash
  cd frontend
  npm run dev
  \`\`\`
- **Access URL**: [http://localhost:3000](http://localhost:3000)

You will see the main landing page here. The server supports hot-reloading for any changes made in the `frontend` directory.

### B) Running the Sphinx Documentation Server

This server is for previewing changes to the static documentation files (typically `.rst` files).

- **Command** (from the **root** directory):
  \`\`\`bash
  make livehtml
  \`\`\`
- **Access URL**: [http://localhost:8000](http://localhost:8000)

This command uses `sphinx-autobuild` to automatically rebuild the HTML documentation and reload your browser whenever you save a change to a `.rst` file inside the `docs/` directory.

---

## 5. Building for Production

To create a production-ready build of the entire application:

1.  **Build the Next.js Frontend**:
    \`\`\`bash
    cd frontend
    npm run build
    cd ..
    \`\`\`
    This generates an optimized, static export of the frontend application in `frontend/out`.

2.  **Build the Sphinx Documentation**:
    \`\`\`bash
    make html
    \`\`\`
    This generates the final HTML documentation in `docs/_build/html`.

---

## 6. Troubleshooting Common Issues

- **Port Already in Use / `EADDRINUSE`**:
  If you get an error that port 3000 or 8000 is already in use, it means another process is running on that port. You can either stop the other process or run the server on a different port.
  - To run the Next.js server on a different port: `npm run dev -- -p 3001`
  - To run the Sphinx server on a different port: `make livehtml PORT=8001`

- **Dependency Installation Fails**:
  - **Python**: Ensure you are using a compatible Python version and that `pip` is up to date (`pip install --upgrade pip`). Consider using a virtual environment (`python -m venv venv` and `source venv/bin/activate`).
  - **Node.js**: Delete the `node_modules` folder and the `package-lock.json` file in the `frontend` directory, then run `npm install` again.

- **`make` command not found**:
  Ensure the `make` utility is installed and available in your system's PATH. On Windows, using WSL is the most straightforward way to get a compatible environment.
