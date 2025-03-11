source "https://rubygems.org"

# Add these gems to fix Ruby 3.4 compatibility issues
gem "csv", "~> 3.2"
gem "logger", "~> 1.5"
gem "base64", "~> 0.2.0"
gem "bigdecimal", "~> 3.1"  # Another commonly needed one
gem "stringio", "~> 3.1"    # Another potential dependency

gem "jekyll", "~> 4.3.2"

# If you want to use GitHub Pages, uncomment this line
# gem "github-pages", group: :jekyll_plugins

# Jekyll plugins
group :jekyll_plugins do
  gem "jekyll-feed", "~> 0.12"
  gem "jekyll-seo-tag", "~> 2.8"
  gem "jekyll-paginate", "~> 1.1"
end

# Windows and JRuby support
platforms :mingw, :x64_mingw, :mswin, :jruby do
  gem "tzinfo", ">= 1", "< 3"
  gem "tzinfo-data"
end

# Performance-booster for watching directories on Windows
gem "wdm", "~> 0.1.1", :platforms => [:mingw, :x64_mingw, :mswin]

# Lock `http_parser.rb` gem to `v0.6.x` on JRuby builds
gem "http_parser.rb", "~> 0.6.0", :platforms => [:jruby]

# Add webrick for Ruby 3+
gem "webrick", "~> 1.7"