'use client';

import React from 'react';
import { Document, Page, View, Text, StyleSheet, Link, Image, Svg, Path, Polygon, Rect } from '@react-pdf/renderer';
import { JsonResume } from '../../types/jsonresume';
import { SocialIcon } from './icons/SocialIcon';

interface ModernReactPdfProps {
  data: JsonResume;
  pageWrap: boolean;
}

const styles = StyleSheet.create({
  document: {
    fontFamily: 'Roboto',
    color: '#1f2937'
  },
  page: {
    padding: 30,
    fontSize: 9,
    lineHeight: 1.25,
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
  profileImage: {
    width: 75,
    height: 75,
    borderRadius: 80,
    objectFit: 'cover',
  },
  name: {
    fontSize: 24,
    fontWeight: 700,
    marginTop: 0,
    color: '#1f2937',
  },
  label: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 16,
    // use marginTop to separate from name
    // no marginBottom
  },
  contactRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    flexWrap: 'wrap'
  },
  contactLinksRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
    flexWrap: 'wrap'
  },
  contactText: {
    fontSize: 9,
    color: '#6b7280',
    marginRight: 8,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  contactLink: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    fontSize: 9,
    lineHeight: 1.1,
    color: '#3b82f6',
    marginRight: 8,
    textDecoration: 'none',
  },
  socialIcon: {
    width: 12,
    marginRight: 5,
  },

  // Section styles
  section: {
    marginTop: 10,
    position: 'relative',
  },
  sectionTitle: {
    fontSize: 10,
    fontWeight: 800,
    color: '#1f2937',
    marginTop: 0,
    paddingBottom: 2,
    // borderBottomWidth: 1,
    // borderBottomColor: '#d1d5db',
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

// TODO: make templates customizable by passing in 
// template parameters.
// font size, section styles, background graphic, etc.
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

        {/* this grainy gradient is so nice, but fsr it react-pdf doesn't shifts everything */}
        {/* the pageWrap is the issue. false doesn't shift stuff down */}
        <Image src="nograin.png" style={{
          position: 'absolute',
          top: -20,
          right: -20,
          width: '120%',

        }}/>

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
                  <View key={i} style={styles.contactLink}>
                    <SocialIcon network={profile.network} style={styles.socialIcon} />
                    <Link key={i} src={profile.url} style={styles.contactLink}>
                      {profile.network}
                    </Link>
                  </View>
                ))}
              </View>
            )}
          </View>

          {/* Profile Image */}
          {basics.image && <Image src={basics.image} style={styles.profileImage} />}
        </View>

        {/* Summary */}
        {basics.summary && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>About me</Text>
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
