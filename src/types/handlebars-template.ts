// Simple string-based template system for Handlebars prototype
export interface HandlebarsTemplate {
  id: string;
  name: string;
  description: string;
  template: string; // Raw Handlebars template string
  styles: string;   // Raw CSS string
}

// Template renderer interface
export interface TemplateRenderer {
  render(data: any, template: HandlebarsTemplate): string;
}

// Sample modern template for testing
export const modernHandlebarsTemplate: HandlebarsTemplate = {
  id: 'modern-handlebars',
  name: 'Modern (Handlebars)',
  description: 'Clean, professional design using Handlebars template engine',
  template: `
<div class="cv-document modern-handlebars">
  <header class="cv-header">
    <div class="name-section">
      <h1 class="full-name">{{sections.header.personalInfo.firstName}} {{sections.header.personalInfo.lastName}}</h1>
      {{#if sections.header.personalInfo.title}}
        <p class="professional-title">{{sections.header.personalInfo.title}}</p>
      {{/if}}
    </div>
    
    <div class="contact-section">
      <div class="contact-row">
        {{#if sections.header.personalInfo.location}}
          <div class="contact-item">
            <span class="icon">📍</span>
            <span>{{sections.header.personalInfo.location}}</span>
          </div>
        {{/if}}
        
        {{#if sections.header.contact.email}}
          <div class="contact-item">
            <span class="icon">✉️</span>
            <span>{{sections.header.contact.email}}</span>
          </div>
        {{/if}}
        
        {{#if sections.header.contact.phone}}
          <div class="contact-item">
            <span class="icon">📞</span>
            <span>{{sections.header.contact.phone}}</span>
          </div>
        {{/if}}
      </div>
      
      {{#if (or sections.header.contact.website sections.header.contact.linkedin sections.header.contact.github)}}
        <div class="contact-row">
          {{#if sections.header.contact.website}}
            <div class="contact-item">
              <span class="icon">🌐</span>
              <a href="{{sections.header.contact.website}}" target="_blank">{{sections.header.contact.website}}</a>
            </div>
          {{/if}}
          
          {{#if sections.header.contact.linkedin}}
            <div class="contact-item">
              <span class="icon">💼</span>
              <a href="{{sections.header.contact.linkedin}}" target="_blank">LinkedIn</a>
            </div>
          {{/if}}
          
          {{#if sections.header.contact.github}}
            <div class="contact-item">
              <span class="icon">💻</span>
              <a href="{{sections.header.contact.github}}" target="_blank">GitHub</a>
            </div>
          {{/if}}
        </div>
      {{/if}}
    </div>
  </header>
  
  {{#if sections.summary.isVisible }}
    <section class="cv-section summary-section">
      <h2 class="section-title">Professional Summary</h2>
      <p class="summary-content">{{sections.summary.content}}</p>
    </section>
  {{/if}}
  
  {{#if sections.experience}}
    <section class="cv-section experience-section">
      <h2 class="section-title">Professional Experience</h2>
      {{#each sections.experience}}
        <div class="experience-item">
          <div class="experience-header">
            <h3 class="position">{{position}}</h3>
            <span class="company">{{company}}</span>
          </div>
          <div class="experience-meta">
            <span class="location">{{location}}</span>
            <span class="dates">{{startDate}} - {{#if isCurrentPosition}}Present{{else}}{{endDate}}{{/if}}</span>
          </div>
          {{#if description}}
            <p class="description">{{description}}</p>
          {{/if}}
        </div>
      {{/each}}
    </section>
  {{/if}}
  
  {{#if sections.education}}
    <section class="cv-section education-section">
      <h2 class="section-title">Education</h2>
      {{#each sections.education}}
        <div class="education-item">
          <div class="education-header">
            <h3 class="degree">{{degree}}{{#if fieldOfStudy}} in {{fieldOfStudy}}{{/if}}</h3>
            <span class="institution">{{institution}}</span>
          </div>
          <div class="education-meta">
            <span class="location">{{location}}</span>
            <span class="dates">{{startDate}} - {{#if isOngoing}}Present{{else}}{{endDate}}{{/if}}</span>
          </div>
          {{#if (or gpa honors)}}
            <div class="education-details">
              {{#if gpa}}<span class="gpa">GPA: {{gpa}}</span>{{/if}}
              {{#if honors}}<span class="honors">{{honors}}</span>{{/if}}
            </div>
          {{/if}}
        </div>
      {{/each}}
    </section>
  {{/if}}
  
  {{#if (and sections.skills.isVisible sections.skills.skills)}}
    <section class="cv-section skills-section">
      <h2 class="section-title">Skills</h2>
      <div class="skills-container">
        {{#each sections.skills.skills}}
          <div class="skill-item">
            <span class="skill-name">{{name}}</span>
            {{#if proficiency}}
              <span class="skill-proficiency">{{proficiency}}</span>
            {{/if}}
            {{#if yearsOfExperience}}
              <span class="skill-years">{{yearsOfExperience}} years</span>
            {{/if}}
          </div>
        {{/each}}
      </div>
    </section>
  {{/if}}
  
  {{#if sections.projects}}
    <section class="cv-section projects-section">
      <h2 class="section-title">Projects</h2>
      {{#each sections.projects}}
        {{#if isVisible}}
          <div class="project-item">
            <div class="project-header">
              <h3 class="project-name">{{name}}</h3>
              {{#if (or startDate endDate)}}
                <span class="project-dates">
                  {{#if startDate}}{{startDate}}{{/if}}{{#if (and startDate endDate)}} - {{/if}}{{#if endDate}}{{endDate}}{{/if}}
                </span>
              {{/if}}
            </div>
            
            {{#if description}}
              <p class="project-description">{{description}}</p>
            {{/if}}
            
            {{#if technologies}}
              <div class="project-technologies">
                {{#each technologies}}
                  <span class="tech-tag">{{this}}</span>
                {{/each}}
              </div>
            {{/if}}
            
            {{#if links}}
              <div class="project-links">
                {{#each links}}
                  <a href="{{url}}" class="project-link" target="_blank" rel="noopener noreferrer">
                    {{#if (eq type 'github')}}
                      <span class="link-icon">💻</span>
                    {{else if (eq type 'demo')}}
                      <span class="link-icon">🔗</span>
                    {{else if (eq type 'website')}}
                      <span class="link-icon">🌐</span>
                    {{else if (eq type 'docs')}}
                      <span class="link-icon">📚</span>
                    {{else if (eq type 'video')}}
                      <span class="link-icon">▶️</span>
                    {{else}}
                      <span class="link-icon">📎</span>
                    {{/if}}
                    {{#if label}}{{label}}{{else}}{{url}}{{/if}}
                  </a>
                {{/each}}
              </div>
            {{/if}}
          </div>
        {{/if}}
      {{/each}}
    </section>
  {{/if}}
  
  </div>
</div>
  `,
  styles: `
.cv-document.modern-handlebars {
  font-family: 'Inter', system-ui, sans-serif;
  max-width: 8.5in;
  margin: 0 auto;
  padding: 1.5rem;
  background: white;
  color: #1f2937;
  line-height: 1.6;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

.cv-header {
  text-align: center;
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 2px solid #3b82f6;
  page-break-after: avoid;
}

.name-section {
  margin-bottom: 1rem;
}

.full-name {
  font-size: 2.5rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 0.5rem 0;
}

.professional-title {
  font-size: 1.25rem;
  color: #6b7280;
  margin: 0;
}

.contact-section {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.contact-row {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: #6b7280;
}

.contact-item .icon {
  font-size: 1rem;
}

.contact-item a {
  color: #3b82f6;
  text-decoration: none;
}

.contact-item a:hover {
  text-decoration: underline;
}

.cv-section {
  margin-bottom: 2rem;
  page-break-inside: avoid;
  break-inside: avoid;
}

.section-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #3b82f6;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.summary-content {
  font-size: 1rem;
  color: #4b5563;
  margin: 0;
}

.experience-item {
  margin-bottom: 1.5rem;
  page-break-inside: avoid;
  break-inside: avoid;
}

.experience-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 0.25rem;
}

.position {
  font-size: 1.125rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
}

.company {
  font-weight: 500;
  color: #3b82f6;
}

.experience-meta {
  display: flex;
  justify-content: space-between;
  font-size: 0.875rem;
  color: #6b7280;
  margin-bottom: 0.5rem;
}

.description {
  color: #4b5563;
  margin: 0;
}

.education-item {
  margin-bottom: 1.5rem;
  page-break-inside: avoid;
  break-inside: avoid;
}

.education-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 0.25rem;
}

.degree {
  font-size: 1.125rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
}

.institution {
  font-weight: 500;
  color: #3b82f6;
}

.education-meta {
  display: flex;
  justify-content: space-between;
  font-size: 0.875rem;
  color: #6b7280;
  margin-bottom: 0.5rem;
}

.education-details {
  display: flex;
  gap: 1rem;
  font-size: 0.875rem;
  color: #6b7280;
}

.gpa {
  font-weight: 500;
}

.honors {
  font-style: italic;
}

.skills-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.skill-item {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: #f3f4f6;
  border-radius: 9999px;
  font-size: 0.875rem;
}

.skill-name {
  font-weight: 500;
  color: #1f2937;
}

.skill-proficiency {
  font-size: 0.75rem;
  color: #6b7280;
  text-transform: capitalize;
}

.skill-years {
  font-size: 0.75rem;
  color: #6b7280;
}

.project-item {
  margin-bottom: 2rem;
  border-bottom: 1px solid #e5e7eb;
  padding-bottom: 1.5rem;
}

.project-item:last-child {
  border-bottom: none;
  margin-bottom: 0;
  padding-bottom: 0;
}

.project-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 0.75rem;
}

.project-name {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
}

.project-dates {
  font-size: 0.875rem;
  color: #6b7280;
  font-weight: 500;
}

.project-description {
  color: #4b5563;
  margin-bottom: 1rem;
  line-height: 1.6;
}

.project-technologies {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.tech-tag {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  background: #dbeafe;
  color: #1e40af;
  border-radius: 9999px;
  font-size: 0.8125rem;
  font-weight: 500;
}

.project-links {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.project-link {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  color: #3b82f6;
  font-size: 0.875rem;
  font-weight: 500;
  text-decoration: none;
  transition: color 0.2s;
}

.project-link:hover {
  color: #1d4ed8;
}

.link-icon {
  font-size: 1rem;
}

@media (max-width: 768px) {
  .cv-document.modern-handlebars {
    padding: 1rem;
  }
  
  .full-name {
    font-size: 2rem;
  }
  
  .contact-row {
    flex-direction: column;
    align-items: center;
  }
  
  .experience-header {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .experience-meta {
    flex-direction: column;
  }
  
  .education-header {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .education-meta {
    flex-direction: column;
  }
  
  .education-details {
    flex-direction: column;
    gap: 0.25rem;
  }
  
  .skills-container {
    gap: 0.375rem;
  }
  
  .skill-item {
    padding: 0.375rem 0.75rem;
    font-size: 0.8125rem;
  }
  
  .project-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.25rem;
  }
  
  .project-name {
    font-size: 1.125rem;
  }
  
  .project-technologies {
    gap: 0.375rem;
  }
  
  .tech-tag {
    font-size: 0.75rem;
    padding: 0.1875rem 0.625rem;
  }
  
  .project-links {
    gap: 0.5rem;
  }
  
  .project-link {
    font-size: 0.8125rem;
  }
}

/* Print-specific styles for PDF generation */
@media print {
  /* Page setup for A4 */
  @page {
    size: A4;
    margin: 0.5in;
  }
  
  /* Reset for print */
  * {
    -webkit-print-color-adjust: exact !important;
    color-adjust: exact !important;
    print-color-adjust: exact !important;

    /* Hide scrollbars in print */
    scrollbar-width: none !important; /* Firefox */
    -ms-overflow-style: none !important; /* IE/Edge */
  }
  
  *::-webkit-scrollbar {
    display: none !important; /* Chrome, Safari, Opera */
  }
  
}
  `
}; 

  // html, body {
  //   background: white !important;
  //   font-size: 12pt;
  //   line-height: 1.4;
  // }
  
  // /* Document adjustments for print */
  // .cv-document.modern-handlebars {
  //   max-width: none !important;
  //   margin: 0 !important;
  //   padding: 0 !important;
  //   box-shadow: none !important;
  //   border-radius: 0 !important;
  //   background: white !important;
  //   font-size: 12pt;
  // }
  
  // /* Header optimizations */
  // .cv-header {
  //   margin-bottom: 1.5rem;
  //   padding-bottom: 1rem;
  //   page-break-after: avoid;
  // }
  
  // .full-name {
  //   font-size: 18pt;
  //   margin-bottom: 0.25rem;
  // }
  
  // .professional-title {
  //   font-size: 14pt;
  //   margin-bottom: 0.5rem;
  // }
  
  // .contact-item {
  //   font-size: 10pt;
  // }
  
  // /* Section optimizations */
  // .section-title {
  //   font-size: 14pt;
  //   margin-bottom: 0.75rem;
  //   page-break-after: avoid;
  // }
  
  // /* Experience section */
  // .position {
  //   font-size: 12pt;
  // }
  
  // .company {
  //   font-size: 11pt;
  // }
  
  // .experience-meta {
  //   font-size: 10pt;
  //   margin-bottom: 0.4rem;
  // }
  
  // .description {
  //   font-size: 11pt;
  //   line-height: 1.3;
  // }
  
  // /* Education section */
  // .degree {
  //   font-size: 12pt;
  // }
  
  // .institution {
  //   font-size: 11pt;
  // }
  
  // .education-meta {
  //   font-size: 10pt;
  // }
  
  // /* Skills section */
  // .skill-item {
  //   padding: 0.3rem 0.6rem;
  //   font-size: 10pt;
  //   background: #f3f4f6 !important;
  //   -webkit-print-color-adjust: exact !important;
  // }
  
  // /* Projects section */
  // .project-name {
  //   font-size: 12pt;
  // }
  
  // .project-description {
  //   font-size: 11pt;
  //   line-height: 1.3;
  // }
  
  // .tech-tag {
  //   padding: 0.2rem 0.5rem;
  //   font-size: 9pt;
  //   background: #dbeafe !important;
  //   color: #1e40af !important;
  //   -webkit-print-color-adjust: exact !important;
  // }
  
  // /* Summary section */
  // .summary-content {
  //   font-size: 11pt;
  //   line-height: 1.4;
  // }