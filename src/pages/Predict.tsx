import React, { useState, useEffect } from "react";
import { ChevronDown, Brain, TrendingUp, Users, BookOpen, GraduationCap, Calculator, CheckCircle, AlertCircle, Clock } from "lucide-react";

interface StudentData {
  marital_status: string;
  nationality: string;
  gender: string;
  daytime_evening_attendance: string;
  tuition_fees_up_to_date: string;
  scholarship_holder: string;
  previous_qualification_grouped: string;
  mother_qualification_grouped: string;
  father_qualification_grouped: string;
  mother_occupation_grouped: string;
  father_occupation_grouped: string;
  application_mode_grouped: string;
  course_grouped: string;
  application_order: string;
  previous_qualification_grade: string;
  admission_grade: string;
  age_at_enrollment: string;
  curricular_units_1st_sem_enrolled: string;
  curricular_units_1st_sem_approved: string;
  curricular_units_1st_sem_grade: string;
  curricular_units_1st_sem_evaluations: string;
  curricular_units_2nd_sem_enrolled: string;
  curricular_units_2nd_sem_evaluations: string;
  curricular_units_2nd_sem_approved: string;
  curricular_units_2nd_sem_grade: string;
  gdp: string;
  debtor: string;
  displaced: string;
}

interface PredictProps {
  prefilledData: StudentData | null;
}

interface PredictionResult {
  message: string;
  probabilities: {
    Dropout: number;
    Enrolled: number;
    Graduate: number;
  };
}

const AnimationWrapper = ({
  children,
  direction = "up",
  delay = 0,
}: {
  children: React.ReactNode;
  direction?: "up" | "down" | "left" | "right";
  delay?: number;
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay * 1000);

    return () => clearTimeout(timer);
  }, [delay]);

  const getTransformClass = () => {
    if (!isVisible) {
      switch (direction) {
        case "up":
          return "translate-y-12 opacity-0";
        case "down":
          return "-translate-y-12 opacity-0";
        case "left":
          return "translate-x-12 opacity-0";
        case "right":
          return "-translate-x-12 opacity-0";
        default:
          return "translate-y-12 opacity-0";
      }
    }
    return "translate-y-0 translate-x-0 opacity-100";
  };

  return (
    <div className={`transform transition-all duration-700 ease-out ${getTransformClass()}`}>
      {children}
    </div>
  );
};

const Card = ({
  title,
  description,
  icon: Icon,
}: {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string; size?: string | number }>;
}) => (
  <div
    className="bg-white rounded-lg shadow-lg p-6 transform transition-all duration-300 
      hover:scale-105 hover:shadow-2xl hover:bg-gradient-to-br hover:from-green-50 hover:to-green-100
      relative overflow-hidden group"
  >
    <div className="absolute inset-0 bg-green-400 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
    <h3 className="text-xl font-semibold text-green-800 flex items-center mb-4 relative z-10">
      <Icon className="mr-2 text-green-600 transform transition-transform duration-300 group-hover:scale-110" size={24} />
      {title}
    </h3>
    <p className="text-green-700 relative z-10">{description}</p>
  </div>
);

