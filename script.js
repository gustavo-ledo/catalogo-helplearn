document.addEventListener('DOMContentLoaded', () => {
  fetch('data.json')
    .then(response => response.json())
    .then(data => {
      getCourses(data.courses);
      setupSearch(data.courses);
    })
    .catch(error => console.error('Error:', error));
});

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color; 
}

function getCourses(courses) {
  const coursesContainer = document.getElementsByClassName('card-wrapper')[0];
  coursesContainer.innerHTML = courses.map(course => `
    <div class="card-item" id="${course.id}"> <!-- Adicione um ID para cada curso -->
      <img src="${course.imageUrl}" alt="${course.nameCourse}" />
      <div class="card-content">
        <h3>${course.nameCourse}</h3>
        <p>${course.descriptionCourse}</p>
        <div class="type-course">
          <span style="background-color: ${getRandomColor()};">${course.typeCourse}</span>
        </div>
        <button type="button">I want this!</button>
      </div>
    </div>`).join('');
}

function setupSearch(courses) {
  const searchInput = document.getElementById('search-course');

  searchInput.addEventListener('input', function () {
    const searchTerm = searchInput.value.toLowerCase();
    
    const matchingCourses = courses.filter(course => 
      course.nameCourse.toLowerCase().includes(searchTerm)
    );

    if (matchingCourses.length > 0) {
      const firstMatchId = matchingCourses[0].id;
      const firstMatchElement = document.getElementById(firstMatchId);
      
      firstMatchElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('section');

  const observer = new IntersectionObserver(entries => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        entry.target.style.animationDelay = `${index * 0.3}s`;
        entry.target.style.animationPlayState = 'running';
      }
    });
  });

  sections.forEach(section => {
    section.style.animationPlayState = 'paused';
    observer.observe(section);
  });
});


