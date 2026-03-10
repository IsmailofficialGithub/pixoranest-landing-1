// Types for AI Automation Agency Landing Page

export interface Stat {
  id: string;
  value: string;
  label: string;
  description: string;
}

export interface Service {
  id: string;
  name: string;
  shortDescription: string;
  price: string;
  fullDescription: string;
  problem: string;
  howItWorks: string;
  features: string[];
  implementation: string;
  pricingDetails: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  image?: string;
}

export interface VideoData {
  url: string;
  type: 'youtube' | 'vimeo' | 'iframe';
  headline: string;
  description: string;
}

export interface HowItWorksStep {
  id: string;
  number: string;
  title: string;
  description: string;
  icon: string;
}

export interface HeroData {
  headline: string;
  subheadline: string;
  proofBullets: string[];
  primaryCTA: string;
  secondaryCTA: string;
  trustLine: string;
}

export interface CompanyIntroData {
  headline: string;
  description: string;
  targetAudience: string[];
  problemsSolved: string[];
  improvements: string[];
  steps: HowItWorksStep[];
}

export interface FinalCTAData {
  headline: string;
  supportingText: string;
  bullets: string[];
  primaryCTA: string;
  secondaryCTA: string;
  complianceText: string;
}

export interface LandingPageData {
  hero: HeroData;
  companyIntro: CompanyIntroData;
  stats: Stat[];
  services: Service[];
  video: VideoData;
  testimonials: Testimonial[];
  finalCTA: FinalCTAData;
}
