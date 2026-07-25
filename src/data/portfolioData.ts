import { ExperienceItem, ProjectItem, SkillCategory, CredentialItem, CertificateItem } from '../types';

export const PERSONAL_INFO = {
  name: 'Krizza Heart Esperas',
  title: 'Full-Stack Web Developer & UI/UX Designer',
  tagline: 'Building clean, reliable systems — from HRIS to IoT.',
  roleDescription: 'Full-Stack Web Developer · UI/UX Designer',
  bio: 'BS Information Technology graduate who shipped a solo Human Resource Information System during internship, and led UI/UX and IoT work across three team projects. I like clear code, clear interfaces, and systems that don\'t break.',
  location: 'Talisay, Camarines Norte, PH',
  status: 'Open to junior developer roles',
  email: 'krizzaheart.esperas@gmail.com',
  phone: '+63 991 780 9416',
  github: 'https://github.com/krizzaheartesperas',
  linkedin: 'https://www.linkedin.com/in/krizza-heart-esperas-550ab9368',
  resumeUrl: '/resume.pdf',
  avatarUrl: 'https://new-digital-portfolio.vercel.app/profile.jpg',
  stats: [
    { number: '1', label: 'SOLO INTERNSHIP BUILD' },
    { number: '3', label: 'SHIPPED TEAM PROJECTS' },
    { number: '2', label: 'AWARDS & CITATIONS' }
  ]
};

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: 'hsi-hris',
    role: 'Web Developer Intern',
    company: 'Highly Succeed Inc.',
    companyUrl: 'https://highlysucceed.com/',
    period: 'Feb 16 – May 13, 2026',
    location: 'Mandaluyong City, Philippines',
    path: '~/highly-succeed-inc/hris-system',
    details: [
      'Independently designed, developed, tested, and deployed a Human Resource Information System (HRIS) as a solo project.',
      'Implemented authentication, employee management, and database-driven workflows.',
      'Owned database design, CRUD operations, and overall system functionality.',
      'Deployed and maintained the application on Vercel.',
      'Worked with my supervisor and teammates to gather requirements and ship improvements.'
    ],
    stack: ['JavaScript', 'TypeScript', 'Node.js', 'Supabase', 'PostgreSQL', 'Vercel']
  }
];

