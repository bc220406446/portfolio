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

export type TechCategory = {
  category: string;
  items: string[];
};

export type Engagement = {
  role: string;
  period: string;
  duration?: string;
  summary: string;
  focus: string[];
  techGroups: TechCategory[];
  highlights: string[];
  stack: string[];
};

export const experience: Engagement[] = [
  {
    role: "Full-Stack & AI Product Developer",
    period: "December 2024 — Present",
    duration: "Present",
    summary:
      "I design and build production-ready web applications, e-commerce platforms, and AI-powered products for businesses, startups, and independent teams. I work across the full product lifecycle — from requirements and system architecture to responsive interfaces, backend integrations, deployment, optimization, and post-launch support.\n\nMy work spans modern JavaScript/TypeScript stacks, Python-based applications, CMS and commerce platforms, with a growing focus on AI, NLP, LLM applications, and intelligent automation.",
    focus: [
      "Full-Stack Web",
      "AI Applications",
      "E-Commerce",
      "Automation",
      "Performance & SEO",
    ],
    techGroups: [
      {
        category: "Frontend",
        items: ["Next.js", "React", "TypeScript", "JavaScript", "Tailwind CSS"],
      },
      {
        category: "Backend",
        items: ["Node.js", "Express", "Django", "REST APIs"],
      },
      {
        category: "Data",
        items: ["PostgreSQL", "MongoDB", "Supabase"],
      },
      {
        category: "AI & ML",
        items: ["Python", "NLP", "Machine Learning", "LLMs", "AI Automation"],
      },
      {
        category: "CMS & Commerce",
        items: ["WordPress", "WooCommerce", "Shopify", "SureCart"],
      },
      {
        category: "Infrastructure",
        items: ["Git", "GitHub", "Vercel", "Cloudinary", "CI/CD"],
      },
    ],
    highlights: [],
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Node.js",
      "Python",
      "Django",
      "PostgreSQL",
      "MongoDB",
      "Supabase",
      "LLMs",
      "WordPress",
      "WooCommerce",
      "Shopify",
      "Vercel",
    ],
  },
];

export type Project = {
  slug: string;
  name: string;
  kind: "Client Work" | "Open Source";
  category: string;
  year: string;
  summary: string;
  brief: string;
  contributions: string[];
  stack: string[];
  links: { label: string; href: string }[];
  featured?: boolean;
  /** WordPress/Shopify client projects grouped separately in the Work section */
  group?: "wordpress-clients";
};

