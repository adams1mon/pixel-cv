'use client';

import Handlebars from 'handlebars';
import { HandlebarsTemplate, TemplateRenderer } from '../types/handlebars-template';
import { CVData } from '../types/cv-data';

// Template compilation cache for performance
const templateCache = new Map<string, HandlebarsTemplateDelegate>();

export class HandlebarsTemplateRenderer implements TemplateRenderer {
  constructor() {
    this.registerHelpers();
  }

  render(data: CVData, template: HandlebarsTemplate): string {
    try {
      // Get or compile template
      const compiledTemplate = this.getCompiledTemplate(template);
      
      // Render with data
      const html = compiledTemplate(data);
      
      return html;
    } catch (error) {
      console.error('Template rendering error:', error);
      return this.renderError(error as Error, template);
    }
  }

  renderWithStyles(data: CVData, template: HandlebarsTemplate): string {
    const html = this.render(data, template);
    
    // Inject styles into the HTML
    return `
      <style>${template.styles}</style>
      ${html}
    `;
  }

  private getCompiledTemplate(template: HandlebarsTemplate): HandlebarsTemplateDelegate {
    // Check cache first
    if (templateCache.has(template.id)) {
      return templateCache.get(template.id)!;
    }

    // Compile template
    const compiled = Handlebars.compile(template.template);
    
    // Cache for future use
    templateCache.set(template.id, compiled);
    
    return compiled;
  }

  private registerHelpers(): void {
    // TODO: are these used??
    // Register custom Handlebars helpers for CV-specific operations

    // Helper for EQ logic 
    Handlebars.registerHelper('eq', function(a, b) {
      return a === b;
    });
    
    // Helper for OR logic (since Handlebars doesn't have built-in OR)
    Handlebars.registerHelper('or', function(...args) {
      // Remove the options object (last argument)
      const values = args.slice(0, -1);
      return values.some(val => !!val);
    });

    // Helper for AND logic (since Handlebars doesn't have built-in AND)
    Handlebars.registerHelper('and', function(...args) {
      // Remove the options object (last argument)
      const values = args.slice(0, -1);
      return values.every(val => !!val);
    });

    // Helper for formatting dates
    Handlebars.registerHelper('formatDate', function(dateString: string) {
      if (!dateString) return '';
      
      // Simple date formatting - can be enhanced
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short' 
      });
    });

    // Helper for full name
    Handlebars.registerHelper('fullName', function(personalInfo: any) {
      if (!personalInfo) return '';
      const { firstName = '', lastName = '' } = personalInfo;
      return `${firstName} ${lastName}`.trim();
    });

    // Helper for phone formatting
    Handlebars.registerHelper('formatPhone', function(phone: string) {
      if (!phone) return '';
      
      // Simple phone formatting - can be enhanced
      const cleaned = phone.replace(/\D/g, '');
      if (cleaned.length === 10) {
        return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
      }
      return phone; // Return original if can't format
    });

    // Helper for conditional classes
    Handlebars.registerHelper('conditionalClass', function(condition: any, className: string) {
      return condition ? className : '';
    });

    // Helper for array length check
    Handlebars.registerHelper('hasItems', function(array: any[]) {
      return Array.isArray(array) && array.length > 0;
    });

    // Helper for debugging (useful during development)
    Handlebars.registerHelper('debug', function(context: any) {
      console.log('Handlebars debug:', context);
      return '';
    });

    // Helper for capitalizing strings
    Handlebars.registerHelper('capitalize', function(str: string) {
      if (!str) return '';
      return str.charAt(0).toUpperCase() + str.slice(1);
    });
  }

  private renderError(error: Error, template: HandlebarsTemplate): string {
    return `
      <div style="
        border: 2px solid #ef4444;
        border-radius: 8px;
        padding: 1rem;
        margin: 1rem;
        background: #fef2f2;
        color: #991b1b;
        font-family: monospace;
      ">
        <h3 style="margin: 0 0 1rem 0; color: #dc2626;">Template Rendering Error</h3>
        <p><strong>Template:</strong> ${template.name} (${template.id})</p>
        <p><strong>Error:</strong> ${error.message}</p>
        <details style="margin-top: 1rem;">
          <summary style="cursor: pointer;">Stack Trace</summary>
          <pre style="margin-top: 0.5rem; font-size: 0.75rem;">${error.stack}</pre>
        </details>
      </div>
    `;
  }

  // Utility methods for cache management
  clearCache(): void {
    templateCache.clear();
  }

  getCacheSize(): number {
    return templateCache.size;
  }

  removeCachedTemplate(templateId: string): boolean {
    return templateCache.delete(templateId);
  }
} 