import type { LandingPageData } from '@/types';

export const landingData: LandingPageData = {
  hero: {
    headline: "PIXORANEST",
    subheadline: "We build AI systems that replace your repetitive tasks—AI call handling, WhatsApp automation, smart workflows, and conversation agents that work 24/7.",
    proofBullets: [
      "24/7 automated responses",
      "Intelligent lead qualification",
      "CRM-ready handoff"
    ],
    primaryCTA: "Get a Free Demo",
    secondaryCTA: "Book a Discovery Call",
    trustLine: "No commitment • Quick planning session • Works with existing tools"
  },

  companyIntro: {
    headline: "Transform Your Business with Pixoranest",
    description: "At Pixoranest, we help businesses automate repetitive tasks with AI agents that learn, adapt, and deliver results. From inbound calls to follow-ups, our AI handles the busy work—so your team can focus on closing.",
    targetAudience: [
      "Small to medium businesses",
      "Customer support teams",
      "Sales organizations",
      "Service-based companies"
    ],
    problemsSolved: [
      "Missed calls and leads after hours",
      "Repetitive manual data entry",
      "Slow response times",
      "Inconsistent customer experience"
    ],
    improvements: [
      "Instant 24/7 customer engagement",
      "Streamlined workflow automation",
      "Faster lead qualification",
      "Scalable support operations"
    ],
    steps: [
      {
        id: "step-1",
        number: "01",
        title: "Identify Bottlenecks",
        description: "We analyze your current workflows to find repetitive tasks and pain points that AI can solve.",
        icon: "search"
      },
      {
        id: "step-2",
        number: "02",
        title: "Automate Conversations",
        description: "Deploy AI agents that handle calls, messages, and workflows with human-like precision.",
        icon: "bot"
      },
      {
        id: "step-3",
        number: "03",
        title: "Deploy & Integrate",
        description: "Seamlessly connect with your existing tools—CRM, helpdesk, calendar, and more.",
        icon: "plug"
      },
      {
        id: "step-4",
        number: "04",
        title: "Measure & Improve",
        description: "Track performance, gather insights, and continuously optimize your AI systems.",
        icon: "trending"
      }
    ]
  },

  stats: [
    {
      id: "stat-1",
      value: "80%",
      label: "Support Queries Automated",
      description: "Average reduction in manual support tickets handled by our AI agents"
    },
    {
      id: "stat-2",
      value: "24/7",
      label: "Always Available",
      description: "Round-the-clock customer engagement without human intervention"
    },
    {
      id: "stat-3",
      value: "3x",
      label: "Faster Response Time",
      description: "Improvement in average response time compared to manual handling"
    },
    {
      id: "stat-4",
      value: "50%",
      label: "Cost Reduction",
      description: "Typical savings on customer support operational costs"
    }
  ],

  services: [
    {
      id: "service-1",
      name: "AI Call Handling",
      shortDescription: "Intelligent voice agents that answer, route, and resolve customer calls 24/7.",
      price: "Starting at $499/month",
      fullDescription: "Our AI Call Handling service deploys sophisticated voice agents that can understand natural language, answer FAQs, route calls to the right department, and even resolve common issues without human intervention. The system integrates with your existing phone infrastructure and can handle multiple simultaneous calls.",
      problem: "Businesses miss 35% of calls during busy periods and 100% after hours. Each missed call is a potential lost customer or opportunity.",
      howItWorks: "The AI uses advanced speech recognition and natural language processing to understand caller intent. It can access your knowledge base, schedule appointments, take messages, and transfer to humans when needed—all while maintaining a natural conversational flow.",
      features: [
        "Natural language understanding",
        "Multi-language support",
        "Call routing and transfers",
        "Appointment scheduling",
        "CRM integration",
        "Call recording and analytics",
        "Custom voice personalities"
      ],
      implementation: "Setup takes 2-3 weeks. We configure the AI with your business knowledge, integrate with your phone system, and train it on your specific use cases. Full testing and optimization included.",
      pricingDetails: "Starting at $499/month for up to 500 minutes. Scale packages available for higher volumes. Custom enterprise pricing for complex requirements."
    },
    {
      id: "service-2",
      name: "WhatsApp Automation",
      shortDescription: "Smart messaging bots that engage customers and handle inquiries on WhatsApp.",
      price: "Starting at $399/month",
      fullDescription: "Transform your WhatsApp Business account into a 24/7 customer engagement channel. Our AI handles inquiries, sends notifications, collects information, and maintains conversational context across multiple interactions.",
      problem: "WhatsApp is the preferred communication channel for billions, but manual responses are slow and inconsistent. Customers expect instant replies.",
      howItWorks: "The AI monitors your WhatsApp Business API, instantly responding to messages with context-aware answers. It can send proactive notifications, collect customer data, process orders, and seamlessly hand off to humans when needed.",
      features: [
        "Instant message responses",
        "Rich media support (images, documents)",
        "Conversation context memory",
        "Broadcast messaging",
        "Order processing",
        "Appointment reminders",
        "Multi-agent handoff"
      ],
      implementation: "We connect to your WhatsApp Business API, configure conversation flows, and integrate with your backend systems. Typical setup is 1-2 weeks.",
      pricingDetails: "Starting at $399/month for up to 1,000 conversations. Additional conversations billed at $0.10 each. Enterprise packages available."
    },
    {
      id: "service-3",
      name: "AI Receptionist",
      shortDescription: "A virtual front desk that greets visitors, answers questions, and manages appointments.",
      price: "Starting at $299/month",
      fullDescription: "Your always-available digital receptionist that handles incoming inquiries via phone, chat, or email. It greets visitors, answers common questions, schedules appointments, and ensures no opportunity slips through the cracks.",
      problem: "Hiring a full-time receptionist is expensive, and they still need breaks, sick days, and can't handle peak call volumes effectively.",
      howItWorks: "The AI receptionist answers calls and messages in a friendly, professional manner. It can check calendars, book appointments, answer FAQs, take detailed messages, and route urgent matters to the right person immediately.",
      features: [
        "Multi-channel support (phone, chat, email)",
        "Calendar integration",
        "Appointment scheduling",
        "Message taking and forwarding",
        "FAQ handling",
        "Visitor check-in",
        "Custom greetings and scripts"
      ],
      implementation: "Quick 1-week setup. We configure your business information, integrate calendars, and set up call routing rules. Training and optimization included.",
      pricingDetails: "Starting at $299/month for basic reception services. Premium packages with advanced features start at $499/month."
    },
    {
      id: "service-4",
      name: "Voice Support Agent",
      shortDescription: "Advanced voice AI for complex customer support and technical assistance.",
      price: "Starting at $599/month",
      fullDescription: "Our most sophisticated voice AI solution, designed for complex support scenarios. It can troubleshoot issues, guide customers through processes, access account information, and provide detailed technical assistance.",
      problem: "Support teams are overwhelmed with repetitive inquiries, leading to long wait times, frustrated customers, and burned-out agents.",
      howItWorks: "The Voice Support Agent uses advanced AI to understand complex queries, access your knowledge base and customer data, and provide accurate solutions. It can walk customers through troubleshooting steps, process returns, and escalate intelligently.",
      features: [
        "Advanced troubleshooting",
        "Account access and verification",
        "Knowledge base integration",
        "Ticket creation and tracking",
        "Sentiment analysis",
        "Intelligent escalation",
        "Call summary generation"
      ],
      implementation: "Comprehensive 3-4 week setup including knowledge base integration, custom training, and extensive testing. Ongoing optimization included.",
      pricingDetails: "Starting at $599/month for up to 1,000 minutes. Enterprise packages with unlimited minutes and custom features available."
    },
    {
      id: "service-5",
      name: "Social Media Automation",
      shortDescription: "AI-powered engagement across all your social media channels.",
      price: "Starting at $349/month",
      fullDescription: "Automate your social media presence with AI that responds to comments, messages, and mentions across all major platforms. Maintain consistent brand voice and engagement without the manual effort.",
      problem: "Social media never sleeps, but your team does. Missed comments and slow responses hurt your brand reputation and customer relationships.",
      howItWorks: "The AI monitors your social accounts 24/7, instantly responding to comments and messages with on-brand replies. It can answer questions, handle complaints diplomatically, and alert your team to opportunities or issues requiring human attention.",
      features: [
        "Multi-platform monitoring",
        "Instant comment responses",
        "DM handling",
        "Sentiment detection",
        "Crisis alert system",
        "Brand voice customization",
        "Performance analytics"
      ],
      implementation: "2-week setup connecting your social accounts, configuring response templates, and training the AI on your brand voice.",
      pricingDetails: "Starting at $349/month for up to 3 platforms. Additional platforms $99 each. Enterprise social management packages available."
    },
    {
      id: "service-6",
      name: "Customer Support Automation",
      shortDescription: "End-to-end automation for your entire customer support workflow.",
      price: "Starting at $449/month",
      fullDescription: "A comprehensive support automation platform that handles tickets, live chat, email, and more. The AI resolves common issues instantly and intelligently routes complex cases to the right human agents.",
      problem: "Support teams spend 70% of their time on repetitive inquiries, leaving little capacity for complex issues that truly need human expertise.",
      howItWorks: "The AI integrates with your helpdesk, analyzing incoming tickets and resolving those it can handle autonomously. For complex issues, it gathers preliminary information and routes to the best-suited agent with full context.",
      features: [
        "Ticket auto-resolution",
        "Live chat automation",
        "Email response automation",
        "Smart routing and assignment",
        "Knowledge base suggestions",
        "Customer history access",
        "Support analytics dashboard"
      ],
      implementation: "3-week implementation including helpdesk integration, knowledge base connection, and workflow configuration. Training included.",
      pricingDetails: "Starting at $449/month for up to 2,000 tickets. Scale pricing based on volume. Full enterprise solutions available."
    },
    {
      id: "service-7",
      name: "Custom Integrations & Workflow Automation",
      shortDescription: "Bespoke automation solutions tailored to your unique business processes.",
      price: "Contact Us",
      fullDescription: "When off-the-shelf solutions aren't enough, we build custom AI automation tailored to your specific workflows. From complex multi-system integrations to proprietary process automation, we deliver solutions that fit your business perfectly.",
      problem: "Every business has unique processes that generic tools can't address. Manual workarounds and patchwork solutions create inefficiencies and errors.",
      howItWorks: "We analyze your workflows, identify automation opportunities, and build custom AI solutions that integrate seamlessly with your existing tech stack. From data processing to decision automation, we handle it all.",
      features: [
        "Custom AI model development",
        "Multi-system integrations",
        "Workflow orchestration",
        "Data processing automation",
        "API development",
        "Legacy system connectivity",
        "Ongoing maintenance and support"
      ],
      implementation: "Custom timeline based on project scope. Typical engagements range from 4-12 weeks. We follow agile methodology with regular check-ins.",
      pricingDetails: "Custom pricing based on project requirements. Contact us for a free consultation and detailed proposal."
    }
  ],

  video: {
    url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    type: "youtube",
    headline: "See How It Works",
    description: "Watch how our AI automation transforms businesses in just 2 minutes."
  },

  testimonials: [
    {
      id: "testimonial-1",
      name: "Sarah Mitchell",
      role: "Customer Success Director",
      company: "TechFlow Solutions",
      quote: "Our AI agent now handles 80% of tier-1 support tickets automatically. Our team can finally focus on complex issues that require human expertise."
    },
    {
      id: "testimonial-2",
      name: "Marcus Chen",
      role: "CEO",
      company: "GrowthLabs Inc",
      quote: "We no longer miss leads after hours. The AI receptionist books appointments while we sleep. It's like having a 24/7 sales team."
    },
    {
      id: "testimonial-3",
      name: "Elena Rodriguez",
      role: "Operations Manager",
      company: "ServiceFirst Co",
      quote: "Response times dropped from 4 hours to under 2 minutes. Our customer satisfaction scores have never been higher."
    },
    {
      id: "testimonial-4",
      name: "David Park",
      role: "Founder",
      company: "QuickServe Local",
      quote: "The WhatsApp automation alone paid for itself in the first month. Customers love the instant responses."
    },
    {
      id: "testimonial-5",
      name: "Jennifer Walsh",
      role: "Head of Support",
      company: "CloudScale Systems",
      quote: "We reduced support costs by 45% while actually improving our service quality. The AI handles routine queries flawlessly."
    }
  ],

  finalCTA: {
    headline: "Ready to Automate Your Business?",
    supportingText: "Book a free discovery call and see how AI can transform your operations. No commitment required.",
    bullets: [
      "We'll review your current workflows and identify automation opportunities",
      "You'll get a custom automation plan tailored to your business",
      "Our team will implement and optimize your AI agents",
      "We integrate seamlessly with your existing tools and systems"
    ],
    primaryCTA: "Get My Demo",
    secondaryCTA: "Talk to a Specialist",
    complianceText: "By submitting this form, you agree to be contacted about our services. You can unsubscribe at any time."
  }
};
