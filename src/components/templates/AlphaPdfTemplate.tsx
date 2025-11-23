'use client';

import React from 'react';
import { Document, Page, View, Text, StyleSheet, } from '@react-pdf/renderer';
import { JsonResume } from '../../types/jsonresume';

interface AlphaPdfTemplateProps {
  data: JsonResume;
}

const styles = StyleSheet.create({
  document: {
    fontFamily: 'Helvetica',
    color: '#000000'
  },
  page: {
    padding: 20,
    fontSize: 10,
    lineHeight: 1.3,
    display: 'flex',
    flexDirection: 'row'
  },
  
  // Main layout
  leftColumn: {
    flex: 2,
    paddingRight: 15,
    display: 'flex',
    flexDirection: 'column'
  },
  rightColumn: {
    flex: 1,
    paddingLeft: 15,
    display: 'flex',
    flexDirection: 'column'
  },

  // Header styles
  header: {
    marginBottom: 15
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 15,
  },
  title: {
    fontSize: 14,
    color: '#d97706', // Orange/brown color
    marginBottom: 10
  },
  summary: {
    fontSize: 10,
    color: '#000000',
    lineHeight: 1.4,
    textAlign: 'justify'
  },

  // Contact info styles
  contactSection: {
    marginBottom: 20
  },
  contactItem: {
    fontSize: 9,
    color: '#000000',
    marginBottom: 3,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  contactIcon: {
    width: 8,
    marginRight: 5
  },

  // Section styles
  section: {
    marginBottom: 15
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 8,
    borderBottomWidth: 2,
    borderBottomColor: '#d97706',
    paddingBottom: 2
  },

  // Work experience styles
  workItem: {
    marginBottom: 12
  },
  workHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 3
  },
  workPosition: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#000000'
  },
  workCompany: {
    fontSize: 10,
    color: '#000000',
    fontWeight: 'bold'
  },
  workDates: {
    fontSize: 9,
    color: '#666666'
  },
  workLocation: {
    fontSize: 9,
    color: '#666666',
    marginBottom: 4
  },
  workHighlights: {
    marginTop: 4
  },
  workHighlight: {
    fontSize: 9,
    color: '#000000',
    marginBottom: 1,
    paddingLeft: 8
  },

  // Education styles
  eduItem: {
    marginBottom: 10
  },
  eduHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 2
  },
  eduDegree: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#000000'
  },
  eduInstitution: {
    fontSize: 9,
    color: '#000000',
    fontWeight: 'bold'
  },
  eduLocation: {
    fontSize: 8,
    color: '#666666',
    marginBottom: 2
  },
  eduDate: {
    fontSize: 8,
    color: '#666666'
  },
  eduDetails: {
    fontSize: 8,
    color: '#666666',
    fontStyle: 'italic'
  },

  // Skills styles
  skillItem: {
    marginBottom: 8
  },
  skillName: {
    fontSize: 9,
    color: '#000000',
    marginBottom: 2
  },
  skillBar: {
    height: 4,
    backgroundColor: '#d97706',
    borderRadius: 2,
    marginBottom: 2
  },
  skillBarBg: {
    height: 4,
    backgroundColor: '#e5e7eb',
    borderRadius: 2
  },

  // Languages styles
  langItem: {
    marginBottom: 4
  },
  langName: {
    fontSize: 9,
    color: '#000000'
  },

  // Interests styles
  interestItem: {
    marginBottom: 4
  },
  interestName: {
    fontSize: 9,
    color: '#000000'
  }
});

