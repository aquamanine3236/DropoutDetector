import { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { ChevronDown, BookOpen, Brain, TrendingUp, Users } from "lucide-react";

const dropoutData = [
  { year: "2018", rate: 24.5, source: "NCES" },
  { year: "2019", rate: 26.3, source: "NCES" },
  { year: "2020", rate: 32.1, source: "NCES" },
  { year: "2021", rate: 30.8, source: "ACE" },
  { year: "2022", rate: 28.4, source: "ACE" },
  { year: "2023", rate: 27.2, source: "JCSR" },
];

const impactData = [
  { name: "Lost Tuition Revenue", value: "$1.2B", source: "Education Data Initiative" },
  { name: "Unfilled Job Positions", value: "240K", source: "Georgetown CEW" },
  { name: "Average Debt with No Degree", value: "$13,500", source: "Federal Reserve" },
  { name: "Years of Potential Income Lost", value: "2-4", source: "BLS Analysis" },
];

import { ReactNode } from "react";

type FadeInSectionProps = {
  children: ReactNode;
  delay?: number;
};

const FadeInSection = ({ children, delay = 0 }: FadeInSectionProps) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);
    return () => clearTimeout(timer);
  }, [delay]);
  
  return (
    <div className={`transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      {children}
    </div>
  );
};

const Home = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Hero Section */}
      <div className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-green-200 opacity-10 z-0"></div>
        <div className="z-10 text-center px-4 max-w-4xl">
          <FadeInSection>
            <h1 className="text-5xl md:text-6xl font-bold text-green-800 mb-6">
              Predicting Student Success
            </h1>
          </FadeInSection>
          <FadeInSection delay={300}>
            <p className="text-xl md:text-2xl text-green-700 mb-8">
              Using machine learning to identify students at risk of dropping out
              and providing timely interventions.
            </p>
          </FadeInSection>
          <FadeInSection delay={600}>
            <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition-all duration-300 transform hover:scale-105 flex items-center mx-auto">
              Learn More
              <ChevronDown className="ml-2" size={20} />
            </button>
          </FadeInSection>
        </div>
        <div className="absolute bottom-8 left-0 right-0 flex justify-center animate-bounce">
          <ChevronDown className="text-green-600" size={36} />
        </div>
      </div>

      {/* Statistics Section */}
      <section className="py-16 px-4 md:px-8 max-w-6xl mx-auto">
        <FadeInSection>
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
        </FadeInSection>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <FadeInSection delay={300}>
            <div className="shadow-lg rounded-lg bg-white p-6 h-80">
              <h3 className="text-xl font-semibold text-green-800 mb-4">Dropout Rates by Year</h3>
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
            </div>
          </FadeInSection>

          <FadeInSection delay={600}>
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-lg p-6 transform transition-all duration-300 hover:scale-105">
                <h3 className="text-green-800 font-semibold text-xl flex items-center">
                  <Users className="mr-2 text-green-600" />
                  1 in 3 Students
                </h3>
                <p className="text-green-700">
                  Do not complete their degree within 6 years of enrollment
                </p>
                <p className="text-xs text-green-500 mt-2 italic">Source: National Student Clearinghouse Research Center, 2023</p>
              </div>
              
              <div className="bg-white rounded-lg shadow-lg p-6 transform transition-all duration-300 hover:scale-105">
                <h3 className="text-green-800 font-semibold text-xl flex items-center">
                  <TrendingUp className="mr-2 text-green-600" />
                  40% Higher
                </h3>
                <p className="text-green-700">
                  Risk of dropout for first-generation college students
                </p>
                <p className="text-xs text-green-500 mt-2 italic">Source: Pell Institute for the Study of Opportunity in Higher Education</p>
              </div>
              
              <div className="bg-white rounded-lg shadow-lg p-6 transform transition-all duration-300 hover:scale-105">
                <h3 className="text-green-800 font-semibold text-xl flex items-center">
                  <BookOpen className="mr-2 text-green-600" />
                  63% of Dropouts
                </h3>
                <p className="text-green-700">
                  Cite financial challenges as a primary factor
                </p>
                <p className="text-xs text-green-500 mt-2 italic">Source: Tyton Partners' "Driving Toward a Degree" Research, 2022</p>
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-16 bg-green-50">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <FadeInSection>
            <h2 className="text-3xl md:text-4xl font-bold text-green-800 text-center mb-4">
              The Impact of Dropping Out
            </h2>
            <p className="text-lg text-green-700 text-center mb-6 max-w-3xl mx-auto">
              Dropping out affects not only students but also institutions and society as a whole.
            </p>
            <p className="text-sm text-green-600 text-center mb-12 max-w-3xl mx-auto italic">
              Sources: Education Data Initiative, Federal Reserve Bank Research, Georgetown University Center on Education and the Workforce
            </p>
          </FadeInSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {impactData.map((item, index) => (
              <FadeInSection delay={index * 200} key={index}>
                <div className="bg-white rounded-lg shadow-lg p-6 text-center transform transition-all duration-300 hover:scale-105">
                  <p className="text-green-600 font-bold text-3xl mb-2">{item.value}</p>
                  <p className="text-green-800 mb-2">{item.name}</p>
                  <p className="text-xs text-green-500 italic">Source: {item.source}</p>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* Our Project Section */}
      <section className="py-16 px-4 md:px-8 max-w-6xl mx-auto">
        <FadeInSection>
          <h2 className="text-3xl md:text-4xl font-bold text-green-800 text-center mb-4">
            Our Predictive Solution
          </h2>
          <p className="text-lg text-green-700 text-center mb-12 max-w-3xl mx-auto">
            Using machine learning to identify students at risk and provide timely interventions.
          </p>
        </FadeInSection>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <FadeInSection delay={300}>
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
                <li className="flex items-start">
                  <div className="bg-green-100 rounded-full p-1 mt-1 mr-3">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  </div>
                  <span>Academic performance and attendance patterns</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-green-100 rounded-full p-1 mt-1 mr-3">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  </div>
                  <span>Engagement with learning management systems</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-green-100 rounded-full p-1 mt-1 mr-3">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  </div>
                  <span>Financial circumstances and support availability</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-green-100 rounded-full p-1 mt-1 mr-3">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  </div>
                  <span>Social integration and extracurricular participation</span>
                </li>
              </ul>
            </div>
          </FadeInSection>

          <FadeInSection delay={600}>
            <div className="bg-white rounded-lg shadow-xl p-6 border-l-4 border-green-500">
              <h3 className="text-2xl font-semibold text-green-800 mb-4">Key Features</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-green-100 rounded-full p-2 mr-4">
                    <div className="text-green-600">01</div>
                  </div>
                  <div>
                    <h4 className="font-medium text-green-800">Early Identification</h4>
                    <p className="text-green-700">Detect at-risk students in their first semester</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-green-100 rounded-full p-2 mr-4">
                    <div className="text-green-600">02</div>
                  </div>
                  <div>
                    <h4 className="font-medium text-green-800">Personalized Interventions</h4>
                    <p className="text-green-700">Tailored support strategies based on risk factors</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-green-100 rounded-full p-2 mr-4">
                    <div className="text-green-600">03</div>
                  </div>
                  <div>
                    <h4 className="font-medium text-green-800">Real-time Monitoring</h4>
                    <p className="text-green-700">Continuous assessment of student engagement</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-green-100 rounded-full p-2 mr-4">
                    <div className="text-green-600">04</div>
                  </div>
                  <div>
                    <h4 className="font-medium text-green-800">Resource Optimization</h4>
                    <p className="text-green-700">Focus support resources where they're needed most</p>
                  </div>
                </div>
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-green-100">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <FadeInSection>
            <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-6">
              Join Our Mission to Improve Student Retention
            </h2>
            <p className="text-lg text-green-700 mb-8">
              Learn more about our research and how our predictive model can help your institution
              support students and improve graduation rates.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition-all duration-300 transform hover:scale-105">
                Learn More
              </button>
              <button className="bg-white hover:bg-green-50 text-green-600 border-2 border-green-600 font-bold py-3 px-8 rounded-lg text-lg transition-all duration-300 transform hover:scale-105">
                Contact Us
              </button>
            </div>
          </FadeInSection>
        </div>
      </section>
    </div>
  );
};

export default Home;