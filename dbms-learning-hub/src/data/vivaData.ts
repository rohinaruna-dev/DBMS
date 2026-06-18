// ============================================================
// DBMS Learning Hub – Viva Questions Data
// ============================================================
import type { VivaQuestion } from '@/types';

export const vivaQuestions: VivaQuestion[] = [
  {
    id: 'v1',
    question: 'What is a DBMS?',
    answer:
      'A DBMS (Database Management System) is software that enables users to define, create, maintain, and control access to databases. It acts as an interface between the database and the users or application programs.',
    category: 'Definition',
    difficulty: 'easy',
  },
  {
    id: 'v2',
    question: 'What is a Database?',
    answer:
      'A Database is an organized collection of related data stored and accessed electronically. It stores data in a structured format — typically as tables with rows and columns — making it easy to manage and retrieve.',
    category: 'Definition',
    difficulty: 'easy',
  },
  {
    id: 'v3',
    question: 'What is the difference between a Database and a DBMS?',
    answer:
      'A Database is the actual collection of stored data (like a filing cabinet). A DBMS is the software that manages and controls that database (like the office manager who organizes the filing cabinet). Database = Data; DBMS = Software managing data.',
    category: 'Concepts',
    difficulty: 'easy',
  },
  {
    id: 'v4',
    question: 'Name four popular DBMS software used in the industry.',
    answer:
      'MySQL (used by Facebook, WordPress), PostgreSQL (used by Instagram, Spotify), Oracle (used by Banks, Government), SQL Server (used by Enterprises), MongoDB (used by modern web applications).',
    category: 'Industry',
    difficulty: 'easy',
  },
  {
    id: 'v5',
    question: 'Why is DBMS important?',
    answer:
      'DBMS is important because it provides efficient storage and retrieval of data, reduces data redundancy and inconsistency, ensures data security and integrity, supports concurrent access by multiple users, enables data backup and recovery, and simplifies data management for large-scale applications.',
    category: 'Importance',
    difficulty: 'easy',
  },
  {
    id: 'v6',
    question: 'What are the core functions of a DBMS?',
    answer:
      '1. Data Storage – stores large amounts of data efficiently. 2. Data Retrieval – fetches information quickly. 3. Data Update – modifies existing records. 4. Data Deletion – removes unwanted data. 5. Data Security – protects sensitive information. 6. Backup and Recovery – restores data after failures.',
    category: 'Functions',
    difficulty: 'medium',
  },
  {
    id: 'v7',
    question: 'What are the components of a Database System?',
    answer:
      'The three main components are: 1. Users – people who interact with the database (students, faculty, administrators). 2. DBMS Software – the software managing data (MySQL, Oracle, PostgreSQL). 3. Database – the actual collection of stored information.',
    category: 'Components',
    difficulty: 'easy',
  },
  {
    id: 'v8',
    question: 'Explain the Library Analogy for DBMS.',
    answer:
      'In a library without a librarian, books are scattered and finding one takes a long time. With a librarian, books are organized, searches are instant, and borrowing is easy. Similarly, without DBMS, data is unorganized and hard to access. With DBMS, data is organized, retrieval is instant, and management is easy. Library = Database, Librarian = DBMS, Books = Data, Visitors = Users.',
    category: 'Analogies',
    difficulty: 'medium',
  },
  {
    id: 'v9',
    question: 'What is Data Redundancy and how does DBMS solve it?',
    answer:
      'Data Redundancy means storing the same data in multiple places, leading to inconsistency. For example, a student\'s name stored in Marks.xlsx, Attendance.xlsx, and Fees.xlsx separately. DBMS solves this by centralizing data in one database, so each piece of information is stored only once and referenced everywhere else.',
    category: 'Concepts',
    difficulty: 'medium',
  },
  {
    id: 'v10',
    question: 'Give three real-life applications of DBMS.',
    answer:
      '1. Banking – stores account details, transactions, and loan information. 2. E-Commerce (Amazon) – stores products, customers, orders, and payments. 3. Social Media (Instagram) – stores user profiles, photos, likes, and followers. Other examples: Healthcare (patient records), Education (student information systems), Airlines (reservations), Netflix (watch history).',
    category: 'Applications',
    difficulty: 'easy',
  },
  {
    id: 'v11',
    question: 'What is the difference between Data and Information?',
    answer:
      'Data is raw, unprocessed facts without context (e.g., "101, Rahul, 75"). Information is processed, meaningful data that has context (e.g., "Student Rahul with Roll No 101 scored 75%"). DBMS converts raw data into useful information through queries and reports.',
    category: 'Terminology',
    difficulty: 'medium',
  },
  {
    id: 'v12',
    question: 'What is meant by Data Security in DBMS?',
    answer:
      'Data Security in DBMS means protecting data from unauthorized access and modification. For example, students cannot access salary records of faculty, and only administrators can modify marks. DBMS implements security through user authentication, authorization levels, encryption, and access controls.',
    category: 'Functions',
    difficulty: 'medium',
  },
  {
    id: 'v13',
    question: 'Explain the Restaurant Analogy for DBMS.',
    answer:
      'In a restaurant: Customer (User) places an order → Waiter (DBMS) takes the request → Kitchen (Database) processes it → Food (Information) is returned to the customer. DBMS acts as the waiter — it mediates between users and data, taking requests and returning results.',
    category: 'Analogies',
    difficulty: 'easy',
  },
  {
    id: 'v14',
    question: 'Why can\'t Excel be considered a true DBMS?',
    answer:
      'Excel is a spreadsheet tool, not a true DBMS. It lacks: 1. Multi-user concurrent access. 2. Advanced data security and access control. 3. Efficient handling of large datasets. 4. Complex query capabilities. 5. Data integrity constraints. 6. Automatic backup and recovery. 7. Data relationship management across tables.',
    category: 'Concepts',
    difficulty: 'hard',
  },
  {
    id: 'v15',
    question: 'What is meant by "Backup and Recovery" in DBMS?',
    answer:
      'Backup is the process of creating copies of database data at regular intervals. Recovery is restoring the database to a consistent state after a failure (power outage, hardware crash, accidental deletion). Example: If a college database crashes, the DBMS restores all student records from the last backup, ensuring no data is permanently lost.',
    category: 'Functions',
    difficulty: 'medium',
  },
];
