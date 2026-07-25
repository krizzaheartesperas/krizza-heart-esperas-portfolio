export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  companyUrl?: string;
  period: string;
  location: string;
  path: string;
  details: string[];
  stack: string[];
}

export type ProjectCategory = 'all' | 'fullstack' | 'mobile' | 'iot' | 'uiux';

export interface ProjectItem {
  id: string;
  title: string;
  date: string;
  role: string;
  category: ProjectCategory;
  description: string;
  award?: string;
  tags: string[];
  demoUrl?: string;
  publicationUrl?: string;
  documentationImages?: string[];
  screenshotImages?: string[];
}

export interface SkillCategory {
  title: string;
  tags: string[];
}

export interface CredentialItem {
  id: string;
  type: 'award' | 'research';
  date: string;
  title: string;
  description: string;
}

export interface CertificateItem {
  name: string;
  issuer: string;
  year: string;
  image: string;
  verifyUrl?: string;
}
