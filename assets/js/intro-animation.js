document.addEventListener('DOMContentLoaded', function() {
  // Only run on home page with intro animation
  if (!document.querySelector('.intro-layout')) return;

  // DOM Elements
  const introAnimation = document.getElementById('intro-animation');
  const scrollIndicator = document.querySelector('.scroll-indicator');
  const dotGroup = document.querySelector('.geometry .dots');
  const lineGroup = document.querySelector('.geometry .line');
  const introTitle = document.querySelector('.intro-title');
  const introSubtitle = document.querySelector('.intro-subtitle');
  
  // Configuration
  const dotsCount = 32; // Number of dots in geometry
  const baseRadius = 350; // Base radius of the geometry
  const minScale = 0.5; // Minimum scale for dots during animation
  const maxScale = 1.5; // Maximum scale for dots during animation
  
  // Animation Progress Variables
  let scrollProgress = 0;
  
  // Generate Geometry
  function generateGeometry() {
    // Clear existing elements
    dotGroup.innerHTML = '';
    lineGroup.innerHTML = '';
    
    // Create dots and position them in a circular pattern
    const dots = [];
    const step = (2 * Math.PI) / dotsCount;
    
    for (let i = 0; i < dotsCount; i++) {
      const theta = i * step;
      const x = 400 + baseRadius * Math.cos(theta);
      const y = 400 + baseRadius * Math.sin(theta);
      
      // Create SVG circle
      const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      dot.setAttribute('cx', x);
      dot.setAttribute('cy', y);
      dot.setAttribute('r', 5);
      dot.setAttribute('class', 'dot');
      dot.setAttribute('data-index', i);
      dot.setAttribute('data-original-x', x);
      dot.setAttribute('data-original-y', y);
      dot.setAttribute('data-angle', theta);
      
      dotGroup.appendChild(dot);
      dots.push(dot);
    }
    
    // Create line path
    const linePath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    linePath.setAttribute('class', 'path');
    lineGroup.appendChild(linePath);
    
    // Initial path drawing
    updateLinePath(dots);
    
    return dots;
  }
  
  // Update the line path connecting all dots
  function updateLinePath(dots) {
    if (!dots.length) return;
    
    let pathD = `M ${dots[0].getAttribute('cx')} ${dots[0].getAttribute('cy')}`;
    
    for (let i = 1; i < dots.length; i++) {
      pathD += ` L ${dots[i].getAttribute('cx')} ${dots[i].getAttribute('cy')}`;
    }
    
    // Close the path
    pathD += ` L ${dots[0].getAttribute('cx')} ${dots[0].getAttribute('cy')}`;
    
    const path = lineGroup.querySelector('.path');
    if (path) {
      path.setAttribute('d', pathD);
    }
  }
  
  // Animate based on scroll progress
  function animateGeometry(progress) {
    const dots = document.querySelectorAll('.geometry .dot');
    
    // Calculate how much to break apart the geometry
    // progress from 0 (intact) to 1 (fully exploded)
    const explosionFactor = progress;
    
    dots.forEach(dot => {
      const index = parseInt(dot.getAttribute('data-index'));
      const originalX = parseFloat(dot.getAttribute('data-original-x'));
      const originalY = parseFloat(dot.getAttribute('data-original-y'));
      const angle = parseFloat(dot.getAttribute('data-angle'));
      
      // Calculate new position based on explosion factor
      // Dots move outward along their angle
      const distance = baseRadius * explosionFactor * (1 + Math.random() * 0.5);
      const newX = originalX + Math.cos(angle) * distance;
      const newY = originalY + Math.sin(angle) * distance;
      
      // Calculate scale based on progress
      const scale = minScale + (maxScale - minScale) * (1 - progress);
      
      // Apply transformations
      dot.setAttribute('cx', newX);
      dot.setAttribute('cy', newY);
      dot.setAttribute('r', 5 * scale);
      
      // Adjust opacity based on progress
      const opacity = 1 - (progress * 0.8);
      dot.style.opacity = opacity;
    });
    
    // Update the line connecting the dots
    updateLinePath(dots);
    
    // Fade out the intro animation container
    introAnimation.style.opacity = 1 - progress;
  }
  
  // Initialize geometry
  const dots = generateGeometry();
  
  // Initial animation setup for text elements
  anime({
    targets: [introTitle, introSubtitle],
    opacity: [0, 1],
    translateY: [20, 0],
    delay: anime.stagger(200),
    easing: 'easeOutQuad',
    duration: 800
  });
  
  // Show scroll indicator after initial animation
  setTimeout(() => {
    anime({
      targets: scrollIndicator,
      opacity: [0, 1],
      duration: 600,
      easing: 'easeOutQuad'
    });
  }, 1200);
  
  // Scroll handler
  window.addEventListener('scroll', () => {
    // Calculate scroll progress (0 to 1)
    const viewportHeight = window.innerHeight;
    scrollProgress = Math.min(1, window.scrollY / viewportHeight);
    
    // Update animation based on scroll progress
    animateGeometry(scrollProgress);
  });
  
  // Set initial state
  animateGeometry(0);
}); 