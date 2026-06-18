// ============================================================
// DBMS Learning Hub – Revision Cards Data
// ============================================================
import type { RevisionCard } from '@/types';

export const revisionCards: RevisionCard[] = [
  {
    id: 'r1',
    title: 'What is a Database?',
    content:
      '📦 A Database is an organized collection of related data.\n\nExample: A Student Database stores Roll No, Name, Branch, Marks, Attendance — all in structured tables.\n\n🔑 Key point: Data is organized, related, and easily accessible.',
    emoji: '🗄️',
    category: 'Definition',
    color: '#6366f1',
  },
  {
    id: 'r2',
    title: 'What is DBMS?',
    content:
      '🖥️ DBMS = Database Management System\n\nSoftware that manages databases.\n\nSimple: Software that manages data.\n\nTechnical: A collection of programs enabling users to define, create, maintain, and control access to databases.\n\n🔑 Examples: MySQL, Oracle, PostgreSQL, SQL Server, MongoDB',
    emoji: '💻',
    category: 'Definition',
    color: '#8b5cf6',
  },
  {
    id: 'r3',
    title: 'Core Functions of DBMS',
    content:
      '⚡ 6 Core Functions:\n\n1. 💾 Data Storage – stores huge amounts of data\n2. 🔍 Data Retrieval – fetches information quickly\n3. ✏️ Data Update – modifies existing data\n4. 🗑️ Data Deletion – removes unwanted data\n5. 🔒 Data Security – protects sensitive information\n6. 🔄 Backup & Recovery – restores lost data',
    emoji: '⚡',
    category: 'Functions',
    color: '#06b6d4',
  },
  {
    id: 'r4',
    title: 'Real-World Applications',
    content:
      '🌍 DBMS is everywhere!\n\n📱 WhatsApp – messages, contacts, media\n📸 Instagram – profiles, photos, followers\n🛒 Amazon – products, orders, payments\n🎬 Netflix – movies, watch history\n🏦 Banking – accounts, transactions\n🎓 Education – student records, results',
    emoji: '🌍',
    category: 'Applications',
    color: '#10b981',
  },
  {
    id: 'r5',
    title: 'Components of Database System',
    content:
      '🏗️ Three Main Components:\n\n👤 Users\n↓\n🖥️ DBMS Software\n↓\n🗄️ Database\n\n• Users: Students, Faculty, Administrators\n• DBMS: MySQL, Oracle, PostgreSQL\n• Database: Actual stored information',
    emoji: '🏗️',
    category: 'Components',
    color: '#f59e0b',
  },
  {
    id: 'r6',
    title: 'Key Terminology',
    content:
      '📚 Important Terms:\n\n• Data = Raw unprocessed facts\n• Database = Organized collection of data\n• DBMS = Software managing databases\n• Record = One complete row of data\n• Field = One column (attribute)\n• Table = Collection of records\n\n🔑 Exam Tip: Database ≠ DBMS!',
    emoji: '📚',
    category: 'Terminology',
    color: '#ef4444',
  },
  {
    id: 'r7',
    title: 'Advantages of DBMS',
    content:
      '✅ Why use DBMS?\n\n✅ Reduces data redundancy\n✅ Ensures data consistency\n✅ Fast data retrieval\n✅ Multi-user access\n✅ Enhanced security\n✅ Automatic backup\n✅ Easy data sharing\n✅ Data integrity\n\n❌ Without DBMS: Duplicate files, inconsistency, slow search',
    emoji: '✅',
    category: 'Advantages',
    color: '#84cc16',
  },
  {
    id: 'r8',
    title: 'Library & Restaurant Analogies',
    content:
      '📚 Library Analogy:\nLibrary = Database | Librarian = DBMS | Books = Data | Visitors = Users\n\n🍽️ Restaurant Analogy:\nCustomer = User | Waiter = DBMS | Kitchen = Database | Food = Information\n\n🔑 DBMS acts as the middleman between users and data!',
    emoji: '🎭',
    category: 'Analogies',
    color: '#f97316',
  },
  {
    id: 'r9',
    title: 'Industry DBMS Software',
    content:
      '🏢 Industry Leaders:\n\n🐬 MySQL – Facebook, WordPress (open source)\n🐘 PostgreSQL – Instagram, Spotify (advanced features)\n🏛️ Oracle – Banks, Government (enterprise)\n🪟 SQL Server – Microsoft enterprises\n🍃 MongoDB – Modern web apps (NoSQL)\n\n📊 Popularity: MySQL & PostgreSQL most popular for web apps',
    emoji: '🏢',
    category: 'Industry',
    color: '#6366f1',
  },
  {
    id: 'r10',
    title: 'Common Exam Mistakes',
    content:
      '⚠️ Don\'t make these mistakes!\n\n❌ Mistake 1: Database = DBMS\n✅ Fix: Database = Data | DBMS = Software\n\n❌ Mistake 2: Excel is a DBMS\n✅ Fix: Excel lacks security, queries, multi-user access\n\n❌ Mistake 3: DBMS decreases security\n✅ Fix: DBMS enhances security with access controls\n\n❌ Mistake 4: Only one user can access DBMS\n✅ Fix: DBMS supports concurrent multi-user access',
    emoji: '⚠️',
    category: 'Exam Tips',
    color: '#ec4899',
  },
];
