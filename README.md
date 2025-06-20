# Small Batch Maps Website

A beautiful, responsive single-page website for Small Batch Maps - a geospatial consultancy specializing in bespoke cartography and AI-powered GIS solutions.

## 🌍 Features

- **Responsive Design**: Mobile-first approach with beautiful layouts across all devices
- **Modern UI**: Clean, professional design with custom brand colors and typography
- **Interactive Elements**: Expandable service cards, smooth scrolling navigation, animated elements
- **Contact Form**: Professional contact form with validation and user feedback
- **Performance Optimized**: Fast loading with optimized assets and animations
- **Accessibility**: Keyboard navigation and screen reader friendly

## 🎨 Design System

### Brand Colors
- **Terracotta Orange**: `#CD5C40` (CTAs, accents)
- **Sage Green**: `#7A8B7A` (secondary elements)
- **Cream**: `#F5F2E8` (backgrounds)
- **Deep Teal**: `#2C5F5D` (text, headers)
- **Warm White**: `#FEFCF8` (cards, highlights)

### Typography
- **Headers**: Playfair Display (serif, elegant)
- **Body**: Inter (clean, readable)
- **Accent**: JetBrains Mono (technical elements)

## 🏗️ Tech Stack

- **HTML5**: Semantic markup
- **CSS3**: Custom styles with Tailwind CSS
- **JavaScript**: Vanilla JS for interactions
- **Tailwind CSS**: Utility-first CSS framework
- **Google Fonts**: Typography
- **SVG Icons**: Scalable vector graphics

## 📁 Project Structure

```
sbm/
├── index.html          # Main HTML file
├── styles.css          # Custom CSS styles
├── script.js           # JavaScript functionality
├── prd.md             # Product Requirements Document
└── README.md          # This file
```

## 🔧 Setup & Development

1. **Clone or download** the project files
2. **Open** `index.html` in a web browser, or
3. **Serve locally** using a simple HTTP server:

```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (if you have http-server installed)
npx http-server

# Using PHP
php -S localhost:8000
```

4. **Visit** `http://localhost:8000` in your browser

## 🚀 Deployment

### Vercel (Recommended)
1. Push code to GitHub repository
2. Connect repository to Vercel
3. Deploy automatically

### Netlify
1. Drag and drop project folder to Netlify
2. Or connect GitHub repository
3. Deploy with automatic builds

### GitHub Pages
1. Push to GitHub repository
2. Enable GitHub Pages in repository settings
3. Set source to main branch

## 📱 Sections

### 1. Hero Section
- Eye-catching headline with animated topographic background
- Clear value proposition
- Call-to-action button

### 2. Services Section
- Three expandable service cards:
  - Geospatial Data Science
  - Web Cartography
  - AI-Assisted Workflows
- Interactive "Learn More" functionality

### 3. About Section
- Personal bio and mission
- Professional background
- Approach and values

### 4. Contact Section
- Professional contact form with validation
- Social media links
- Consultation process overview
- Response time expectations

## ⚡ Performance Features

- **Smooth Scrolling**: Native CSS smooth scroll behavior
- **Optimized Animations**: GPU-accelerated CSS animations
- **Responsive Images**: Scalable SVG icons
- **Efficient Loading**: Minimal external dependencies
- **Progressive Enhancement**: Works without JavaScript

## 🎯 Conversion Optimization

- Clear call-to-action buttons
- Professional contact form
- Trust indicators (consultation process)
- Mobile-optimized experience
- Fast loading times

## 📊 Analytics Ready

The website is ready for analytics integration. Add your preferred analytics service:

- Google Analytics
- Plausible
- Fathom Analytics
- Or any other service

## 🔍 SEO Optimized

- Semantic HTML structure
- Meta descriptions and titles
- Clean URL structure
- Mobile-friendly design
- Fast loading speeds

## 🎨 Customization

### Colors
Update the Tailwind config in `index.html` to change brand colors:

```javascript
tailwind.config = {
    theme: {
        extend: {
            colors: {
                'terracotta': '#CD5C40',
                'sage': '#7A8B7A',
                // ... add your colors
            }
        }
    }
}
```

### Content
Edit the HTML content directly in `index.html` to update:
- Service descriptions
- About section text
- Contact information
- Social media links

### Styling
Modify `styles.css` to adjust:
- Animations
- Hover effects
- Custom components
- Responsive breakpoints

## 📞 Contact Form Integration

The contact form currently shows a success message. To integrate with a backend:

1. **Netlify Forms**: Add `netlify` attribute to form
2. **Formspree**: Update form action to Formspree endpoint
3. **Custom Backend**: Update the form submission handler in `script.js`

## 🔧 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📄 License

This project is created for Small Batch Maps. All rights reserved.

---

**Built with care for the geospatial community** 🗺️ 