'use client';

import React from 'react';
import { Document, Page, View, Text, StyleSheet, Link } from '@react-pdf/renderer';
import { CVData } from '../../types/cv-data';

interface ModernReactPdfProps {
  data: CVData;
}

// TODO: use canvas for graphics

// could also use canvas for the icons, not emojis
// canvas -> can use svg -> icons are basically svg anyways, so win
// can use SVG component directly, use lucide svgs!!!

// TODO: use jsonresume

const styles = StyleSheet.create({
  document: {
    // TODO: list supported fonts
    // fontFamily: 'Helvetica',
    fontFamily: 'Roboto',
    color: '#1f2937'
  },
  page: {
    padding: 24
  },
  header: {
    textAlign: 'center',
    marginBottom: 24,
    paddingBottom: 16,
    borderBottomWidth: 2,
    borderBottomColor: '#3b82f6'
  },
  name: {
    fontSize: 24,
    fontWeight: 700,
    marginBottom: 6
  },
  title: {
    fontSize: 14,
    color: '#6b7280'
  },
  contactRow: {
    marginTop: 8,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  contactText: {
    fontSize: 10,
    color: '#6b7280',
    marginHorizontal: 6
  },
  contactLink: {
    fontSize: 10,
    color: '#3b82f6',
    marginHorizontal: 6,
    textDecoration: 'none'
  },
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
    borderBottomColor: '#3b82f6'
  },
  summaryText: {
    fontSize: 11,
    color: '#4b5563',
    lineHeight: 1.4
  },
  expItem: {
    marginBottom: 12
  },
  expHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 2
  },
  expPosition: {
    fontSize: 12,
    fontWeight: 700
  },
  expCompany: {
    fontSize: 11,
    color: '#3b82f6'
  },
  expMeta: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: 10,
    color: '#6b7280',
    marginBottom: 4
  },
  expDesc: {
    fontSize: 11,
    color: '#4b5563',
    lineHeight: 1.4
  },
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
    display: 'flex',
    flexDirection: 'row',
    fontSize: 10,
    color: '#6b7280'
  },
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
    fontSize: 14,
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
  projTechWrap: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 8
  },
  projTech: {
    fontSize: 10,
    backgroundColor: '#dbeafe',
    color: '#1e40af',
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 9999,
    marginRight: 6,
    marginBottom: 6
  },
  projLinks: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  projLink: {
    fontSize: 10,
    color: '#3b82f6',
    marginRight: 8
  }
});

