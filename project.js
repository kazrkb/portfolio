document.addEventListener('DOMContentLoaded', () => {
    // Get project ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get('id');

    if (!projectId) {
        showError();
        return;
    }

    // Fetch data from JSON "Database"
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            const project = data.projects.find(p => p.id === projectId);
            if (project) {
                renderProject(project);
            } else {
                showError();
            }
        })
        .catch(error => {
            console.error('Error loading data:', error);
            showError();
        });
});

function renderProject(project) {
    document.title = `${project.title} | Portfolio`;
    
    // Header
    document.getElementById('p-image').src = project.image;
    document.getElementById('p-title').innerText = project.title;
    document.getElementById('p-meta').innerText = `Completed: ${project.year}`;
    
    // Tags
    const tagsContainer = document.getElementById('p-tags');
    tagsContainer.innerHTML = project.tags.map(tag => `<span class="tag">${tag}</span>`).join('');
    
    // Meta Box
    document.getElementById('p-scores').innerText = project.scores;
    document.getElementById('p-code').href = project.codeLink;
    
    // Content Sections (The Research Report)
    const sectionsContainer = document.getElementById('p-sections');
    const details = project.projectDetails;
    let sectionsHtml = '';
    
    if (details) {
        // Abstract
        if (details.abstract) {
            sectionsHtml += `
                <div class="article-section">
                    <h2>Abstract</h2>
                    <p>${details.abstract}</p>
                </div>
            `;
        }
        
        // Problem Statement
        if (details.problemStatement) {
            sectionsHtml += `
                <div class="article-section">
                    <h2>Problem Statement</h2>
                    <p>${details.problemStatement}</p>
                </div>
            `;
        }
        
        // Methodology (Image Left, Text Right)
        if (details.methodology) {
            let itemsHtml = '';
            if (details.methodology.items) {
                itemsHtml = details.methodology.items.map(item => `
                    <div class="methodology-item">
                        <img src="${item.image}" alt="Methodology Image">
                        <div>
                            <p>${item.description}</p>
                        </div>
                    </div>
                `).join('');
            }
            
            sectionsHtml += `
                <div class="article-section">
                    <h2>Methodology</h2>
                    <p class="section-intro">${details.methodology.intro || ''}</p>
                    <div class="methodology-container">
                        ${itemsHtml}
                    </div>
                </div>
            `;
        }
        
        // Results (Text Left, Image Right)
        if (details.results) {
            let itemsHtml = '';
            if (details.results.items) {
                itemsHtml = details.results.items.map(item => `
                    <div class="results-item">
                        <div>
                            <p>${item.description}</p>
                        </div>
                        <img src="${item.image}" alt="Result Image">
                    </div>
                `).join('');
            }
            
            sectionsHtml += `
                <div class="article-section">
                    <h2>Results & Evaluation</h2>
                    <p class="section-intro">${details.results.intro || ''}</p>
                    <div class="results-container">
                        ${itemsHtml}
                    </div>
                </div>
            `;
        }
        
        // Conclusion
        if (details.conclusion) {
            sectionsHtml += `
                <div class="article-section" style="margin-top: 40px; border-top: 2px solid var(--md-surface-2); padding-top: 20px;">
                    <h2>Conclusion</h2>
                    <p>${details.conclusion}</p>
                </div>
            `;
        }
    } else {
        // Fallback
        sectionsHtml = `<div class="article-section"><p>${project.description}</p></div>`;
    }
    
    sectionsContainer.innerHTML = sectionsHtml;
    
    // Show wrapper
    document.getElementById('project-content-wrapper').style.display = 'block';
}

function showError() {
    document.getElementById('error-message').style.display = 'block';
}
