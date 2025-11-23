'use client';

import React from 'react';
import { JsonResume } from '../../types/jsonresume';

interface ModernReactHtmlProps {
  data: JsonResume;
  pageWrap: boolean;
}

// Convert react-pdf styles to CSS-in-JS for HTML
const styles: { [key: string]: React.CSSProperties } = {
  document: {
    fontFamily: 'Roboto, Arial, sans-serif',
    color: '#1f2937',
    backgroundColor: '#ffffff',
  },
  page: {
    padding: '30px',
    fontSize: '9pt',
    lineHeight: 1.25,
    maxWidth: '210mm', // A4 width
    minHeight: '297mm', // A4 height
    margin: '0 auto',
    backgroundColor: 'transparent',
    position: 'relative',
  },
  
  // Header styles
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 0,
    position: 'relative',
  },
  headerLeft: {
    textAlign: 'left',
    flex: 1,
  },
  headerRight: {
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
  },
  profileImage: {
    width: '85px',
    height: '85px',
    borderRadius: '50%',
    objectFit: 'cover',
  },
  name: {
    fontSize: '24pt',
    fontWeight: 700,
    marginTop: 0,
    color: '#1f2937',
  },
  label: {
    fontSize: '12pt',
    color: '#6b7280',
    marginTop: '16px',
  },
  contactRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '8px',
    flexWrap: 'wrap',
  },
  contactLinksRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '2px',
    flexWrap: 'wrap',
  },
  contactText: {
    fontSize: '9pt',
    color: '#6b7280',
    marginRight: '8px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  contactLink: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    fontSize: '9pt',
    lineHeight: 1.1,
    color: '#3b82f6',
    marginRight: '8px',
    textDecoration: 'none',
  },
  socialIcon: {
    width: '12px',
    marginRight: '5px',
  },

  // Section styles
  section: {
    marginTop: '10px',
    position: 'relative',
  },
  sectionTitle: {
    fontSize: '10pt',
    fontWeight: 800,
    color: '#1f2937',
    marginTop: 0,
    paddingBottom: '2px',
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    borderBottomColor: '#d1d5db',
    textTransform: 'uppercase',
    letterSpacing: '0.6px',
  },

  // Summary styles
  summaryText: {
    fontSize: '9pt',
    color: '#374151',
    lineHeight: 1.35,
    textAlign: 'justify',
    marginTop: '6px',
  },

  // Work/Experience styles
  workItem: {
    marginTop: '8px',
    paddingBottom: '4px',
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    borderBottomColor: '#e5e7eb',
  },
  workHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginTop: 0,
  },
  workPosition: {
    fontSize: '11pt',
    fontWeight: 700,
    color: '#1f2937',
  },
  workCompany: {
    fontSize: '10pt',
    color: '#3b82f6',
    fontWeight: 600,
  },
  workMeta: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: '9pt',
    color: '#6b7280',
    marginTop: '2px',
  },
  workSummary: {
    fontSize: '9pt',
    color: '#4b5563',
    lineHeight: 1.3,
    marginTop: '3px',
  },
  highlightsList: {
    marginTop: '2px',
  },
  highlight: {
    fontSize: '9pt',
    color: '#4b5563',
    marginTop: '1px',
    paddingLeft: '6px',
  },
  keywordChips: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: '2px',
  },
  keywordChip: {
    fontSize: '8pt',
    backgroundColor: '#dbeafe',
    color: '#1e40af',
    paddingTop: '1px',
    paddingBottom: '1px',
    paddingLeft: '5px',
    paddingRight: '5px',
    borderRadius: '9999px',
    marginRight: '4px',
    lineHeight: 1.2,
    marginTop: '2px',
  },

  // Education styles
  eduItem: {
    marginTop: '8px',
  },
  eduHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginTop: 0,
  },
  eduDegree: {
    fontSize: '10pt',
    fontWeight: 700,
  },
  eduInstitution: {
    fontSize: '10pt',
    color: '#3b82f6',
  },
  eduMeta: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: '9pt',
    color: '#6b7280',
    marginTop: '2px',
  },
  eduDetails: {
    fontSize: '9pt',
    color: '#6b7280',
  },

  // Skills styles
  skillsWrap: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: '2px',
  },
  skillChip: {
    fontSize: '9pt',
    color: '#1f2937',
    backgroundColor: '#f3f4f6',
    paddingTop: '2px',
    paddingBottom: '2px',
    paddingLeft: '6px',
    paddingRight: '6px',
    borderRadius: '9999px',
    lineHeight: 1.2,
    marginRight: '6px',
    marginTop: '2px',
  },

  // Projects styles
  projItem: {
    marginTop: '8px',
    paddingBottom: '4px',
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    borderBottomColor: '#e5e7eb',
  },
  projHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginTop: 0,
  },
  projName: {
    fontSize: '11pt',
    fontWeight: 700,
  },
  projDates: {
    fontSize: '9pt',
    color: '#6b7280',
    fontWeight: 500,
  },
  projDesc: {
    fontSize: '9pt',
    color: '#4b5563',
    marginTop: '6px',
    lineHeight: 1.3,
  },
  projLink: {
    fontSize: '9pt',
    color: '#3b82f6',
    marginTop: '2px',
    textDecoration: 'none',
  },
 
  // Volunteer styles (compact)
  volunteerItem: {
    marginTop: '8px',
  },
  volunteerHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginTop: 0,
  },
  volunteerPosition: {
    fontSize: '10pt',
    fontWeight: 700,
  },
  volunteerOrg: {
    fontSize: '10pt',
    color: '#059669',
  },
 
  // Awards styles (compact)
  awardItem: {
    marginTop: '8px',
  },
  awardTitle: {
    fontSize: '10pt',
    fontWeight: 700,
  },
  awardAwarder: {
    fontSize: '9pt',
    color: '#d97706',
    fontWeight: 600,
  },
  awardDate: {
    fontSize: '9pt',
    color: '#6b7280',
  },
 
  // Languages styles (compact)
  langItem: {
    marginTop: '4px',
  },
  langName: {
    fontSize: '10pt',
    fontWeight: 600,
  },
  langFluency: {
    fontSize: '9pt',
    color: '#6b7280',
  },
 
  // Certificate styles (compact)
  certItem: {
    marginTop: '8px',
  },
  certName: {
    fontSize: '10pt',
    fontWeight: 600,
  },
  certIssuer: {
    fontSize: '9pt',
    color: '#7c3aed',
  },
 
  // Interest styles (compact)
  interestItem: {
    marginTop: '6px',
  },
  interestName: {
    fontSize: '10pt',
    fontWeight: 600,
  },
  interestKeywords: {
    fontSize: '9pt',
    color: '#6b7280',
  },
 
  // Publication styles (compact)
  pubItem: {
    marginTop: '8px',
  },
  pubName: {
    fontSize: '10pt',
    fontWeight: 700,
  },
  pubPublisher: {
    fontSize: '9pt',
    color: '#7c2d12',
  },
 
  // Reference styles (compact)
  refItem: {
    marginTop: '8px',
    paddingBottom: '6px',
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    borderBottomColor: '#f3f4f6',
  },
  refName: {
    fontSize: '10pt',
    fontWeight: 700,
  },
  refText: {
    fontSize: '9pt',
    color: '#4b5563',
    lineHeight: 1.25,
  },
  
  // Background image
  backgroundImage: {
    position: 'absolute',
    top: '0px',
    right: '0px',
    objectFit: 'cover',

    width: '120%',
    height: '297mm', // A4 height, one page basically
    zIndex: 0,
  },
};

