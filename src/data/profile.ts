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
    role: "Full-Stack & AI-Powered Product Developer",
    period: "December 2024 - Present",
    summary:
      "I design and build production-ready web applications, e-commerce platforms, and AI-powered products for businesses, startups, and independent teams. I work across the full product lifecycle - from requirements and system architecture to responsive interfaces, backend integrations, deployment, optimization, and post-launch support.\n\nMy work spans modern JavaScript/TypeScript stacks, Python-based applications, CMS and commerce platforms, with a growing focus on AI, NLP, LLM applications, and intelligent automation.",
    focus: [
      "Full-Stack Web",
      "AI Applications",
      "E-Commerce",
      "AI-Powered Solutions",
      "Intelligent Automation",
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
  image: string;
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
      "A university query-management platform that centralizes student requests from web forms, email, and WhatsApp, with automated classification, department routing, escalation, and AI-assisted reply drafting.",
    brief:
      "Smart Query Hub is a full-stack university query-management platform designed to streamline how educational institutions receive, classify, assign, and resolve student inquiries. It brings queries from multiple channels, including web forms, email, and WhatsApp, into a centralized workflow where staff can track requests, manage ownership, monitor progress, and escalate unresolved cases. The platform provides dedicated role-based portals for students, instructors, department heads, and administrators, with dashboards for monitoring query activity and resolution progress. Its Next.js frontend communicates with a FastAPI backend responsible for query processing, classification, routing, escalation, and AI-assisted reply drafting. Supabase and PostgreSQL provide the data layer, while webhook integrations coordinate communication between services. Additional capabilities include automated email notifications, query status tracking, audit logging, reporting, and PDF/Excel exports, helping institutions improve response consistency, accountability, and operational visibility.",
    image: "/smart-query-management.webp",
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "FastAPI",
      "Python",
      "Prisma",
      "Supabase",
      "PostgreSQL",
      "Vercel",
      "Azure",
    ],
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
      "A custom luxury watch e-commerce platform with product discovery, shopping cart, checkout, customer accounts, order tracking, and a dedicated store-management portal.",
    brief:
      "Sovereign Watches is a full-stack luxury watch e-commerce platform designed to deliver a refined shopping experience alongside comprehensive store-management capabilities. Built with Next.js, TypeScript, and Tailwind CSS, the storefront supports product discovery, catalogue browsing, product details, shopping carts, checkout, wishlists, customer accounts, and order tracking. The application also includes a dedicated, access-controlled administration portal for managing products, categories, inventory, customer orders, shipping and courier tracking, returns, refund coupons, customer reviews, promotional discounts, newsletters, and store settings. Supabase provides authentication, PostgreSQL-backed data storage, and media storage, while PayFast integration supports the payment workflow. The application is structured around reusable components, typed data models, and clear separation between customer-facing shopping experiences and administrative operations. Deployed through Vercel, the project demonstrates the development of an end-to-end commerce solution that combines premium storefront presentation with practical business operations.",
    image: "/sovereign-e-commerce-store.webp",
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Supabase",
      "PostgreSQL",
      "PayFast",
      "Vercel",
      "Framer Motion",
    ],
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
      "A peer-to-peer platform for exchanging skills without money, featuring skill listings, exchange requests, two-sided completion confirmation, reviews, and admin moderation.",
    brief:
      "The Community Skill Exchange Platform is a full-stack application that enables people to exchange knowledge and practical skills without monetary transactions. Members can create profiles, publish skills they are willing to teach, identify skills they want to learn, browse relevant opportunities, and initiate peer-to-peer exchange requests. The platform manages the exchange lifecycle, allowing participants to coordinate their commitments and independently confirm when a skill has been delivered and received. Mutual reviews become available after an exchange is completed, helping users build credibility through actual participation. Reporting and administrator moderation provide mechanisms for handling inappropriate content and maintaining community standards. The application uses a Next.js and TypeScript frontend connected to a Strapi headless CMS backend through REST APIs, with Supabase PostgreSQL supporting relational data and Cloudinary handling media assets. Email-based OTP verification strengthens account onboarding, while JWT-based authentication supports protected application functionality. Deployment across Vercel and Azure App Service separates the frontend experience from backend services. The project demonstrates full-stack integration, workflow management, role-based functionality, and the design of a trust-oriented community platform.",
    image: "/community-skill-exchange-plateform.webp",
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Strapi",
      "REST APIs",
      "Supabase",
      "PostgreSQL",
      "Cloudinary",
      "JWT",
      "Vercel",
      "Azure",
    ],
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
      "A PHP and MySQL student-management system with separate student and administrator portals, registration approval, record management, and role-based access.",
    brief:
      "The Student Management Web Application is a web-based academic administration system built with PHP and MySQL to centralize student registration and record management. It provides separate student and administrator interfaces with permissions tailored to each role. Students can register for an account, access the application after administrator approval, view their available records, update permitted profile information, and recover access through a password-reset workflow. Administrators can review pending registrations, approve or reject account requests, search and filter student records, manage student profiles, and monitor registration activity through administrative summaries. The application uses PHP with PDO for database connectivity and server-side data operations, while MySQL stores student information and account records. Session-based authentication and role checks protect restricted pages, and server-side validation helps maintain data integrity. Its interface is built using standard HTML, CSS, and JavaScript, making the application suitable for a lightweight PHP hosting environment. The project demonstrates practical CRUD operations, relational database integration, access control, authentication workflows, and the core requirements of a student-record management system.",
    image: "/student-management-web-app.webp",
    stack: [
      "HTML",
      "CSS",
      "JavaScript",
      "PHP",
      "MySQL",
      "Apache",
      "XAMPP",
    ],
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
    image: "/sovereign-e-commerce-store.webp",
    stack: ["HTML", "CSS", "JavaScript", "WordPress", "SureCart", "Core Web Vitals"],
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
    image: "/sovereign-e-commerce-store.webp",
    stack: ["HTML", "CSS", "JavaScript", "WooCommerce", "WordPress", "Core Web Vitals"],
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
    image: "/sovereign-e-commerce-store.webp",
    stack: ["HTML", "CSS", "JavaScript", "WooCommerce", "WordPress"],
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
    image: "/sovereign-e-commerce-store.webp",
    stack: ["CSS", "Liquid", "Shopify"],
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
    credentialUrl:
      "https://www.vu.edu.pk/verify/OnlineTranscriptVerification.aspx?StudentID=bc220406446&VerificationKey=d5jgeynpq",
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
    credentialUrl:
      "https://centralized.bisesargodha.edu.pk/RecordBr/VerificationLetterForQRCode.aspx?MatOrInt=1&AppID=427176",
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
    credentialUrl:
      "https://centralized.bisesargodha.edu.pk/RecordBr/VerificationLetterForQRCode.aspx?MatOrInt=1&AppID=427176",
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
    credentialUrl: "https://www.coursera.org/account/accomplishments/certificate/V88SNL5B7IKL",
    credentialId: "V88SNL5B7IKL",
  },
  {
    title: "Build a Full Website using WordPress",
    issuer: "Coursera",
    focus: "End-to-end site build",
    credentialUrl: "https://www.coursera.org/account/accomplishments/certificate/NOT13D4BARED",
    credentialId: "NOT13D4BARED",
  },
  {
    title: "Use WordPress to Create a Blog for your Business",
    issuer: "Coursera",
    focus: "Publishing & content",
    credentialUrl: "https://www.coursera.org/account/accomplishments/certificate/B6QDF0L6OF90",
    credentialId: "B6QDF0L6OF90",
  },
  {
    title: "Create your e-commerce store with Shopify",
    issuer: "Coursera",
    focus: "Commerce foundations",
    credentialUrl: "https://www.coursera.org/account/accomplishments/certificate/4S5D0ATHC175",
    credentialId: "4S5D0ATHC175",
  },
  {
    title: "Create and Design Digital Products using Canva",
    issuer: "Coursera",
    focus: "Visual design",
    credentialUrl: "https://www.coursera.org/account/accomplishments/certificate/R42V3GH794SE",
    credentialId: "R42V3GH794SE",
  },
];

export const navigation = [
  { label: "Capabilities", href: "/capabilities" },
  { label: "Experience", href: "/experience" },
  { label: "Work", href: "/work" },
  { label: "Credentials", href: "/credentials" },
  { label: "Contact", href: "/contact" },
] as const;
