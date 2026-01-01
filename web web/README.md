# Personal Portfolio Website

A modern, responsive personal portfolio website built with pure HTML, CSS, and JavaScript. No external frameworks or libraries required.

## Features

- ✅ Fully responsive design (Desktop, Tablet, Mobile)
- ✅ Smooth scrolling navigation
- ✅ Fixed header with scroll effect
- ✅ Mobile hamburger menu
- ✅ Animated skill progress bars
- ✅ Project filtering system
- ✅ Testimonials slider with auto-play
- ✅ Contact form with validation
- ✅ Scroll animations
- ✅ Back-to-top button
- ✅ Modern and clean UI design

## Sections

1. **Header & Navigation** - Fixed navigation with smooth scroll
2. **Hero Section** - Eye-catching introduction with CTA buttons
3. **About Me** - Personal information and statistics
4. **Skills** - Technical skills with animated progress bars
5. **Projects** - Portfolio projects with filtering
6. **Experience** - Timeline of work experience
7. **Testimonials** - Client testimonials with auto-slider
8. **Contact** - Contact form and information
9. **Footer** - Social links and copyright

## Getting Started

1. Clone or download this repository
2. Open `index.html` in your web browser
3. Customize the content to match your information

## Customization

### Personal Information

1. **Name & Title**: Update in the Hero section (lines ~30-35 in `index.html`)
2. **About Section**: Modify the description in the About section
3. **Skills**: Update skill names and percentages in the Skills section
4. **Projects**: Add your projects with images, descriptions, and links
5. **Experience**: Update your work experience timeline
6. **Contact**: Update email, phone, and location information

### Colors

Edit the CSS variables in `style.css` (lines 1-50):

```css
:root {
    --first-color: #6366f1;        /* Primary color */
    --first-color-alt: #4f46e5;   /* Primary color variant */
    --title-color: #1e293b;        /* Text headings */
    --text-color: #64748b;         /* Body text */
    --body-color: #f8fafc;         /* Background */
    --container-color: #ffffff;    /* Cards/containers */
}
```

### Images

Replace placeholder images by:
1. Adding your images to an `images` folder
2. Updating the CSS background-image properties or using `<img>` tags
3. Current placeholders use CSS gradients and emoji icons

### Social Media Links

Update social media links in the Footer section (around line 500 in `index.html`):

```html
<a href="YOUR_GITHUB_URL" class="footer__social-link">...</a>
<a href="YOUR_LINKEDIN_URL" class="footer__social-link">...</a>
```

## File Structure

```
portfolio-website/
│
├── index.html      # Main HTML file
├── style.css       # All styles and responsive design
├── script.js       # JavaScript functionality
└── README.md       # This file
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## Deployment

### GitHub Pages

1. Create a new repository on GitHub
2. Upload all files
3. Go to Settings > Pages
4. Select main branch as source
5. Your site will be live at `https://yourusername.github.io/repository-name`

### Netlify

1. Sign up/login to Netlify
2. Drag and drop the project folder
3. Your site will be live instantly

### Other Platforms

This is a static website, so it can be deployed on any static hosting service:
- Vercel
- Firebase Hosting
- AWS S3
- Any web server

## Features Explained

### Smooth Scrolling
All navigation links use smooth scroll behavior for better UX.

### Mobile Menu
Hamburger menu appears on screens smaller than 768px with slide-in animation.

### Skill Bars
Progress bars animate when scrolled into view using Intersection Observer API.

### Project Filtering
Click filter buttons to show/hide projects by category (All, Web, Design, Apps).

### Form Validation
Contact form validates:
- Required fields
- Email format
- Shows success/error messages

### Scroll Animations
Sections fade in when scrolled into view for engaging user experience.

## Customization Tips

1. **Fonts**: Change the Google Fonts import in `index.html` head section
2. **Icons**: Replace emoji icons with Font Awesome or other icon libraries if desired
3. **Animations**: Adjust animation timings in CSS `@keyframes` rules
4. **Spacing**: Modify CSS variables for consistent spacing throughout
5. **Colors**: Use a color palette generator to create cohesive color schemes

## Performance

- No external dependencies
- Optimized CSS with variables
- Throttled scroll events for performance
- Lightweight and fast loading

## License

Free to use for personal and commercial projects.

## Support

For issues or questions, feel free to open an issue or contact the developer.

---

**Made with ❤️ using HTML, CSS, and JavaScript**

