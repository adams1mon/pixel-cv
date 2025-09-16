import { PDFTemplate } from '../services/JSXParser';

// Modern PDF Template using JSX strings
export const modernPDFTemplate: PDFTemplate = {
  id: 'modern-pdf',
  name: 'Modern PDF Template',
  template: `
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.name}>
            {{sections.header.personalInfo.firstName}} {{sections.header.personalInfo.lastName}}
          </Text>
          <Text style={styles.title}>{{sections.header.personalInfo.title}}</Text>
          <Text style={styles.location}>{{sections.header.personalInfo.location}}</Text>
          <Text style={styles.email}>{{sections.header.contact.email}}</Text>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Professional Summary</Text>
          <Text style={styles.summaryText}>{{sections.summary.content}}</Text>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Experience</Text>
          {{#each sections.experience}}
          <View style={styles.experienceItem}>
            <Text style={styles.position}>{{position}}</Text>
            <Text style={styles.company}>{{company}} - {{location}}</Text>
            <Text style={styles.dates}>{{startDate}} - {{#if isCurrentPosition}}Present{{else}}{{endDate}}{{/if}}</Text>
            <Text style={styles.description}>{{description}}</Text>
          </View>
          {{/each}}
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Education</Text>
          {{#each sections.education}}
          <View style={styles.educationItem}>
            <Text style={styles.degree}>{{degree}} in {{fieldOfStudy}}</Text>
            <Text style={styles.institution}>{{institution}} - {{location}}</Text>
            <Text style={styles.dates}>{{startDate}} - {{#if isOngoing}}Present{{else}}{{endDate}}{{/if}}</Text>
          </View>
          {{/each}}
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Skills</Text>
          <View style={styles.skillsContainer}>
            {{#each sections.skills.skills}}
            <Text style={styles.skillItem}>{{name}}</Text>
            {{/each}}
          </View>
        </View>
      </Page>
    </Document>
  `,
  styles: {
    page: {
      fontFamily: 'Helvetica',
      fontSize: 11,
      paddingTop: 30,
      paddingLeft: 30,
      paddingRight: 30,
      paddingBottom: 30,
      lineHeight: 1.5
    },
    header: {
      marginBottom: 20,
      textAlign: 'center',
      borderBottomWidth: 2,
      borderBottomColor: '#3b82f6',
      paddingBottom: 10
    },
    name: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#1f2937',
      marginBottom: 5
    },
    title: {
      fontSize: 16,
      color: '#6b7280',
      marginBottom: 3
    },
    location: {
      fontSize: 12,
      color: '#6b7280',
      marginBottom: 2
    },
    email: {
      fontSize: 12,
      color: '#3b82f6',
      marginBottom: 2
    },
    section: {
      marginBottom: 15
    },
    sectionTitle: {
      fontSize: 14,
      fontWeight: 'bold',
      color: '#1f2937',
      marginBottom: 8,
      borderBottomWidth: 1,
      borderBottomColor: '#e5e7eb',
      paddingBottom: 2
    },
    summaryText: {
      fontSize: 11,
      color: '#4b5563',
      lineHeight: 1.4
    },
    experienceItem: {
      marginBottom: 12
    },
    position: {
      fontSize: 13,
      fontWeight: 'bold',
      color: '#1f2937',
      marginBottom: 2
    },
    company: {
      fontSize: 12,
      color: '#3b82f6',
      marginBottom: 2
    },
    dates: {
      fontSize: 10,
      color: '#6b7280',
      marginBottom: 3
    },
    description: {
      fontSize: 11,
      color: '#4b5563',
      lineHeight: 1.3
    },
    educationItem: {
      marginBottom: 10
    },
    degree: {
      fontSize: 12,
      fontWeight: 'bold',
      color: '#1f2937',
      marginBottom: 2
    },
    institution: {
      fontSize: 11,
      color: '#3b82f6',
      marginBottom: 2
    },
    skillsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 5
    },
    skillItem: {
      fontSize: 10,
      color: '#1f2937',
      backgroundColor: '#f3f4f6',
      padding: 3,
      borderRadius: 3,
      marginRight: 5,
      marginBottom: 3
    }
  }
}; 