import { useState, useEffect } from "react";
import { ChevronDown, BarChart, Database, BookOpen } from "lucide-react";
import AnimationWrapper from "../components/AnimationWrapper";
import ProcessingStepCard from "../components/ProcessingStepCard";
import ProcessingStepModal from "../components/ProcessingStepModal";
import Card from "../components/Card";
import { datasetStats, processingSteps, edaVisualizations } from "../components/dataset";

const Data: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStep, setSelectedStep] = useState<typeof processingSteps[0] | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLearnMoreClick = () => {
    const overviewSection = document.getElementById("overview-section");
    if (overviewSection) {
      overviewSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleOpenModal = (step: typeof processingSteps[0]) => {
    setSelectedStep(step);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedStep(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Hero Section */}
      <div className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-green-200 opacity-10 z-0"></div>
        <div className="z-10 text-center px-4 max-w-4xl">
          <AnimationWrapper direction="up">
            <h1 className="text-5xl md:text-6xl font-bold text-green-800 mb-6">
              Academic Success Dataset
            </h1>
          </AnimationWrapper>
          <AnimationWrapper direction="up" delay={0.2}>
            <p className="text-xl md:text-2xl text-green-700 mb-8">
              A cleaned dataset for predicting student dropout and academic success, sourced from Kaggle's Playground Series S4E6.
            </p>
          </AnimationWrapper>
          <AnimationWrapper direction="up" delay={0.1}>
            <button
              onClick={handleLearnMoreClick}
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition-all duration-300 transform hover:scale-105 flex items-center mx-auto"
            >
              Let go!
              <ChevronDown className="ml-2" size={20} />
            </button>
          </AnimationWrapper>
        </div>
        <div className="absolute bottom-8 left-0 right-0 flex justify-center animate-bounce">
          <ChevronDown className="text-green-600" size={36} />
        </div>
      </div>

      {/* Dataset Overview Section */}
      <section id="overview-section" className="py-16 px-4 md:px-8 max-w-6xl mx-auto">
        <AnimationWrapper direction="left">
          <h2 className="text-3xl md:text-4xl font-bold text-green-800 text-center mb-4">
            About the Dataset
          </h2>
          <p className="text-lg text-green-700 text-center mb-6 max-w-3xl mx-auto">
            The Academic Success Dataset is a cleaned version of data generated from a deep learning model trained on the original "Predict Students' Dropout and Academic Success" dataset.
          </p>
          <p className="text-sm text-green-600 text-center mb-12 max-w-3xl mx-auto italic">
            Source: <a href="https://www.kaggle.com/competitions/playground-series-s4e6/data" className="underline hover:text-green-800">Kaggle Playground Series S4E6</a>
          </p>
        </AnimationWrapper>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <AnimationWrapper direction="left" delay={0.2}>
            <div className="bg-white rounded-lg shadow-lg p-6 transform transition-all duration-300 hover:scale-105">
              <h3 className="text-xl font-semibold text-green-800 flex items-center mb-4">
                <Database className="mr-2 text-green-600" size={24} />
                Dataset Origin
              </h3>
              <p className="text-green-700">
                Generated from a deep learning model, with feature distributions similar to the original dataset.
              </p>
              <p className="text-xs text-green-500 mt-2 italic">
                Source: Kaggle Competition Description
              </p>
            </div>
          </AnimationWrapper>
          <AnimationWrapper direction="right" delay={0.1}>
            <div className="bg-white rounded-lg shadow-lg p-6 transform transition-all duration-300 hover:scale-105">
              <h3 className="text-xl font-semibold text-green-800 flex items-center mb-4">
                <BookOpen className="mr-2 text-green-600" size={24} />
                Purpose
              </h3>
              <p className="text-green-700">
                Enables prediction of student outcomes and analysis of factors influencing academic success.
              </p>
              <p className="text-xs text-green-500 mt-2 italic">
                Source: Kaggle Playground Series S4E6
              </p>
            </div>
          </AnimationWrapper>
        </div>
      </section>

      {/* Dataset Statistics Section */}
      <section className="py-16 bg-green-50">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <AnimationWrapper direction="up">
            <h2 className="text-3xl md:text-4xl font-bold text-green-800 text-center mb-4">
              Dataset Highlights
            </h2>
            <p className="text-lg text-green-700 text-center mb-6 max-w-3xl mx-auto">
              Key statistics and features of the Academic Success Dataset.
            </p>
          </AnimationWrapper>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {datasetStats.map((stat, index) => (
              <AnimationWrapper direction="up" delay={index * 0.05} key={index}>
                <div className="bg-white rounded-lg shadow-lg p-6 text-center transform transition-all duration-300 hover:scale-105 min-h-[200px] flex flex-col justify-between">
                  <div>
                    <p className="text-green-600 font-bold text-4xl mb-2 break-words">{stat.value}</p>
                    <p className="text-green-800 text-lg mb-2 break-words">{stat.name}</p>
                  </div>
                </div>
              </AnimationWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* Exploratory Data Analysis Section */}
      <section className="py-16 px-4 md:px-8 max-w-6xl mx-auto">
        <AnimationWrapper direction="up">
          <h2 className="text-3xl md:text-4xl font-bold text-green-800 text-center mb-4">
            Exploratory Data Analysis
          </h2>
          <p className="text-lg text-green-700 text-center mb-12 max-w-3xl mx-auto">
            Key insights into the Academic Success Dataset, revealing factors influencing student outcomes.
          </p>
        </AnimationWrapper>

        {edaVisualizations.map((vis, index) => (
          <div className="grid md:grid-cols-2 gap-12 items-center mb-12" key={index}>
            <AnimationWrapper direction="left" delay={0.2}>
              <Card
                title={vis.title}
                description={vis.description}
                icon={vis.icon}
              />
            </AnimationWrapper>
            <AnimationWrapper direction="right" delay={0.1}>
              <div className="bg-white rounded-lg shadow-lg p-6 h-80 flex items-center justify-center">
                <img
                  src={vis.image}
                  alt={vis.title}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            </AnimationWrapper>
          </div>
        ))}
      </section>

      {/* Data Processing Steps Section */}
      <section className="py-16 px-4 md:px-8 max-w-6xl mx-auto">
        <AnimationWrapper direction="left">
          <h2 className="text-3xl md:text-4xl font-bold text-green-800 text-center mb-4">
            Data Processing Steps
          </h2>
          <p className="text-lg text-green-700 text-center mb-12 max-w-3xl mx-auto">
            Key steps in preparing the Academic Success Dataset for modeling, ensuring clean and efficient data.
          </p>
        </AnimationWrapper>

        <div className="flex overflow-x-auto space-x-6 pb-4 snap-x snap-mandatory scrollbar scrollbar-thumb-green-600 scrollbar-track-green-100">
          {processingSteps.map((step, index) => (
            <ProcessingStepCard
              key={index}
              step={step}
              index={index}
              onClick={() => handleOpenModal(step)}
            />
          ))}
        </div>

        <ProcessingStepModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          step={selectedStep}
        />
      </section>

      {/* Call to Action Section */}
      <section className="py-16 px-4 md:px-8 max-w-6xl mx-auto">
        <AnimationWrapper direction="left">
          <h2 className="text-3xl md:text-4xl font-bold text-green-800 text-center mb-4">
            Explore the Dataset
          </h2>
          <p className="text-lg text-green-700 text-center mb-12 max-w-3xl mx-auto">
            Analyze the Academic Success Dataset to build predictive models and uncover insights.
          </p>
        </AnimationWrapper>
        <AnimationWrapper direction="up" delay={0.2}>
          <div className="text-center">
            <a
              href="https://www.kaggle.com/competitions/playground-series-s4e6/data"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition-all duration-300 transform hover:scale-105 inline-flex items-center"
            >
              Access Dataset
              <BarChart className="ml-2" size={20} />
            </a>
          </div>
        </AnimationWrapper>
      </section>
    </div>
  );
};

export default Data;