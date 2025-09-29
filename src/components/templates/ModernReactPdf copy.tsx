'use client';

import React from 'react';
import { Document, Page, View, Text, StyleSheet, Link, Image, Svg } from '@react-pdf/renderer';
import { JsonResume } from '../../types/jsonresume';

interface ModernReactPdfProps {
  data: JsonResume;
  pageWrap: boolean;
}

// TODO: use canvas for graphics
// TODO: use lucide SVG icons instead of emojis

const styles = StyleSheet.create({
  document: {
    fontFamily: 'Roboto',
    color: '#1f2937'
  },
  page: {
    padding: 20,
    fontSize: 9,
    lineHeight: 1.25
  },
  
  // Header styles
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 0,
    position: 'relative'
  },
  headerLeft: {
    textAlign: 'left',
    flex: 1,
  },
  headerRight: {
    display: 'flex',
    alignItems: 'center',
    position: 'relative'
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    objectFit: 'cover',
  },
  dotsWrap: {
    position: 'absolute',
    right: -6,
    top: -6,
    width: 140,
    height: 140,
    zIndex: -1,
  },
  dotsRow: {
    display: 'flex',
    flexDirection: 'row'
  },
  dot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: '#e5e7eb',
    margin: 6,
    opacity: 0.8
  },
  name: {
    fontSize: 24,
    fontWeight: 700,
    marginTop: 0,
    color: '#1f2937'
  },
  label: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 14,
    // use marginTop to separate from name
    // no marginBottom
  },
  contactRow: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 8,
    flexWrap: 'wrap'
  },
  contactLinksRow: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 2,
    flexWrap: 'wrap'
  },
  contactText: {
    fontSize: 9,
    color: '#6b7280',
    marginRight: 6,
  },
  contactLink: {
    fontSize: 9,
    color: '#3b82f6',
    marginRight: 8,
    textDecoration: 'none'
  },

  // Section styles
  section: {
    marginTop: 10
  },
  sectionTitle: {
    fontSize: 10,
    fontWeight: 800,
    color: '#1f2937',
    marginTop: 0,
    paddingBottom: 3,
    borderBottomWidth: 1,
    borderBottomColor: '#d1d5db',
    textTransform: 'uppercase',
    letterSpacing: 0.6
  },

  // Summary styles
  summaryText: {
    fontSize: 9,
    color: '#374151',
    lineHeight: 1.35,
    textAlign: 'justify',
    marginTop: 6
  },

  // Work/Experience styles
  workItem: {
    marginTop: 8,
    paddingBottom: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb'
  },
  workHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginTop: 0
  },
  workPosition: {
    fontSize: 11,
    fontWeight: 700,
    color: '#1f2937'
  },
  workCompany: {
    fontSize: 10,
    color: '#3b82f6',
    fontWeight: 600
  },
  workMeta: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: 9,
    color: '#6b7280',
    marginTop: 2
  },
  workSummary: {
    fontSize: 9,
    color: '#4b5563',
    lineHeight: 1.3,
    marginTop: 3
  },
  highlightsList: {
    marginTop: 2
  },
  highlight: {
    fontSize: 9,
    color: '#4b5563',
    marginTop: 1,
    paddingLeft: 6
  },
  keywordChips: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 2
  },
  keywordChip: {
    fontSize: 8,
    backgroundColor: '#dbeafe',
    color: '#1e40af',
    paddingVertical: 1,
    paddingHorizontal: 5,
    borderRadius: 9999,
    marginRight: 4,
    lineHeight: 1.2,
    marginTop: 2
  },

  // Education styles
  eduItem: {
    marginTop: 8
  },
  eduHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginTop: 0
  },
  eduDegree: {
    fontSize: 10,
    fontWeight: 700
  },
  eduInstitution: {
    fontSize: 10,
    color: '#3b82f6'
  },
  eduMeta: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: 9,
    color: '#6b7280',
    marginTop: 2
  },
  eduDetails: {
    fontSize: 9,
    color: '#6b7280'
  },

  // Skills styles
  skillsWrap: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 2
  },
  skillChip: {
    fontSize: 9,
    color: '#1f2937',
    backgroundColor: '#f3f4f6',
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 9999,
    lineHeight: 1.2,
    marginRight: 6,
    marginTop: 2
  },

  // Projects styles
  projItem: {
    marginTop: 8,
    paddingBottom: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb'
  },
  projHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginTop: 0
  },
  projName: {
    fontSize: 11,
    fontWeight: 700
  },
  projDates: {
    fontSize: 9,
    color: '#6b7280',
    fontWeight: 500
  },
  projDesc: {
    fontSize: 9,
    color: '#4b5563',
    marginTop: 6,
    lineHeight: 1.3
  },
  projLink: {
    fontSize: 9,
    color: '#3b82f6',
    marginTop: 2,
    textDecoration: 'none'
  },
 
  // Volunteer styles (compact)
  volunteerItem: {
    marginTop: 8
  },
  volunteerHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginTop: 0
  },
  volunteerPosition: {
    fontSize: 10,
    fontWeight: 700
  },
  volunteerOrg: {
    fontSize: 10,
    color: '#059669'
  },
 
  // Awards styles (compact)
  awardItem: {
    marginTop: 8
  },
  awardTitle: {
    fontSize: 10,
    fontWeight: 700
  },
  awardAwarder: {
    fontSize: 9,
    color: '#d97706',
    fontWeight: 600
  },
  awardDate: {
    fontSize: 9,
    color: '#6b7280'
  },
 
  // Languages styles (compact)
  langItem: {
    marginTop: 4
  },
  langName: {
    fontSize: 10,
    fontWeight: 600
  },
  langFluency: {
    fontSize: 9,
    color: '#6b7280'
  },
 
  // Certificate styles (compact)
  certItem: {
    marginTop: 8
  },
  certName: {
    fontSize: 10,
    fontWeight: 600
  },
  certIssuer: {
    fontSize: 9,
    color: '#7c3aed'
  },
 
  // Interest styles (compact)
  interestItem: {
    marginTop: 6
  },
  interestName: {
    fontSize: 10,
    fontWeight: 600
  },
  interestKeywords: {
    fontSize: 9,
    color: '#6b7280'
  },
 
  // Publication styles (compact)
  pubItem: {
    marginTop: 8
  },
  pubName: {
    fontSize: 10,
    fontWeight: 700
  },
  pubPublisher: {
    fontSize: 9,
    color: '#7c2d12'
  },
 
  // Reference styles (compact)
  refItem: {
    marginTop: 8,
    paddingBottom: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6'
  },
  refName: {
    fontSize: 10,
    fontWeight: 700
  },
  refText: {
    fontSize: 9,
    color: '#4b5563',
    lineHeight: 1.25
  }
});

