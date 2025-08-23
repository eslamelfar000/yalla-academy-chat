# Framer Motion Animation Guide

This guide explains how to use the implemented Framer Motion animations throughout the Yalla System website.

## 🚀 Installed Dependencies

- `framer-motion` - For smooth animations and transitions

## 🎯 Available Animation Components

### 1. AnimatedContainer

A reusable component for consistent fade-in animations that trigger when scrolled into view.

```jsx
import AnimatedContainer from "@/components/ui/animated-container";

// Basic usage
<AnimatedContainer>
  <div>Your content here</div>
</AnimatedContainer>

// With custom variant
<AnimatedContainer variant="fadeInLeft" delay={0.2}>
  <div>Content with left fade animation</div>
</AnimatedContainer>

// Available variants:
// - fadeInUp (default)
// - fadeInLeft
// - fadeInRight
// - fadeInScale
// - custom
```

### 2. AnimatedList & AnimatedListItem

For staggered animations in lists or grids that trigger on scroll.

```jsx
import {
  AnimatedList,
  AnimatedListItem,
} from "@/components/ui/animated-container";

<AnimatedList>
  <AnimatedListItem delay={0.1}>Item 1</AnimatedListItem>
  <AnimatedListItem delay={0.2}>Item 2</AnimatedListItem>
  <AnimatedListItem delay={0.3}>Item 3</AnimatedListItem>
</AnimatedList>;
```

## 🎨 Pre-built Animation Variants

### fadeInUp

- Slides up from below with fade-in effect
- Default animation for most components

### fadeInLeft

- Slides in from the left with fade-in effect
- Great for text content or side panels

### fadeInRight

- Slides in from the right with fade-in effect
- Perfect for images or complementary content

### fadeInScale

- Scales up from 90% to 100% with fade-in effect
- Ideal for cards and interactive elements

## 🔧 Implementation Examples

### Hero Section

```jsx
// Container with staggered children - triggers on scroll
<motion.div variants={containerVariants} initial="hidden" whileInView="visible">
  <motion.h1 variants={itemVariants}>Title</motion.h1>
  <motion.ul variants={containerVariants}>
    <motion.li variants={itemVariants}>List item</motion.li>
  </motion.ul>
</motion.div>
```

### Card Components with Index-Based Delays

```jsx
// Individual card with index-based delay - triggers on scroll
{
  cards.map((card, index) => (
    <motion.div
      key={card.id}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -10, transition: { duration: 0.3 } }}
    >
      Card content
    </motion.div>
  ));
}
```

### Staggered Grid with Index Delays

```jsx
// Grid with index-based staggered animations
{
  items.map((item, index) => (
    <motion.div
      key={index}
      variants={itemVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      transition={{ delay: index * 0.1 }}
    >
      {item}
    </motion.div>
  ));
}
```

## 📱 Scroll-Triggered Animations

All animations now use `whileInView` to trigger when the user scrolls to that section:

```jsx
<motion.div
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, margin: "-100px" }}
>
  Content that animates when scrolled into view
</motion.div>
```

### Viewport Options

- `once: true` - Animation only plays once
- `margin: "-100px"` - Animation triggers 100px before element enters viewport
- `amount: 0.5` - Animation triggers when 50% of element is visible

## 🎯 Index-Based Animation System

### Basic Index Delays

```jsx
// Simple index-based delays
{
  items.map((item, index) => (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ delay: index * 0.1 }}
    >
      {item}
    </motion.div>
  ));
}
```

### Custom Hook for Index Animations

```jsx
import { useIndexAnimation } from "@/hooks/useIndexAnimation";

function MyComponent() {
  const { delay, transition } = useIndexAnimation(index, 0.1, 0.1);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={transition}
    >
      Content
    </motion.div>
  );
}
```

### Grid Position Animations

