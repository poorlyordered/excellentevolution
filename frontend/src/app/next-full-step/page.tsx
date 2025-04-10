import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// Accordion import removed as it's unused for now
// import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import {
  Lightbulb,
  // Map, // Unused icon
  DraftingCompass,
  Rocket,
  Trophy,
  BrainCircuit,
  BarChart,
  CalendarDays,
  // CheckSquare, // Unused icon
  // User, // Unused icon
  ClipboardList,
  Compass,
  // ArrowUpRightSquare, // Unused icon
  ChevronRight,
  Target,
  Layers,
  Sparkles,
  TrendingUp,
  // Goal, // Unused icon
} from "lucide-react";
import Image from 'next/image';
import Link from 'next/link';

export default function NextFullStepLandingPage() {
  const assessmentFlow = [
    { name: "Big Five (OCEAN)", icon: Layers },
    { name: "16PF (Optional)", icon: Layers },
    { name: "Holland Code (RIASEC)", icon: Layers },
    { name: "DiSC", icon: Layers },
    { name: "TalentSmartEQ EI", icon: Layers },
    { name: "Career Values Scale", icon: Layers },
  ];

  const benefits = [
    {
      title: "Unlock Self-Awareness",
      description: "Gain deep insights into how your personality, interests, and values impact your career choices and potential.",
      icon: Lightbulb,
      problem: "Uncertainty about key personal factors."
    },
    {
      title: "Structured Development Path",
      description: "Utilize a scientifically-backed framework for self-driven career planning and measurable progress.",
      icon: DraftingCompass,
      problem: "Lack of structure for planning."
    },
    {
      title: "Stay Motivated & Engaged",
      description: "Engage with gamified progress tracking, personalized challenges, and milestone achievements.",
      icon: Rocket,
      problem: "Difficulty staying motivated."
    },
  ];

  const features = [
    {
      title: "AI-Powered Recommendations",
      description: "Receive intelligent, personalized suggestions based on your unique assessment profile.",
      icon: BrainCircuit,
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475" // Direct Unsplash URL for testing
    },
    {
      title: "Progress Visualization",
      description: "Track your growth with both standard analytics and engaging gamified views.",
      icon: BarChart,
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f" // Direct Unsplash URL for analytics
    },
    {
      title: "Integrated Check-ins",
      description: "Schedule regular check-ins via calendar integration to stay on track with your goals.",
      icon: CalendarDays,
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978" // Direct Unsplash URL for planning
    },
    {
      title: "Quarterly Reviews",
      description: "Reflect on your progress and refine your plan with structured quarterly reviews.",
      icon: Target,
      image: "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d" // Direct Unsplash URL for focus
    },
  ];

  const howItWorksSteps = [
    {
      title: "Sign Up & Assess",
      description: "Create your account and complete our suite of foundational career assessments.",
      icon: ClipboardList
    },
    {
      title: "Explore & Plan",
      description: "Receive personalized insights and build your tailored professional development plan.",
      icon: Compass
    },
    {
      title: "Engage & Grow",
      description: "Utilize powerful tools, track your progress visually, and achieve your career milestones.",
      icon: TrendingUp
    },
  ];

  const testimonials = [
    {
      quote: "Next Full Step gave me the clarity I needed to pivot my career. The insights were incredibly accurate.",
      name: "Alex Johnson",
      title: "Marketing Manager",
      avatar: "https://source.unsplash.com/random/100x100/?person,professional"
    },
    {
      quote: "The structured approach and gamified tracking kept me motivated. I've made more progress in 3 months than I did in the previous year.",
      name: "Samantha Lee",
      title: "Software Engineer",
      avatar: "https://source.unsplash.com/random/100x100/?woman,tech"
    },
    {
      quote: "Finally, a tool that puts me in the driver's seat of my own development. Highly recommended!",
      name: "David Chen",
      title: "Product Lead",
      avatar: "https://source.unsplash.com/random/100x100/?man,business"
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-white via-purple-50 to-teal-50 text-gray-800">
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-20 md:py-32 bg-gradient-to-r from-teal-50 via-white to-purple-50">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-4 text-purple-900 leading-tight">
              <span className="text-teal-600">Self-directed tools</span> for exceptional professional evolution.
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Take control of your career path with personalized insights, structured planning, and engaging progress tracking powered by Next Full Step.
            </p>
            <div className="flex justify-center items-center gap-4 mb-12">
              <Progress value={33} className="w-1/4 h-3 bg-purple-200 [&>div]:bg-gradient-to-r [&>div]:from-orange-400 [&>div]:to-yellow-400" />
              <span className="text-sm font-medium text-purple-700">Your Journey Begins...</span>
            </div>
            <Button size="lg" className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 text-lg font-semibold rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105">
              Start Your Journey <Rocket className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </section>

        {/* Assessment Flow Section */}
        <section id="assessments" className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-purple-800">
              Understand Your Professional DNA
            </h2>
            <div className="relative flex flex-col md:flex-row items-center justify-center gap-8 md:gap-4">
              {assessmentFlow.map((assessment, index) => (
                <React.Fragment key={`${assessment.name}-${index}`}>
                  <Card key={assessment.name} className="w-full md:w-48 text-center shadow-md hover:shadow-lg transition-shadow duration-300 bg-purple-50 border-purple-200">
                    <CardHeader className="pb-2">
                      <assessment.icon className="mx-auto h-8 w-8 text-teal-600 mb-2" />
                      <CardTitle className="text-sm font-semibold text-purple-900">{assessment.name}</CardTitle>
                    </CardHeader>
                  </Card>
                  {index < assessmentFlow.length - 1 && (
                    <ChevronRight className="hidden md:block h-8 w-8 text-purple-300 mx-2" />
                  )}
                  {index < assessmentFlow.length - 1 && (
                     <div className="md:hidden h-8 w-px bg-purple-300 my-2 self-center"></div>
                  )}
                </React.Fragment>
              ))}
            </div>
             <p className="text-center text-gray-500 mt-8 text-sm">
              Flow through validated assessments to build a comprehensive profile.
            </p>
          </div>
        </section>

        {/* Benefits (Problem/Solution) Section */}
        <section id="benefits" className="py-16 md:py-24 bg-gradient-to-b from-teal-50 to-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-purple-800">
              Navigate Your Career with Clarity and Confidence
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {benefits.map((benefit) => (
                <Card key={benefit.title} className="text-center shadow-lg hover:shadow-xl transition-shadow duration-300 border-teal-200 overflow-hidden">
                  <CardHeader className="bg-teal-600 p-6">
                    <benefit.icon className="mx-auto h-12 w-12 text-white mb-4" />
                    <CardTitle className="text-xl font-semibold text-white">{benefit.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                     <p className="text-sm text-orange-600 font-medium mb-2">{benefit.problem}</p>
                    <p className="text-gray-600">{benefit.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-purple-800">
              Powerful Tools for Your Growth Toolkit
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              {features.map((feature, index) => (
                <div key={feature.title} className={`flex flex-col md:flex-row gap-8 items-center ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
                  <div className="w-full md:w-1/2">
                     <Image
                        src={feature.image}
                        alt={feature.title}
                        width={600}
                        height={400}
                        className="rounded-lg shadow-md" // Removed object-cover and aspect-ratio for testing
                        priority={index === 0} // Prioritize loading the first image
                      />
                  </div>
                  <div className="w-full md:w-1/2">
                    <feature.icon className="h-10 w-10 text-teal-600 mb-3" />
                    <h3 className="text-2xl font-semibold mb-3 text-purple-900">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                     {feature.title.includes("Gamified") && (
                        <div className="mt-4 flex items-center gap-2 text-sm text-orange-600">
                            <Trophy className="h-4 w-4"/>
                            <span>Unlock achievements as you progress!</span>
                        </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-16 md:py-24 bg-purple-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-purple-800">
              Get Started in Minutes
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              {howItWorksSteps.map((step, index) => (
                <div key={step.title} className="text-center">
                  <div className="relative mb-4">
                     <div className="bg-teal-600 rounded-full w-16 h-16 mx-auto flex items-center justify-center mb-4 shadow-lg">
                        <step.icon className="h-8 w-8 text-white" />
                     </div>
                     <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-full h-px bg-purple-300 -z-10 hidden md:block" style={{ display: index === howItWorksSteps.length - 1 ? 'none' : 'block' }}></div>
                     <span className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-purple-50 px-2 text-4xl font-bold text-purple-300">{index + 1}</span>
                  </div>

                  <h3 className="text-xl font-semibold mb-2 text-purple-900">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonial Section */}
        <section id="testimonials" className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-purple-800">
              Hear From Professionals Like You
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial) => (
                <Card key={testimonial.name} className="shadow-lg hover:shadow-xl transition-shadow duration-300 bg-gray-50 border-gray-200">
                  <CardContent className="p-6">
                    <p className="text-gray-700 italic mb-4">&quot;{testimonial.quote}&quot;</p>
                    <div className="flex items-center">
                      <Avatar className="h-10 w-10 mr-3">
                        <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                        <AvatarFallback>{testimonial.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold text-purple-900">{testimonial.name}</p>
                        <p className="text-sm text-gray-500">{testimonial.title}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-20 md:py-28 bg-gradient-to-r from-purple-700 to-teal-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Ready to Take Your Next Full Step?
            </h2>
            <p className="text-lg md:text-xl text-purple-100 mb-10 max-w-2xl mx-auto">
              Join today and unlock the tools and insights needed to proactively shape your professional future.
            </p>
            <Button size="lg" variant="secondary" className="bg-yellow-400 hover:bg-orange-500 text-purple-900 px-10 py-4 text-xl font-bold rounded-full shadow-xl transition duration-300 ease-in-out transform hover:scale-105">
              Sign Up Now <Sparkles className="ml-2 h-6 w-6" />
            </Button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-400 py-8">
        <div className="container mx-auto px-4 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Next Full Step. All rights reserved.</p>
          <div className="mt-2">
            <Link href="/privacy" className="hover:text-teal-400 mx-2">Privacy Policy</Link> |
            <Link href="/terms" className="hover:text-teal-400 mx-2">Terms of Service</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}