'use client';

import React from 'react';
import { Document, Page, View, Text, StyleSheet, Link } from '@react-pdf/renderer';
import { JsonResume } from '../../types/jsonresume';

interface ModernReactPdfProps {
  data: JsonResume;
}

// TODO: use canvas for graphics
// TODO: use lucide SVG icons instead of emojis

const styles = StyleSheet.create({
  document: {
    fontFamily: 'Roboto',
    color: '#1f2937'
  },
  page: {
    padding: 24,
    fontSize: 11,
    lineHeight: 1.4
  },
  
  // Header styles
  header: {
    textAlign: 'center',
    marginBottom: 24,
    paddingBottom: 16,
    borderBottomWidth: 2,
    borderBottomColor: '#3b82f6'
  },
  name: {
    fontSize: 28,
    fontWeight: 700,
    marginBottom: 6,
    color: '#1f2937'
  },
  label: {
    fontSize: 16,
    color: '#6b7280',
    marginBottom: 8
  },
  contactRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 6
  },
  contactText: {
    fontSize: 10,
    color: '#6b7280',
    marginHorizontal: 8
  },
  contactLink: {
    fontSize: 10,
    color: '#3b82f6',
    marginHorizontal: 8,
    textDecoration: 'none'
  },

  // Section styles
  section: {
    marginBottom: 20
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 700,
    color: '#1f2937',
    marginBottom: 8,
    paddingBottom: 4,
    borderBottomWidth: 2,
    borderBottomColor: '#3b82f6',
    textTransform: 'uppercase',
    letterSpacing: 0.5
  },

  // Summary styles
  summaryText: {
    fontSize: 11,
    color: '#4b5563',
    lineHeight: 1.5,
    textAlign: 'justify'
  },

  // Work/Experience styles
  workItem: {
    marginBottom: 14,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb'
  },
  workHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 3
  },
  workPosition: {
    fontSize: 13,
    fontWeight: 700,
    color: '#1f2937'
  },
  workCompany: {
    fontSize: 12,
    color: '#3b82f6',
    fontWeight: 600
  },
  workMeta: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: 10,
    color: '#6b7280',
    marginBottom: 6
  },
  workSummary: {
    fontSize: 11,
    color: '#4b5563',
    lineHeight: 1.4,
    marginBottom: 4
  },
  highlightsList: {
    marginTop: 4
  },
  highlight: {
    fontSize: 10,
    color: '#4b5563',
    marginBottom: 2,
    paddingLeft: 8
  },
  keywordChips: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 4
  },
  keywordChip: {
    fontSize: 9,
    backgroundColor: '#dbeafe',
    color: '#1e40af',
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 9999,
    marginRight: 4,
    marginBottom: 3
  },

  // Education styles
  eduItem: {
    marginBottom: 12
  },
  eduHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 2
  },
  eduDegree: {
    fontSize: 12,
    fontWeight: 700
  },
  eduInstitution: {
    fontSize: 11,
    color: '#3b82f6'
  },
  eduMeta: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: 10,
    color: '#6b7280',
    marginBottom: 4
  },
  eduDetails: {
    fontSize: 10,
    color: '#6b7280'
  },

  // Skills styles
  skillsWrap: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  skillChip: {
    fontSize: 10,
    color: '#1f2937',
    backgroundColor: '#f3f4f6',
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 9999,
    marginRight: 6,
    marginBottom: 6
  },

  // Projects styles
  projItem: {
    marginBottom: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb'
  },
  projHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 6
  },
  projName: {
    fontSize: 13,
    fontWeight: 700
  },
  projDates: {
    fontSize: 10,
    color: '#6b7280',
    fontWeight: 500
  },
  projDesc: {
    fontSize: 11,
    color: '#4b5563',
    marginBottom: 8,
    lineHeight: 1.4
  },

  // Volunteer styles
  volunteerItem: {
    marginBottom: 12
  },
  volunteerHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 2
  },
  volunteerPosition: {
    fontSize: 12,
    fontWeight: 700
  },
  volunteerOrg: {
    fontSize: 11,
    color: '#059669'
  },

  // Awards styles
  awardItem: {
    marginBottom: 10
  },
  awardTitle: {
    fontSize: 12,
    fontWeight: 700
  },
  awardAwarder: {
    fontSize: 10,
    color: '#d97706',
    fontWeight: 600
  },
  awardDate: {
    fontSize: 10,
    color: '#6b7280'
  },

  // Languages styles
  langItem: {
    marginBottom: 6
  },
  langName: {
    fontSize: 11,
    fontWeight: 600
  },
  langFluency: {
    fontSize: 10,
    color: '#6b7280'
  },

  // Certificate styles
  certItem: {
    marginBottom: 10
  },
  certName: {
    fontSize: 11,
    fontWeight: 600
  },
  certIssuer: {
    fontSize: 10,
    color: '#7c3aed'
  },

  // Interest styles
  interestItem: {
    marginBottom: 8
  },
  interestName: {
    fontSize: 11,
    fontWeight: 600
  },
  interestKeywords: {
    fontSize: 10,
    color: '#6b7280'
  },

  // Publication styles
  pubItem: {
    marginBottom: 12
  },
  pubName: {
    fontSize: 11,
    fontWeight: 700
  },
  pubPublisher: {
    fontSize: 10,
    color: '#7c2d12'
  },

  // Reference styles
  refItem: {
    marginBottom: 12,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6'
  },
  refName: {
    fontSize: 11,
    fontWeight: 700
  },
  refText: {
    fontSize: 10,
    color: '#4b5563',
    fontStyle: 'italic',
    lineHeight: 1.3
  }
});

