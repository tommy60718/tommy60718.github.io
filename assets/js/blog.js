document.addEventListener('DOMContentLoaded', function() {
  const buttons = document.querySelectorAll('.category-button');
  const cards = document.querySelectorAll('.blog-card');
  
  buttons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons
      buttons.forEach(b => b.classList.remove('active'));
      button.classList.add('active');
      
      const category = button.dataset.category;
      
      // Filter cards
      cards.forEach(card => {
        const categories = card.dataset.categories.split(' ');
        if (category === 'all' || categories.includes(category)) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}); 