```jsx
import { useGridPositionAnimation } from "@/hooks/useIndexAnimation";

function GridItem({ rowIndex, columnIndex }) {
  const { delay, transition } = useGridPositionAnimation(rowIndex, columnIndex);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={transition}
    >
      Grid Item
    </motion.div>
  );
}
```

## 🏠 Page-Specific Animations

### Home Page

The Home page features comprehensive banner and section animations:

- **Hero Section**: Staggered fade-in for title, subtitle, bullet points, and hero image with slide-in effect
- **Home Cards**: Index-based staggered animations for feature cards with hover effects
- **Banner Section**: Staggered animations for partner logos, title, description, and banner image
- **Home Teachers**: Index-based staggered animations for teacher cards
- **Home Slider**: Fade-in animations for section title, background images, and carousel

```jsx
// Example from Hero component
<motion.div variants={containerVariants} initial="hidden" whileInView="visible">
  <motion.h1 variants={itemVariants}>Become fluent in Arabic With Yalla</motion.h1>
  <motion.ul variants={containerVariants}>
    <motion.li variants={itemVariants}>Feature point 1</motion.li>
  </motion.ul>
</motion.div>

// Example from Banner component
<motion.div variants={containerVariants} initial="hidden" whileInView="visible">
  <motion.div variants={itemVariants}>
    <motion.h1 variants={itemVariants}>{title}</motion.h1>
    <motion.p variants={itemVariants}>{description}</motion.p>
  </motion.div>
  <motion.div variants={imageVariants} whileHover={{ scale: 1.02 }}>
    {/* Banner image */}
  </motion.div>
</motion.div>
```

### AboutUs Page

The AboutUs page features comprehensive animations:

- **Hero Section**: Staggered fade-in for title, subtitle, and background elements
- **Mission & Vision**: Left-to-right staggered animations for content and vision card
- **Values Section**: Index-based staggered animations for value cards with hover effects
- **CTA Section**: Staggered animations for heading, description, and buttons

```jsx
// Example from AboutUs page
<motion.section
  variants={containerVariants}
  initial="hidden"
  whileInView="visible"
>
  <motion.h1 variants={itemVariants}>Empowering Students</motion.h1>
  <motion.p variants={itemVariants}>Description text</motion.p>
</motion.section>
```

### Contact Page

The Contact page includes:

- **Contact Form**: Fade-in animations for form elements
- **Contact Information**: Staggered animations for phone and email links
- **Interactive Elements**: Hover animations for contact links and submit button

```jsx
// Example from Contact page
<motion.div variants={cardVariants} whileHover={{ y: -5 }}>
  <Card>
    <motion.h2 variants={itemVariants}>Send Us A Message</motion.h2>
    {/* Form content */}
  </Card>
</motion.div>
```

### Teacher Pages

Teacher-related pages feature:

- **Teacher Cards**: Index-based staggered animations with hover effects
- **Teacher Profile**: Staggered animations for profile information, tabs, and content
- **Teacher Video**: Fade-in animations for video sections and action buttons
- **Reviews Section**: Staggered animations for review content

```jsx
// Example from TeacherInfo component
<motion.div variants={containerVariants} initial="hidden" whileInView="visible">
  <motion.figure variants={itemVariants} whileHover={{ scale: 1.05 }}>
    {/* Teacher avatar */}
  </motion.figure>
  <motion.div variants={itemVariants}>{/* Teacher information */}</motion.div>
</motion.div>
```

## 🎬 Banner & Header Animations

### Hero Banner

The main hero banner features:

- **Container Animation**: Staggered children with 0.2s delays
- **Text Elements**: Fade-in from below with 0.6s duration
- **Hero Image**: Slide-in from right with scale effect (0.8s duration)
- **Interactive Elements**: Hover effects on buttons and links

```jsx
// Hero banner animation pattern
<motion.div variants={containerVariants} initial="hidden" whileInView="visible">
  <motion.h1 variants={itemVariants}>Main Title</motion.h1>
  <motion.div variants={imageVariants}>
    {/* Hero image with slide-in effect */}
  </motion.div>
</motion.div>
```

