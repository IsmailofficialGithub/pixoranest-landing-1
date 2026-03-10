import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ArrowRight, MessageCircle, Check, Sparkles, Shield, Clock, Mail } from 'lucide-react';
import type { FinalCTAData } from '@/types';

gsap.registerPlugin(ScrollTrigger);

interface FinalCTAProps {
  data: FinalCTAData;
}

const FinalCTA = ({ data }: FinalCTAProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    useCase: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    const form = formRef.current;

    if (!section || !content || !form) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      gsap.set([content, form], { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      // Content animation
      gsap.fromTo(
        content.querySelectorAll('.animate-item'),
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: content,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Form animation
      gsap.fromTo(
        form,
        { opacity: 0, x: 40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: form,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, useCase: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleTalkToSpecialist = () => {
    // Scroll to form or open chat
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <section
      ref={sectionRef}
      id="final-cta"
      className="relative w-full py-20 sm:py-32 overflow-hidden"
    >

      {/* Decorative elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#CCFF00]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#CCFF00]/5 rounded-full blur-3xl" />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left column: Content */}
          <div ref={contentRef}>
            <div className="animate-item mb-8">
              <span className="inline-flex items-center gap-2 bg-[#CCFF00]/10 text-[#CCFF00] px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Sparkles className="w-4 h-4" />
                Start Your Transformation
              </span>
            </div>

            <h2 className="animate-item text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              {data.headline}
            </h2>

            <p className="animate-item text-lg text-gray-400 mb-8 leading-relaxed">
              {data.supportingText}
            </p>

            {/* Bullet points */}
            <ul className="animate-item space-y-4 mb-10">
              {data.bullets.map((bullet, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 text-gray-300"
                >
                  <span className="w-6 h-6 rounded-full bg-[#CCFF00]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-4 h-4 text-[#CCFF00]" />
                  </span>
                  {bullet}
                </li>
              ))}
            </ul>

            {/* Secondary CTA */}
            <div className="animate-item">
              <Button
                variant="outline"
                onClick={handleTalkToSpecialist}
                className="border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50 font-semibold px-6 py-3 rounded-full"
              >
                <MessageCircle className="mr-2 w-5 h-5" />
                {data.secondaryCTA}
              </Button>
            </div>
          </div>

          {/* Right column: Form */}
          <div className="relative">
            {isSubmitted ? (
              // Success state
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-[#CCFF00]/30 text-center">
                <div className="w-20 h-20 rounded-full bg-[#CCFF00]/20 flex items-center justify-center mx-auto mb-6">
                  <Check className="w-10 h-10 text-[#CCFF00]" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  Thank You!
                </h3>
                <p className="text-gray-400 mb-6">
                  We&apos;ve received your request and will be in touch within 24 hours to schedule your demo.
                </p>
                <div className="flex items-center justify-center gap-2 text-[#CCFF00]">
                  <Mail className="w-5 h-5" />
                  <span>Check your email for confirmation</span>
                </div>
              </div>
            ) : (
              // Form
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-white/10"
              >
                <h3 className="text-xl font-semibold text-white mb-6">
                  Get Your Free Demo
                </h3>

                <div className="space-y-5">
                  {/* Name */}
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-gray-300">
                      Name
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="bg-white/5 border-white/20 text-white placeholder:text-gray-500 focus:border-[#CCFF00] focus:ring-[#CCFF00]/20"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-gray-300">
                      Email
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="john@company.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="bg-white/5 border-white/20 text-white placeholder:text-gray-500 focus:border-[#CCFF00] focus:ring-[#CCFF00]/20"
                    />
                  </div>

                  {/* Company */}
                  <div className="space-y-2">
                    <Label htmlFor="company" className="text-gray-300">
                      Company
                    </Label>
                    <Input
                      id="company"
                      name="company"
                      type="text"
                      placeholder="Acme Inc."
                      value={formData.company}
                      onChange={handleInputChange}
                      required
                      className="bg-white/5 border-white/20 text-white placeholder:text-gray-500 focus:border-[#CCFF00] focus:ring-[#CCFF00]/20"
                    />
                  </div>

                  {/* Use Case */}
                  <div className="space-y-2">
                    <Label htmlFor="useCase" className="text-gray-300">
                      Use Case
                    </Label>
                    <Select
                      value={formData.useCase}
                      onValueChange={handleSelectChange}
                    >
                      <SelectTrigger className="bg-white/5 border-white/20 text-white focus:ring-[#CCFF00]/20">
                        <SelectValue placeholder="Select your use case" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#1a1a1a] border-white/20">
                        <SelectItem value="customer-support">
                          Customer Support
                        </SelectItem>
                        <SelectItem value="lead-generation">
                          Lead Generation
                        </SelectItem>
                        <SelectItem value="appointment-scheduling">
                          Appointment Scheduling
                        </SelectItem>
                        <SelectItem value="call-handling">
                          Call Handling
                        </SelectItem>
                        <SelectItem value="whatsapp-automation">
                          WhatsApp Automation
                        </SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-gray-300">
                      Message (Optional)
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Tell us about your specific needs..."
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={4}
                      className="bg-white/5 border-white/20 text-white placeholder:text-gray-500 focus:border-[#CCFF00] focus:ring-[#CCFF00]/20 resize-none"
                    />
                  </div>

                  {/* Submit button */}
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#CCFF00] text-black hover:bg-[#b3e600] font-semibold py-3 rounded-full transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <Clock className="w-5 h-5 animate-spin" />
                        Submitting...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        {data.primaryCTA}
                        <ArrowRight className="w-5 h-5" />
                      </span>
                    )}
                  </Button>

                  {/* Compliance text */}
                  <p className="text-xs text-gray-500 text-center flex items-start gap-2">
                    <Shield className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    {data.complianceText}
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 pt-10 border-t border-white/10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            © 2024 Pixoranest. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="text-gray-500 hover:text-[#CCFF00] text-sm transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-[#CCFF00] text-sm transition-colors"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
