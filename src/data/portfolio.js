/**
 * Everything the site says lives in this file.
 * Edit the values below; the components only read from here.
 *
 * Text written in [SQUARE BRACKETS] is a placeholder. It shows highlighted on the
 * page until you replace it, so nothing unfinished slips through unnoticed.
 */

export const site = {
  title: 'Jeyajothi D | Full Stack Developer',
  description:
    'Portfolio of Jeyajothi D, a Full Stack Developer from Madurai, India, building efficient, user-friendly web applications.',
  // Your live address, e.g. https://jeyajothi.vercel.app. Used for link previews and the canonical URL.
  url: 'https://jo-portfolio-two-neon.vercel.app',
  ogImage: '/og-image.png',
  themeColor: '#fdfbf7',
}

export const profile = {
  name: 'Jeyajothi D',
  initials: 'JD',
  role: 'Full Stack Developer',
  tagline: 'Building efficient, user-friendly web applications and always learning new technologies.',
  location: 'Greater Madurai Area, Tamil Nadu, India',
  email: 'jeyajothi18082005@gmail.com',
  resume: '/resume.pdf',
  // The file name visitors get when they download the resume.
  resumeDownloadName: 'Jeyajothi_D_Resume.pdf',
  // Your photo in public/ (4:5 portrait works best). Without it the "JD" initials avatar is shown.
  photo: '/profile.jpg',
  socials: {
    linkedin: 'https://www.linkedin.com/in/jeyajothi-d-a99544299',
    github: 'https://github.com/jeyajothi08',
  },
}

export const ui = {
  skipLink: 'Skip to content',
  logoLabel: 'Jeyajothi D, back to top',
  primaryNav: 'Primary',
  openMenu: 'Open menu',
  closeMenu: 'Close menu',
  progress: 'Reading progress',
  newTab: '(opens in a new tab)',
  linkedin: 'LinkedIn',
  github: 'GitHub',
  email: 'Email',
}

export const nav = {
  links: [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Experience', href: '#experience' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
  ],
  resumeLabel: 'Resume',
}

export const hero = {
  greeting: "Hello, I'm",
  typing: ['Full Stack Developer', 'Web App Builder', 'Lifelong Learner'],
  primaryCta: { label: 'View my work', href: '#projects' },
  // The handwritten note beside the arrow that points at the first button.
  ctaNote: 'start here!',
  secondaryCta: { label: 'Download resume' },
  scrollLabel: 'scroll',
  scrollTarget: '#about',
  code: {
    filename: 'jeyajothi.js',
    // A real comment line above the object. Set it to '' to hide it.
    comment: '// tap a key to jump to that section',
    variable: 'jeyajothi',
    jumpTo: 'go to',
    fields: [
      { key: 'role', value: 'Full Stack Developer', href: '#experience', section: 'Experience' },
      { key: 'basedIn', value: 'Madurai, India', href: '#about', section: 'About' },
      { key: 'currently', value: 'Intern @ VexaTech', href: '#experience', section: 'Experience' },
      { key: 'studying', value: 'B.E. CSD @ Sethu Institute of Technology', href: '#education', section: 'Education' },
      { key: 'loves', value: ['clean UI', 'fast APIs', 'learning new tech'], href: '#skills', section: 'Skills' },
    ],
  },
}

export const about = {
  label: '01 / about',
  heading: 'Building beyond the code',
  // This word gets a red marker circle drawn round it.
  headingCircle: 'beyond',
  paragraphs: [
    "I'm a Full Stack Developer and Computer Science & Design student at Sethu Institute of Technology, Madurai. I enjoy turning ideas into fast, clean, user-friendly web applications, from the interface people use to the APIs behind it.",
    "I'm currently a Full Stack Developer intern at VexaTech, a service-based IT company, where I work on web solutions and also help with recruitment, team building and business operations.",
  ],
  photoAlt: 'Portrait of Jeyajothi D',
  photoCaption: 'Jeyajothi · Madurai',
  facts: [
    { label: 'Location', value: 'Madurai, Tamil Nadu, India' },
    { label: 'Currently', value: 'Full Stack Developer intern at VexaTech' },
    { label: 'Education', value: 'B.E. Computer Science and Design' },
    { label: 'Open to', value: 'Full Stack Developer and AI Web Developer roles' },
  ],
}

export const skills = {
  label: '02 / skills',
  heading: 'What I work with',
  intro: 'How a click travels through what I build: from the screen people use, to the server, to the data behind it.',
  // Drawn between the stack boxes, in order: frontend → backend, backend → database.
  flowLabels: ['sends requests', 'reads & writes'],
  // icon: one of "frontend", "backend", "database", "tools", "ai".
  // pinned: true sticks a group to the sheet as a post-it instead of a box in the flow.
  groups: [
    {
      name: 'Frontend',
      icon: 'frontend',
      note: 'The interfaces people use',
      items: ['JavaScript', 'React', 'Next.js', 'HTML', 'CSS', 'Tailwind CSS'],
    },
    {
      name: 'Backend',
      icon: 'backend',
      note: 'APIs and server logic',
      items: ['Node.js', 'Express', 'Python', 'Authentication', 'Java (familiar)', 'Spring Boot (learning)'],
    },
    {
      name: 'Database',
      icon: 'database',
      note: 'Where the data lives',
      items: ['MongoDB', 'Firebase Firestore', 'MySQL', 'SQL', 'Schema design'],
    },
    { name: 'AI & ML', icon: 'ai', note: 'Models in the apps I build', pinned: true, items: ['OpenAI API', 'Scikit-learn', 'Pandas', 'NumPy'] },
    { name: 'Tools', icon: 'tools', note: 'Used at every step', pinned: true, items: ['Git', 'GitHub'] },
  ],
}

