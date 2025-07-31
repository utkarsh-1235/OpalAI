// 'use client';

import LandingPageNavbar from "./_components/navbar"

// import { useEffect, useState } from 'react';

// interface CounterProps {
//   value: string;
//   index?: number;
// }

// export default function LandingPage() {
//   const [scrolled, setScrolled] = useState(false);
//   const [countersAnimated, setCountersAnimated] = useState(false);

//   // Animate navbar on scroll
//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 100);

//       const statsSection = document.getElementById("stats");
//       if (
//         statsSection &&
//         window.scrollY + window.innerHeight >= statsSection.offsetTop
//       ) {
//         setCountersAnimated(true);
//       }
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const features = [
//     {
//       icon: '🤖',
//       title: 'AI-Powered Enhancement',
//       description:
//         'Real-time video and audio enhancement using advanced machine learning algorithms for crystal-clear communication.',
//     },
//     {
//       icon: '🎯',
//       title: 'Smart Background Removal',
//       description:
//         'Intelligent background detection and replacement without the need for green screens or special lighting.',
//     },
//     {
//       icon: '🔇',
//       title: 'Noise Cancellation',
//       description:
//         'Advanced AI filters out background noise, ensuring your voice comes through clearly in any environment.',
//     },
//     {
//       icon: '📊',
//       title: 'Real-time Analytics',
//       description:
//         'Get insights into call quality, engagement metrics, and participant behavior with AI-driven analytics.',
//     },
//     {
//       icon: '🌐',
//       title: 'Global Connectivity',
//       description:
//         'Connect with anyone, anywhere with optimized routing and adaptive streaming technology.',
//     },
//     {
//       icon: '🔒',
//       title: 'Enterprise Security',
//       description:
//         'End-to-end encryption with AI-powered threat detection keeps your conversations secure and private.',
//     },
//   ];

//   const stats = [
//     { value: '99.9%', label: 'Uptime Guarantee' },
//     { value: '50M+', label: 'Calls per Month' },
//     { value: '150+', label: 'Countries Supported' },
//     { value: '4.9★', label: 'User Rating' },
//   ];

//   const AnimatedCounter = ({ value, index }: CounterProps) => {
//     const [count, setCount] = useState(0);

//     useEffect(() => {
//       if (countersAnimated) {
//         const target = parseFloat(value.replace(/[^\d.]/g, ''));
//         if (!isNaN(target)) {
//           const increment = target / 100;
//           let current = 0;
//           const timer = setInterval(() => {
//             current += increment;
//             if (current >= target) {
//               current = target;
//               clearInterval(timer);
//             }
//             setCount(current);
//           }, 20);
//           return () => clearInterval(timer);
//         }
//       }
//     }, [countersAnimated, value]);

//     return (
//       <span className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
//         {countersAnimated
//           ? `${count.toFixed(count < 10 ? 1 : 0)}${value.replace(/[\d.]/g, '')}`
//           : value}
//       </span>
//     );
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white overflow-x-hidden">
//       {/* Header */}
//       <header
//         className={`fixed top-0 w-full z-50 transition-all duration-300 ${
//           scrolled
//             ? 'bg-gray-900/95 backdrop-blur-xl'
//             : 'bg-gray-900/80 backdrop-blur-lg'
//         } border-b border-white/10`}
//       >
//         <nav className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
//           <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
//             VisionAI
//           </div>

//           <div className="hidden md:flex space-x-8">
//             {['features', 'pricing', 'about', 'contact'].map((section) => (
//               <a
//                 key={section}
//                 href={`#${section}`}
//                 className="text-white hover:text-cyan-400 transition-colors duration-300 relative group"
//               >
//                 {section.charAt(0).toUpperCase() + section.slice(1)}
//                 <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-500 transition-all duration-300 group-hover:w-full"></span>
//               </a>
//             ))}
//           </div>

//           <button className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-6 py-2 rounded-full font-semibold hover:shadow-lg hover:shadow-cyan-500/25 transform hover:-translate-y-0.5 transition-all duration-300">
//             Start Free Trial
//           </button>
//         </nav>
//       </header>

//       {/* Hero */}
//       <section className="min-h-screen flex items-center relative overflow-hidden pt-24">
//         <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10">
//           <div className="space-y-8 animate-fade-in-up">
//             <h1 className="text-5xl lg:text-7xl font-extrabold leading-tight">
//               <span className="bg-gradient-to-r from-white via-cyan-200 to-purple-400 bg-clip-text text-transparent">
//                 The Future of Video Calls is Here
//               </span>
//             </h1>

//             <p className="text-xl text-gray-300 leading-relaxed max-w-2xl">
//               Experience revolutionary AI-powered video calling with real-time
//               enhancement, intelligent noise cancellation, and seamless
//               collaboration features.
//             </p>

//             <div className="flex flex-col sm:flex-row gap-4">
//               <button className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-xl hover:shadow-cyan-500/25 transform hover:-translate-y-1 transition-all duration-300">
//                 Get Started Free
//               </button>
//               <button className="border-2 border-cyan-400 text-cyan-400 px-8 py-4 rounded-full font-semibold text-lg hover:bg-cyan-400 hover:text-gray-900 transform hover:-translate-y-1 transition-all duration-300">
//                 Watch Demo
//               </button>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Features */}
//       <section id="features" className="py-24">
//         <div className="max-w-7xl mx-auto px-6">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-cyan-400 bg-clip-text text-transparent">
//               Powerful AI Features
//             </h2>
//           </div>

//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {features.map((feature, index) => (
//               <div
//                 key={index}
//                 className="group bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:border-cyan-400/50 hover:-translate-y-2 hover:shadow-2xl hover:shadow-cyan-500/20 transition-all duration-500"
//               >
//                 <div className="text-4xl mb-4 p-4 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-xl inline-block">
//                   {feature.icon}
//                 </div>
//                 <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-cyan-300 transition-colors duration-300">
//                   {feature.title}
//                 </h3>
//                 <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
//                   {feature.description}
//                 </p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Stats */}
//       <section id="stats" className="py-16 bg-black/30 backdrop-blur-sm">
//         <div className="max-w-7xl mx-auto px-6">
//           <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
//             {stats.map((stat, index) => (
//               <div key={index} className="group">
//                 <div className="mb-2">
//                   <AnimatedCounter value={stat.value} index={index} />
//                 </div>
//                 <p className="text-gray-400 text-lg group-hover:text-white transition-colors duration-300">
//                   {stat.label}
//                 </p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* CTA */}
//       <section className="py-24 text-center">
//         <div className="max-w-4xl mx-auto px-6">
//           <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-cyan-200 to-purple-400 bg-clip-text text-transparent">
//             Ready to Transform Your Video Calls?
//           </h2>
//           <p className="text-xl text-gray-300 mb-8 leading-relaxed">
//             Join thousands of businesses already using VisionAI to revolutionize their communication.
//           </p>
//           <button className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-12 py-4 rounded-full font-semibold text-xl hover:shadow-2xl hover:shadow-cyan-500/30 transform hover:-translate-y-1 transition-all duration-300">
//             Start Your Free Trial
//           </button>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="bg-black/50 border-t border-white/10 py-8">
//         <div className="max-w-7xl mx-auto px-6 text-center">
//           <p className="text-gray-400">
//             © 2025 VisionAI. All rights reserved. Powered by next-generation AI technology.
//           </p>
//         </div>
//       </footer>

//       {/* Optional animations */}
//       <style jsx>{`
//         @keyframes fade-in-up {
//           from {
//             opacity: 0;
//             transform: translateY(30px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
//         .animate-fade-in-up {
//           animation: fade-in-up 1s ease-out;
//         }
//       `}</style>
//     </div>
//   );
// }

const page = () => {
    return(
        <div>
            
        </div>
    )
}

export default page;
