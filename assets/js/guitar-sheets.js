document.addEventListener('DOMContentLoaded', function() {
  // Only run on guitar sheets page
  if (!document.querySelector('.guitar-sheets-page')) return;
  
  const difficultyFilter = document.getElementById('difficulty-filter');
  const typeFilter = document.getElementById('type-filter');
  const searchInput = document.getElementById('sheet-search');
  const sheetCards = document.querySelectorAll('.sheet-card');
  
  // Filter function
  function filterSheets() {
    const difficultyValue = difficultyFilter.value;
    const typeValue = typeFilter.value;
    const searchValue = searchInput.value.toLowerCase();
    
    sheetCards.forEach(card => {
      const difficulty = card.dataset.difficulty;
      const type = card.dataset.type;
      const title = card.querySelector('h3').textContent.toLowerCase();
      const description = card.querySelector('p:not(.sheet-meta)').textContent.toLowerCase();
      
      // Check if card matches all filters
      const matchesDifficulty = difficultyValue === 'all' || difficulty === difficultyValue;
      const matchesType = typeValue === 'all' || type === typeValue;
      const matchesSearch = searchValue === '' || 
                            title.includes(searchValue) || 
                            description.includes(searchValue);
      
      // Show or hide based on matches
      if (matchesDifficulty && matchesType && matchesSearch) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  }
  
  // Add event listeners
  difficultyFilter.addEventListener('change', filterSheets);
  typeFilter.addEventListener('change', filterSheets);
  searchInput.addEventListener('input', filterSheets);
  
  // Initialize
  filterSheets();
}); 