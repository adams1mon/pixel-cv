'use client';

import React from 'react';
import { Document, Page, View, Text, StyleSheet, Link, Image, Svg, Path, Polygon, Rect } from '@react-pdf/renderer';
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
                    {/* { 
                      profile.network.toLowerCase() === "github" ?
                      // <Text>BLEH</Text>
                      <GitHubLogo style={} />
                      :
                      null
                    } */}

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

// function GitHubSvg() {
//   return (
//     // <Svg width="1024" height="1024" viewBox='0 0 1024 1024' fill='none'>
//     //   <Path 
//     //     // fillRule='evenodd' 
//     //     // clip-rule="evenodd"
//     //     d="M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z"
//     //     // transform="scale(64)"
//     //     // fill="#1B1F23"
//     //   >

//     //   </Path>


//     // </Svg>

//     // <Svg width="1024" height="1024" viewBox="0 0 1024 1024" fill="none">
//     //   <Path fill-rule="evenodd" clip-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z" transform="scale(64)" fill="#1B1F23"/>
//     // </Svg>

//   //    <Svg width="200" height="200" viewBox="-100 -100 200 250">
//   //   <Polygon points="0,0 80,120 -80,120" fill="#234236" />
//   //   <Polygon points="0,-40 60,60 -60,60" fill="#0C5C4C" />
//   //   <Polygon points="0,-80 40,0 -40,0" fill="#38755B" />
//   //   <Rect x="-20" y="120" width="40" height="30" fill="#A32B2D" />
//   // </Svg>


//   )
// }

// TODO: make this work.
function GitHubLogo({ style }: any) {
  return <Image style={style} src="data:image/png;base64,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"/>
}