export const projects: Project[] = [
  /* ── Primary builds ── */
  {
    slug: "smart-query-management",
    name: "Smart Query Routing & Email Automation System",
    kind: "Open Source",
    category: "Internal Tooling",
    year: "2026",
    summary:
      "A full-stack TypeScript system for triaging and routing incoming queries, automating email notifications, and tracking resolution status with a full audit trail.",
    brief:
      "The Smart Query Routing & Email Automation System is an open-source internal tooling platform designed for triaging, assigning, and resolving high-volume inbound user inquiries. Built using TypeScript, Next.js, and PostgreSQL, the system models explicit query lifecycles with status state machines, automated email alerts upon status transitions, and audit logging. Real-time dashboard views track query resolution throughput and operational queue health.",
    contributions: [
      "Modelled the query lifecycle and status transitions.",
      "Typed API contracts shared between client and server.",
      "Dashboard views for queue health and resolution throughput.",
      "Automated email notifications on status changes.",
    ],
    stack: ["TypeScript", "Next.js", "REST APIs", "PostgreSQL"],
    links: [
      { label: "View live", href: "https://smart-query-management.vercel.app/" },
      { label: "GitHub", href: "https://github.com/bc220406446/Smart-Query-Management" },
    ],
    featured: true,
  },
  {
    slug: "sovereign-e-commerce-store",
    name: "Sovereign - Luxury Watch E-Commerce",
    kind: "Open Source",
    category: "Full Stack Commerce",
    year: "2026",
    summary:
      "A production-grade Next.js storefront for a luxury watch brand - end-to-end typed, with cart, checkout, catalogue, and Vercel preview deployments.",
    brief:
      "Sovereign is a production-grade full-stack e-commerce storefront for a luxury timepiece brand. Built with Next.js App Router, TypeScript, and Tailwind CSS, the codebase serves as a reference architecture for end-to-end typed commerce builds. Key features include dynamic catalogue filtering, server-side validated shopping cart state, seamless checkout flow, and automated Vercel CI/CD preview deployments.",
    contributions: [
      "Typed end-to-end from database row to rendered component.",
      "Cart and checkout flows with server-side validation.",
      "Component-driven catalogue with reusable product primitives.",
      "Deployed on Vercel with preview environments per change.",
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
    links: [
      { label: "View live", href: "https://sovereign-e-commerce-store.vercel.app" },
      { label: "GitHub", href: "https://github.com/bc220406446/sovereign-e-commerce-store" },
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
      "A platform where members list skills they can teach and skills they want to learn, then match into peer-to-peer exchanges.",
    brief:
      "The Community Skill Exchange Platform connects community members to share knowledge through peer-to-peer skill swapping. Developed using TypeScript, Next.js, Node.js, and PostgreSQL, the platform allows members to register profiles detailing skills they offer and skills they wish to learn. Built-in search, availability filtering, and matching algorithms facilitate seamless exchange requests.",
    contributions: [
      "Member profiles, skill listings and matching logic.",
      "Search and filtering across skills and availability.",
      "Responsive, accessible UI built with reusable primitives.",
    ],
    stack: ["TypeScript", "Next.js", "Node.js", "PostgreSQL"],
    links: [
      { label: "View live", href: "https://community-skill-exchange-platform.vercel.app/" },
      { label: "GitHub", href: "https://github.com/bc220406446/Community-Skill-Exchange-Platform" },
    ],
  },
  {
    slug: "student-management-web-application",
    name: "Student Management Web Application",
    kind: "Open Source",
    category: "Management System",
    year: "2025",
    summary:
      "A PHP and MySQL management system handling student records, enrolment, grades, and reporting for an academic institution.",
    brief:
      "The Student Management Web Application is a web-based administration system engineered with PHP and MySQL. Designed for educational institutions, it manages complete student lifecycles including profile records, course enrolments, grade submissions, and academic reporting. It features role-based access control for administrative staff and teachers, along with printable transcript generation.",
    contributions: [
      "Relational schema for students, courses, enrolment and grades.",
      "Role-based access for administration and staff.",
      "Server-rendered reports and printable records.",
    ],
    stack: ["PHP", "MySQL"],
    links: [
      { label: "View live", href: "https://smwa.freehosting.dev/login.php" },
      { label: "GitHub", href: "https://github.com/bc220406446/Student-Management-Web-Application" },
    ],
  },
  /* ── WordPress / Shopify client work ── */
  {
    slug: "vu-scholar-guide",
    name: "VU Scholar Guide",
    kind: "Client Work",
    category: "EdTech Platform",
    year: "2025",
    summary:
      "An academic resource platform for Virtual University students - handouts, past papers, highlighted notes and LMS task management in one place.",
    brief:
      "VU Scholar Guide is a specialized EdTech platform designed for Virtual University students. Powered by WordPress and SureCart, it aggregates academic handouts, past paper archives, highlighted study guides, and LMS task trackers into a unified dashboard. The build incorporates Rank Math SEO schemas, clean permalinks, and asset optimizations tailored for low-bandwidth users.",
    contributions: [
      "Implemented SureCart for digital product delivery and licensing.",
      "Configured Rank Math SEO with schema, sitemaps and clean permalinks.",
      "Built the responsive study interface and tuned performance for low-bandwidth users.",
      "Designed the content taxonomy so thousands of resources stay findable.",
    ],
    stack: ["WordPress", "SureCart", "Core Web Vitals"],
    links: [],
    featured: true,
    group: "wordpress-clients",
  },
  {
    slug: "ksa-furniture-store",
    name: "KSA Furniture Store",
    kind: "Client Work",
    category: "WooCommerce Store",
    year: "2025",
    summary:
      "A WooCommerce storefront built for the Saudi market - localised browsing, regional payments, inventory management, and mobile-first performance.",
    brief:
      "KSA Furniture Store is a localized WooCommerce e-commerce site engineered for the Saudi Arabian retail market. Built with an Arabic-first user experience and responsive Gulf layout design, it integrates regional payment gateways and shipping providers. Catalogue management features real-time inventory tracking, low-stock notifications, and local SEO tuning.",
    contributions: [
      "Localized the storefront for the Gulf market and Arabic-first browsing.",
      "Integrated payment and shipping for regional providers.",
      "Inventory management wired to catalogue and stock alerts.",
      "Mobile responsiveness and storefront performance optimization.",
    ],
    stack: ["WooCommerce", "WordPress", "Core Web Vitals"],
    links: [],
    group: "wordpress-clients",
  },
  {
    slug: "anas-shopping-store",
    name: "Anas Shopping Store",
    kind: "Client Work",
    category: "WooCommerce Store",
    year: "2025",
    summary:
      "A WooCommerce store for garments and cultural products - structured product management, streamlined checkout, and SEO improvements.",
    brief:
      "Anas Shopping Store is a WooCommerce storefront focused on garments and traditional cultural apparel. The project structured complex product variation taxonomies (sizes, fabrics, colorways) while introducing a simplified checkout process that minimizes cart abandonment. Page speed and mobile responsiveness optimizations were applied throughout.",
    contributions: [
      "Structured product management across garment and cultural categories.",
      "Streamlined checkout with reduced steps and clearer validation.",
      "Inventory tracking and storefront SEO improvements.",
      "Mobile responsiveness and page-speed tuning.",
    ],
    stack: ["WooCommerce", "WordPress"],
    links: [],
    group: "wordpress-clients",
  },
  {
    slug: "house-of-fashion",
    name: "House of Fashion",
    kind: "Client Work",
    category: "Shopify Store",
    year: "2025",
    summary:
      "A Shopify fashion store with a mobile-first visual identity, optimised collections, and a checkout flow tuned to reduce drop-off.",
    brief:
      "House of Fashion is a Shopify fashion store crafted for mobile-first shoppers. Built using custom Shopify Liquid templates, the site features curated product collection grids, swift slide-out cart drawers, mobile-optimized navigation, and structured product metadata to elevate search engine visibility.",
    contributions: [
      "Designed the visual identity and mobile-first storefront.",
      "Organized product collections and navigation for discovery.",
      "Optimized checkout flow to reduce drop-off.",
      "Applied SEO improvements across collections and product pages.",
    ],
    stack: ["Shopify"],
    links: [],
    group: "wordpress-clients",
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
  description?: string;
  featured?: boolean;
  accentColor?: string;
};

export const education: EducationEntry[] = [
  {
    institution: "Virtual University of Pakistan",
    qualification: "Bachelor of Computer Science",
    field: "Computer Science",
    period: "October 2022 - September 2026",
    status: "Completed",
    description:
      "A comprehensive degree program focusing on software engineering, data structures, algorithms, and full-stack web development.",
    featured: true,
    accentColor: "bg-blue-500",
    grade: "A-",
    percentage: "83.06%",
    credentialUrl: "#",
  },
  {
    institution: "Punjab Group of Colleges",
    qualification: "F.Sc Pre-Engineering",
    field: "Engineering",
    period: "September 2019 - October 2021",
    status: "Completed",
    description:
      "Pre-engineering foundation covering advanced mathematics, physics, and chemistry.",
    featured: true,
    accentColor: "bg-indigo-500",
    grade: "A+",
    percentage: "98%",
    credentialUrl: "#",
  },
  {
    institution: "Govt Higher Secondary School Salam, Sargodha",
    qualification: "Matric",
    field: "Computer Science",
    period: "April 2017 - July 2019",
    status: "Completed",
    description: "Foundational education in computer science and basic programming concepts.",
    featured: true,
    accentColor: "bg-teal-500",
    grade: "A+",
    percentage: "93.15%",
    credentialUrl: "#",
  },
];

export type Certification = {
  title: string;
  issuer: string;
  focus: string;
  date?: string;
  credentialUrl?: string;
  credentialId?: string;
  tags?: string[];
};

export const certifications: Certification[] = [
  {
    title: "The Freelance Stack: Real project with NextJS and Strapi",
    issuer: "Coursera",
    focus: "Headless CMS architecture",
    credentialUrl: "#",
    credentialId: "COURSERA-NEXT-77889",
  },
  {
    title: "Build a Full Website using WordPress",
    issuer: "Coursera",
    focus: "End-to-end site build",
    credentialUrl: "#",
    credentialId: "COURSERA-WP-12345",
  },
  {
    title: "Use WordPress to Create a Blog for your Business",
    issuer: "Coursera",
    focus: "Publishing & content",
    credentialUrl: "#",
    credentialId: "COURSERA-BLOG-67890",
  },
  {
    title: "Create your e-commerce store with Shopify",
    issuer: "Coursera",
    focus: "Commerce foundations",
    credentialUrl: "#",
    credentialId: "COURSERA-SHOP-11223",
  },
  {
    title: "Create and Design Digital Products using Canva",
    issuer: "Coursera",
    focus: "Visual design",
    credentialUrl: "#",
    credentialId: "COURSERA-CANVA-44556",
  },
];

export const navigation = [
  { label: "Capabilities", href: "/capabilities" },
  { label: "Experience", href: "/experience" },
  { label: "Work", href: "/work" },
  { label: "Credentials", href: "/credentials" },
  { label: "Contact", href: "/contact" },
] as const;
