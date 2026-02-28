# AgriCo Global - Import Export Business Website

A modern, responsive, and user-friendly website for AgriCo Global, showcasing premium agricultural products including spices, powders, seeds, and pulses.

## Features

✅ **Fully Responsive Design** - Works perfectly on desktop, tablet, and mobile devices
✅ **Interactive User Interface** - Smooth animations and transitions
✅ **Product Showcase** - Display all 15 products with images and descriptions
✅ **Enquiry Form** - Easy-to-use contact form for prospective clients
✅ **Smooth Navigation** - Scroll-to-section navigation with active state indicators
✅ **Mobile-Friendly Menu** - Hamburger menu for mobile devices
✅ **Form Validation** - Client-side validation for all required fields
✅ **Professional Design** - Clean and modern layout inspired by industry standards

## Products Featured

1. Moringa Powder
2. Onion Powder
3. Neem Powder
4. Pulses (Tur, Moong)
5. Kadhipatta Powder
6. Ginger Powder
7. Turmeric Powder/Dried
8. Garlic Powder
9. Red Chilli Powder
10. Chilli Flakes
11. Raw Corn for Popcorn
12. Sunflower Seeds
13. Pumpkin Seeds
14. Watermelon Seeds
15. Tamarind

## How to Use

### 1. Open the Website

Simply double-click on `index.html` to open the website in your default browser.

Alternatively, you can:
- Right-click on `index.html` and select "Open with" → Choose your browser
- Drag and drop `index.html` into your browser window

### 2. Navigation

- Click on the navigation menu items (Home, About Us, Products, Contact) to scroll to different sections
- On mobile devices, click the hamburger menu (☰) to open the navigation menu
- Use the "Explore Products" or "Get in Touch" buttons in the hero section
- Click the arrow button in the bottom-right corner to scroll back to the top

### 3. Product Enquiry

- Click "Enquire Now" on any product card to jump to the contact form with that product pre-selected
- Or scroll down to the Contact section manually
- Fill in all required fields (marked with *)
- Click "Send Enquiry" to submit (currently shows a success message - integrate with your backend)

## Customization Guide

### Changing Colors

Edit the CSS variables in `style.css` (lines 11-21):

```css
:root {
    --primary-color: #2c5f2d;      /* Main green color */
    --secondary-color: #97cc04;     /* Accent green */
    --accent-color: #ff8c42;        /* Orange accent */
    /* ... other colors ... */
}
```

### Updating Company Information

1. **Company Name & Logo**: Edit `index.html` around line 16-18
2. **Contact Details**: Update the contact section (around line 540-570)
3. **Email Address**: Change `supriyamote15@gmail.com` to your actual email
4. **Phone Number**: Update `+1 (234) 567-890` to your business number
5. **Social Media Links**: Replace `#` with your actual social media URLs (lines 585-588)

### Adding/Modifying Products

To add a new product, copy this template in the products section:

```html
<div class="product-card">
    <div class="product-image">
        <img src="YOUR_IMAGE_URL" alt="Product Name">
    </div>
    <div class="product-info">
        <h3 class="product-name">Product Name</h3>
        <p class="product-description">Product description here</p>
        <a href="#contact" class="product-btn">Enquire Now</a>
    </div>
</div>
```

Don't forget to also add the product to the dropdown in the contact form!

### Image Recommendations

- **Product Images**: 400x300px (or 4:3 ratio)
- **Hero Background**: 1920x1080px (or 16:9 ratio)
- **About Section**: 600x400px
- Use high-quality images in JPG or PNG format
- Optimize images for web (compress to reduce file size)

### Integrating Contact Form with Backend

The form currently shows a success message. To integrate with your backend:

1. **Update `script.js`** around line 125 (form submission handler)
2. Replace the `setTimeout` simulation with an actual API call:

```javascript
// Example using fetch API
fetch('YOUR_BACKEND_URL', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
})
.then(response => response.json())
.then(data => {
    // Show success message
    formMessage.textContent = 'Thank you! We will contact you soon.';
    formMessage.className = 'form-message success';
    enquiryForm.reset();
})
.catch(error => {
    // Show error message
    showFormError('Something went wrong. Please try again.');
});
```

### Adding WhatsApp Integration

Replace the WhatsApp links in the contact section with your actual WhatsApp number:

```html
<a href="https://wa.me/1234567890?text=Hello%20AgriCo%20Global">
    <i class="fab fa-whatsapp"></i>
</a>
```

Replace `1234567890` with your WhatsApp number (include country code without + or spaces).

## File Structure

```
Agrico/
│
├── index.html          # Main HTML file
├── style.css           # All styling and responsive design
├── script.js           # JavaScript for interactivity
└── README.md          # This file
```

## Browser Compatibility

- ✅ Google Chrome (recommended)
- ✅ Mozilla Firefox
- ✅ Microsoft Edge
- ✅ Safari
- ✅ Opera

## Mobile Responsive Breakpoints

- **Desktop**: 969px and above
- **Tablet**: 568px to 968px
- **Mobile**: Below 568px

## Dependencies

The website uses the following external libraries (loaded from CDN):

- **Font Awesome 6.4.0** - For icons
- **Unsplash** - For placeholder images (replace with your own)

## Performance Tips

1. Replace Unsplash placeholder images with your own optimized product images
2. Compress all images before uploading
3. Consider using WebP format for better compression
4. If hosting online, enable browser caching
5. Minify CSS and JavaScript files for production

## Deployment

### GitHub Pages (Free)

1. Create a GitHub account
2. Create a new repository
3. Upload all files (index.html, style.css, script.js)
4. Go to Settings → Pages
5. Select main branch and save
6. Your site will be live at `https://yourusername.github.io/repository-name`

### Netlify (Free)

1. Sign up at netlify.com
2. Drag and drop your folder
3. Your site goes live instantly
4. Get a free subdomain or connect your custom domain

### Traditional Web Hosting

1. Purchase domain and hosting
2. Upload files via FTP/cPanel File Manager
3. Place files in public_html or www folder
4. Your site will be live at your domain

## Support & Customization

For further customization or technical support, consider hiring a web developer or contact web development services.

## License

This website template is created for AgriCo Global. Feel free to modify and use it for your business.

---

**AgriCo Global** - Your Trusted Partner for Premium Agricultural Products Worldwide

For questions or support, contact: supriyamote15@gmail.com
