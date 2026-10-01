export const profile = {
  name: "Muhammad Kamran",
  shortName: "Kamran",
  role: "Full Stack Web Developer",
  headline: {
    lead: "Full Stack Web Developer building",
    emphasis: "modern, scalable",
    trail: "web products.",
  },
  subhead:
    "Next.js, React, TypeScript, Node.js & Django - with deep e-commerce craft across WordPress, WooCommerce, Shopify and SureCart. I ship clean, maintainable code and interfaces that stay fast under real load.",
  location: "Hyderabad, Pakistan",
  locationNote: "Remote-first · Overlapping with EU & Gulf hours",
  email: "muhammadkamranyar@gmail.com",
  phone: "+92 332 8322488",
  phoneHref: "+923328322488",
  links: {
    linkedin: "https://www.linkedin.com/in/dev-muhammad-kamran",
    github: "https://github.com/bc220406446",
    liveStore: "https://sovereign-e-commerce-store.vercel.app",
  },
  availability: [
    "Remote full-time",
    "Freelance projects",
    "Contract work",
    "Long-term partnerships",
  ],
  // Rendered as an animated readout in the hero.
  stats: [
    { value: 1.8, suffix: "+", label: "Years freelancing", decimals: 1 },
    { value: 8, suffix: "", label: "Shipped products", decimals: 0 },
    { value: 4, suffix: "", label: "Industries served", decimals: 0 },
    { value: 5, suffix: "", label: "Certifications", decimals: 0 },
  ],
} as const;

export type SkillGroup = {
  title: string;
  skills: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    title: "Frontend",
    skills: [
      "Next.js",
      "React",
      "TypeScript",
      "JavaScript (ES2023)",
      "Tailwind CSS",
      "Framer Motion",
    ],
  },
  {
    title: "Backend",
    skills: [
      "Node.js",
      "Express",
      "Python",
      "Django",
      "FastAPI",
      "PHP",
      "REST APIs",
      "JWT",
    ],
  },
  {
    title: "AI & Machine Learning",
    skills: [
      "Python",
      "NumPy",
      "scikit-learn",
      "PyTorch",
      "TensorFlow",
      "Matplotlib",
    ],
  },
  {
    title: "Database",
    skills: ["PostgreSQL", "Supabase", "MySQL", "MongoDB", "Firebase"],
  },
  {
    title: "Deployment",
    skills: ["Azure", "Vercel", "Render", "Netlify"],
  },
  {
    title: "Tools & Development",
    skills: [
      "Git",
      "GitHub",
      "GitHub Actions",
      "Postman",
      "Sentry",
      "Markdown",
      "Core Web Vitals",
    ],
  },
  {
    title: "CMS & E-Commerce",
    skills: ["Medusa JS", "WordPress", "Shopify", "WooCommerce", "SureCart"],
  },
];

export const topSkills = [
  "E-Commerce",
  "SureCart Store Development",
  "Code Reusability",
];

export type Engagement = {
  company: string;
  role: string;
  period: string;
  duration: string;
  mode: string;
  summary: string;
  highlights: string[];
  stack: string[];
};

export const experience: Engagement[] = [
  {
    company: "Freelance · Self-Employed",
    role: "Freelance Web Developer",
    period: "December 2024 - Present",
    duration: "1 yr 10 mo",
    mode: "Remote",
    summary:
      "Delivering responsive, SEO-optimized and user-focused websites and e-commerce solutions for clients across academic, retail, furniture and fashion industries. Work centres on WordPress, Shopify, WooCommerce and SureCart, with an emphasis on performance, UI/UX, integrations and business requirements.",
    highlights: [
      "Owned delivery end to end - scoping, design handoff, build, launch and post-launch support.",
      "Built and shipped four production client platforms across two continents and four verticals.",
      "Hardened storefronts for Core Web Vitals: image pipelines, query trimming, cached fragments.",
      "Set up local SEO and structured data that lifted organic discovery for regional stores.",
    ],
    stack: ["WordPress", "Shopify", "WooCommerce", "SureCart", "Next.js"],
  },
];

