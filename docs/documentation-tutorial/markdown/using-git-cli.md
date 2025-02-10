---
id: using-git-cli
title: Using Git Command Line
sidebar_label: Git Command Line
sidebar_position: 2
---

# Using Git Command Line for Documentation

While GitHub Desktop provides a user-friendly interface, knowing Git command line interface (CLI) commands can give you more control and flexibility when managing documentation.

## Initial Setup

### 1. Configure Git

```bash
# Set your name and email
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Set default branch name
git config --global init.defaultBranch main
```

### 2. Clone Repository

```bash
# Using HTTPS
git clone https://github.com/your-org/your-repo.git

# Using SSH (requires SSH key setup)
git clone git@github.com:your-org/your-repo.git
```

## Basic Git Workflow

### 1. Checking Status

```bash
# View status of working directory
git status

# View commit history
git log

# View compact commit history
git log --oneline
```

### 2. Making Changes

```bash
# Stage specific files
git add filename.md

# Stage all changes
git add .

# Stage changes interactively
git add -p

# Remove staged changes
git restore --staged filename.md
```

### 3. Committing Changes

```bash
# Commit with inline message
git commit -m "Add documentation for feature X"

# Commit with detailed message in editor
git commit

# Amend last commit
git commit --amend
```

### 4. Syncing Changes

```bash
# Get latest changes without merging
git fetch

# Get and merge latest changes
git pull

# Push changes to remote
git push origin main

# Push new branch
git push -u origin feature-branch
```

## Branch Management

### 1. Working with Branches

```bash
# List branches
git branch

# Create new branch
git branch feature-branch

# Switch to branch
git checkout feature-branch

# Create and switch to new branch
git checkout -b feature-branch

# Delete branch locally
git branch -d feature-branch

# Delete branch remotely
git push origin --delete feature-branch
```

### 2. Merging Changes

```bash
# Merge branch into current branch
git merge feature-branch

# Abort merge if conflicts
git merge --abort
```

## Advanced Operations

### 1. Stashing Changes

```bash
# Stash current changes
git stash

# List stashes
git stash list

# Apply most recent stash
git stash apply

# Apply specific stash
git stash apply stash@{2}

# Drop stash after applying
git stash pop
```

### 2. Managing Remote Repositories

```bash
# View remote repositories
git remote -v

# Add remote repository
git remote add origin https://github.com/user/repo.git

# Change remote URL
git remote set-url origin new-url
```

### 3. Handling Mistakes

```bash
# Discard changes in working directory
git restore filename.md

# Undo last commit but keep changes
git reset HEAD~1

# Revert a specific commit
git revert commit-hash

# Force push changes (use with caution!)
git push -f origin main
```

## Documentation-Specific Workflows

### 1. Managing Documentation Branches

```bash
# Create documentation branch
git checkout -b docs/feature-name

# Update specific documentation section
git checkout -b docs/update-installation-guide
```

### 2. Reviewing Changes

```bash
# View changes in a file
git diff filename.md

# View staged changes
git diff --staged

# View changes between branches
git diff main..feature-branch
```

### 3. Managing Large Documentation Updates

```bash
# Create feature branch for major update
git checkout -b docs/major-revision

# Commit logical chunks separately
git add docs/section1/*.md
git commit -m "Update Section 1 documentation"

git add docs/section2/*.md
git commit -m "Update Section 2 documentation"
```

## Best Practices

### 1. Commit Messages

```bash
# Format: <type>: <subject>
git commit -m "docs: Update installation instructions for Windows"
git commit -m "fix: Correct broken links in API documentation"
git commit -m "feat: Add new tutorial section for beginners"
```

### 2. Branch Naming Conventions

```bash
# Feature documentation
git checkout -b docs/feature-name

# Bug fixes in documentation
git checkout -b docs/fix-broken-links

# Documentation improvements
git checkout -b docs/improve-readability
```

### 3. Regular Maintenance

```bash
# Update main branch
git checkout main
git pull origin main

# Clean up old branches
git fetch -p
git branch -vv | grep ': gone]' | awk '{print $1}' | xargs git branch -d
```

## Troubleshooting

### 1. Common Issues

```bash
# Fix unrelated histories error
git pull origin main --allow-unrelated-histories

# Clean untracked files
git clean -n  # dry run
git clean -f  # actually remove files

# Reset to remote state
git fetch origin
git reset --hard origin/main
```

### 2. Configuration Issues

```bash
# View all configurations
git config --list

# View specific configuration
git config user.name

# Edit global configuration
git config --global --edit
```

Remember: Always ensure you have a backup or commit your changes before running destructive commands like `reset` or `clean`. 