export const PROJECTS: ProjectItem[] = [
  {
    id: 'workzen-hris',
    title: 'Workzen HRIS – Human Resource Information System',
    date: 'Feb – May 2026',
    role: 'Full Stack Developer',
    category: 'fullstack',
    description: 'A digital HR platform that brings employee and administrative functions into one system to enhance the management of employee and HR operations. Developed as a modern, integrated system to improve workforce and organizational management, digitizing core HR processes. Deployed and undergoing continuous improvement.',
    award: '⭐ Featured Project',
    tags: ['JavaScript', 'TypeScript', 'Node.js', 'Supabase', 'Vercel'],
    demoUrl: 'hris-project-beta.vercel.app',
    screenshotImages: [
      '/projects/hris-1.jpg',
      '/projects/hris-2.jpg',
      '/projects/hris-3.jpg',
      '/projects/hris-4.jpg'
    ],
    documentationImages: [
      '/projects/hris-1.jpg', // Placeholder just so the tab shows up
      '/projects/hris-2.jpg'
    ]
  },
  {
    id: 'kling-ordering-system',
    title: 'Kling Ordering System – Digital Ordering & Management Platform',
    date: 'Feb – May 2026',
    role: 'Full Stack Developer (Team of 2)',
    category: 'fullstack',
    description: 'A full-stack ordering platform developed to simplify order processing and business management through a modern web application. The system enables customers to place orders seamlessly while providing administrators with tools to manage products, orders, and user accounts. Built with a scalable tech stack and optimized for performance, security, and responsive user experience.',
    award: '⭐ Featured Project',
    tags: ['JavaScript', 'TypeScript', 'Node.js', 'Supabase', 'Vercel'],
    demoUrl: 'https://kling-system.vercel.app/',
    screenshotImages: [
      '/projects/kling-1.jpg',
      '/projects/kling-2.jpg',
      '/projects/kling-3.jpg'
    ]
  },
  {
    id: 'tricypay',
    title: 'TricyPay — Smart Transportation Management System',
    date: 'Jan – Dec 2025',
    role: 'Mobile & IoT Application Developer (Team)',
    category: 'iot',
    description: 'A smart fare system for Daet, Camarines Norte. Contributed to the mobile app and the IoT-enabled fare collection device, automating fare computation, payment processing, and change dispensing — cutting manual transaction errors and improving monitoring for TRU and PSTMU.',
    award: '🏆 Best in Capstone Project',
    tags: ['IoT', 'Mobile App', 'Node.js', 'Fare Automation', 'Hardware Integration'],
    screenshotImages: [
      '/projects/tricypay-1.jpg',
      '/projects/tricypay-2.jpg',
      '/projects/tricypay-3.jpg',
      '/projects/tricypay-4.jpg'
    ]
  },
  {
    id: 'tb-simulation',
    title: 'Agent-Based Simulation and GIS Mapping of Tuberculosis Transmission',
    date: 'December 2024',
    role: 'Agent-Based Simulation Developer / Modeler • Daet, Camarines Norte',
    category: 'fullstack',
    description: 'Developed an agent-based simulation integrated with GIS to analyze TB transmission patterns. Mapped and identified high-prevalence barangays, including Alawihao and Bibirao. Modeled key factors such as mobility rates, infection probability, and healthcare accessibility. Supported forecasting and data-driven insights for public health assessment.',
    award: '⭐ Featured Research',
    tags: ['Agent-Based Modeling', 'GIS Mapping', 'Simulation', 'Data Analysis', 'Public Health'],
    publicationUrl: 'https://zenodo.org/records/14496751',
    documentationImages: [
      '/projects/tb-sim-1.png',
      '/projects/tb-sim-2.png',
      '/projects/tb-sim-3.png'
    ]
  },
  {
    id: 'egg-sorting',
    title: 'Autonomous Egg Quality Sorting System (IoT & Image Processing)',
    date: 'Feb – Dec 2024',
    role: 'IoT Developer (Team)',
    category: 'iot',
    description: 'Built on Raspberry Pi with image processing to classify duck eggs by size, quality, and shape. Automated the sorting process and added real-time monitoring and data logging to support inventory management.',
    tags: ['Raspberry Pi', 'Python', 'Computer Vision', 'IoT', 'Data Logging'],
    screenshotImages: [
      '/projects/egg-sorting-1.jpg',
      '/projects/egg-sorting-2.jpg'
    ]
  },
  {
    id: 'smart-airport',
    title: 'Mactan Cebu International Smart IoT Airport',
    date: '2024',
    role: 'IoT Developer (Team)',
    category: 'iot',
    description: 'A miniature model of the Mactan Cebu International Airport that demonstrates a smart airport system using IoT technology. Uses sensors and modules to simulate real airport operations, focusing on safety, efficiency, and energy optimization.',
    tags: ['IoT', 'Sensors', 'Arduino', 'Smart Systems', 'Energy Optimization'],
    screenshotImages: [
      '/projects/airport-1.jpg',
      '/projects/airport-2.jpg',
      '/projects/airport-3.jpg'
    ]
  },
  {
    id: 'cam-commute-guru',
    title: 'Cam Commute Guru — Tricycle Commuter Safety & Fare Assistance App',
    date: 'Nov – Dec 2023',
    role: 'UI/UX Designer (Academic)',
    category: 'uiux',
    description: 'Designed the UI/UX for a safer-commuting mobile app in Camarines Norte, including QR verification of drivers and vehicles, a fare calculator to prevent overcharging, and a secure incident-reporting flow.',
    tags: ['Figma', 'UI/UX Design', 'User Research', 'Prototyping', 'Mobile UI'],
    demoUrl: 'https://www.figma.com/design/s05VcTO5bV6JeZheL81szj/CAM-COMMUTE-GURU--FINAL-?node-id=0-1&t=1Ii4ylsu9o0kduPY-1'
  }
];