export type Project = {
  slug: string;
  name: string;
  kind: "Client Work" | "Open Source";
  category: string;
  year: string;
  summary: string;
  contributions: string[];
  stack: string[];
  links: { label: string; href: string }[];
  featured?: boolean;
};

export const projects: Project[] = [
  {
    slug: "vu-scholar-guide",
    name: "VU Scholar Guide",
    kind: "Client Work",
    category: "EdTech Platform",
    year: "2025",
    summary:
      "An academic platform for Virtual University students - handouts, highlighted notes, past papers and LMS task management in one place.",
    contributions: [
      "Implemented SureCart for digital product delivery and licensing.",
      "Configured Rank Math SEO with schema, sitemaps and clean permalinks.",
      "Built the responsive study interface and tuned performance for low-bandwidth users.",
      "Designed the content taxonomy so thousands of resources stay findable.",
    ],
    stack: ["WordPress", "SureCart", "Rank Math SEO", "Core Web Vitals"],
    links: [],
    featured: true,
  },
  {
    slug: "sovereign-e-commerce-store",
    name: "Sovereign E-Commerce Store",
    kind: "Open Source",
    category: "Full Stack Commerce",
    year: "2026",
    summary:
      "A production Next.js and TypeScript storefront - the reference build for cart, checkout and catalogue architecture used across client work.",
    contributions: [
      "Typed end-to-end from database row to rendered component.",
      "Cart and checkout flows with server-side validation.",
      "Component-driven catalogue with reusable product primitives.",
      "Deployed on Vercel with preview environments per change.",
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
    links: [
      {
        label: "View live",
        href: "https://sovereign-e-commerce-store.vercel.app",
      },
      {
        label: "GitHub",
        href: "https://github.com/bc220406446/sovereign-e-commerce-store",
      },
    ],
    featured: true,
  },
  {
    slug: "smart-query-management",
    name: "Smart Query Management",
    kind: "Open Source",
    category: "Internal Tooling",
    year: "2026",
    summary:
      "A TypeScript system for triaging, routing and resolving incoming queries with ownership, status and audit history.",
    contributions: [
      "Modelled the query lifecycle and status transitions.",
      "Typed API contracts shared between client and server.",
      "Dashboard views for queue health and resolution throughput.",
    ],
    stack: ["TypeScript", "Next.js", "REST APIs", "PostgreSQL"],
    links: [
      {
        label: "View live",
        href: "https://smart-query-management.vercel.app/",
      },
      {
        label: "GitHub",
        href: "https://github.com/bc220406446/Smart-Query-Management",
      },
    ],
    featured: true,
  },
  {
    slug: "community-skill-exchange",
    name: "Community Skill Exchange Platform",
    kind: "Open Source",
    category: "Community Platform",
    year: "2026",
    summary:
      "A platform where members list skills they can teach and skills they want to learn, then match into exchanges.",
    contributions: [
      "Member profiles, skill listings and matching logic.",
      "Search and filtering across skills and availability.",
      "Responsive, accessible UI built with reusable primitives.",
    ],
    stack: ["TypeScript", "Next.js", "Node.js", "PostgreSQL"],
    links: [
      {
        label: "View live",
        href: "https://community-skill-exchange-platform.vercel.app/",
      },
      {
        label: "GitHub",
        href: "https://github.com/bc220406446/Community-Skill-Exchange-Platform",
      },
    ],
  },
  {
    slug: "ksa-furniture-store",
    name: "KSA Furniture Store",
    kind: "Client Work",
    category: "WooCommerce Store",
    year: "2025",
    summary:
      "A WooCommerce e-commerce website built for the Saudi market with local SEO, payments and inventory management.",
    contributions: [
      "Localized the storefront for the Gulf market and Arabic-first browsing.",
      "Integrated payment and shipping for regional providers.",
      "Inventory management wired to catalogue and stock alerts.",
      "Mobile responsiveness and storefront performance optimization.",
    ],
    stack: ["WooCommerce", "WordPress", "Local SEO", "Payments"],
    links: [],
  },
  {
    slug: "anas-shopping-store",
    name: "Anas Shopping Store",
    kind: "Client Work",
    category: "WooCommerce Store",
    year: "2025",
    summary:
      "A WooCommerce store for garments and cultural products, focused on product management and a frictionless checkout.",
    contributions: [
      "Structured product management across garment and cultural categories.",
      "Streamlined checkout with reduced steps and clearer validation.",
      "Inventory tracking and storefront SEO improvements.",
      "Mobile responsiveness and page-speed tuning.",
    ],
    stack: ["WooCommerce", "WordPress", "SEO", "Inventory"],
    links: [],
  },
  {
    slug: "house-of-fashion",
    name: "House of Fashion",
    kind: "Client Work",
    category: "Shopify Store",
    year: "2025",
    summary:
      "Designed and developed a Shopify fashion store with optimized collections and a mobile-first buying journey.",
    contributions: [
      "Designed the visual identity and mobile-first storefront.",
      "Organized product collections and navigation for discovery.",
      "Optimized checkout flow to reduce drop-off.",
      "Applied SEO improvements across collections and product pages.",
    ],
    stack: ["Shopify", "Liquid", "SEO", "Mobile-first"],
    links: [],
  },
  {
    slug: "student-management-web-application",
    name: "Student Management Web Application",
    kind: "Open Source",
    category: "Management System",
    year: "2025",
    summary:
      "A PHP and MySQL management system handling student records, enrolment and reporting for an academic institution.",
    contributions: [
      "Relational schema for students, courses, enrolment and grades.",
      "Role-based access for administration and staff.",
      "Server-rendered reports and printable records.",
    ],
    stack: ["PHP", "MySQL", "HTML", "CSS"],
    links: [
      {
        label: "View live",
        href: "https://smwa.freehosting.dev/login.php",
      },
      {
        label: "GitHub",
        href: "https://github.com/bc220406446/Student-Management-Web-Application",
      },
    ],
  },
];

export type EducationEntry = {
  institution: string;
  qualification: string;
  field: string;
  period: string;
  status: string;
  grade?: string;
  percentage?: string;
  credentialUrl?: string;
};

export const education: EducationEntry[] = [
  {
    institution: "Virtual University of Pakistan",
    qualification: "Bachelor of Computer Science",
    field: "Computer Science",
    period: "October 2022 - September 2026",
    status: "Completed",
  },
  {
    institution: "Punjab Group of Colleges",
    qualification: "F.Sc Pre-Engineering",
    field: "Engineering",
    period: "September 2019 - October 2021",
    status: "Completed",
  },
  {
    institution: "Govt Higher Secondary School Salam, Sargodha",
    qualification: "Matric",
    field: "Computer Science",
    period: "April 2017 - July 2019",
    status: "Completed",
  },
];

export type Certification = {
  title: string;
  issuer: string;
  focus: string;
  credentialUrl?: string;
};

export const certifications: Certification[] = [
  {
    title: "Build a Full Website using WordPress",
    issuer: "Coursera project certificate",
    focus: "End-to-end site build",
  },
  {
    title: "Use WordPress to Create a Blog for your Business",
    issuer: "Coursera project certificate",
    focus: "Publishing & content",
  },
  {
    title: "Create your e-commerce store with Shopify",
    issuer: "Coursera project certificate",
    focus: "Commerce foundations",
  },
  {
    title: "Create and Design Digital Products using Canva",
    issuer: "Coursera project certificate",
    focus: "Visual design",
  },
  {
    title: "The Freelance Stack: Real project with NextJS and Strapi",
    issuer: "Coursera project certificate",
    focus: "Headless CMS architecture",
  },
];

export const languages = [
  { name: "English", level: "Professional working" },
  { name: "Urdu", level: "Full professional" },
];

export const navigation = [
  { label: "About", href: "#about" },
  { label: "Capabilities", href: "#capabilities" },
  { label: "Experience", href: "#experience" },
  { label: "Work", href: "#work" },
  { label: "Credentials", href: "#credentials" },
  { label: "Contact", href: "#contact" },
] as const;
