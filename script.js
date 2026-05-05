document.addEventListener('DOMContentLoaded', () => {
    // Fetch data from JSON "Database"
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            populateHero(data.profile);
            populateSkills(data.skills);
            populateProjects(data.projects);
            populateExperience(data.experience);
            populateEducation(data.education);
        })
        .catch(error => console.error('Error loading data:', error));
});

function populateHero(profile) {
    document.getElementById('hero-name').innerText = profile.name;
    document.getElementById('hero-title').innerText = profile.title;
    document.getElementById('hero-bio').innerText = profile.bio;
}

function populateSkills(skills) {
    const container = document.getElementById('skills-container');
    skills.forEach(skillGroup => {
        const div = document.createElement('div');
        div.className = 'skill-category elevation-2';
        
        let itemsHtml = skillGroup.items.map(item => `<li>${item}</li>`).join('');
        
        div.innerHTML = `
            <h3>${skillGroup.category}</h3>
            <ul>${itemsHtml}</ul>
        `;
        container.appendChild(div);
    });
}

function populateProjects(projects) {
    const container = document.getElementById('projects-container');
    
    // Store projects globally for modal access
    window.portfolioProjects = projects;

    projects.forEach(project => {
        const card = document.createElement('div');
        card.className = 'card elevation-2';
        
        let tagsHtml = project.tags.map(tag => `<span class="tag">${tag}</span>`).join('');
        
        card.innerHTML = `
            <img src="${project.image}" alt="${project.title}" class="project-img">
            <div class="project-content">
                <h3 class="project-title primary-text">${project.title} <span style="color:#555; font-size:1rem">(${project.year})</span></h3>
                <div class="tags">${tagsHtml}</div>
                <p class="project-desc">${project.shortDescription}</p>
                <a href="project.html?id=${project.id}" class="btn btn-outline" style="text-align: center; margin-top: auto;">Read Full Report</a>
            </div>
        `;
        container.appendChild(card);
    });
}


function populateExperience(experienceList) {
    const container = document.getElementById('experience-container');
    experienceList.forEach(exp => {
        const div = document.createElement('div');
        div.className = 'timeline-item elevation-1';
        
        let detailsHtml = exp.details.map(d => `<li>${d}</li>`).join('');
        
        div.innerHTML = `
            <div class="timeline-date">${exp.duration}</div>
            <div class="timeline-title primary-text">${exp.role}</div>
            <div class="timeline-subtitle">${exp.company} | ${exp.location}</div>
            <ul style="padding-left: 20px; font-size: 0.9rem;">${detailsHtml}</ul>
        `;
        container.appendChild(div);
    });
}

function populateEducation(educationList) {
    const container = document.getElementById('education-container');
    educationList.forEach(edu => {
        const div = document.createElement('div');
        div.className = 'timeline-item elevation-1';
        
        div.innerHTML = `
            <div class="timeline-date">${edu.duration}</div>
            <div class="timeline-title primary-text">${edu.degree}</div>
            <div class="timeline-subtitle">${edu.institution}</div>
            <div style="font-weight: 500; color: var(--md-secondary); margin-top:5px;">${edu.score}</div>
        `;
        container.appendChild(div);
    });
}