export const experience = {
  label: '03 / experience',
  heading: "Where I'm working",
  presentLabel: 'Present',
  // Newest first. location is optional.
  items: [
    {
      role: 'Full Stack Developer',
      type: 'Internship',
      company: 'VexaTech',
      companyNote: 'Service-based IT company',
      location: '',
      mode: 'Remote',
      start: 'Nov 2025',
      end: 'Jan 2026',
      bullets: [
        'Built responsive, user-facing web application features using React, JavaScript, HTML, and CSS during a full stack development internship.',
        'Contributed to backend functionality and database integration alongside the development team.',
        'Used Git and GitHub for version control in a collaborative, remote development workflow.',
        'Worked with developers to implement and deliver assigned project features on schedule.',
        'Gained practical exposure to industry-standard software development practices, including code collaboration and iterative feature delivery.',
      ],
    },
  ],
}

export const projects = {
  label: '04 / projects',
  heading: "Things I've built",
  intro: 'From an AI-powered CRM to machine learning models that read health data and leaf photos.',
  filters: ['All', 'Full Stack', 'AI / ML'],
  filterLabel: 'Filter projects',
  liveLabel: 'Live demo',
  codeLabel: 'Source code',
  missingLink: 'link not added yet',
  imagePlaceholder: '[PROJECT IMAGE]',
  // The doodle drawn on a project's card until it has a screenshot, by category.
  doodles: { Frontend: '</>', 'Full Stack': '{ }', 'AI / ML': 'f(x)' },
  // category: one of the filters above. image: a path in public/, e.g. "/projects/salespilot.jpg" (16:9 works best).
  items: [
    {
      title: 'SalesPilot',
      description:
        'An AI-powered sales automation and CRM platform: a React front end, a FastAPI back end with background jobs, and GPT-4o built in.',
      tags: ['React', 'Vite', 'Python', 'FastAPI', 'PostgreSQL', 'Redis', 'Celery', 'Docker', 'OpenAI API'],
      category: 'Full Stack',
      image: '',
      liveUrl: '[LIVE_URL]',
      codeUrl: 'https://github.com/jeyajothi08/SalesPilot',
    },
    {
      title: 'Lung Cancer Detection',
      description:
        'A machine learning model that predicts lung cancer from patient health data, with a simple interface to show the result.',
      tags: ['Python', 'Pandas', 'NumPy', 'Scikit-learn'],
      category: 'AI / ML',
      image: '',
      liveUrl: '[LIVE_URL]',
      codeUrl: 'https://github.com/jeyajothi08/lung-cancer',
    },
    {
      title: 'Plant Disease Detection',
      description: 'A web app that spots plant diseases from leaf photos: upload an image and an image-classification model returns its prediction.',
      tags: ['Python', 'Flask', 'Scikit-learn', 'Pandas', 'NumPy', 'HTML', 'CSS'],
      category: 'AI / ML',
      image: '',
      liveUrl: '[LIVE_URL]',
      codeUrl: '[GITHUB_REPO_URL]',
    },
  ],
}

export const education = {
  label: '05 / education',
  heading: "Where I'm learning",
  items: [
    {
      degree: 'B.E., Computer Science and Design',
      school: 'Sethu Institute of Technology',
      location: 'Kariapatti, Tamil Nadu',
      start: '2023',
      end: '2027',
    },
  ],
}

export const contact = {
  label: '06 / contact',
  heading: "Let's build something together",
  intro: "Have an idea, a project or a role in mind? Send a message and I'll get back to you.",
  copyLabel: 'Copy email address',
  copied: 'Email address copied',
  copyFailed: 'Could not copy. Select the address to copy it.',
  arrowNote: 'say hi!',
  // Create a form at https://formspree.io and paste its ID here (the part after /f/).
  // While this is still a placeholder, the form opens the visitor's email app instead.
  formspreeId: '[FORMSPREE_ID]',
  form: {
    heading: 'Send a message',
    name: 'Name',
    email: 'Email',
    message: 'Message',
    namePlaceholder: 'Your name',
    emailPlaceholder: 'you@example.com',
    messagePlaceholder: 'Tell me about the project or role',
    submit: 'Send message',
    sending: 'Sending…',
    sent: "Thanks, your message is on its way. I'll reply soon.",
    error: 'Something went wrong. Please email me directly instead.',
    mailtoOpened: 'Your email app should now open with the message ready to send.',
    notConnected: 'Form not connected yet [FORMSPREE_ID]: sending opens your email app.',
    mailtoSubject: 'Hello from your portfolio',
  },
}

export const footer = {
  credit: 'Designed & built by Jeyajothi D',
  backToTop: 'Back to top',
}