export const SKILL_GROUPS: SkillCategory[] = [
  {
    title: 'Languages',
    tags: ['JavaScript', 'TypeScript', 'Python', 'HTML5', 'CSS3']
  },
  {
    title: 'Frontend',
    tags: ['HTML5', 'CSS3', 'TypeScript', 'Responsive Design', 'Vite', 'DOM API']
  },
  {
    title: 'Backend',
    tags: ['Node.js', 'REST APIs', 'Authentication', 'Serverless']
  },
  {
    title: 'Database',
    tags: ['Supabase', 'PostgreSQL', 'CRUD Operations', 'Data Modeling']
  },
  {
    title: 'Tools & Cloud',
    tags: ['Vercel', 'Git', 'GitHub', 'VS Code', 'npm']
  },
  {
    title: 'Design',
    tags: ['Figma', 'Canva', 'UI/UX Design', 'Wireframing', 'Prototyping']
  }
];

export const CREDENTIALS: CredentialItem[] = [
  {
    id: 'capstone-award',
    type: 'award',
    date: 'June 26, 2026',
    title: 'Best in Capstone Project',
    description: 'Awarded for "TricyPay — Smart Transportation Management System," contributing as Mobile & IoT Application Developer on fare automation, payments, and operational monitoring for local transport organizations.'
  },
  {
    id: 'tb-research',
    type: 'research',
    date: 'June 26, 2026',
    title: 'Special Citation for Research Publication',
    description: '"Agent-Based Simulation and GIS Mapping of Tuberculosis Transmission: A Case Study in Daet, Camarines Norte." Published in Zenodo.'
  }
];

export const CERTIFICATES: CertificateItem[] = [
  {
    name: 'HSI On-the-Job Training Program',
    issuer: 'Highly Succeed Inc.',
    year: '2026',
    image: '/certificates/hsi-ojt.jpg'
  },
  {
    name: 'BITSCON 2024 Participant',
    issuer: 'CODITE – Council of Deans for Information Technology Education, Inc.',
    year: '2024',
    image: '/certificates/bitscon-2024.jpg'
  },
  {
    name: 'Technical Support Fundamentals',
    issuer: 'Google via Coursera',
    year: '2024',
    image: '/certificates/google-technical-support.jpg',
    verifyUrl: 'https://coursera.org/verify/O8FXPRYHHD8J'
  },
  {
    name: 'Cisco Networking Basics',
    issuer: 'Cisco Networking Academy',
    year: '2024',
    image: '/certificates/cisco-networking.jpg'
  },
  {
    name: 'From Scroll to Skill',
    issuer: 'ICT Council of Camarines Norte',
    year: '2025',
    image: '/certificates/scroll-to-skill.jpg'
  }
];

export const EDUCATION = {
  degree: 'BS Information Technology',
  institution: 'University of Camarines Norte State',
  graduationDate: 'Graduated June 2026',
  summary: [
    'I\'m a BS Information Technology graduate with a genuine pull toward full-stack web development and software engineering. During my internship, I designed, built, and deployed a Human Resource Information System from scratch using TypeScript, Node.js, Supabase, and PostgreSQL — my first real taste of owning a production system end to end.',
    'Outside of that, I\'ve worked across mobile apps, IoT-enabled hardware, and UI/UX design for community-focused projects around transportation safety and fair pricing in Camarines Norte. I enjoy the parts of engineering other people skip: clean data models, sensible auth flows, and interfaces people actually understand on the first try.',
    'I\'m a continuous learner who\'s happiest solving a problem no one\'s fully solved yet, and I\'m looking for a team where I can keep building things that matter.'
  ]
};