const Predict: React.FC<PredictProps> = ({ prefilledData }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [slideDirection, setSlideDirection] = useState<"left" | "right" | null>(null);
  const [predictionResult, setPredictionResult] = useState<PredictionResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<StudentData>({
    marital_status: "single",
    nationality: "Portuguese",
    gender: "0",
    daytime_evening_attendance: "0",
    tuition_fees_up_to_date: "1",
    scholarship_holder: "0",
    previous_qualification_grouped: "Secondary Education",
    mother_qualification_grouped: "Secondary Education",
    father_qualification_grouped: "Secondary Education",
    mother_occupation_grouped: "Skilled",
    father_occupation_grouped: "Skilled",
    application_mode_grouped: "General Contingent",
    course_grouped: "Health",
    application_order: "1",
    previous_qualification_grade: "",
    admission_grade: "",
    age_at_enrollment: "",
    curricular_units_1st_sem_enrolled: "6",
    curricular_units_1st_sem_approved: "0",
    curricular_units_1st_sem_grade: "",
    curricular_units_1st_sem_evaluations: "0",
    curricular_units_2nd_sem_enrolled: "6",
    curricular_units_2nd_sem_evaluations: "0",
    curricular_units_2nd_sem_approved: "0",
    curricular_units_2nd_sem_grade: "",
    gdp: "",
    debtor: "0",
    displaced: "0",
  });

  // Update formData when prefilledData changes
  useEffect(() => {
    if (prefilledData) {
      setFormData(prefilledData);
      const formSection = document.getElementById("form-section");
      if (formSection) {
        formSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [prefilledData]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to results section when predictionResult changes
  useEffect(() => {
    if (predictionResult) {
      const resultSection = document.getElementById("result-section");
      if (resultSection) {
        resultSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [predictionResult]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLearnMoreClick = () => {
    const formSection = document.getElementById("form-section");
    if (formSection) {
      formSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSubmit = async () => {
    console.log("Data being sent to backend:", JSON.stringify(formData, null, 2));
    setIsSubmitting(true);
    setError(null);
    setPredictionResult(null);

    try {
      const response = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if (response.ok) {
        setPredictionResult(result);
      } else {
        throw new Error(result.detail || "Prediction failed");
      }
    } catch (error: any) {
      console.error("Error:", error);
      setError(error.message || "An error occurred during prediction.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNext = () => {
    setSlideDirection("left");
    setCurrentStep((prev) => Math.min(formSteps.length - 1, prev + 1));
  };

  const handlePrevious = () => {
    setSlideDirection("right");
    setCurrentStep((prev) => Math.max(0, prev - 1));
  };

  const formSteps = [
    {
      title: "Personal Information",
      icon: Users,
      description: "Basic demographic information",
      fields: [
        {
          label: "Marital Status",
          name: "marital_status",
          type: "select",
          options: [
            { value: "single", label: "Single" },
            { value: "married_union", label: "Married/Union" },
          ],
        },
        {
          label: "Nationality",
          name: "nationality",
          type: "select",
          options: [
            { value: "Portuguese", label: "Portuguese" },
            { value: "Other", label: "Other" },
          ],
        },
        {
          label: "Gender",
          name: "gender",
          type: "select",
          options: [
            { value: "0", label: "Female" },
            { value: "1", label: "Male" },
          ],
        },
        { label: "Age at Enrollment", name: "age_at_enrollment", type: "text" },
      ],
    },
    {
      title: "Academic Background",
      icon: BookOpen,
      description: "Educational history and qualifications",
      fields: [
        {
          label: "Course Category",
          name: "course_grouped",
          type: "select",
          options: [
            { value: "Health", label: "Health" },
            { value: "Social", label: "Social" },
            { value: "Management", label: "Management" },
            { value: "Technical", label: "Technical" },
          ],
        },
        {
          label: "Application Mode",
          name: "application_mode_grouped",
          type: "select",
          options: [
            { value: "General Contingent", label: "General Contingent" },
            { value: "Over 23", label: "Over 23" },
            { value: "Other", label: "Other" },
          ],
        },
        {
          label: "Previous Qualification",
          name: "previous_qualification_grouped",
          type: "select",
          options: [
            { value: "Basic Education", label: "Basic Education" },
            { value: "Secondary Education", label: "Secondary Education" },
            { value: "Higher Education", label: "Higher Education" },
          ],
        },
        { label: "Application Order", name: "application_order", type: "text" },
        { label: "Previous Qualification Grade", name: "previous_qualification_grade", type: "text" },
        { label: "Admission Grade", name: "admission_grade", type: "text" },
      ],
    },
    {
      title: "Family Background",
      icon: Users,
      description: "Parent education and occupation",
      fields: [
        {
          label: "Mother's Qualification",
          name: "mother_qualification_grouped",
          type: "select",
          options: [
            { value: "Basic Education", label: "Basic Education" },
            { value: "Secondary Education", label: "Secondary Education" },
            { value: "Higher Education", label: "Higher Education" },
          ],
        },
        {
          label: "Father's Qualification",
          name: "father_qualification_grouped",
          type: "select",
          options: [
            { value: "Basic Education", label: "Basic Education" },
            { value: "Secondary Education", label: "Secondary Education" },
            { value: "Higher Education", label: "Higher Education" },
          ],
        },
        {
          label: "Mother's Occupation",
          name: "mother_occupation_grouped",
          type: "select",
          options: [
            { value: "Skilled", label: "Skilled" },
            { value: "Unskilled", label: "Unskilled" },
            { value: "Armed Forces", label: "Armed Forces" },
            { value: "Student", label: "Student" },
            { value: "Farmers", label: "Farmers" },
          ],
        },
        {
          label: "Father's Occupation",
          name: "father_occupation_grouped",
          type: "select",
          options: [
            { value: "Skilled", label: "Skilled" },
            { value: "Unskilled", label: "Unskilled" },
            { value: "Armed Forces", label: "Armed Forces" },
            { value: "Student", label: "Student" },
            { value: "Farmers", label: "Farmers" },
          ],
        },
      ],
    },
    {
      title: "Academic Performance",
      icon: TrendingUp,
      description: "Semester performance metrics",
      fields: [
        { label: "1st Sem Units Enrolled", name: "curricular_units_1st_sem_enrolled", type: "text" },
        { label: "1st Sem Units Approved", name: "curricular_units_1st_sem_approved", type: "text" },
        { label: "1st Sem Grade", name: "curricular_units_1st_sem_grade", type: "text" },
        { label: "1st Sem Evaluations", name: "curricular_units_1st_sem_evaluations", type: "text" },
        { label: "2nd Sem Units Enrolled", name: "curricular_units_2nd_sem_enrolled", type: "text" },
        { label: "2nd Sem Evaluations", name: "curricular_units_2nd_sem_evaluations", type: "text" },
        { label: "2nd Sem Units Approved", name: "curricular_units_2nd_sem_approved", type: "text" },
        { label: "2nd Sem Grade", name: "curricular_units_2nd_sem_grade", type: "text" },
      ],
    },
    {
      title: "Additional Information",
      icon: Calculator,
      description: "Financial and socioeconomic factors",
      fields: [
        {
          label: "Daytime/Evening Attendance",
          name: "daytime_evening_attendance",
          type: "select",
          options: [
            { value: "0", label: "Evening" },
            { value: "1", label: "Daytime" },
          ],
        },
        {
          label: "Tuition Fees Up to Date",
          name: "tuition_fees_up_to_date",
          type: "select",
          options: [
            { value: "0", label: "No" },
            { value: "1", label: "Yes" },
          ],
        },
        {
          label: "Scholarship Holder",
          name: "scholarship_holder",
          type: "select",
          options: [
            { value: "0", label: "No" },
            { value: "1", label: "Yes" },
          ],
        },
        {
          label: "Debtor",
          name: "debtor",
          type: "select",
          options: [
            { value: "0", label: "No" },
            { value: "1", label: "Yes" },
          ],
        },
        {
          label: "Displaced",
          name: "displaced",
          type: "select",
          options: [
            { value: "0", label: "No" },
            { value: "1", label: "Yes" },
          ],
        },
        { label: "GDP", name: "gdp", type: "text" },
      ],
    },
  ];

  const getResultIcon = (label: string) => {
    switch (label) {
      case "Dropout":
        return <AlertCircle className="text-red-500" size={24} />;
      case "Enrolled":
        return <Clock className="text-yellow-500" size={24} />;
      case "Graduate":
        return <CheckCircle className="text-green-500" size={24} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Hero Section */}
      <div className="relative h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-gradient-to-br from-green-200 via-green-100 to-green-300 
            opacity-20 animate-gradient-bg"
        ></div>
        <div className="absolute inset-0 bg-green-200 opacity-10 transform translate-y-20 parallax-bg"></div>
        <div className="z-10 text-center px-4 max-w-4xl">
          <AnimationWrapper direction="up">
            <h1 className="text-5xl md:text-6xl font-bold text-green-800 mb-6 drop-shadow-lg animate-pulse-slow">
              Student Prediction
            </h1>
          </AnimationWrapper>
          <AnimationWrapper direction="up" delay={0.2}>
            <p className="text-xl md:text-2xl text-green-700 mb-8 drop-shadow-md">
              Predict academic outcomes using advanced machine learning models trained on comprehensive student data.
            </p>
          </AnimationWrapper>
          <AnimationWrapper direction="up" delay={0.4}>
            <button
              onClick={handleLearnMoreClick}
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 
                rounded-lg text-lg transition-all duration-300 transform hover:scale-105 
                hover:shadow-xl flex items-center mx-auto relative overflow-hidden group"
              aria-label="Start prediction"
            >
              <span className="relative z-10">Start Prediction</span>
              <ChevronDown className="ml-2 relative z-10" size={20} />
              <div
                className="absolute inset-0 bg-green-500 opacity-0 group-hover:opacity-30 
                  transition-opacity duration-300"
              ></div>
            </button>
          </AnimationWrapper>
        </div>
        <div className="absolute bottom-8 left-0 right-0 flex justify-center animate-bounce">
          <ChevronDown className="text-green-600 drop-shadow-md" size={36} aria-hidden="true" />
        </div>
      </div>

      {/* About Section */}
      <section className="py-16 px-4 md:px-8 max-w-6xl mx-auto">
        <AnimationWrapper direction="left">
          <h2
            className="text-3xl md:text-4xl font-bold text-green-800 text-center mb-4 
              relative after:content-[''] after:w-20 after:h-1 after:bg-green-600 
              after:absolute after:bottom-[-8px] after:left-1/2 after:-translate-x-1/2"
          >
            How It Works
          </h2>
          <p className="text-lg text-green-700 text-center mb-12 max-w-3xl mx-auto">
            Our prediction model analyzes multiple factors to determine the likelihood of student success, including academic performance, family background, and socioeconomic indicators.
          </p>
        </AnimationWrapper>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimationWrapper direction="up" delay={0.1}>
            <Card
              title="Academic Analysis"
              description="Analyzes grades, course difficulty, and academic progression patterns."
              icon={GraduationCap}
            />
          </AnimationWrapper>
          <AnimationWrapper direction="up" delay={0.2}>
            <Card
              title="Background Factors"
              description="Considers family education, socioeconomic status, and support systems."
              icon={Users}
            />
          </AnimationWrapper>
          <AnimationWrapper direction="up" delay={0.3}>
            <Card
              title="Predictive Modeling"
              description="Uses machine learning to predict dropout risk and success probability."
              icon={Brain}
            />
          </AnimationWrapper>
        </div>
      </section>

      {/* Form Section */}
      <section id="form-section" className="py-16 bg-green-50 relative">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <AnimationWrapper direction="up">
            <h2
              className="text-3xl md:text-4xl font-bold text-green-800 text-center mb-4 
                relative after:content-[''] after:w-20 after:h-1 after:bg-green-600 
                after:absolute after:bottom-[-8px] after:left-1/2 after:-translate-x-1/2"
            >
              Enter Student Information
            </h2>
            <p className="text-lg text-green-700 text-center mb-12 max-w-3xl mx-auto">
              Provide the following information to generate an accurate prediction of academic success.
            </p>
          </AnimationWrapper>

          <div className="flex justify-center mb-8">
            <div className="flex space-x-2">
              {formSteps.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setSlideDirection(index > currentStep ? "left" : "right");
                    setCurrentStep(index);
                  }}
                  className={`w-3 h-3 rounded-full transition-all duration-300 transform hover:scale-125 
                    ${index === currentStep ? "bg-green-600 w-8" : "bg-green-300 hover:bg-green-400"}`}
                  aria-label={`Go to step ${index + 1}`}
                />
              ))}
            </div>
          </div>

          <div
            key={currentStep}
            className={`bg-white rounded-lg shadow-lg p-8 relative overflow-hidden will-change-transform
              ${slideDirection === "left" ? "animate-slide-left" : slideDirection === "right" ? "animate-slide-right" : "animate-fade-in"}`}
          >
            <div className="flex items-center mb-6">
              {(() => {
                const Icon = formSteps[currentStep].icon;
                return <Icon className="text-green-600 mr-3 transform transition-transform duration-300 hover:scale-110" size={32} aria-hidden="true" />;
              })()}
              <div>
                <h3 className="text-2xl font-bold text-green-800">{formSteps[currentStep].title}</h3>
                <p className="text-green-600">{formSteps[currentStep].description}</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {formSteps[currentStep].fields.map((field, index) => (
                <div key={field.name} className="mb-4 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <label className="block text-sm font-medium text-green-700 mb-2">{field.label}</label>
                  {field.type === "select" ? (
                    <select
                      name={field.name}
                      value={formData[field.name as keyof StudentData] || ""}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-green-200 rounded-lg bg-green-50 
                        focus:ring-2 focus:ring-green-400 focus:border-transparent 
                        transition-all duration-200 text-gray-700 focus:scale-[1.02] 
                        hover:border-green-300"
                      aria-label={field.label}
                    >
                      {field.options?.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type="text"
                      name={field.name}
                      value={formData[field.name as keyof StudentData] || ""}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-green-200 rounded-lg bg-green-50 
                        focus:ring-2 focus:ring-green-400 focus:border-transparent 
                        transition-all duration-200 text-gray-700 focus:scale-[1.02] 
                        hover:border-green-300"
                      aria-label={field.label}
                    />
                  )}
                </div>
              ))}
            </div>

            <div className="flex justify-between mt-8">
              <button
                onClick={handlePrevious}
                disabled={currentStep === 0}
                className="px-6 py-2 border border-green-300 text-green-700 rounded-lg 
                  hover:bg-green-50 disabled:opacity-50 disabled:cursor-not-allowed 
                  transition-all duration-300 transform hover:scale-105 relative overflow-hidden group"
                aria-label="Previous step"
              >
                <span className="relative z-10">Previous</span>
                <div
                  className="absolute inset-0 bg-green-200 opacity-0 group-hover:opacity-20 
                    transition-opacity duration-300"
                ></div>
              </button>

              {currentStep < formSteps.length - 1 ? (
                <button
                  onClick={handleNext}
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 
                    transition-all duration-300 transform hover:scale-105 relative overflow-hidden group"
                  aria-label="Next step"
                >
                  <span className="relative z-10">Next</span>
                  <div
                    className="absolute inset-0 bg-green-500 opacity-0 group-hover:opacity-30 
                      transition-opacity duration-300"
                  ></div>
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="px-8 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white 
                    font-semibold rounded-lg hover:from-green-700 hover:to-green-800 
                    focus:ring-4 focus:ring-green-300 transition-all duration-300 
                    transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed 
                    disabled:transform-none shadow-lg relative overflow-hidden group"
                  aria-label="Generate prediction"
                >
                  <div
                    className="absolute inset-0 bg-green-500 opacity-0 group-hover:opacity-20 
                      transition-opacity duration-300"
                  ></div>
                  {isSubmitting ? (
                    <div className="flex items-center relative z-10">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Processing...
                    </div>
                  ) : (
                    <div className="flex items-center relative z-10">
                      <Calculator
                        className="w-5 h-5 mr-2 transform transition-transform duration-300 group-hover:scale-110"
                        aria-hidden="true"
                      />
                      Generate Prediction
                    </div>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Result Section */}
      {(predictionResult || error) && (
        <section id="result-section" className="py-16 bg-green-50">
          <div className="max-w-4xl mx-auto px-4 md:px-8">
            <AnimationWrapper direction="up">
              <h2
                className="text-3xl md:text-4xl font-bold text-green-800 text-center mb-4 
                  relative after:content-[''] after:w-20 after:h-1 after:bg-green-600 
                  after:absolute after:bottom-[-8px] after:left-1/2 after:-translate-x-1/2"
              >
                Prediction Result
              </h2>
              <p className="text-lg text-green-700 text-center mb-12 max-w-3xl mx-auto">
                {error ? "An error occurred while generating the prediction." : "Here is the predicted academic outcome based on the provided information."}
              </p>
            </AnimationWrapper>

            {error ? (
              <AnimationWrapper direction="up" delay={0.2}>
                <div className="bg-red-50 rounded-lg shadow-lg p-6 text-center">
                  <AlertCircle className="text-red-500 mx-auto mb-4" size={48} />
                  <p className="text-red-700 text-lg font-semibold">{error}</p>
                </div>
              </AnimationWrapper>
            ) : predictionResult ? (
              <AnimationWrapper direction="up" delay={0.2}>
                <div className="bg-white rounded-lg shadow-lg p-8 relative overflow-hidden">
                  <div className="absolute inset-0 bg-green-400 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                  <div className="flex items-center mb-6">
                    <GraduationCap className="text-green-600 mr-3" size={32} />
                    <h3 className="text-2xl font-bold text-green-800">{predictionResult.message}</h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-green-100">
                          <th className="py-3 px-4 text-green-800 font-semibold border-b border-green-200">Outcome</th>
                          <th className="py-3 px-4 text-green-800 font-semibold border-b border-green-200">Probability</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Object.entries(predictionResult.probabilities).map(([label, probability], index) => (
                          <tr
                            key={label}
                            className="hover:bg-green-50 transition-all duration-200"
                            style={{ animationDelay: `${(index + 1) * 0.1}s` }}
                          >
                            <td className="py-3 px-4 border-b border-green-100 flex items-center">
                              {getResultIcon(label)}
                              <span className="ml-2 text-green-700 font-medium">{label}</span>
                            </td>
                            <td className="py-3 px-4 border-b border-green-100">
                              <div className="relative pt-1">
                                <div className="flex mb-2 items-center justify-between">
                                  <div className="text-green-700">{(probability * 100).toFixed(2)}%</div>
                                </div>
                                <div className="flex h-2 bg-green-100 rounded">
                                  <div
                                    style={{ width: `${(probability * 100).toFixed(2)}%` }}
                                    className={`bg-green-600 rounded transition-all duration-500 ${
                                      label === "Dropout"
                                        ? "bg-red-500"
                                        : label === "Enrolled"
                                        ? "bg-yellow-500"
                                        : "bg-green-500"
                                    }`}
                                  ></div>
                                </div>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </AnimationWrapper>
            ) : null}
          </div>
        </section>
      )}

      <style>{`
        @keyframes slide-left {
          0% { transform: translateX(100%); opacity: 0; }
          100% { transform: translateX(0); opacity: 1; }
        }

        @keyframes slide-right {
          0% { transform: translateX(-100%); opacity: 0; }
          100% { transform: translateX(0); opacity: 1; }
        }

        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-slide-left {
          animation: slide-left 0.5s ease-out forwards;
          will-change: transform, opacity;
        }

        .animate-slide-right {
          animation: slide-right 0.5s ease-out forwards;
          will-change: transform, opacity;
        }

        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
          will-change: transform, opacity;
        }

        @keyframes gradient-bg {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes pulse-slow {
          0% { transform: scale(1); }
          50% { transform: scale(1.02); }
          100% { transform: scale(1); }
        }

        .animate-gradient-bg {
          background-size: 200% 200%;
          animation: gradient-bg 15s ease infinite;
        }

        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }

        .parallax-bg {
          transition: transform 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Predict;