export const ModernReactPdf: React.FC<ModernReactPdfProps> = ({ data }) => {
  console.log("JsonResume PDF generation started");
  
  // Extract all sections
  const basics = data.basics;
  const work = data.work || [];
  const projects = data.projects || [];
  const education = data.education || [];
  const skills = data.skills || [];
  const volunteer = data.volunteer || [];
  const awards = data.awards || [];
  const languages = data.languages || [];
  const certificates = data.certificates || [];
  const interests = data.interests || [];
  const publications = data.publications || [];
  const references = data.references || [];

  return (
    <Document style={styles.document}>
      <Page size="A4" style={styles.page}>
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.name}>{basics.name}</Text>
          {basics.label && <Text style={styles.label}>{basics.label}</Text>}

          {/* Contact Row 1: location, email, phone */}
          {(basics.location?.city || basics.email || basics.phone) && (
            <View style={styles.contactRow}>
              {basics.location?.city && (
                <Text style={styles.contactText}>
                  📍 {basics.location.city}{basics.location.region ? `, ${basics.location.region}` : ''}
                </Text>
              )}
              {basics.email && <Text style={styles.contactText}>✉️ {basics.email}</Text>}
              {basics.phone && <Text style={styles.contactText}>📞 {basics.phone}</Text>}
            </View>
          )}

          {/* Contact Row 2: website and profiles */}
          {(basics.url || (basics.profiles && basics.profiles.length > 0)) && (
            <View style={styles.contactRow}>
              {basics.url && (
                <Link src={basics.url} style={styles.contactLink}>
                  🌐 {basics.url.replace(/^https?:\/\//, '')}
                </Link>
              )}
              {basics.profiles && basics.profiles.slice(0, 3).map((profile, i) => (
                <Link key={i} src={profile.url} style={styles.contactLink}>
                  {profile.network === 'LinkedIn' && '💼'}
                  {profile.network === 'GitHub' && '💻'}
                  {profile.network === 'Twitter' && '🐦'}
                  {!['LinkedIn', 'GitHub', 'Twitter'].includes(profile.network) && '🔗'}
                  {' '}{profile.network}
                </Link>
              ))}
            </View>
          )}
        </View>

        {/* Professional Summary */}
        {basics.summary && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Professional Summary</Text>
            <Text style={styles.summaryText}>{basics.summary}</Text>
          </View>
        )}

        {/* Work Experience */}
        {work.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Professional Experience</Text>
            {work.map((job, i) => (
              <View key={i} style={styles.workItem}>
                <View style={styles.workHeader}>
                  <Text style={styles.workPosition}>{job.position}</Text>
                  <Text style={styles.workCompany}>{job.name}</Text>
                </View>
                <View style={styles.workMeta}>
                  <Text>{job.location || job.website}</Text>
                  <Text>{job.startDate}{job.endDate ? ` - ${job.endDate}` : ' - Present'}</Text>
                </View>
                {job.summary && <Text style={styles.workSummary}>{job.summary}</Text>}
                {job.highlights && job.highlights.length > 0 && (
                  <View style={styles.highlightsList}>
                    {job.highlights.map((highlight, hi) => (
                      <Text key={hi} style={styles.highlight}>• {highlight}</Text>
                    ))}
                  </View>
                )}
                {job.keywords && job.keywords.length > 0 && (
                  <View style={styles.keywordChips}>
                    {job.keywords.map((keyword, ki) => (
                      <Text key={ki} style={styles.keywordChip}>{keyword}</Text>
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
                  <Text style={styles.eduInstitution}>{edu.institution}</Text>
                </View>
                <View style={styles.eduMeta}>
                  <Text>{edu.startDate}{edu.endDate ? ` - ${edu.endDate}` : ' - Present'}</Text>
                  {edu.score && <Text>GPA: {edu.score}</Text>}
                </View>
                {(edu.courses && edu.courses.length > 0) && (
                  <Text style={styles.eduDetails}>
                    Relevant Courses: {edu.courses.join(', ')}
                  </Text>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Skills</Text>
            <View style={styles.skillsWrap}>
              {skills.map((skill, i) => (
                <Text key={i} style={styles.skillChip}>
                  {skill.name}
                  {skill.level && ` • ${skill.level}`}
                </Text>
              ))}
            </View>
          </View>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Projects</Text>
            {projects.map((project, i) => (
              <View key={i} style={styles.projItem}>
                <View style={styles.projHeader}>
                  <Text style={styles.projName}>{project.name}</Text>
                  {(project.startDate || project.endDate) && (
                    <Text style={styles.projDates}>
                      {project.startDate}{project.endDate ? ` - ${project.endDate}` : ''}
                    </Text>
                  )}
                </View>
                {project.description && <Text style={styles.projDesc}>{project.description}</Text>}
                {project.highlights && project.highlights.length > 0 && (
                  <View style={styles.highlightsList}>
                    {project.highlights.map((highlight, hi) => (
                      <Text key={hi} style={styles.highlight}>• {highlight}</Text>
                    ))}
                  </View>
                )}
                {project.keywords && project.keywords.length > 0 && (
                  <View style={styles.keywordChips}>
                    {project.keywords.map((keyword, ki) => (
                      <Text key={ki} style={styles.keywordChip}>{keyword}</Text>
                    ))}
                  </View>
                )}
                {project.url && (
                  <Link src={project.url} style={styles.contactLink}>🔗 {project.url}</Link>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Volunteer Work */}
        {volunteer.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Volunteer Experience</Text>
            {volunteer.map((vol, i) => (
              <View key={i} style={styles.volunteerItem}>
                <View style={styles.volunteerHeader}>
                  <Text style={styles.volunteerPosition}>{vol.position}</Text>
                  <Text style={styles.volunteerOrg}>{vol.organization}</Text>
                </View>
                <View style={styles.workMeta}>
                  <Text>{vol.location}</Text>
                  <Text>{vol.startDate}{vol.endDate ? ` - ${vol.endDate}` : ' - Present'}</Text>
                </View>
                {vol.summary && <Text style={styles.workSummary}>{vol.summary}</Text>}
                {vol.highlights && vol.highlights.length > 0 && (
                  <View style={styles.highlightsList}>
                    {vol.highlights.map((highlight, hi) => (
                      <Text key={hi} style={styles.highlight}>• {highlight}</Text>
                    ))}
                  </View>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Awards & Achievements */}
        {awards.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Awards & Achievements</Text>
            {awards.map((award, i) => (
              <View key={i} style={styles.awardItem}>
                <View style={styles.workHeader}>
                  <Text style={styles.awardTitle}>{award.title}</Text>
                  <Text style={styles.awardDate}>{award.date}</Text>
                </View>
                <Text style={styles.awardAwarder}>{award.awarder}</Text>
                {award.summary && <Text style={styles.workSummary}>{award.summary}</Text>}
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
                  {lang.language} - <Text style={styles.langFluency}>{lang.fluency}</Text>
                </Text>
              </View>
            ))}
          </View>
        )}

        {/* Certifications */}
        {certificates.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Certifications</Text>
            {certificates.map((cert, i) => (
              <View key={i} style={styles.certItem}>
                <View style={styles.workHeader}>
                  <Text style={styles.certName}>{cert.name}</Text>
                  <Text style={styles.awardDate}>{cert.date}</Text>
                </View>
                <Text style={styles.certIssuer}>{cert.issuer}</Text>
                {cert.url && (
                  <Link src={cert.url} style={styles.contactLink}>🔗 Verify Certificate</Link>
                )}
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
                <Text style={styles.interestName}>{interest.name}</Text>
                {interest.keywords && interest.keywords.length > 0 && (
                  <Text style={styles.interestKeywords}>
                    {interest.keywords.join(', ')}
                  </Text>
                )}
                {interest.summary && <Text style={styles.workSummary}>{interest.summary}</Text>}
              </View>
            ))}
          </View>
        )}

        {/* Publications */}
        {publications.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Publications</Text>
            {publications.map((pub, i) => (
              <View key={i} style={styles.pubItem}>
                <View style={styles.workHeader}>
                  <Text style={styles.pubName}>{pub.name}</Text>
                  <Text style={styles.awardDate}>{pub.releaseDate}</Text>
                </View>
                <Text style={styles.pubPublisher}>{pub.publisher}</Text>
                {pub.summary && <Text style={styles.workSummary}>{pub.summary}</Text>}
                {pub.url && (
                  <Link src={pub.url} style={styles.contactLink}>🔗 Read Publication</Link>
                )}
              </View>
            ))}
          </View>
        )}

        {/* References */}
        {references.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>References</Text>
            {references.map((ref, i) => (
              <View key={i} style={styles.refItem}>
                <Text style={styles.refName}>{ref.name}</Text>
                <Text style={styles.refText}>"{ref.reference}"</Text>
              </View>
            ))}
          </View>
        )}
      </Page>
    </Document>
  );
}; 