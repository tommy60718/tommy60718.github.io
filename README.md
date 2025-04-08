# tommy60718.github.io
My personal website

# Music & Mood Station

A personal website featuring a music player with mood visualizations, guitar learning resources, and a blog tracking my musical journey.

## Project Structure

### Core Architecture

This site is built with Jekyll, a static site generator perfect for GitHub Pages, with a custom sidebar layout design:

```text
tommy60718.github.io/
├── _config.yml          # Jekyll configuration
├── _layouts/            # Page templates (sidebar-layout, etc.)
├── _includes/           # Reusable components (header, footer)
├── _posts/              # Blog content in Markdown format
├── assets/              # Static files
│   ├── css/             # Stylesheets
│   ├── js/              # JavaScript files
│   ├── audio/           # Music files
│   └── images/          # Images and artwork
├── music-station/       # Music features hub
│   ├── index.html       # Hub page
│   ├── player/          # Music player functionality
│   └── guitar-sheets/   # Guitar learning resources
├── blog/                # Blog section
└── index.html           # Homepage
```

### Key Features

1. **Fixed Sidebar Navigation**
   - Dark-themed sidebar that stays visible while scrolling
   - Profile display with photo and title
   - Main navigation links and social information

2. **Music Station**
   - Music Player: HTML5 Audio API with mood-based visualizations
   - Guitar Sheets: Learning resources organized by difficulty
   - Unified navigation between player and sheets

3. **Blog Section**
   - Jekyll-powered content organization
   - Categories for music reviews, mood journals, and learning progress
   - GitHub-based commenting system

## Local Development

### Prerequisites

- Ruby (recommended version: 3.1.x to 3.3.x)
- RubyGems
- Bundler

### Ruby Setup Issues and Solutions

If using Ruby 3.4+, you'll need to add several removed standard libraries to your Gemfile:

```ruby
# Add these gems to fix Ruby 3.4 compatibility issues
gem "csv", "~> 3.2"
gem "logger", "~> 1.5"
gem "base64", "~> 0.2.0"
gem "bigdecimal", "~> 3.1"
gem "stringio", "~> 3.1"
gem "webrick", "~> 1.7"
```

For macOS users, an alternative is to use rbenv to install an older Ruby version:

```bash
# Install rbenv
brew install rbenv ruby-build

# Install Ruby 3.1.4 (more compatible)
rbenv install 3.1.4

# Switch to it in your project directory
rbenv local 3.1.4
```

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/tommy60718/tommy60718.github.io.git
   cd tommy60718.github.io
   ```

2. Install dependencies:
   ```bash
   bundle install
   ```

3. Run the development server:
   ```bash
   bundle exec jekyll serve
   ```

4. View the site at http://localhost:4000

### Common Issues

- **Missing Dependencies**: If you encounter "cannot load such file" errors, add the missing gem to your Gemfile and run `bundle install` again.
- **Port Conflicts**: If port 4000 is in use, run `bundle exec jekyll serve --port 4001` instead.
- **LiveReload**: Use `bundle exec jekyll serve --livereload` for automatic page refreshing during development.

## Deployment

This site is automatically deployed to GitHub Pages when changes are pushed to the main branch.