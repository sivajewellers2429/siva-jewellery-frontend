# WhatsApp Button Integration Guide

## Features Implemented (Similar to Btechruchulu.com)

✅ **Floating WhatsApp Button** - Always visible in bottom-right corner  
✅ **Pulse Animation** - Attention-grabbing pulse effect when closed  
✅ **Toggle Functionality** - Smooth slide-up/down animation  
✅ **Multiple Contact Options** - WhatsApp Chat & Phone Call  
✅ **Professional Design** - Clean, modern UI with hover effects  
✅ **Customizable** - Easy to configure phone number, message, and business name  
✅ **Responsive** - Works perfectly on all screen sizes  
✅ **Smooth Animations** - Spring-based animations using Framer Motion  

## How to Use

### 1. Import the Component

```jsx
import WhatsAppButton from './components/WhatsAppButton';
```

### 2. Add to Your App/Layout

```jsx
function App() {
  return (
    <div className="relative">
      {/* Your app content */}
      <HeroSection />
      <FeaturedCollections />
      
      {/* WhatsApp Button - Add at the end */}
      <WhatsAppButton 
        phoneNumber="919876543210"
        message="Hello! I'm interested in your jewelry collection."
        businessName="Siva Jewellery"
      />
    </div>
  );
}
```

### 3. Customize Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `phoneNumber` | string | '1234567890' | WhatsApp number (include country code without +) |
| `message` | string | 'Hello! I would like to inquire...' | Pre-filled message for WhatsApp |
| `businessName` | string | 'Siva Jewellery' | Your business name shown in the popup |

### 4. Example Configurations

#### For Indian Number
```jsx
<WhatsAppButton 
  phoneNumber="919876543210"  // India country code (91) + 10 digit number
  message="Hi! I'd like to know more about your gold jewelry."
  businessName="Siva Jewellery"
/>
```

#### For US Number
```jsx
<WhatsAppButton 
  phoneNumber="14155552671"  // US country code (1) + number
  message="Hello! I'm interested in your products."
  businessName="Your Business"
/>
```

## Features Breakdown

### 1. **Pulse Animation**
- The button has a subtle pulse effect that repeats every 3 seconds
- Draws user attention without being annoying
- Automatically stops when the menu is open

### 2. **Smooth Toggle**
- Click the button to reveal contact options
- Spring-based animation for natural feel
- Button icon smoothly transitions from WhatsApp to X (close)

### 3. **Contact Options**
- **Chat on WhatsApp**: Opens WhatsApp with pre-filled message
- **Call Us**: Initiates phone call directly
- Both options have hover effects with chevron indicators

### 4. **Close Button**
- X button in top-right corner of the popup
- Hover effect (turns red)
- Can also close by clicking the main button again

## Styling Customization

If you want to customize colors or sizes, edit these classes in the component:

```jsx
// Main button size
className="w-16 h-16"  // Change to w-14 h-14 for smaller

// Button colors
bg-green-500  // WhatsApp green
bg-red-500    // Close button red

// Popup width
w-64  // Change to w-72 for wider popup
```

## Browser Compatibility

✅ Chrome, Firefox, Safari, Edge (latest versions)  
✅ Mobile browsers (iOS Safari, Chrome Mobile)  
✅ Works on all modern devices  

## Notes

- The button is positioned with `fixed` positioning, so it stays visible while scrolling
- Uses `z-50` to ensure it appears above other content
- WhatsApp link format: `https://wa.me/{number}?text={message}`
- Phone link format: `tel:{number}`

## Troubleshooting

**Button not visible?**
- Check if the component is imported and added to your JSX
- Ensure no CSS is overriding the `z-index`
- Check browser console for errors

**WhatsApp not opening?**
- Verify phone number format (country code + number, no spaces or +)
- Test the link manually: `https://wa.me/919876543210`

**Animations not working?**
- Ensure `framer-motion` is installed: `npm install framer-motion`
- Check for JavaScript errors in console

## Support

For any issues or customization requests, refer to the component code at:
`src/components/WhatsAppButton/index.jsx`
