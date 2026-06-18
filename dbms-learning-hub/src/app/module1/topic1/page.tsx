'use client';

// ============================================================
// DBMS Learning Hub – Module 1, Topic 1 Page
// ============================================================
import React, { useEffect, useRef, useState } from 'react';
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
import type { Metadata } from 'next';
import { useProgressStore } from '@/store/progressStore';

// ── Lazy-load heavy interactive components ──
import dynamic from 'next/dynamic';
const CollegeScenarioSlider = dynamic(() => import('@/components/topic1/CollegeScenarioSlider'), { ssr: false });
const WorkflowAnimation = dynamic(() => import('@/components/topic1/WorkflowAnimation'), { ssr: false });
const InteractiveTableBuilder = dynamic(() => import('@/components/topic1/InteractiveTableBuilder'), { ssr: false });
const DataFlowAnimation = dynamic(() => import('@/components/topic1/DataFlowAnimation'), { ssr: false });
const DbmsAroundYou = dynamic(() => import('@/components/topic1/DbmsAroundYou'), { ssr: false });
const WithoutVsWithDbms = dynamic(() => import('@/components/topic1/WithoutVsWithDbms'), { ssr: false });
const FlashcardDeck = dynamic(() => import('@/components/topic1/FlashcardDeck'), { ssr: false });
const RestaurantAnalogy = dynamic(() => import('@/components/topic1/RestaurantAnalogy'), { ssr: false });

interface Section {
  id: string;
  title: string;
  emoji: string;
  color: string;
  summary: string;
  keywords: string[];
  component?: React.ReactNode;
  content?: React.ReactNode;
}

const MotionBox = motion(Box);

