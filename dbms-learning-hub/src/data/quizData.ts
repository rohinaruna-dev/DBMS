// ============================================================
// DBMS Learning Hub – Quiz Data
// ============================================================
import type { QuizQuestion } from '@/types';

export const quizQuestions: QuizQuestion[] = [
  {
    id: 'q1',
    question: 'What does DBMS stand for?',
    options: [
      'Database Managing Service',
      'Database Management System',
      'Data Backup Management System',
      'Database Machine Software',
    ],
    correctIndex: 1,
    explanation:
      'DBMS stands for Database Management System — software that manages databases by enabling users to create, store, retrieve, update, and manage data efficiently.',
    topic: 'Introduction to DBMS',
    difficulty: 'easy',
  },
  {
    id: 'q2',
    question: 'Which of the following stores data?',
    options: ['Database', 'Compiler', 'Browser', 'Operating System'],
    correctIndex: 0,
    explanation:
      'A Database is an organized collection of related data. It stores information in a structured format, unlike compilers or browsers.',
    topic: 'Introduction to DBMS',
    difficulty: 'easy',
  },
  {
    id: 'q3',
    question: 'Which of the following is NOT a function of DBMS?',
    options: ['Data Storage', 'Data Retrieval', 'Program Compilation', 'Data Security'],
    correctIndex: 2,
    explanation:
      'DBMS functions include storing, retrieving, updating, deleting, securing, and backing up data. Program compilation is done by a compiler, not a DBMS.',
    topic: 'Core Functions',
    difficulty: 'medium',
  },
  {
    id: 'q4',
    question: 'In the library analogy, the DBMS is compared to:',
    options: ['Books', 'Library building', 'Librarian', 'Visitors'],
    correctIndex: 2,
    explanation:
      'DBMS acts like a smart librarian — it organizes, manages, and retrieves data (books) for users (visitors) from the database (library).',
    topic: 'Analogies',
    difficulty: 'easy',
  },
  {
    id: 'q5',
    question: 'Which popular DBMS is used by Instagram and Spotify?',
    options: ['MySQL', 'PostgreSQL', 'Oracle', 'MongoDB'],
    correctIndex: 1,
    explanation:
      'PostgreSQL is used by Instagram and Spotify due to its advanced features, reliability, and scalability for large-scale applications.',
    topic: 'Industry Usage',
    difficulty: 'medium',
  },
  {
    id: 'q6',
    question: 'What is the main disadvantage of storing data in multiple Excel files?',
    options: [
      'Fast retrieval',
      'Data duplication and inconsistency',
      'Automatic backup',
      'Enhanced security',
    ],
    correctIndex: 1,
    explanation:
      'Multiple Excel files lead to duplicate records, inconsistent data, difficult searching, and security issues — all problems that DBMS solves.',
    topic: 'Why DBMS',
    difficulty: 'easy',
  },
  {
    id: 'q7',
    question: 'A "Record" in database terminology refers to:',
    options: ['One column', 'One row of related data', 'The entire table', 'The database name'],
    correctIndex: 1,
    explanation:
      'A Record is one row in a table containing a collection of related fields. For example, one student\'s complete information (Roll No, Name, Branch) is one record.',
    topic: 'Terminology',
    difficulty: 'easy',
  },
  {
    id: 'q8',
    question: 'A "Field" in database terminology refers to:',
    options: ['One row', 'The whole database', 'One column / attribute', 'A table'],
    correctIndex: 2,
    explanation:
      'A Field is one column in a table representing a single attribute of an entity. For example, "Name" is a field in a Student table.',
    topic: 'Terminology',
    difficulty: 'easy',
  },
  {
    id: 'q9',
    question: 'Which DBMS software is primarily used by banks and government organizations?',
    options: ['MySQL', 'MongoDB', 'Oracle', 'SQLite'],
    correctIndex: 2,
    explanation:
      'Oracle Database is widely used in banking and government organizations due to its enterprise-grade features, security, and reliability.',
    topic: 'Industry Usage',
    difficulty: 'medium',
  },
  {
    id: 'q10',
    question: 'In the restaurant analogy, what does the "Waiter" represent in DBMS?',
    options: ['User', 'DBMS', 'Database', 'Information'],
    correctIndex: 1,
    explanation:
      'The Waiter represents the DBMS — it takes requests from the customer (User) and communicates with the kitchen (Database) to return the food (Information).',
    topic: 'Analogies',
    difficulty: 'easy',
  },
  {
    id: 'q11',
    question: 'Which of the following statements is TRUE?',
    options: [
      'Database and DBMS are the same thing',
      'Excel is a full-featured DBMS',
      'DBMS decreases data security',
      'DBMS software manages the database',
    ],
    correctIndex: 3,
    explanation:
      'DBMS software manages the database. Database ≠ DBMS. Excel lacks advanced DBMS features. DBMS actually enhances security.',
    topic: 'Common Mistakes',
    difficulty: 'medium',
  },
  {
    id: 'q12',
    question: 'Which application does NOT use a DBMS?',
    options: ['WhatsApp', 'Amazon', 'Netflix', 'Notepad'],
    correctIndex: 3,
    explanation:
      'Notepad is a simple text editor that does not use any database system. WhatsApp, Amazon, and Netflix all rely heavily on database management systems.',
    topic: 'Applications',
    difficulty: 'easy',
  },
  {
    id: 'q13',
    question: 'What does "Data Retrieval" mean in DBMS?',
    options: [
      'Deleting old data',
      'Searching and fetching information quickly from the database',
      'Creating backup copies',
      'Adding new records',
    ],
    correctIndex: 1,
    explanation:
      'Data Retrieval is the ability to quickly search and fetch stored information from a database using queries or search criteria.',
    topic: 'Core Functions',
    difficulty: 'easy',
  },
  {
    id: 'q14',
    question: 'MongoDB is best described as a:',
    options: [
      'Relational DBMS',
      'NoSQL document database',
      'Spreadsheet application',
      'Operating system',
    ],
    correctIndex: 1,
    explanation:
      'MongoDB is a NoSQL document-oriented database used in modern web applications. It stores data in flexible, JSON-like documents instead of tables.',
    topic: 'Industry Usage',
    difficulty: 'hard',
  },
  {
    id: 'q15',
    question: 'Which function of DBMS helps restore data after a system failure?',
    options: ['Data Storage', 'Data Retrieval', 'Backup and Recovery', 'Data Security'],
    correctIndex: 2,
    explanation:
      'Backup and Recovery is the DBMS function that creates copies of data and restores them after system failures, power outages, or corruption.',
    topic: 'Core Functions',
    difficulty: 'medium',
  },
];