export const ModernReactHtml: React.FC<ModernReactHtmlProps> = ({ data, pageWrap }) => {
  console.log("JsonResume HTML generation started");
  
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
    <div style={styles.document}>
      <div style={styles.page}>

        {/* Background Image */}
        {/* only on the first page.. */}
        <img 
          src="grad3.png" 
          alt="" 
          style={styles.backgroundImage}
        />

        {/* Header Section */}
        <div style={styles.header}>
          <div style={styles.headerLeft}>
            <h1 style={styles.name}>{basics.name}</h1>
            {basics.label && <div style={styles.label}>{basics.label}</div>}

            {/* Contact Row: info */}
            {(basics.location?.city || basics.email || basics.phone) && (
              <div style={styles.contactRow}>
                {basics.phone && <span style={styles.contactText}>📞 {basics.phone}</span>}
                {basics.email && <span style={styles.contactText}>✉️ {basics.email}</span>}
                {basics.location?.city && (
                  <span style={styles.contactText}>
                    📍 {basics.location.city}{basics.location.region ? `, ${basics.location.region}` : ''}
                  </span>
                )}
              </div>
            )}

            {/* Contact Row: links */}
            {(basics.url || (basics.profiles && basics.profiles.length > 0)) && (
              <div style={styles.contactLinksRow}>
                {basics.url && (
                  <a href={basics.url} style={styles.contactLink}>
                    🌐 {basics.url.replace(/^https?:\/\//, '')}
                  </a>
                )}
                {basics.profiles && basics.profiles.map((profile, i) => (
                  <a key={i} href={profile.url} style={styles.contactLink}>
                    {profile.network}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Profile Image */}
          <div style={styles.headerRight}>
            {basics.image && <img src={basics.image} alt="Profile" style={styles.profileImage} />}
          </div>
        </div>

        {/* Summary */}
        {basics.summary && (
          <div className="cv-section" style={styles.section}>
            <h2 style={styles.sectionTitle}>Summary</h2>
            <p style={styles.summaryText}>{basics.summary}</p>
          </div>
        )}

        {/* Experience */}
        {work.length > 0 && (
          <div className="cv-section" style={styles.section}>
            <h2 style={styles.sectionTitle}>Experience</h2>
            {work.map((job, i) => (
              <div key={i} style={styles.workItem}>
                <div style={styles.workHeader}>
                  <span style={styles.workPosition}>{job.position}</span>
                  <span style={styles.workCompany}>{job.name}</span>
                </div>
                <div style={styles.workMeta}>
                  <span>{job.location || job.website}</span>
                  <span>{job.startDate}{job.endDate ? ` - ${job.endDate}` : ' - Present'}</span>
                </div>
                {job.summary && <p style={styles.workSummary}>{job.summary}</p>}
                {job.highlights && job.highlights.length > 0 && (
                  <div style={styles.highlightsList}>
                    {job.highlights.map((highlight, hi) => (
                      <div key={hi} style={styles.highlight}>• {highlight}</div>
                    ))}
                  </div>
                )}
                {job.keywords && job.keywords.length > 0 && (
                  <div style={styles.keywordChips}>
                    {job.keywords.map((keyword, ki) => (
                      <span key={ki} style={styles.keywordChip}>{keyword}</span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Education */}
        {education.length > 0 && (
          <div className="cv-section" style={styles.section}>
            <h2 style={styles.sectionTitle}>Education</h2>
            {education.map((edu, i) => (
              <div key={i} style={styles.eduItem}>
                <div style={styles.eduHeader}>
                  <span style={styles.eduDegree}>
                    {edu.studyType} {edu.area ? `in ${edu.area}` : ''}
                  </span>
                  <span style={styles.eduInstitution}>{edu.institution}</span>
                </div>
                <div style={styles.eduMeta}>
                  <span>{edu.startDate}{edu.endDate ? ` - ${edu.endDate}` : ' - Present'}</span>
                  {edu.score && <span>GPA: {edu.score}</span>}
                </div>
                {(edu.courses && edu.courses.length > 0) && (
                  <div style={styles.eduDetails}>
                    Relevant Courses: {edu.courses.join(', ')}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <div className="cv-section" style={styles.section}>
            <h2 style={styles.sectionTitle}>Skills</h2>
            <div style={styles.skillsWrap}>
              {skills.map((skill, i) => (
                <span key={i} style={styles.skillChip}>
                  {skill.name}
                  {skill.level && ` • ${skill.level}`}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <div className="cv-section" style={styles.section}>
            <h2 style={styles.sectionTitle}>Projects</h2>
            {projects.map((project, i) => (
              <div key={i} style={styles.projItem}>
                <div style={styles.projHeader}>
                  <span style={styles.projName}>{project.name}</span>
                  {(project.startDate || project.endDate) && (
                    <span style={styles.projDates}>
                      {project.startDate}{project.endDate ? ` - ${project.endDate}` : ''}
                    </span>
                  )}
                </div>
                {project.description && <p style={styles.projDesc}>{project.description}</p>}
                {project.highlights && project.highlights.length > 0 && (
                  <div style={styles.highlightsList}>
                    {project.highlights.map((highlight, hi) => (
                      <div key={hi} style={styles.highlight}>• {highlight}</div>
                    ))}
                  </div>
                )}
                {project.keywords && project.keywords.length > 0 && (
                  <div style={styles.keywordChips}>
                    {project.keywords.map((keyword, ki) => (
                      <span key={ki} style={styles.keywordChip}>{keyword}</span>
                    ))}
                  </div>
                )}
                {project.url && (
                  <a href={project.url} style={styles.projLink}>🔗 {project.url}</a>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Volunteer Work */}
        {volunteer.length > 0 && (
          <div className="cv-section" style={styles.section}>
            <h2 style={styles.sectionTitle}>Volunteer Experience</h2>
            {volunteer.map((vol, i) => (
              <div key={i} style={styles.volunteerItem}>
                <div style={styles.volunteerHeader}>
                  <span style={styles.volunteerPosition}>{vol.position}</span>
                  <span style={styles.volunteerOrg}>{vol.organization}</span>
                </div>
                <div style={styles.workMeta}>
                  <span>{vol.location}</span>
                  <span>{vol.startDate}{vol.endDate ? ` - ${vol.endDate}` : ' - Present'}</span>
                </div>
                {vol.summary && <p style={styles.workSummary}>{vol.summary}</p>}
                {vol.highlights && vol.highlights.length > 0 && (
                  <div style={styles.highlightsList}>
                    {vol.highlights.map((highlight, hi) => (
                      <div key={hi} style={styles.highlight}>• {highlight}</div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Awards & Achievements */}
        {awards.length > 0 && (
          <div className="cv-section" style={styles.section}>
            <h2 style={styles.sectionTitle}>Awards & Achievements</h2>
            {awards.map((award, i) => (
              <div key={i} style={styles.awardItem}>
                <div style={styles.workHeader}>
                  <span style={styles.awardTitle}>{award.title}</span>
                  <span style={styles.awardDate}>{award.date}</span>
                </div>
                <div style={styles.awardAwarder}>{award.awarder}</div>
                {award.summary && <p style={styles.workSummary}>{award.summary}</p>}
              </div>
            ))}
          </div>
        )}

        {/* Languages */}
        {languages.length > 0 && (
          <div className="cv-section" style={styles.section}>
            <h2 style={styles.sectionTitle}>Languages</h2>
            {languages.map((lang, i) => (
              <div key={i} style={styles.langItem}>
                <span style={styles.langName}>
                  {lang.language} - <span style={styles.langFluency}>{lang.fluency}</span>
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Certifications */}
        {certificates.length > 0 && (
          <div className="cv-section" style={styles.section}>
            <h2 style={styles.sectionTitle}>Certifications</h2>
            {certificates.map((cert, i) => (
              <div key={i} style={styles.certItem}>
                <div style={styles.workHeader}>
                  <span style={styles.certName}>{cert.name}</span>
                  <span style={styles.awardDate}>{cert.date}</span>
                </div>
                <div style={styles.certIssuer}>{cert.issuer}</div>
                {cert.url && (
                  <a href={cert.url} style={styles.contactLink}>🔗 Verify Certificate</a>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Interests */}
        {interests.length > 0 && (
          <div className="cv-section" style={styles.section}>
            <h2 style={styles.sectionTitle}>Interests</h2>
            {interests.map((interest, i) => (
              <div key={i} style={styles.interestItem}>
                <div style={styles.interestName}>{interest.name}</div>
                {interest.keywords && interest.keywords.length > 0 && (
                  <div style={styles.interestKeywords}>
                    {interest.keywords.join(', ')}
                  </div>
                )}
                {interest.summary && <p style={styles.workSummary}>{interest.summary}</p>}
              </div>
            ))}
          </div>
        )}

        {/* Publications */}
        {publications.length > 0 && (
          <div className="cv-section" style={styles.section}>
            <h2 style={styles.sectionTitle}>Publications</h2>
            {publications.map((pub, i) => (
              <div key={i} style={styles.pubItem}>
                <div style={styles.workHeader}>
                  <span style={styles.pubName}>{pub.name}</span>
                  <span style={styles.awardDate}>{pub.releaseDate}</span>
                </div>
                <div style={styles.pubPublisher}>{pub.publisher}</div>
                {pub.summary && <p style={styles.workSummary}>{pub.summary}</p>}
                {pub.url && (
                  <a href={pub.url} style={styles.contactLink}>🔗 Read Publication</a>
                )}
              </div>
            ))}
          </div>
        )}

        {/* References */}
        {references.length > 0 && (
          <div className="cv-section" style={styles.section}>
            <h2 style={styles.sectionTitle}>References</h2>
            {references.map((ref, i) => (
              <div key={i} style={styles.refItem}>
                <div style={styles.refName}>{ref.name}</div>
                <div style={styles.refText}>"{ref.reference}"</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

