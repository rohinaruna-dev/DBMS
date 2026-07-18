'use client';

// ============================================================
// DBMS Learning Hub – Module 3, Topic 1 Page (Relational Model)
// ============================================================
import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  alpha,
  useTheme,
  TextField,
  InputAdornment,
  Paper,
  Button,
  Breadcrumbs,
  Link,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SearchIcon from '@mui/icons-material/Search';
import { motion } from 'framer-motion';
import { useProgressStore } from '@/store/progressStore';
import { vivaQuestions } from '@/data/vivaData';

const MotionBox = motion(Box);

interface Section {
  id: string;
  title: string;
  emoji: string;
  color: string;
  summary: string;
  keywords: string[];
  content?: React.ReactNode;
}

export default function Module3Topic1Page() {
  const theme = useTheme();
  const { markTopicVisited } = useProgressStore();
  const [searchQ, setSearchQ] = useState('');
  const [expanded, setExpanded] = useState<string[]>(['relational-model-basics']);

  useEffect(() => {
    markTopicVisited('module3-topic1', 'Relational Model');
  }, [markTopicVisited]);

  const sections: Section[] = [
    {
      id: 'relational-model-basics',
      title: 'Basics of Relational Model',
      emoji: '📊',
      color: '#6366f1',
      summary: 'Understand the fundamental concepts of the Relational Model introduced by E.F. Codd.',
      keywords: ['relational', 'model', 'table', 'row', 'column', 'codd'],
      content: (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Typography variant="body1">
            The Relational Model represents the database as a collection of relations (tables).
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
             {[
               { label: 'Relation (Table)', desc: 'A two-dimensional table containing rows and columns.', color: '#6366f1' },
               { label: 'Tuple (Row)', desc: 'A single, horizontal row in a relation representing a single record.', color: '#8b5cf6' },
               { label: 'Attribute (Column)', desc: 'A named column of a relation representing a property.', color: '#06b6d4' }
             ].map(item => (
                <Box key={item.label} sx={{ flex: 1, minWidth: 200, p: 2, borderRadius: 2, bgcolor: alpha(item.color, 0.1), border: `1px solid ${alpha(item.color, 0.2)}` }}>
                  <Typography fontWeight={700} color={item.color} gutterBottom>{item.label}</Typography>
                  <Typography variant="body2">{item.desc}</Typography>
                </Box>
             ))}
          </Box>
        </Box>
      ),
    },
    {
      id: 'structure-relational-databases',
      title: 'Structure of Relational Databases',
      emoji: '🏗️',
      color: '#ef4444',
      summary: 'Learn about domains, schemas, and instances within a relational database.',
      keywords: ['structure', 'domain', 'schema', 'instance', 'degree', 'cardinality'],
      content: (
         <Box>
           <Typography variant="body1" paragraph>
             A relational database consists of multiple relations with defined structures:
           </Typography>
           <ul>
             <li><Typography variant="body2"><strong>Domain:</strong> The set of allowable values for one or more attributes (e.g., Age must be an integer between 0 and 120).</Typography></li>
             <li><Typography variant="body2"><strong>Relational Schema:</strong> The logical design of the relation (e.g., <code>Student(RollNo, Name, Age)</code>).</Typography></li>
             <li><Typography variant="body2"><strong>Relational Instance:</strong> The actual data in the relation at a specific moment in time.</Typography></li>
             <li><Typography variant="body2"><strong>Degree:</strong> The number of attributes (columns) in a relation.</Typography></li>
             <li><Typography variant="body2"><strong>Cardinality:</strong> The number of tuples (rows) in a relation.</Typography></li>
           </ul>
         </Box>
      )
    },
    {
      id: 'integrity-constraints',
      title: 'Integrity Constraints',
      emoji: '🛡️',
      color: '#10b981',
      summary: 'Rules that maintain the accuracy and consistency of data in a relational database.',
      keywords: ['integrity', 'constraints', 'primary key', 'foreign key', 'domain', 'referential'],
      content: (
         <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {[
              { type: 'Domain Constraints', example: 'Ensures values fall within the defined domain (e.g., Salary > 0).' },
              { type: 'Key Constraints (Primary Key)', example: 'Ensures that every tuple is uniquely identified and no primary key is NULL.' },
              { type: 'Referential Integrity (Foreign Key)', example: 'Ensures that a value in one table must match a primary key in another table, or be NULL.' }
            ].map(c => (
               <Box key={c.type} sx={{ p: 2, borderRadius: 2, bgcolor: alpha('#10b981', 0.1) }}>
                  <Typography fontWeight={700} color="#10b981">{c.type}</Typography>
                  <Typography variant="body2">{c.example}</Typography>
               </Box>
            ))}
         </Box>
      )
    },
    {
      id: 'logical-database-design',
      title: 'Logical Database Design (ER to Relational)',
      emoji: '🔄',
      color: '#f59e0b',
      summary: 'How to convert an ER Diagram into a Relational Schema.',
      keywords: ['logical design', 'conversion', 'er to relational', 'mapping'],
      content: (
         <Box>
            <Typography variant="body1" paragraph>
              Once a conceptual design (ER Diagram) is complete, it must be mapped to a logical design (Relational Tables).
            </Typography>
            <Box sx={{ p: 2, bgcolor: alpha('#f59e0b', 0.1), borderRadius: 2, border: `1px dashed #f59e0b` }}>
               <Typography variant="subtitle2" fontWeight={700}>Basic Mapping Rules:</Typography>
               <ul>
                 <li><Typography variant="body2"><strong>Strong Entities:</strong> Become their own tables. Attributes become columns.</Typography></li>
                 <li><Typography variant="body2"><strong>Weak Entities:</strong> Become tables that include the primary key of their identifying strong entity.</Typography></li>
                 <li><Typography variant="body2"><strong>1:N Relationships:</strong> The primary key of the "1" side becomes a foreign key on the "N" side.</Typography></li>
                 <li><Typography variant="body2"><strong>M:N Relationships:</strong> Create a new bridge table containing the primary keys of both participating entities.</Typography></li>
               </ul>
            </Box>
         </Box>
      )
    },
    {
      id: 'introduction-to-views',
      title: 'Introduction to Views',
      emoji: '👁️',
      color: '#ec4899',
      summary: 'Virtual tables based on the result-set of an SQL statement.',
      keywords: ['view', 'virtual table', 'security', 'simplification'],
      content: (
         <Box>
            <Typography variant="body1" paragraph>
              A <strong>View</strong> is a virtual table whose contents are defined by a query. It does not store data itself (unless materialized) but displays data from one or more underlying base tables.
            </Typography>
            <ul>
               <li><Typography variant="body2"><strong>Simplification:</strong> Hides complex joins from the end user.</Typography></li>
               <li><Typography variant="body2"><strong>Security:</strong> Restricts access to specific rows and columns of a table.</Typography></li>
               <li><Typography variant="body2"><strong>Data Independence:</strong> Changes to underlying tables don't necessarily break applications using the view.</Typography></li>
            </ul>
         </Box>
      )
    },
    {
      id: 'altering-destroying-tables-views',
      title: 'Destroying/Altering Tables and Views',
      emoji: '🛠️',
      color: '#8b5cf6',
      summary: 'Commands for modifying or deleting existing database structures.',
      keywords: ['alter', 'drop', 'destroy', 'table', 'view', 'ddl'],
      content: (
         <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Box sx={{ flex: 1, p: 2, bgcolor: alpha('#8b5cf6', 0.1), borderRadius: 2 }}>
               <Typography fontWeight={700} color="#8b5cf6">ALTER Command</Typography>
               <Typography variant="body2">Modifies an existing table structure (e.g., adding a column, changing a data type, adding a constraint).</Typography>
               <Typography variant="caption" sx={{ display: 'block', mt: 1, fontFamily: 'monospace' }}>ALTER TABLE Student ADD Email VARCHAR(50);</Typography>
            </Box>
            <Box sx={{ flex: 1, p: 2, bgcolor: alpha('#8b5cf6', 0.1), borderRadius: 2 }}>
               <Typography fontWeight={700} color="#8b5cf6">DROP Command (Destroy)</Typography>
               <Typography variant="body2">Permanently deletes a table or view and all its data from the database.</Typography>
               <Typography variant="caption" sx={{ display: 'block', mt: 1, fontFamily: 'monospace' }}>DROP TABLE Student; <br/> DROP VIEW HighAchievers;</Typography>
            </Box>
         </Box>
      )
    },
    {
      id: 'relational-algebra',
      title: 'Relational Algebra',
      emoji: '🧮',
      color: '#06b6d4',
      summary: 'A procedural query language containing fundamental operators for relational databases.',
      keywords: ['relational algebra', 'select', 'project', 'join', 'union', 'procedural'],
      content: (
         <Box>
            <Typography variant="body1" paragraph>
              Relational Algebra provides a theoretical foundation for relational databases. It consists of operations that take one or two relations as input and produce a new relation as output.
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
              {[
                { op: 'Select (σ)', desc: 'Filters rows that satisfy a given condition.' },
                { op: 'Project (π)', desc: 'Selects specific columns and discards the rest.' },
                { op: 'Union (∪)', desc: 'Combines tuples from two relations (removing duplicates).' },
                { op: 'Set Difference (-)', desc: 'Returns tuples in the first relation but not in the second.' },
                { op: 'Cartesian Product (×)', desc: 'Combines every tuple of the first relation with every tuple of the second.' },
                { op: 'Rename (ρ)', desc: 'Renames the output relation or its attributes.' },
              ].map(op => (
                <Box key={op.op} sx={{ width: 'calc(50% - 8px)', p: 1.5, bgcolor: alpha('#06b6d4', 0.1), borderRadius: 2 }}>
                  <Typography fontWeight={700}>{op.op}</Typography>
                  <Typography variant="body2">{op.desc}</Typography>
                </Box>
              ))}
            </Box>
         </Box>
      )
    },
    {
      id: 'relational-calculus',
      title: 'Relational Calculus',
      emoji: '📝',
      color: '#fb923c',
      summary: 'A non-procedural query language based on mathematical logic.',
      keywords: ['relational calculus', 'trc', 'drc', 'non-procedural', 'declarative'],
      content: (
         <Box>
            <Typography variant="body1" paragraph>
              Unlike Relational Algebra (which specifies <em>how</em> to get the data), Relational Calculus specifies <em>what</em> data to get (declarative).
            </Typography>
            <Box sx={{ p: 2, bgcolor: alpha('#fb923c', 0.1), borderRadius: 2 }}>
               <Typography variant="subtitle2" fontWeight={700} mb={1}>Two main types:</Typography>
               <ol style={{ margin: 0, paddingLeft: '1.2rem' }}>
                  <li><Typography variant="body2"><strong>Tuple Relational Calculus (TRC):</strong> Variables represent individual tuples (rows).</Typography></li>
                  <li><Typography variant="body2"><strong>Domain Relational Calculus (DRC):</strong> Variables represent values from domains (attributes/columns).</Typography></li>
               </ol>
               <Typography variant="body2" sx={{ mt: 2, fontStyle: 'italic' }}>
                 Note: SQL is heavily based on Tuple Relational Calculus combined with Relational Algebra!
               </Typography>
            </Box>
         </Box>
      )
    },
    {
      id: 'viva-questions',
      title: 'Module 3 Viva Questions',
      emoji: '🎤',
      color: '#ef4444',
      summary: 'Practice your oral exam skills with these frequently asked viva questions for the Relational Model.',
      keywords: ['viva', 'questions', 'exam', 'practice', 'oral', 'relational'],
      content: (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {vivaQuestions.filter(q => q.id.startsWith('m3')).length > 0 ? (
            vivaQuestions.filter(q => q.id.startsWith('m3')).map((q, i) => (
              <Box key={q.id} sx={{ p: 2, bgcolor: alpha('#ef4444', 0.05), borderRadius: 2, border: `1px solid ${alpha('#ef4444', 0.1)}` }}>
                  <Typography variant="subtitle2" fontWeight={800} sx={{ mb: 1 }}>Q{i+1}: {q.question}</Typography>
                  <Typography variant="body2" color="text.secondary"><strong>Answer:</strong> {q.answer}</Typography>
              </Box>
            ))
          ) : (
            <Typography variant="body2" color="text.secondary">
              Module 3 Viva questions will be populated here shortly!
            </Typography>
          )}
        </Box>
      )
    }
  ];

  // Filter sections by search
  const filteredSections = searchQ.trim()
    ? sections.filter(
        (s) =>
          s.title.toLowerCase().includes(searchQ.toLowerCase()) ||
          s.keywords.some((k) => k.includes(searchQ.toLowerCase()))
      )
    : sections;

  const toggleSection = (id: string) => {
    setExpanded((prev) =>
      prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id]
    );
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(`section-${id}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      if (!expanded.includes(id)) toggleSection(id);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Breadcrumb */}
      <Breadcrumbs sx={{ mb: 3 }}>
        <Link href="/" underline="hover" color="text.secondary" sx={{ fontSize: '0.85rem' }}>
          Home
        </Link>
        <Typography color="text.secondary" fontSize="0.85rem">
          Module 3
        </Typography>
        <Typography color="primary.main" fontSize="0.85rem" fontWeight={700}>
          Topic 1: Relational Model
        </Typography>
      </Breadcrumbs>

      {/* Page Header */}
      <MotionBox initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} sx={{ mb: 4 }}>
        <Chip
          label="📚 Module 3 · Topic 1"
          sx={{
            mb: 1.5,
            fontWeight: 700,
            bgcolor: alpha(theme.palette.primary.main, 0.1),
            color: 'primary.main',
          }}
        />
        <Typography variant="h3" fontWeight={900} sx={{ mb: 1 }}>
          Relational Model
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
          {sections.length} interactive sections · Master the Relational Data Model
        </Typography>

        {/* Section chips for quick navigation */}
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          {sections.map((s) => (
            <Chip
              key={s.id}
              label={`${s.emoji} ${s.title.split(':')[0]}`}
              size="small"
              onClick={() => scrollToSection(s.id)}
              sx={{
                cursor: 'pointer',
                fontWeight: 600,
                bgcolor: alpha(s.color, 0.1),
                color: s.color,
                '&:hover': { bgcolor: alpha(s.color, 0.2) },
                fontSize: '0.72rem',
              }}
            />
          ))}
        </Box>
      </MotionBox>

      {/* Internal Search */}
      <Paper
        elevation={0}
        sx={{
          mb: 4,
          p: 2,
          borderRadius: 3,
          border: `1px solid ${alpha(theme.palette.primary.main, 0.15)}`,
          bgcolor: alpha(theme.palette.primary.main, 0.03),
        }}
      >
        <TextField
          fullWidth
          placeholder="🔍 Search within this topic — e.g., 'integrity constraints', 'relational algebra'"
          value={searchQ}
          onChange={(e) => setSearchQ(e.target.value)}
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: 'text.secondary' }} />
              </InputAdornment>
            ),
          }}
          sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2.5 } }}
          aria-label="search within topic"
          id="topic-search"
        />
        {searchQ && (
          <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
            Showing {filteredSections.length} / {sections.length} sections matching "{searchQ}"
          </Typography>
        )}
      </Paper>

      {/* Sections */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
        {filteredSections.map((section, i) => (
          <MotionBox
            key={section.id}
            id={`section-${section.id}`}
            className="section-target"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
          >
            <Accordion
              expanded={expanded.includes(section.id)}
              onChange={() => toggleSection(section.id)}
              elevation={0}
              sx={{
                mb: 1.5,
                borderRadius: '12px !important',
                border: `1px solid ${alpha(section.color, expanded.includes(section.id) ? 0.35 : 0.15)}`,
                bgcolor: expanded.includes(section.id) ? alpha(section.color, 0.03) : 'background.paper',
                transition: 'all 0.3s ease',
                '&:before': { display: 'none' },
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`section-${section.id}-content`}
                id={`section-${section.id}-header`}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flex: 1, pr: 1 }}>
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: 2,
                      bgcolor: alpha(section.color, 0.12),
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.3rem',
                      flexShrink: 0,
                      border: `1px solid ${alpha(section.color, 0.25)}`,
                    }}
                  >
                    {section.emoji}
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="subtitle1" fontWeight={700} color={expanded.includes(section.id) ? section.color : 'text.primary'}>
                      {section.title}
                    </Typography>
                    {!expanded.includes(section.id) && (
                      <Typography variant="caption" color="text.secondary" sx={{ display: { xs: 'none', sm: 'block' } }}>
                        {section.summary.slice(0, 80)}…
                      </Typography>
                    )}
                  </Box>
                </Box>
              </AccordionSummary>

              <AccordionDetails sx={{ pt: 0, pb: 3, px: 3 }}>
                {/* Summary box */}
                <Box
                  sx={{
                    mb: 3,
                    p: 2,
                    borderRadius: 2,
                    bgcolor: alpha(section.color, 0.06),
                    border: `1px solid ${alpha(section.color, 0.2)}`,
                  }}
                >
                  <Typography variant="body2" color="text.secondary" lineHeight={1.7}>
                    {section.summary}
                  </Typography>
                </Box>

                {/* Additional content */}
                {section.content}
              </AccordionDetails>
            </Accordion>
          </MotionBox>
        ))}
      </Box>

      {/* Bottom navigation */}
      <Box sx={{ mt: 4, display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
        {[
          { label: '🧩 Take Quiz', href: '/quiz', color: '#10b981' },
          { label: '🎤 Viva Practice', href: '/viva', color: '#ef4444' },
          { label: '🚀 Quick Revision', href: '/revision', color: '#f59e0b' },
          { label: '⬅️ Back to Dashboard', href: '/', color: '#6366f1' },
        ].map((link) => (
          <Button
            key={link.href}
            variant="outlined"
            href={link.href}
            id={`topic-nav-${link.href.slice(1)}`}
            sx={{
              borderColor: link.color,
              color: link.color,
              fontWeight: 700,
              '&:hover': { bgcolor: alpha(link.color, 0.08), borderColor: link.color },
            }}
          >
            {link.label}
          </Button>
        ))}
      </Box>
    </Container>
  );
}
