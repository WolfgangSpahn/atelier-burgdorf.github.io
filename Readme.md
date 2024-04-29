## Introduction

This sets up a quarto reveal.js presentation to be loaded under https://wolfgangspahn.github.io/atelier-burgdorf.github.io 


## Setup a quarto reveal js project

To get started with creating a Reveal.js presentation using Quarto from the setup you've described, follow these steps:

### 1. Organize Your Project Directory
Ensure your project directory `first/` is set up as described. It should contain:
- The `first.qmd` file with your presentation content and configuration.
- An `images/` directory containing the image `phbern.svg`.
- A `styles.css` file to customize the presentation's styling.

Your directory structure should look like this:
```
first/
│
├── first.qmd
├── images/
│   └── phbern.svg
└── styles.css
```

### 2. Write Your Presentation Content
In your `first.qmd` file, you've already configured some basic settings for Reveal.js such as enabling slide numbers, disabling the chalkboard buttons, and adding a footer. Continue to populate your presentation by adding more slides using markdown syntax under the initial slide (`## Hallo miteinander`). 

### 3. Convert Your Quarto Document to a Reveal.js Presentation
Open a command-line interface (CLI) and navigate to your project directory. Once you are in the `first/` directory, run the following command to render your Quarto document into a Reveal.js presentation:

```bash
quarto render first.qmd
```

### 4. View Your Presentation
After running the command, Quarto will generate the presentation and save it in a new directory named `_site`. You can open the resulting HTML file in any web browser to view your presentation.

### 5. Further Customization and Iteration
- If you need to make changes, adjust the content in your `.qmd` file and rerun the `quarto render first.qmd` command to update the presentation.
- You can modify `styles.css` to change the styling of your presentation, and these changes will be applied when you re-render the presentation.

### 6. Optional: Watching Changes
If you are making frequent changes and want to see updates in real-time, you can use the `quarto preview` command which automatically re-renders the presentation when it detects changes in the project files:

```bash
quarto preview first.qmd
```

This command will also open a live preview in your default web browser.

By following these steps, you should be able to create and customize your Reveal.js presentation using Quarto.

## Put it under git



## push it to github

To put your Quarto presentation under Git version control and host it on GitHub Pages, you'll need to follow a series of steps. Here's a detailed guide on how to do this:

### Step 1: Initialize a Git Repository
First, ensure you are in your project directory (in your case, the `first/` directory). Open your command-line interface and run:

```bash
cd path/to/your/first/
git init
```

This command initializes a new Git repository in your directory.

### Step 2: Create a .gitignore File
Before adding files to the repository, it's a good practice to create a `.gitignore` file to exclude files and directories that do not need to be tracked by Git (like temporary files or dependencies). For a Quarto project, you might want to ignore the `_site/` directory and any log files:

```plaintext
# .gitignore content
_site/
*.log
```

Create this `.gitignore` file in your `first/` directory.

### Step 3: Add and Commit Your Files
Add all relevant files to the repository and make your first commit:

```bash
git add .
git commit -m "Initial commit of Quarto presentation"
```

### Step 4: Create a GitHub Repository
Go to GitHub and create a new repository. You can name it something relevant, such as `first-presentation`.

### Step 5: Add GitHub Repository as a Remote
After creating the repository on GitHub, you will see instructions to push an existing repository from the command line. It will look something like this (replace `<username>` with your actual GitHub username):

```bash
git remote add origin https://github.com/<username>/first-presentation.git
git branch -M main
git push -u origin main
```

Run these commands in your CLI to connect your local repository to GitHub and push your changes.

### Step 6: Configure GitHub Pages
1. **Set up GitHub Pages to Serve Your Presentation:**
   - Go to your repository on GitHub.
   - Navigate to "Settings" > "Pages".
   - Under "Source", select the `main` branch and the folder `/docs` depending on where you want to generate your site files.
   - Click "Save".

2. **Render Your Quarto Document to the Docs Folder:**
   - If you chose `/docs` in the repository settings on GitHub, you need to render your Quarto document directly to the `docs/` directory:
   
     ```bash
     quarto render first.qmd --to html --output-dir docs
     ```
   
   - Commit the changes in the `docs/` directory:

     ```bash
     git add docs
     git commit -m "Add rendered presentation to docs/"
     git push
     ```

### Step 7: Check Your GitHub Pages URL
Once you have pushed your changes and set up GitHub Pages, your presentation should be available at `https://<username>.github.io/first-presentation/`, replacing `<username>` with your GitHub username.

By following these steps, your Quarto presentation will be under version control with Git, and hosted on GitHub Pages, allowing you to share and collaborate on your project easily.