### Section Headers

Section headers (SecHeader component) include:

- **Background Image**: Fade-in with staggered text animations
- **Title & Subtitle**: Sequential fade-in with 0.2s stagger
- **Responsive Behavior**: Animations work on all screen sizes

```jsx
// Section header animation pattern
<motion.div variants={containerVariants} initial="hidden" whileInView="visible">
  <motion.div variants={containerVariants}>
    <motion.h1 variants={itemVariants}>{title}</motion.h1>
    <motion.h1 variants={itemVariants}>{subtitle}</motion.h1>
  </motion.div>
</motion.div>
```

### Banner Sections

Banner components feature:

- **Content Staggering**: Left-to-right staggered animations
- **Logo Animations**: Hover effects on partner and company logos
- **Image Effects**: Scale and slide-in animations for banner images
- **Text Elements**: Sequential fade-in for titles and descriptions

```jsx
// Banner animation pattern
<motion.div variants={containerVariants} initial="hidden" whileInView="visible">
  <motion.div variants={itemVariants}>
    {/* Content with staggered animations */}
  </motion.div>
  <motion.div variants={imageVariants} whileHover={{ scale: 1.02 }}>
    {/* Banner image with hover effect */}
  </motion.div>
</motion.div>
```

## 📱 Responsive Considerations

- Animations work on all screen sizes
- All animations now use `whileInView` for scroll-triggered behavior
- `viewport={{ once: true }}` ensures animations only play once per session

## 🚫 Performance Tips

1. **Use `whileInView`** for scroll-triggered animations (already implemented)
2. **Set `viewport={{ once: true }}`** to prevent re-animations
3. **Limit stagger delays** to under 0.3s for better UX
4. **Use `transform` properties** (x, y, scale) instead of layout properties
5. **Use index-based delays** for smooth staggered effects

## 🎨 Custom Animations

To create custom animations, define your own variants:

```jsx
const customVariants = {
  hidden: { opacity: 0, rotate: -180 },
  visible: {
    opacity: 1,
    rotate: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};
```

## 🔄 Hover Animations

```jsx
<motion.div
  whileHover={{
    scale: 1.05,
    y: -5,
    transition: { duration: 0.2 },
  }}
>
  Hover me!
</motion.div>
```

## 📜 Scroll Animations (Current Implementation)

All components now use this pattern with index-based delays:

```jsx
{
  items.map((item, index) => (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ delay: index * 0.1 }}
    >
      Content that animates when scrolled into view
    </motion.div>
  ));
}
```

## 🎯 Best Practices

1. **Consistency** - Use the same animation durations and easing across similar elements
2. **Subtlety** - Keep animations subtle and purposeful
3. **Performance** - Avoid animating layout properties
4. **Accessibility** - Respect `prefers-reduced-motion` user preference
5. **Mobile** - Ensure animations work well on touch devices
6. **Scroll-triggered** - All animations now trigger on scroll for better UX
7. **Index-based delays** - Use consistent delay patterns (0.1s, 0.2s, 0.3s)

## 🐛 Troubleshooting

### Animation not working?

- Check if `framer-motion` is imported
- Verify `initial` and `whileInView` props are set
- Ensure parent container has proper variants
- Check that `viewport` options are properly configured

### Performance issues?

- Reduce stagger delays
- All animations now use `whileInView` for better performance
- Limit the number of simultaneous animations

### Stagger not working?

- Ensure parent has `staggerContainer` variants
- Check that children have individual variants
- Verify `staggerChildren` timing

### Scroll animations not triggering?

- Check `viewport` configuration
- Ensure `whileInView` is set to "visible"
- Verify `margin` value in viewport options

### Index-based delays not working?

- Ensure each item has a unique `key` prop
- Check that `index` is properly passed to the map function
- Verify delay calculation (index \* delayValue)

---

For more information, visit the [Framer Motion documentation](https://www.framer.com/motion/).
