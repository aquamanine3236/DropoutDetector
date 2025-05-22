import { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { ChevronDown, Brain, Leaf, Users, TrendingUp, BookOpen } from "lucide-react";
import AnimationWrapper from "../components/AnimationWrapper";
import Card from "../components/Card";
import { dropoutData, impactData } from "../components/dataset";

const FallingLeaves = () => {
  const [leaves, setLeaves] = useState<
    { id: number; left: number; animationDuration: number; size: number; opacity: number; angle: number; color: string }[]
  >([]);

  useEffect(() => {
    const autumnColors = ["#f97316", "#ef4444", "#eab308", "#d97706"]; // Orange, red, yellow, amber
    const createLeaf = () => ({
      id: Date.now() + Math.random(),
      left: Math.random() * 100,
      animationDuration: 6 + Math.random() * 4, // 6-10 seconds for a slower, leaf-like fall
      size: 8 + Math.random() * 8, // 8-16px for varied sizes
      opacity: 0.7 + Math.random() * 0.3, // 0.7-1 opacity for subtle variation
      angle: (Math.random() - 0.5) * 40, // Slight angle variation (-20 to 20 pixels)
      color: autumnColors[Math.floor(Math.random() * autumnColors.length)], // Random autumn color
    });

    const generateLeafBurst = () => {
      const burstSize = Math.floor(Math.random() * 3) + 2; // 2-4 leaves per burst
      console.log(`Generating burst of ${burstSize} leaves at:`, new Date().toISOString());
      const newLeaves = Array.from({ length: burstSize }, createLeaf);
      setLeaves((prev) => [...prev, ...newLeaves].slice(-30)); // Limit to 30 leaves
    };

    generateLeafBurst();
    const interval = setInterval(generateLeafBurst, 2500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const cleanup = setInterval(() => {
      console.log("Cleaning leaves, current time:", new Date().toISOString());
      setLeaves((prev) => prev.filter((leaf) => Date.now() - leaf.id < 10000));
    }, 1000);
    return () => clearInterval(cleanup);
  }, []);

  return (
    <div className="absolute inset-0 overflow-visible pointer-events-none h-screen">
      {leaves.map((leaf) => (
        <div
          key={leaf.id}
          className="absolute leaf-wrapper"
          style={{
            left: `${leaf.left}%`,
            top: "-20px",
            fontSize: `${leaf.size}px`,
            opacity: leaf.opacity,
            animation: `fall ${leaf.animationDuration}s linear forwards`,
            '--angle': `${leaf.angle}px`,
          } as React.CSSProperties}
        >
          <Leaf
            fill={leaf.color}
            stroke={leaf.color}
            className="leaf"
          />
        </div>
      ))}
      <style>{`
        .leaf-wrapper {
          position: absolute;
          width: 1px;
          height: 1px;
        }

        .leaf-wrapper::after {
          content: '';
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 2px;
          height: 15px; /* Shorter tail for leaves */
          background: linear-gradient(to bottom, rgba(234, 179, 8, 0.6), rgba(234, 179, 8, 0));
          filter: blur(1px);
          opacity: 0.6;
          animation: fadeTail 0.5s linear forwards;
        }

        .leaf {
          animation: flutter ${Math.random() * 2 + 1}s ease-in-out infinite alternate; /* Random flutter duration */
        }

        @keyframes fall {
          0% {
            transform: translateY(0) translateX(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(110vh) translateX(var(--angle)) rotate(360deg);
            opacity: 0;
          }
        }

        @keyframes flutter {
          0% {
            transform: rotate(-10deg);
          }
          100% {
            transform: rotate(10deg);
          }
        }

        @keyframes fadeTail {
          to {
            opacity: 0;
            height: 0;
          }
        }
      `}</style>
    </div>
  );
};

const Home = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    console.log("Home component mounted");
    console.log("dropoutData:", dropoutData);
    console.log("impactData:", impactData);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLearnMoreClick = () => {
    const statisticsSection = document.getElementById("statistics-section");
    if (statisticsSection) {
      statisticsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Hero Section */}
      <div className="relative h-screen flex items-center justify-center overflow-hidden">
        <FallingLeaves />
        <div className="absolute inset-0 bg-green-200 opacity-10 z-0"></div>
        <div className="z-10 text-center px-4 max-w-4xl">
          <AnimationWrapper direction="up">
            <h1 className="text-5xl md:text-6xl font-bold text-green-800 mb-6">
              Predicting Student Success
            </h1>
          </AnimationWrapper>
          <AnimationWrapper direction="up" delay={0.3}>
            <p className="text-xl md:text-2xl text-green-700 mb-8">
              Using machine learning to identify students at risk of dropping out
              and providing timely interventions.
            </p>
          </AnimationWrapper>
          <AnimationWrapper direction="up" delay={0.6}>
            <button
              onClick={handleLearnMoreClick}
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition-all duration-300 transform hover:scale-105 flex items-center mx-auto"
            >
              Learn More
              <ChevronDown className="ml-2" size={20} />
            </button>
          </AnimationWrapper>
        </div>
        <div className="absolute bottom-8 left-0 right-0 flex justify-center animate-bounce">
          <ChevronDown className="text-green-600" size={36} />
        </div>
      </div>

      {/* Statistics Section */}
      <section id="statistics-section" className="py-16 px-4 md:px-8 max-w-6xl mx-auto">
        <AnimationWrapper direction="up">
          <h2 className="text-3xl md:text-4xl font-bold text-green-800 text-center mb-4">
            The Growing Problem of Student Dropouts
          </h2>
          <p className="text-lg text-green-700 text-center mb-6 max-w-3xl mx-auto">
            Student dropout rates continue to be a significant challenge in higher education, 
            affecting both individuals and institutions.
          </p>
          <p className="text-sm text-green-600 text-center mb-12 max-w-3xl mx-auto italic">
            Sources: National Center for Education Statistics (NCES), American Council on Education (ACE), 
            Journal of College Student Retention (2023), OECD Education at a Glance Report
          </p>
        </AnimationWrapper>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <AnimationWrapper direction="left" delay={0.3}>
            <div className="shadow-lg rounded-lg bg-white p-6 h-80">
              <h3 className="text-xl font-semibold text-green-800 mb-4">Dropout Rates by Year</h3>
              {dropoutData && dropoutData.length > 0 ? (
                <ResponsiveContainer width="100%" height="80%">
                  <BarChart data={dropoutData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0f2e0" />
                    <XAxis dataKey="year" stroke="#4ade80" />
                    <YAxis stroke="#4ade80" />
                    <Tooltip
                      contentStyle={{ backgroundColor: "#f0fdf4", border: "1px solid #86efac" }}
                      formatter={(value, name, props) => {
                        return [`${value}% (Source: ${props.payload.source})`, "Dropout Rate"];
                      }}
                    />
                    <Bar dataKey="rate" fill="#4ade80" animationDuration={1500} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <p className="text-red-500">No dropout data available</p>
              )}
            </div>
          </AnimationWrapper>

          <div className="space-y-6">
            {[
              { icon: Users, title: "1 in 3 Students", description: "Do not complete their degree within 6 years of enrollment", source: "National Student Clearinghouse Research Center, 2023" },
              { icon: TrendingUp, title: "40% Higher", description: "Risk of dropout for first-generation college students", source: "Pell Institute for the Study of Opportunity in Higher Education" },
              { icon: BookOpen, title: "63% of Dropouts", description: "Cite financial challenges as a primary factor", source: "Tyton Partners' \"Driving Toward a Degree\" Research, 2022" },
            ].map((item, index) => (
              <Card
                key={index}
                title={item.title}
                description={item.description}
                source={item.source}
                icon={item.icon}
                animationDirection="up"
                delay={0.6 + index * 0.2}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-16 bg-green-50">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <AnimationWrapper direction="up">
            <h2 className="text-3xl md:text-4xl font-bold text-green-800 text-center mb-4">
              The Impact of Dropping Out
            </h2>
            <p className="text-lg text-green-700 text-center mb-6 max-w-3xl mx-auto">
              Dropping out affects not only students but also institutions and society as a whole.
            </p>
            <p className="text-sm text-green-600 text-center mb-12 max-w-3xl mx-auto italic">
              Sources: Education Data Initiative, Federal Reserve Bank Research, Georgetown University Center on Education and the Workforce
            </p>
          </AnimationWrapper>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {impactData && impactData.length > 0 ? (
              impactData.map((item, index) => (
                <Card
                  key={index}
                  title={item.name}
                  description={item.value}
                  source={item.source}
                  animationDirection="up"
                  delay={index * 0.1}
                  className="text-center h-48 flex flex-col justify-center"
                />
              ))
            ) : (
              <p className="text-red-500 col-span-4 text-center">No impact data available</p>
            )}
          </div>
        </div>
      </section>

      {/* Our Predictive Solution Section */}
      <section className="py-16 px-4 md:px-8 max-w-6xl mx-auto">
        <AnimationWrapper direction="up">
          <h2 className="text-3xl md:text-4xl font-bold text-green-800 text-center mb-4">
            Our Predictive Solution
          </h2>
          <p className="text-lg text-green-700 text-center mb-12 max-w-3xl mx-auto">
            Using machine learning to identify students at risk and provide timely interventions.
          </p>
        </AnimationWrapper>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <AnimationWrapper direction="left" delay={0.3}>
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-green-800 flex items-center">
                <Brain className="mr-2 text-green-600" size={28} />
                Machine Learning Approach
              </h3>
              <p className="text-green-700 leading-relaxed">
                Our research group has developed a predictive model that can identify students at risk of dropping out 
                with over 85% accuracy. By analyzing various factors including:
              </p>
              <ul className="space-y-2 text-green-700">
                {[
                  "Academic performance and attendance patterns",
                  "Engagement with learning management systems",
                  "Financial circumstances and support availability",
                  "Social integration and extracurricular participation",
                ].map((text, index) => (
                  <li key={index} className="flex items-start">
                    <div className="bg-green-100 rounded-full p-1 mt-1 mr-3">
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                    </div>
                    <span>{text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </AnimationWrapper>

          <AnimationWrapper direction="right" delay={0.6}>
            <div className="bg-white rounded-lg shadow-xl p-6 border-l-4 border-green-500">
              <h3 className="text-2xl font-semibold text-green-800 mb-4">Key Features</h3>
              <div className="space-y-4">
                {[
                  { title: "Early Identification", description: "Detect at-risk students in their first semester" },
                  { title: "Personalized Interventions", description: "Tailored support strategies based on risk factors" },
                  { title: "Real-time Monitoring", description: "Continuous assessment of student engagement" },
                  { title: "Resource Optimization", description: "Focus support resources where they're needed most" },
                ].map((feature, index) => (
                  <AnimationWrapper direction="up" delay={0.4 + index * 0.2} key={index}>
                    <div className="flex items-start">
                      <div className="bg-green-100 rounded-full p-2 mr-4">
                        <div className="text-green-600">0{index + 1}</div>
                      </div>
                      <div>
                        <h4 className="font-medium text-green-800">{feature.title}</h4>
                        <p className="text-green-700">{feature.description}</p>
                      </div>
                    </div>
                  </AnimationWrapper>
                ))}
              </div>
            </div>
          </AnimationWrapper>
        </div>
      </section>
    </div>
  );
};

export default Home;