'use client';

// ============================================================
// DBMS Learning Hub – Module 2, Topic 1 Page (ER Modeling)
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

export default function Topic1Page() {
  const theme = useTheme();
  const { markTopicVisited } = useProgressStore();
  const [searchQ, setSearchQ] = useState('');
  const [expanded, setExpanded] = useState<string[]>(['er-modeling-concepts']);

  useEffect(() => {
    markTopicVisited('module2-topic1', 'ER Modeling');
  }, [markTopicVisited]);

  const sections: Section[] = [
    {
      id: 'er-modeling-concepts',
      title: 'ER Modeling Concepts',
      emoji: '🧩',
      color: '#6366f1',
      summary: 'Understand the basic building blocks of the ER Model: Entities, Attributes, and Relationships.',
      keywords: ['entity', 'attribute', 'relationship', 'er model', 'concept'],
      content: (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Typography variant="body1">
            The Entity-Relationship (ER) model is a high-level conceptual data model used for database design.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
             {[
               { label: 'Entity', desc: 'A real-world object or concept (e.g., Student, Course)', color: '#6366f1' },
               { label: 'Attribute', desc: 'Properties or characteristics of an entity (e.g., Name, Roll No)', color: '#8b5cf6' },
               { label: 'Relationship', desc: 'Association between two or more entities (e.g., Enrolls In)', color: '#06b6d4' }
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
      id: 'design-issues',
      title: 'Entity-Relationship Model: Design Issues',
      emoji: '📐',
      color: '#ef4444',
      summary: 'Learn about the common pitfalls and design considerations when building ER diagrams.',
      keywords: ['design', 'issues', 'pitfalls', 'considerations', 'modeling'],
      content: (
         <Box>
           <Typography variant="body1" paragraph>
             When designing an ER diagram, database designers must make choices. Some key issues include:
           </Typography>
           <ul>
             <li><Typography variant="body2"><strong>Entity vs. Attribute:</strong> Should an object be modeled as an entity or just an attribute? (e.g., Is "Address" an attribute of Student, or its own Entity?)</Typography></li>
             <li><Typography variant="body2"><strong>Entity vs. Relationship:</strong> Sometimes an action can be modeled as either an entity or a relationship.</Typography></li>
             <li><Typography variant="body2"><strong>Binary vs. N-ary Relationships:</strong> Is it better to have multiple binary relationships or one complex n-ary relationship?</Typography></li>
           </ul>
         </Box>
      )
    },
    {
      id: 'cardinality-constraints',
      title: 'Cardinality Constraints',
      emoji: '🔢',
      color: '#10b981',
      summary: 'Explore One-to-One, One-to-Many, Many-to-One, and Many-to-Many relationships.',
      keywords: ['cardinality', 'constraints', 'one to one', 'one to many', 'many to many', 'mapping'],
      content: (
         <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {[
              { type: 'One-to-One (1:1)', example: 'A Person has one Passport, and a Passport belongs to one Person.' },
              { type: 'One-to-Many (1:N)', example: 'A Department has many Employees, but an Employee works in one Department.' },
              { type: 'Many-to-Many (M:N)', example: 'A Student enrolls in many Courses, and a Course has many Students.' }
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
      id: 'weak-entity-types',
      title: 'Weak-Entity Types',
      emoji: '🔗',
      color: '#f59e0b',
      summary: 'Understand entities that do not have their own primary key and depend on a strong entity.',
      keywords: ['weak entity', 'strong entity', 'identifying relationship', 'partial key'],
      content: (
         <Box>
            <Typography variant="body1" paragraph>
              A <strong>Weak Entity</strong> is an entity that cannot be uniquely identified by its attributes alone. It depends on a <em>Strong Entity</em> (the identifying entity) for its existence.
            </Typography>
            <Box sx={{ p: 2, bgcolor: alpha('#f59e0b', 0.1), borderRadius: 2, border: `1px dashed #f59e0b` }}>
               <Typography variant="subtitle2" fontWeight={700}>Example: Building & Room</Typography>
               <Typography variant="body2">A "Room" entity might only be identified by its Room Number (e.g., Room 101). But multiple buildings can have a Room 101. Therefore, "Room" is a weak entity that depends on the "Building" strong entity.</Typography>
            </Box>
         </Box>
      )
    },
    {
      id: 'subclasses-inheritance',
      title: 'Subclasses and Inheritance',
      emoji: '🧬',
      color: '#ec4899',
      summary: 'Learn how object-oriented concepts like inheritance apply to ER modeling.',
      keywords: ['subclass', 'superclass', 'inheritance', 'hierarchy'],
      content: (
         <Box>
            <Typography variant="body1" paragraph>
              An entity type can have subgroups of its entities that are meaningful and need to be represented explicitly.
            </Typography>
            <ul>
               <li><Typography variant="body2"><strong>Superclass:</strong> The general entity (e.g., Employee).</Typography></li>
               <li><Typography variant="body2"><strong>Subclass:</strong> The specialized entity (e.g., Engineer, Manager, Technician).</Typography></li>
            </ul>
            <Typography variant="body2" color="text.secondary">
              Subclasses <em>inherit</em> attributes and relationships from their superclass.
            </Typography>
         </Box>
      )
    },
    {
      id: 'specialization-generalization',
      title: 'Specialization and Generalization',
      emoji: '🔄',
      color: '#8b5cf6',
      summary: 'Top-down (Specialization) vs Bottom-up (Generalization) design approaches.',
      keywords: ['specialization', 'generalization', 'top down', 'bottom up'],
      content: (
         <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Box sx={{ flex: 1, p: 2, bgcolor: alpha('#8b5cf6', 0.1), borderRadius: 2 }}>
               <Typography fontWeight={700} color="#8b5cf6">Specialization (Top-Down)</Typography>
               <Typography variant="body2">Starting with a generic entity (Person) and breaking it down into specialized subclasses (Student, Faculty).</Typography>
            </Box>
            <Box sx={{ flex: 1, p: 2, bgcolor: alpha('#8b5cf6', 0.1), borderRadius: 2 }}>
               <Typography fontWeight={700} color="#8b5cf6">Generalization (Bottom-Up)</Typography>
               <Typography variant="body2">Starting with specialized entities (Car, Truck) and identifying common features to create a generalized superclass (Vehicle).</Typography>
            </Box>
         </Box>
      )
    },
    {
      id: 'conceptual-database-design',
      title: 'Conceptual Database Design with the ER Model',
      emoji: '🗺️',
      color: '#06b6d4',
      summary: 'Putting it all together to map real-world requirements into a full conceptual schema.',
      keywords: ['conceptual', 'design', 'schema', 'mapping', 'requirements'],
      content: (
         <Box>
            <Typography variant="body1" paragraph>
              The ER model is used during the <strong>Conceptual Design Phase</strong> of database development. It serves as a blueprint before translating the design into actual SQL tables.
            </Typography>
            <Box sx={{ p: 2, bgcolor: alpha('#06b6d4', 0.1), borderRadius: 2 }}>
               <Typography variant="subtitle2" fontWeight={700} mb={1}>The Process:</Typography>
               <ol style={{ margin: 0, paddingLeft: '1.2rem' }}>
                  <li><Typography variant="body2">Requirement Analysis (Gathering info from users)</Typography></li>
                  <li><Typography variant="body2">Identify Entities</Typography></li>
                  <li><Typography variant="body2">Identify Attributes for each Entity</Typography></li>
                  <li><Typography variant="body2">Identify Relationships between Entities</Typography></li>
                  <li><Typography variant="body2">Define Cardinality and Constraints</Typography></li>
                  <li><Typography variant="body2">Draw the ER Diagram</Typography></li>
               </ol>
            </Box>
         </Box>
      )
    },
    {
      id: 'viva-questions',
      title: 'Module 2 Viva Questions',
      emoji: '🎤',
      color: '#ef4444',
      summary: 'Practice your oral exam skills with these frequently asked viva questions for ER Modeling.',
      keywords: ['viva', 'questions', 'exam', 'practice', 'oral'],
      content: (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {vivaQuestions.filter(q => q.id.startsWith('m2')).map((q, i) => (
             <Box key={q.id} sx={{ p: 2, bgcolor: alpha('#ef4444', 0.05), borderRadius: 2, border: `1px solid ${alpha('#ef4444', 0.1)}` }}>
                <Typography variant="subtitle2" fontWeight={800} sx={{ mb: 1 }}>Q{i+1}: {q.question}</Typography>
                <Typography variant="body2" color="text.secondary"><strong>Answer:</strong> {q.answer}</Typography>
             </Box>
          ))}
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
          Module 2
        </Typography>
        <Typography color="primary.main" fontSize="0.85rem" fontWeight={700}>
          Topic 1: ER Modeling
        </Typography>
      </Breadcrumbs>

      {/* Page Header */}
      <MotionBox initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} sx={{ mb: 4 }}>
        <Chip
          label="📚 Module 2 · Topic 1"
          sx={{
            mb: 1.5,
            fontWeight: 700,
            bgcolor: alpha(theme.palette.primary.main, 0.1),
            color: 'primary.main',
          }}
        />
        <Typography variant="h3" fontWeight={900} sx={{ mb: 1 }}>
          Entity-Relationship Model
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
          {sections.length} interactive sections · Master Database Design
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
          placeholder="🔍 Search within this topic — e.g., 'cardinality', 'weak entity'"
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
