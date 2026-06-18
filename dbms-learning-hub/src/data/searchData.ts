// ============================================================
// DBMS Learning Hub – Search Index Data
// ============================================================
import type { SearchItem } from '@/types';

export const searchIndex: SearchItem[] = [
  // ─── Module / Topic Level ────────────────────────────────
  {
    id: 's-topic1',
    type: 'topic',
    title: 'Introduction to DBMS',
    content: 'Module 1 Topic 1 Introduction to Database Management Systems DBMS',
    url: '/module1/topic1',
    icon: '📚',
  },
  // ─── Sections ────────────────────────────────────────────
  {
    id: 's-why-dbms',
    type: 'section',
    title: 'Why Should We Learn DBMS?',
    content:
      'College 10000 students attendance marks fees library hostel Excel sheets duplicate records missing information difficult searching data inconsistency security issues',
    url: '/module1/topic1',
    sectionId: 'why-dbms',
    icon: '🎯',
  },
  {
    id: 's-real-life',
    type: 'section',
    title: 'Real-Life Story – College Office Problem',
    content:
      'Paper files attendance register manual search calculate college office problem DBMS solution database roll number seconds',
    url: '/module1/topic1',
    sectionId: 'real-life-story',
    icon: '🌍',
  },
  {
    id: 's-what-database',
    type: 'section',
    title: 'What is a Database?',
    content:
      'Database organized collection related data table rows columns Roll No Name Branch student database',
    url: '/module1/topic1',
    sectionId: 'what-is-database',
    icon: '🤔',
  },
  {
    id: 's-what-dbms',
    type: 'section',
    title: 'What is DBMS?',
    content:
      'DBMS software helps users create store retrieve update manage data efficiently Database Management System programs define maintain control access',
    url: '/module1/topic1',
    sectionId: 'what-is-dbms',
    icon: '💻',
  },
  {
    id: 's-library',
    type: 'section',
    title: 'Library Analogy',
    content:
      'Library analogy librarian books visitors database DBMS data users organized search easy borrow track',
    url: '/module1/topic1',
    sectionId: 'library-analogy',
    icon: '🏫',
  },
  {
    id: 's-around-you',
    type: 'section',
    title: 'DBMS Around You',
    content:
      'WhatsApp Instagram Amazon Netflix Banking messages contacts photos likes followers products customers transactions watch history account',
    url: '/module1/topic1',
    sectionId: 'dbms-around-you',
    icon: '📱',
  },
  {
    id: 's-functions',
    type: 'section',
    title: 'Core Functions of DBMS',
    content:
      'Data storage retrieval update deletion security backup recovery university 20000 students roll number phone number duplicate records power failure',
    url: '/module1/topic1',
    sectionId: 'core-functions',
    icon: '🧠',
  },
  {
    id: 's-components',
    type: 'section',
    title: 'Components of Database System',
    content:
      'Users DBMS Software Database students faculty administrators MySQL Oracle PostgreSQL SQL Server',
    url: '/module1/topic1',
    sectionId: 'components',
    icon: '🏗️',
  },
  {
    id: 's-restaurant',
    type: 'section',
    title: 'Restaurant Analogy',
    content:
      'Restaurant customer waiter kitchen food user DBMS database information analogy mapping',
    url: '/module1/topic1',
    sectionId: 'restaurant-analogy',
    icon: '🎭',
  },
  {
    id: 's-comparison',
    type: 'section',
    title: 'Without DBMS vs With DBMS',
    content:
      'Without DBMS Marks.xlsx Attendance.xlsx Fees.xlsx Library.xlsx duplicate data difficult search security issues data loss With DBMS centralized database fast access organized security easy updates',
    url: '/module1/topic1',
    sectionId: 'comparison',
    icon: '📊',
  },
  {
    id: 's-terminology',
    type: 'section',
    title: 'Important Terminologies',
    content:
      'Data raw facts Database organized collection DBMS software Record row Field column Table collection records',
    url: '/module1/topic1',
    sectionId: 'terminology',
    icon: '🔑',
  },
  {
    id: 's-industry',
    type: 'section',
    title: 'Industry Usage',
    content:
      'MySQL Facebook WordPress PostgreSQL Instagram Spotify Oracle banks government SQL Server enterprises MongoDB modern web applications',
    url: '/module1/topic1',
    sectionId: 'industry',
    icon: '🏢',
  },
  // ─── Definitions ─────────────────────────────────────────
  {
    id: 'd-database',
    type: 'definition',
    title: 'Database',
    content:
      'An organized collection of related data stored electronically in a structured format',
    url: '/module1/topic1',
    sectionId: 'what-is-database',
    icon: '🗄️',
  },
  {
    id: 'd-dbms',
    type: 'definition',
    title: 'DBMS',
    content:
      'Database Management System — software that helps users create, store, retrieve, update, and manage data efficiently',
    url: '/module1/topic1',
    sectionId: 'what-is-dbms',
    icon: '💾',
  },
  {
    id: 'd-record',
    type: 'definition',
    title: 'Record',
    content:
      'One complete row in a database table representing a single entity (e.g., one student\'s complete information)',
    url: '/module1/topic1',
    sectionId: 'terminology',
    icon: '📋',
  },
  {
    id: 'd-field',
    type: 'definition',
    title: 'Field',
    content:
      'One column in a database table representing a single attribute of an entity (e.g., Name, Roll No)',
    url: '/module1/topic1',
    sectionId: 'terminology',
    icon: '🏷️',
  },
  {
    id: 'd-table',
    type: 'definition',
    title: 'Table',
    content:
      'A structured collection of records organized in rows and columns — the fundamental storage unit in relational databases',
    url: '/module1/topic1',
    sectionId: 'terminology',
    icon: '📊',
  },
  // ─── Playground ──────────────────────────────────────────
  {
    id: 'p-playground',
    type: 'module',
    title: 'Interactive Playground',
    content:
      'DBMS Simulator create table insert update delete search sort filter export import JSON student database',
    url: '/playground',
    icon: '🎮',
  },
  // ─── Quiz ────────────────────────────────────────────────
  {
    id: 'q-quiz',
    type: 'module',
    title: 'Quiz Center',
    content:
      'MCQ quiz questions DBMS stands for database management system score progress confetti',
    url: '/quiz',
    icon: '🧩',
  },
  {
    id: 'q-viva',
    type: 'module',
    title: 'Viva Corner',
    content: 'Viva questions answers random generator practice oral exam DBMS database',
    url: '/viva',
    icon: '🎤',
  },
  {
    id: 'q-revision',
    type: 'module',
    title: 'Revision Notes',
    content:
      'One minute revision cards swipeable database DBMS functions applications components advantages',
    url: '/revision',
    icon: '🚀',
  },
  {
    id: 'q-progress',
    type: 'module',
    title: 'Progress Tracker',
    content:
      'Progress dashboard learning achievements badges topics visited quiz score playground usage',
    url: '/progress',
    icon: '📈',
  },
];