export const ModernReactPdf: React.FC<ModernReactPdfProps> = ({ data, pageWrap }) => {
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
      <Page size="A4" style={styles.page} wrap={pageWrap}>

        {/* Header Section */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.name}>{basics.name}</Text>
            {basics.label && <Text style={styles.label}>{basics.label}</Text>}

            {/* Contact Row: info */}
            {(basics.location?.city || basics.email || basics.phone) && (
              <View style={styles.contactRow}>
                {basics.phone && <Text style={styles.contactText}>📞 {basics.phone}</Text>}
                {basics.email && <Text style={styles.contactText}>✉️ {basics.email}</Text>}
                {basics.location?.city && (
                  <Text style={styles.contactText}>
                    📍 {basics.location.city}{basics.location.region ? `, ${basics.location.region}` : ''}
                  </Text>
                )}
              </View>
            )}

            {/* Contact Row: links */}
            {(basics.url || (basics.profiles && basics.profiles.length > 0)) && (
              <View style={styles.contactLinksRow}>
                {basics.url && (
                  <Link src={basics.url} style={styles.contactLink}>
                    🌐 {basics.url.replace(/^https?:\/\//, '')}
                  </Link>
                )}
                {basics.profiles && basics.profiles.map((profile, i) => (
                  <Link key={i} src={profile.url} style={styles.contactLink}>
                    {profile.network}
                  </Link>
                ))}
              </View>
            )}
          </View>

          {/* Profile Image with dotted background */}
          {(basics.image || true) && (
            <View style={styles.headerRight}>
              <View style={styles.dotsWrap}>
                {Array.from({ length: 10 }).map((_, r) => (
                  <View key={r} style={styles.dotsRow}>
                    {Array.from({ length: 10 }).map((__, c) => (
                      <View key={`${r}-${c}`} style={styles.dot} />
                    ))}
                  </View>
                ))}
              </View>
              {basics.image && <Image src={basics.image} style={styles.profileImage} />}
            </View>
          )}
        </View>

        {/* Summary */}
        {basics.summary && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Summary</Text>
            <Text style={styles.summaryText}>{basics.summary}</Text>
          </View>
        )}

        {/* Experience */}
        {work.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Experience</Text>
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
                  <Link src={project.url} style={styles.projLink}>🔗 {project.url}</Link>
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

function GitHubSvg() {
  return (
    // <Svg >
      <svg width="1024" height="1024" viewBox="0 0 1024 1024" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z" transform="scale(64)" fill="#1B1F23"/>
</svg>
    // </Svg>
  )
}