export const ModernReactPdf: React.FC<ModernReactPdfProps> = ({ data }) => {
  console.log("modern cv pdf create");
  
  const header = data.sections.header.personalInfo;
  const contact = data.sections.header.contact;
  const summary = data.sections.summary;
  const experience = data.sections.experience || [];
  const education = data.sections.education || [];
  const skills = data.sections.skills?.skills || [];
  const projects = data.sections.projects || [];

  return (
    <Document style={styles.document}>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>
            {header.firstName} {header.lastName}
          </Text>
          {header.title ? (
            <Text style={styles.title}>{header.title}</Text>
          ) : null}

          {/* Contact Row 1: location, email, phone */}
          {(header.location || contact.email || contact.phone) ? (
            <View style={styles.contactRow}>
              {header.location ? (
                <Text style={styles.contactText}>📍 {header.location}</Text>
              ) : null}
              {contact.email ? (
                <Text style={styles.contactText}>✉️ {contact.email}</Text>
              ) : null}
              {contact.phone ? (
                <Text style={styles.contactText}>📞 {contact.phone}</Text>
              ) : null}
            </View>
          ) : null}

          {/* Contact Row 2: website, linkedin, github */}
          {(contact.website || contact.linkedin || contact.github) ? (
            <View style={styles.contactRow}>
              {contact.website ? (
                <Link src={contact.website} style={styles.contactLink}>🌐 {contact.website}</Link>
              ) : null}
              {contact.linkedin ? (
                <Link src={contact.linkedin} style={styles.contactLink}>💼 LinkedIn</Link>
              ) : null}
              {contact.github ? (
                <Link src={contact.github} style={styles.contactLink}>💻 GitHub</Link>
              ) : null}
            </View>
          ) : null}
        </View>

        {/* Summary */}
        {summary?.isVisible && summary?.content ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Professional Summary</Text>
            <Text style={styles.summaryText}>{summary.content}</Text>
          </View>
        ) : null}

        {/* Experience */}
        {experience.length > 0 ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Professional Experience</Text>
            {experience.map((exp, i) => (
              <View key={i} style={styles.expItem}>
                <View style={styles.expHeader}>
                  <Text style={styles.expPosition}>{exp.position}</Text>
                  <Text style={styles.expCompany}>{exp.company}</Text>
                </View>
                <View style={styles.expMeta}>
                  <Text>{exp.location}</Text>
                  <Text>
                    {exp.startDate} - {exp.isCurrentPosition ? 'Present' : (exp.endDate || '')}
                  </Text>
                </View>
                {exp.description ? (
                  <Text style={styles.expDesc}>{exp.description}</Text>
                ) : null}
              </View>
            ))}
          </View>
        ) : null}

        {/* Education */}
        {education.length > 0 ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
            {education.map((edu, i) => (
              <View key={i} style={styles.eduItem}>
                <View style={styles.eduHeader}>
                  <Text style={styles.eduDegree}>
                    {edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}
                  </Text>
                  <Text style={styles.eduInstitution}>{edu.institution}</Text>
                </View>
                <View style={styles.eduMeta}>
                  <Text>{edu.location}</Text>
                  <Text>
                    {edu.startDate} - {edu.isOngoing ? 'Present' : (edu.endDate || '')}
                  </Text>
                </View>
                {(edu.gpa || edu.honors) ? (
                  <View style={styles.eduDetails}>
                    {edu.gpa ? <Text>GPA: {edu.gpa}</Text> : null}
                    {edu.honors ? <Text>   {edu.honors}</Text> : null}
                  </View>
                ) : null}
              </View>
            ))}
          </View>
        ) : null}

        {/* Skills */}
        {data.sections.skills?.isVisible && skills.length > 0 ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Skills</Text>
            <View style={styles.skillsWrap}>
              {skills.map((s, i) => (
                <Text key={i} style={styles.skillChip}>
                  {s.name}{s.proficiency ? ` • ${s.proficiency}` : ''}{s.yearsOfExperience ? ` • ${s.yearsOfExperience} yrs` : ''}
                </Text>
              ))}
            </View>
          </View>
        ) : null}

        {/* Projects */}
        {projects.length > 0 ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Projects</Text>
            {projects.filter(p => p.isVisible !== false).map((p, i) => (
              <View key={i} style={styles.projItem}>
                <View style={styles.projHeader}>
                  <Text style={styles.projName}>{p.name}</Text>
                  {(p.startDate || p.endDate) ? (
                    <Text style={styles.projDates}>
                      {p.startDate || ''}{p.startDate && p.endDate ? ' - ' : ''}{p.endDate || ''}
                    </Text>
                  ) : null}
                </View>
                {p.description ? (
                  <Text style={styles.projDesc}>{p.description}</Text>
                ) : null}
                {Array.isArray(p.technologies) && p.technologies.length > 0 ? (
                  <View style={styles.projTechWrap}>
                    {p.technologies.map((t, ti) => (
                      <Text key={ti} style={styles.projTech}>{t}</Text>
                    ))}
                  </View>
                ) : null}
                {Array.isArray(p.links) && p.links.length > 0 ? (
                  <View style={styles.projLinks}>
                    {p.links.map((l, li) => (
                      <Link key={li} src={l.url} style={styles.projLink}>
                        {l.label || l.url}
                      </Link>
                    ))}
                  </View>
                ) : null}
              </View>
            ))}
          </View>
        ) : null}
      </Page>
    </Document>
  );
}; 