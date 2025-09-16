// Lightweight JSX Parser for React-PDF Templates
export interface JSXElement {
  type: string;
  props: Record<string, any>;
  children: (JSXElement | string)[];
}

export interface PDFTemplate {
  id: string;
  name: string;
  template: string; // JSX as string
  styles: Record<string, any>;
}

export class JSXParser {
  private pos = 0;
  private input = '';

  parse(jsx: string): JSXElement {
    this.pos = 0;
    this.input = jsx.trim();
    return this.parseElement();
  }

  private parseElement(): JSXElement {
    this.skipWhitespace();
    
    if (this.input[this.pos] !== '<') {
      throw new Error('Expected < at start of element');
    }
    
    this.pos++; // skip <
    
    // Parse tag name
    const tagName = this.parseTagName();
    
    // Parse attributes
    const props = this.parseAttributes();
    
    this.skipWhitespace();
    
    // Check for self-closing tag
    if (this.input.substr(this.pos, 2) === '/>') {
      this.pos += 2;
      return { type: tagName, props, children: [] };
    }
    
    if (this.input[this.pos] !== '>') {
      throw new Error('Expected > after tag name and attributes');
    }
    
    this.pos++; // skip >
    
    // Parse children
    const children = this.parseChildren(tagName);
    
    return { type: tagName, props, children };
  }

  private parseTagName(): string {
    const start = this.pos;
    while (this.pos < this.input.length && 
           /[a-zA-Z0-9]/.test(this.input[this.pos])) {
      this.pos++;
    }
    return this.input.substring(start, this.pos);
  }

  private parseAttributes(): Record<string, any> {
    const props: Record<string, any> = {};
    
    while (this.pos < this.input.length) {
      this.skipWhitespace();
      
      if (this.input[this.pos] === '>' || this.input.substr(this.pos, 2) === '/>') {
        break;
      }
      
      // Parse attribute name
      const attrName = this.parseAttributeName();
      
      this.skipWhitespace();
      
      if (this.input[this.pos] !== '=') {
        // Boolean attribute
        props[attrName] = true;
        continue;
      }
      
      this.pos++; // skip =
      this.skipWhitespace();
      
      // Parse attribute value
      const attrValue = this.parseAttributeValue();
      props[attrName] = attrValue;
    }
    
    return props;
  }

  private parseAttributeName(): string {
    const start = this.pos;
    while (this.pos < this.input.length && 
           /[a-zA-Z0-9-]/.test(this.input[this.pos])) {
      this.pos++;
    }
    return this.input.substring(start, this.pos);
  }

  private parseAttributeValue(): any {
    this.skipWhitespace();
    
    if (this.input[this.pos] === '"') {
      return this.parseStringValue();
    } else if (this.input[this.pos] === '{') {
      return this.parseExpressionValue();
    }
    
    throw new Error('Expected " or { for attribute value');
  }

  private parseStringValue(): string {
    this.pos++; // skip opening "
    const start = this.pos;
    
    while (this.pos < this.input.length && this.input[this.pos] !== '"') {
      this.pos++;
    }
    
    const value = this.input.substring(start, this.pos);
    this.pos++; // skip closing "
    
    return value;
  }

  private parseExpressionValue(): any {
    this.pos++; // skip opening {
    const start = this.pos;
    let braceCount = 1;
    
    while (this.pos < this.input.length && braceCount > 0) {
      if (this.input[this.pos] === '{') braceCount++;
      if (this.input[this.pos] === '}') braceCount--;
      this.pos++;
    }
    
    const expression = this.input.substring(start, this.pos - 1);
    
    // For now, return as string - we'll evaluate later
    return `{${expression}}`;
  }