export default function Topic1Page() {
  const theme = useTheme();
  const { markTopicVisited } = useProgressStore();
  const [searchQ, setSearchQ] = useState('');
  const [expanded, setExpanded] = useState<string[]>(['why-dbms']);

  useEffect(() => {
    markTopicVisited('module1-topic1', 'Introduction to DBMS');
  }, [markTopicVisited]);

  const sections: Section[] = [
    {
      id: 'why-dbms',
      title: 'Why Should We Learn DBMS?',
      emoji: '🎯',
      color: '#6366f1',
      summary:
        'Discover why DBMS is essential for managing large volumes of data in the real world. Compare Excel files with a proper database system.',
      keywords: ['learn', 'college', 'students', 'excel', 'data', 'management', 'duplicate', 'inconsistency'],
      component: <CollegeScenarioSlider />,
    },
    {
      id: 'real-life-story',
      title: 'Real-Life Story – The College Office Problem',
      emoji: '🌍',
      color: '#8b5cf6',
      summary:
        'Understand the pain of manual data management. See how DBMS transforms a 5-minute manual task into a 2-second database query.',
      keywords: ['paper', 'manual', 'attendance', 'search', 'office', 'time', 'seconds', 'story'],
      component: <WorkflowAnimation />,
    },
    {
      id: 'what-is-database',
      title: 'What is a Database?',
      emoji: '🤔',
      color: '#06b6d4',
      summary:
        'A Database is an organized collection of related data. Build your own database table interactively — add rows, columns, and edit values.',
      keywords: ['database', 'organized', 'collection', 'table', 'row', 'column', 'roll no', 'name', 'branch'],
      component: <InteractiveTableBuilder />,
      content: (
        <Box
          sx={{
            mb: 3,
            p: 2.5,
            borderRadius: 2,
            bgcolor: alpha('#06b6d4', 0.06),
            border: `1px solid ${alpha('#06b6d4', 0.2)}`,
          }}
        >
          <Typography variant="h6" fontWeight={700} color="#06b6d4" gutterBottom>
            Definition
          </Typography>
          <Typography variant="body1">
            A <strong>Database</strong> is an organized collection of related data stored electronically.
          </Typography>
          <Typography variant="body2" color="text.secondary" mt={1}>
            Formula: <strong>Database = Organized Collection of Data</strong>
          </Typography>
        </Box>
      ),
    },
    {
      id: 'what-is-dbms',
      title: 'What is DBMS?',
      emoji: '💻',
      color: '#8b5cf6',
      summary:
        'A DBMS is software that manages databases. Watch how data flows from User → DBMS → Database → Output in an animated visualization.',
      keywords: ['dbms', 'software', 'manage', 'create', 'retrieve', 'update', 'define', 'maintain', 'control'],
      component: <DataFlowAnimation />,
      content: (
        <Box sx={{ mb: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
          {[
            {
              label: 'Simple Definition',
              text: 'A DBMS is software that manages databases.',
              color: '#6366f1',
            },
            {
              label: 'Technical Definition',
              text: 'A DBMS is a collection of programs that enables users to define, create, maintain, and control access to databases.',
              color: '#8b5cf6',
            },
          ].map((d) => (
            <Box
              key={d.label}
              sx={{
                p: 2,
                borderRadius: 2,
                bgcolor: alpha(d.color, 0.06),
                border: `1px solid ${alpha(d.color, 0.2)}`,
              }}
            >
              <Chip label={d.label} size="small" sx={{ bgcolor: alpha(d.color, 0.15), color: d.color, fontWeight: 700, mb: 1 }} />
              <Typography variant="body1">{d.text}</Typography>
            </Box>
          ))}
        </Box>
      ),
    },
    {
      id: 'library-analogy',
      title: 'Everyday Analogy – The Library',
      emoji: '🏫',
      color: '#10b981',
      summary:
        'Think of DBMS as a smart librarian. Without a librarian, books are scattered everywhere. With a librarian, everything is organized.',
      keywords: ['library', 'librarian', 'books', 'visitors', 'organized', 'search', 'borrow', 'track'],
      content: (
        <Box>
          <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
            {[
              {
                title: '😤 Without Librarian',
                points: ['Books scattered everywhere', 'Finding a book is very difficult', 'No tracking system'],
                color: '#ef4444',
              },
              {
                title: '😊 With Librarian (DBMS)',
                points: ['Books arranged properly', 'Search becomes instant and easy', 'Borrowing & tracking made simple'],
                color: '#10b981',
              },
            ].map((side) => (
              <Box
                key={side.title}
                sx={{
                  flex: 1,
                  minWidth: 200,
                  p: 2.5,
                  borderRadius: 2.5,
                  bgcolor: alpha(side.color, 0.06),
                  border: `2px solid ${alpha(side.color, 0.25)}`,
                }}
              >
                <Typography variant="subtitle1" fontWeight={800} color={side.color} gutterBottom>
                  {side.title}
                </Typography>
                {side.points.map((p) => (
                  <Typography key={p} variant="body2" sx={{ mb: 0.5 }}>
                    {side.color === '#ef4444' ? '❌' : '✅'} {p}
                  </Typography>
                ))}
              </Box>
            ))}
          </Box>

          {/* Analogy table */}
          <Box
            component="table"
            sx={{ width: '100%', borderCollapse: 'collapse', borderRadius: 2, overflow: 'hidden' }}
          >
            <Box component="thead">
              <Box component="tr">
                {['Real World', 'DBMS World'].map((h) => (
                  <Box
                    component="th"
                    key={h}
                    sx={{
                      px: 2, py: 1.5,
                      bgcolor: alpha('#10b981', 0.12),
                      textAlign: 'left',
                      fontWeight: 800,
                      color: '#10b981',
                      fontSize: '0.85rem',
                    }}
                  >
                    {h}
                  </Box>
                ))}
              </Box>
            </Box>
            <Box component="tbody">
              {[['📚 Library', '🗄️ Database'], ['🧑‍💼 Librarian', '⚙️ DBMS'], ['📖 Books', '💾 Data'], ['👥 Visitors', '👤 Users']].map((row, i) => (
                <Box
                  component="tr"
                  key={i}
                  sx={{ bgcolor: i % 2 === 0 ? alpha('#10b981', 0.03) : 'transparent' }}
                >
                  {row.map((cell) => (
                    <Box
                      component="td"
                      key={cell}
                      sx={{ px: 2, py: 1.25, borderBottom: `1px solid ${alpha(theme.palette.divider, 0.5)}`, fontSize: '0.9rem' }}
                    >
                      {cell}
                    </Box>
                  ))}
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      ),
    },
    {
      id: 'dbms-around-you',
      title: 'DBMS Around You',
      emoji: '📱',
      color: '#f59e0b',
      summary:
        'See how WhatsApp, Instagram, Amazon, Netflix, Banking, and Google all rely on DBMS. Click each app card to explore what data they store.',
      keywords: ['whatsapp', 'instagram', 'amazon', 'netflix', 'banking', 'google', 'applications', 'everyday'],
      component: <DbmsAroundYou />,
    },
    {
      id: 'core-functions',
      title: 'Core Functions of DBMS',
      emoji: '🧠',
      color: '#06b6d4',
      summary:
        'Learn the 6 core functions: Data Storage, Retrieval, Update, Deletion, Security, and Backup & Recovery with real-world examples.',
      keywords: ['functions', 'storage', 'retrieval', 'update', 'delete', 'security', 'backup', 'recovery'],
      content: (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {[
            { num: '1', title: 'Data Storage', icon: '💾', color: '#6366f1', desc: 'Stores huge amounts of data efficiently.', example: 'A university storing records of 20,000 students.' },
            { num: '2', title: 'Data Retrieval', icon: '🔍', color: '#8b5cf6', desc: 'Retrieves information quickly from the database.', example: 'Search student details using Roll Number.' },
            { num: '3', title: 'Data Update', icon: '✏️', color: '#06b6d4', desc: 'Allows modification of existing data.', example: 'Updating a student\'s phone number.' },
            { num: '4', title: 'Data Deletion', icon: '🗑️', color: '#10b981', desc: 'Removes unwanted or redundant data.', example: 'Deleting duplicate student records.' },
            { num: '5', title: 'Data Security', icon: '🔒', color: '#f59e0b', desc: 'Protects sensitive information from unauthorized access.', example: 'Students cannot access faculty salary records.' },
            { num: '6', title: 'Backup & Recovery', icon: '🔄', color: '#ef4444', desc: 'Restores lost data after system failures.', example: 'Recovering database after a power failure.' },
          ].map((fn) => (
            <MotionBox
              key={fn.num}
              whileHover={{ x: 4 }}
              sx={{
                display: 'flex',
                gap: 2,
                p: 2,
                borderRadius: 2.5,
                bgcolor: alpha(fn.color, 0.06),
                border: `1px solid ${alpha(fn.color, 0.2)}`,
                alignItems: 'flex-start',
              }}
            >
              <Box
                sx={{
                  width: 44,
                  height: 44,
                  borderRadius: 2,
                  bgcolor: alpha(fn.color, 0.15),
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.3rem',
                  flexShrink: 0,
                }}
              >
                {fn.icon}
              </Box>
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.25 }}>
                  <Chip label={fn.num} size="small" sx={{ height: 18, fontSize: '0.65rem', fontWeight: 800, bgcolor: fn.color, color: 'white' }} />
                  <Typography variant="subtitle2" fontWeight={800} color={fn.color}>
                    {fn.title}
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                  {fn.desc}
                </Typography>
                <Typography variant="caption" sx={{ fontStyle: 'italic', color: fn.color }}>
                  📌 Example: {fn.example}
                </Typography>
              </Box>
            </MotionBox>
          ))}
        </Box>
      ),
    },
    {
      id: 'components',
      title: 'Components of a Database System',
      emoji: '🏗️',
      color: '#ec4899',
      summary:
        'A database system has three main components: Users, DBMS Software, and the Database itself. Understand how they interact.',
      keywords: ['components', 'users', 'software', 'mysql', 'oracle', 'postgresql', 'students', 'faculty', 'admin'],
      content: (
        <Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0, mb: 3 }}>
            {[
              { label: 'Users', icon: '👥', desc: 'Students, Faculty, Administrators', color: '#6366f1', examples: ['🧑‍🎓 Students', '👨‍🏫 Faculty', '🛠️ Administrators', '💻 Application Programs'] },
              { label: 'DBMS Software', icon: '⚙️', desc: 'The software that manages data', color: '#8b5cf6', examples: ['🐬 MySQL', '🏛️ Oracle', '🐘 PostgreSQL', '🪟 SQL Server'] },
              { label: 'Database', icon: '🗄️', desc: 'The actual stored information', color: '#06b6d4', examples: ['👤 Student Records', '📋 Attendance', '💰 Fee Details', '📚 Library Data'] },
            ].map((comp, i) => (
              <React.Fragment key={comp.label}>
                <MotionBox
                  whileHover={{ scale: 1.02 }}
                  sx={{
                    width: '100%',
                    maxWidth: 480,
                    p: 2.5,
                    borderRadius: 3,
                    bgcolor: alpha(comp.color, 0.08),
                    border: `2px solid ${alpha(comp.color, 0.3)}`,
                    textAlign: 'center',
                  }}
                >
                  <Typography sx={{ fontSize: '2rem', mb: 0.5 }}>{comp.icon}</Typography>
                  <Typography variant="h6" fontWeight={800} color={comp.color} gutterBottom>
                    {comp.label}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
                    {comp.desc}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 0.75, flexWrap: 'wrap', justifyContent: 'center' }}>
                    {comp.examples.map((ex) => (
                      <Chip
                        key={ex}
                        label={ex}
                        size="small"
                        sx={{ bgcolor: alpha(comp.color, 0.15), color: comp.color, fontWeight: 600, fontSize: '0.75rem' }}
                      />
                    ))}
                  </Box>
                </MotionBox>
                {i < 2 && (
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 0.5 }}>
                    <Box sx={{ width: 2, height: 20, bgcolor: alpha(comp.color, 0.4) }} />
                    <Typography color="text.secondary" sx={{ fontSize: '1rem' }}>↓</Typography>
                  </Box>
                )}
              </React.Fragment>
            ))}
          </Box>
        </Box>
      ),
    },
    {
      id: 'restaurant-analogy',
      title: 'Fun Analogy – The Restaurant',
      emoji: '🎭',
      color: '#f97316',
      summary:
        'Customer → Waiter → Kitchen → Food maps to User → DBMS → Database → Information. Hover over the cards to see the connection!',
      keywords: ['restaurant', 'customer', 'waiter', 'kitchen', 'food', 'analogy', 'fun'],
      component: <RestaurantAnalogy />,
    },
    {
      id: 'comparison',
      title: 'Without DBMS vs With DBMS',
      emoji: '📊',
      color: '#84cc16',
      summary:
        'See a side-by-side comparison of scattered Excel files vs a centralized DBMS — with all the problems and benefits clearly illustrated.',
      keywords: ['comparison', 'excel', 'files', 'centralized', 'duplicate', 'benefits', 'advantages', 'marks', 'attendance', 'fees'],
      component: <WithoutVsWithDbms />,
    },
    {
      id: 'terminology',
      title: 'Important Terminologies',
      emoji: '🔑',
      color: '#6366f1',
      summary:
        'Master key DBMS terms: Data, Database, DBMS, Record, Field, Table. Use the interactive flashcards to test your knowledge!',
      keywords: ['data', 'record', 'field', 'table', 'terminology', 'terms', 'definitions', 'glossary', 'flashcard'],
      component: <FlashcardDeck />,
    },
    {
      id: 'industry',
      title: 'Industry Usage',
      emoji: '🏢',
      color: '#8b5cf6',
      summary:
        'Explore which companies use MySQL, PostgreSQL, Oracle, SQL Server, and MongoDB and why.',
      keywords: ['mysql', 'postgresql', 'oracle', 'sql server', 'mongodb', 'industry', 'facebook', 'instagram', 'banks', 'government'],
      content: (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {[
            { name: 'MySQL', icon: '🐬', color: '#00758f', usedBy: ['Facebook', 'WordPress', 'YouTube'], type: 'Open Source RDBMS', desc: 'Most popular open-source relational database. Free and widely supported.' },
            { name: 'PostgreSQL', icon: '🐘', color: '#336791', usedBy: ['Instagram', 'Spotify', 'Reddit'], type: 'Open Source RDBMS', desc: 'Advanced open-source database with powerful features and JSON support.' },
            { name: 'Oracle DB', icon: '🏛️', color: '#f80000', usedBy: ['Banks', 'Government', 'Hospitals'], type: 'Enterprise RDBMS', desc: 'Industry-leading enterprise database known for reliability and security.' },
            { name: 'SQL Server', icon: '🪟', color: '#0078d4', usedBy: ['Microsoft', 'Large Enterprises'], type: 'Enterprise RDBMS', desc: 'Microsoft\'s enterprise database with deep Windows integration.' },
            { name: 'MongoDB', icon: '🍃', color: '#4db33d', usedBy: ['Modern Web Apps', 'Startups', 'IoT'], type: 'NoSQL Document DB', desc: 'Flexible NoSQL database ideal for unstructured and JSON data.' },
          ].map((db) => (
            <MotionBox
              key={db.name}
              whileHover={{ x: 4 }}
              sx={{
                display: 'flex',
                gap: 2,
                p: 2,
                borderRadius: 2.5,
                bgcolor: alpha(db.color, 0.06),
                border: `1px solid ${alpha(db.color, 0.2)}`,
                alignItems: 'flex-start',
                flexWrap: 'wrap',
              }}
            >
              <Box sx={{ width: 44, height: 44, borderRadius: 2, bgcolor: alpha(db.color, 0.15), display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', flexShrink: 0 }}>
                {db.icon}
              </Box>
              <Box sx={{ flex: 1, minWidth: 160 }}>
                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mb: 0.5, flexWrap: 'wrap' }}>
                  <Typography variant="subtitle2" fontWeight={800} color={db.color}>{db.name}</Typography>
                  <Chip label={db.type} size="small" sx={{ height: 18, fontSize: '0.6rem', fontWeight: 700, bgcolor: alpha(db.color, 0.15), color: db.color }} />
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 0.75 }}>{db.desc}</Typography>
                <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                  {db.usedBy.map((u) => (
                    <Chip key={u} label={u} size="small" sx={{ height: 18, fontSize: '0.65rem', fontWeight: 600 }} />
                  ))}
                </Box>
              </Box>
            </MotionBox>
          ))}
        </Box>
      ),
    },
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
        <Link href="/module1/topic1" underline="hover" color="text.secondary" sx={{ fontSize: '0.85rem' }}>
          Module 1
        </Link>
        <Typography color="primary.main" fontSize="0.85rem" fontWeight={700}>
          Topic 1: Introduction to DBMS
        </Typography>
      </Breadcrumbs>

      {/* Page Header */}
      <MotionBox initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} sx={{ mb: 4 }}>
        <Chip
          label="📚 Module 1 · Topic 1"
          sx={{
            mb: 1.5,
            fontWeight: 700,
            bgcolor: alpha(theme.palette.primary.main, 0.1),
            color: 'primary.main',
          }}
        />
        <Typography variant="h3" fontWeight={900} sx={{ mb: 1 }}>
          Introduction to Database Management Systems
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
          {sections.length} interactive sections · 15 quiz questions · 15 viva questions · 10 revision cards
        </Typography>

        {/* Section chips for quick navigation */}
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          {sections.map((s) => (
            <Chip
              key={s.id}
              label={`${s.emoji} ${s.title.split('–')[0].trim().split(' ').slice(0, 3).join(' ')}`}
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
          placeholder="🔍 Search within this topic — e.g., 'library', 'functions', 'mysql'"
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
                  <Chip
                    label={i + 1 < 10 ? `0${i + 1}` : `${i + 1}`}
                    size="small"
                    sx={{ bgcolor: alpha(section.color, 0.12), color: section.color, fontWeight: 800, fontSize: '0.7rem', height: 22 }}
                  />
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

                {/* Interactive component */}
                {section.component && (
                  <Box>
                    <Typography variant="caption" fontWeight={700} color={section.color} sx={{ display: 'block', mb: 1.5, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                      🎮 Interactive Component
                    </Typography>
                    {section.component}
                  </Box>
                )}
              </AccordionDetails>
            </Accordion>
          </MotionBox>
        ))}
      </Box>

      {filteredSections.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 6, color: 'text.secondary' }}>
          <Typography variant="h5">🔍 No sections found for "{searchQ}"</Typography>
          <Button sx={{ mt: 2 }} onClick={() => setSearchQ('')}>Clear search</Button>
        </Box>
      )}

      {/* Bottom navigation */}
      <Box sx={{ mt: 4, display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
        {[
          { label: '🧩 Take Quiz', href: '/quiz', color: '#10b981' },
          { label: '🎤 Viva Practice', href: '/viva', color: '#ef4444' },
          { label: '🚀 Quick Revision', href: '/revision', color: '#f59e0b' },
          { label: '🎮 Playground', href: '/playground', color: '#6366f1' },
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