export const AlphaPdfTemplate: React.FC<AlphaPdfTemplateProps> = ({ data }) => {
  const basics = data.basics;
  const work = data.work || [];
  const education = data.education || [];
  const skills = data.skills || [];
  const languages = data.languages || [];
  const interests = data.interests || [];

  return (
    <Document style={styles.document}>
      <Page size="A4" style={styles.page}>
        {/* Left Column - Main Content */}
        <View style={styles.leftColumn}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.name}>{basics.name}</Text>
            {basics.label && <Text style={styles.title}>{basics.label}</Text>}
            {basics.summary && <Text style={styles.summary}>{basics.summary}</Text>}
          </View>

          {/* Work Experience */}
          {work.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Work History</Text>
              {work.map((job, i) => (
                <View key={i} style={styles.workItem}>
                  <View style={styles.workHeader}>
                    <Text style={styles.workPosition}>{job.position}</Text>
                    <Text style={styles.workDates}>
                      {job.startDate}{job.endDate ? ` - ${job.endDate}` : ' - Present'}
                    </Text>
                  </View>
                  <Text style={styles.workCompany}>{job.name}</Text>
                  {job.location && <Text style={styles.workLocation}>{job.location}</Text>}
                  {job.highlights && job.highlights.length > 0 && (
                    <View style={styles.workHighlights}>
                      {job.highlights.map((highlight, hi) => (
                        <Text key={hi} style={styles.workHighlight}>• {highlight}</Text>
                      ))}
                    </View>
                  )}
                </View>
              ))}
            </View>
          )}

          {/* Education */}
          {education.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Education</Text>
              {education.map((edu, i) => (
                <View key={i} style={styles.eduItem}>
                  <View style={styles.eduHeader}>
                    <Text style={styles.eduDegree}>
                      {edu.studyType} {edu.area ? `in ${edu.area}` : ''}
                    </Text>
                    <Text style={styles.eduDate}>
                      {edu.startDate}{edu.endDate ? ` - ${edu.endDate}` : ''}
                    </Text>
                  </View>
                  <Text style={styles.eduInstitution}>{edu.institution}</Text>
                  {edu.courses && edu.courses.length > 0 && (
                    <Text style={styles.eduDetails}>
                      Relevant Courses: {edu.courses.join(', ')}
                    </Text>
                  )}
                </View>
              ))}
            </View>
          )}
        </View>

        {/* Right Column - Contact & Skills */}
        <View style={styles.rightColumn}>
          {/* Contact Information */}
          <View style={styles.contactSection}>
            {basics.phone && (
              <Text style={styles.contactItem}>📞 {basics.phone}</Text>
            )}
            {basics.email && (
              <Text style={styles.contactItem}>✉️ {basics.email}</Text>
            )}
            {basics.location?.city && (
              <Text style={styles.contactItem}>
                📍 {basics.location.city}{basics.location.region ? `, ${basics.location.region}` : ''}
              </Text>
            )}
            {basics.url && (
              <Text style={styles.contactItem}>🌐 {basics.url.replace(/^https?:\/\//, '')}</Text>
            )}
            {basics.profiles && basics.profiles.map((profile, i) => (
              <Text key={i} style={styles.contactItem}>
                🔗 {profile.network}: {profile.username}
              </Text>
            ))}
          </View>

          {/* Skills */}
          {skills.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Skills</Text>
              {skills.map((skill, i) => (
                <View key={i} style={styles.skillItem}>
                  <Text style={styles.skillName}>{skill.name}</Text>
                  <View style={styles.skillBarBg}>
                    <View style={[styles.skillBar, { width: '80%' }]} />
                  </View>
                </View>
              ))}
            </View>
          )}

          {/* Languages */}
          {languages.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Languages</Text>
              {languages.map((lang, i) => (
                <View key={i} style={styles.langItem}>
                  <Text style={styles.langName}>
                    {lang.language} ({lang.fluency})
                  </Text>
                </View>
              ))}
            </View>
          )}

          {/* Interests */}
          {interests.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Interests</Text>
              {interests.map((interest, i) => (
                <View key={i} style={styles.interestItem}>
                  <Text style={styles.interestName}>
                    {interest.name}
                    {interest.keywords && interest.keywords.length > 0 && (
                      <Text> ({interest.keywords.join(', ')})</Text>
                    )}
                  </Text>
                </View>
              ))}
            </View>
          )}
        </View>
      </Page>
    </Document>
  );
}; 