  private parseChildren(parentTag: string): (JSXElement | string)[] {
    const children: (JSXElement | string)[] = [];
    
    while (this.pos < this.input.length) {
      this.skipWhitespace();
      
      if (this.input.substr(this.pos, 2) === '</') {
        // End tag
        this.pos += 2;
        const endTag = this.parseTagName();
        
        if (endTag !== parentTag) {
          throw new Error(`Mismatched tags: expected ${parentTag}, got ${endTag}`);
        }
        
        this.skipWhitespace();
        if (this.input[this.pos] !== '>') {
          throw new Error('Expected > after end tag');
        }
        this.pos++;
        
        break;
      } else if (this.input[this.pos] === '<') {
        // Child element
        children.push(this.parseElement());
      } else {
        // Text content
        const text = this.parseTextContent();
        if (text.trim()) {
          children.push(text);
        }
      }
    }
    
    return children;
  }

  private parseTextContent(): string {
    const start = this.pos;
    
    while (this.pos < this.input.length && this.input[this.pos] !== '<') {
      this.pos++;
    }
    
    return this.input.substring(start, this.pos);
  }

  private skipWhitespace(): void {
    while (this.pos < this.input.length && 
           /\s/.test(this.input[this.pos])) {
      this.pos++;
    }
  }
}

// Template compiler - converts JSX tree to React-PDF components
export class PDFTemplateCompiler {
  
  compile(template: PDFTemplate): (data: any) => JSXElement {
    const parser = new JSXParser();
    const jsxTree = parser.parse(template.template);
    
    return (data: any) => {
      return this.processTemplate(jsxTree, data, template.styles);
    };
  }

  private processTemplate(
    element: JSXElement | string, 
    data: any, 
    styles: Record<string, any>
  ): any {
    if (typeof element === 'string') {
      // Process Handlebars in text content
      return this.processHandlebars(element, data);
    }

    const processedProps: Record<string, any> = {};
    
    // Process attributes
    for (const [key, value] of Object.entries(element.props)) {
      if (typeof value === 'string') {
        if (value.startsWith('{') && value.endsWith('}')) {
          // Handle expressions like {styles.page}
          const expr = value.slice(1, -1);
          if (expr.startsWith('styles.')) {
            const styleKey = expr.substring(7);
            processedProps[key] = styles[styleKey];
          } else {
            // Handle other expressions - could be data references
            processedProps[key] = this.evaluateExpression(expr, data);
          }
        } else {
          // Handle Handlebars in string attributes
          processedProps[key] = this.processHandlebars(value, data);
        }
      } else {
        processedProps[key] = value;
      }
    }

    // Process children
    const processedChildren = element.children.map(child => 
      this.processTemplate(child, data, styles)
    );

    return {
      type: element.type,
      props: { ...processedProps, children: processedChildren }
    };
  }

  private processHandlebars(text: string, data: any): string {
    // Simple Handlebars processing - we can expand this
    return text.replace(/\{\{([^}]+)\}\}/g, (match, path) => {
      return this.getNestedValue(data, path.trim()) || '';
    });
  }

  private evaluateExpression(expr: string, data: any): any {
    // Simple expression evaluation
    // For now, just handle data path references
    return this.getNestedValue(data, expr) || expr;
  }

  private getNestedValue(obj: any, path: string): any {
    return path.split('.').reduce((current, key) => {
      return current ? current[key] : undefined;
      // return current && current[key] !== undefined ? current[key] : undefined;
    }, obj);
  }
}

// Usage example:
/*
const template: PDFTemplate = {
  id: 'modern',
  name: 'Modern Template',
  template: `
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.name}>{{sections.header.personalInfo.firstName}} {{sections.header.personalInfo.lastName}}</Text>
          <Text style={styles.title}>{{sections.header.personalInfo.title}}</Text>
        </View>
      </Page>
    </Document>
  `,
  styles: {
    page: { padding: 30 },
    header: { marginBottom: 20 },
    name: { fontSize: 24, fontWeight: 'bold' },
    title: { fontSize: 16, color: '#666' }
  }
};

const compiler = new PDFTemplateCompiler();
const renderTemplate = compiler.compile(template);
const componentTree = renderTemplate(cvData);
*/ 