import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown, Brain, TrendingUp, Users, BookOpen, GraduationCap, Calculator, User, Award, AlertTriangle, CheckCircle } from "lucide-react";

const AnimationWrapper = ({ 
  children, 
  direction = "up", 
  delay = 0 
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
        case "up": return "translate-y-12 opacity-0";
        case "down": return "-translate-y-12 opacity-0";
        case "left": return "translate-x-12 opacity-0";
        case "right": return "-translate-x-12 opacity-0";
        default: return "translate-y-12 opacity-0";
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

// Sample student data
const sampleStudents = [
  {
    id: 1,
    name: "Nguyễn Văn Cường",
    outcome: "Graduate",
    outcomeColor: "green",
    icon: CheckCircle,
    description: "High-performing student with strong family support and excellent academic background",
    data: {
      marital_status: 'single',
      nationality: 'Portuguese',
      gender: '0',
      daytime_evening_attendance: '1',
      tuition_fees_up_to_date: '1',
      scholarship_holder: '1',
      previous_qualification_grouped: '1',
      mother_qualification_grouped: '3',
      father_qualification_grouped: '2',
      mother_occupation_grouped: 'Skilled',
      father_occupation_grouped: 'Skilled',
      application_mode_grouped: 'General Contingent',
      course_grouped: 'Health',
      application_order: '1',
      previous_qualification_grade: '130.5',
      admission_grade: '132',
      age_at_enrollment: '18',
      curricular_units_1st_sem_enrolled: '10',
      curricular_units_1st_sem_approved: '10',
      curricular_units_1st_sem_grade: '13.2',
      curricular_units_1st_sem_evaluations: '10',
      curricular_units_2nd_sem_enrolled: '11',
      curricular_units_2nd_sem_evaluations: '11',
      curricular_units_2nd_sem_approved: '11',
      curricular_units_2nd_sem_grade: '12.4',
      gdp: '2.02',
      debtor: '0',
      displaced: '0',
    },
    highlights: [
      "High admission grade (132)",
      "All units approved in both semesters",
      "Parents with higher education",
      "Scholarship recipient"
    ]
  },
  {
    id: 2,
    name: "Nguyễn Văn An",
    outcome: "Enrolled",
    outcomeColor: "blue",
    icon: BookOpen,
    description: "Average performing student still progressing through their studies",
    data: {
      marital_status: 'single',
      nationality: 'Portuguese',
      gender: '1',
      daytime_evening_attendance: '1',
      tuition_fees_up_to_date: '1',
      scholarship_holder: '0',
      previous_qualification_grouped: '1',
      mother_qualification_grouped: '2',
      father_qualification_grouped: '1',
      mother_occupation_grouped: 'Skilled',
      father_occupation_grouped: 'Unskilled',
      application_mode_grouped: 'General Contingent',
      course_grouped: 'Management',
      application_order: '1',
      previous_qualification_grade: '101',
      admission_grade: '109',
      age_at_enrollment: '19',
      curricular_units_1st_sem_enrolled: '8',
      curricular_units_1st_sem_approved: '6',
      curricular_units_1st_sem_grade: '11.5',
      curricular_units_1st_sem_evaluations: '6',
      curricular_units_2nd_sem_enrolled: '8',
      curricular_units_2nd_sem_evaluations: '5',
      curricular_units_2nd_sem_approved: '4',
      curricular_units_2nd_sem_grade: '10.8',
      gdp: '1.65',
      debtor: '1  ',
      displaced: '0',
    },
    highlights: [
      "Moderate admission grade (109)",
      "Some units failed in both semesters",
      "Mixed family education background",
      "Currently enrolled and progressing"
    ]
  },
  {
    id: 3,
    name: "Nguyễn Văn Bình",
    outcome: "Dropout",
    outcomeColor: "red",
    icon: AlertTriangle,
    description: "Student who faced challenges and discontinued their studies",
    data: {
      marital_status: 'married_union',
      nationality: 'Portuguese',
      gender: '0',
      daytime_evening_attendance: '0',
      tuition_fees_up_to_date: '0',
      scholarship_holder: '0',
      previous_qualification_grouped: '0',
      mother_qualification_grouped: '0',
      father_qualification_grouped: '1',
      mother_occupation_grouped: 'Unskilled',
      father_occupation_grouped: 'Unskilled',
      application_mode_grouped: 'Over 23',
      course_grouped: 'Technical',
      application_order: '2',
      previous_qualification_grade: '95',
      admission_grade: '95',
      age_at_enrollment: '25',
      curricular_units_1st_sem_enrolled: '6',
      curricular_units_1st_sem_approved: '2',
      curricular_units_1st_sem_grade: '8.3',
      curricular_units_1st_sem_evaluations: '4',
      curricular_units_2nd_sem_enrolled: '4',
      curricular_units_2nd_sem_evaluations: '2',
      curricular_units_2nd_sem_approved: '1',
      curricular_units_2nd_sem_grade: '7.1',
      gdp: '1.52',
      debtor: '1',
      displaced: '1',
    },
    highlights: [
      "Low admission grade (95)",
      "Multiple failed units",
      "Evening attendance (working student)",
      "Financial difficulties (debtor)"
    ]
  }
];

const StudentCard = ({ 
  student, 
  onUseSample 
}: { 
  student: typeof sampleStudents[0]; 
  onUseSample: (data: any) => void;
}) => {
  const Icon = student.icon;
  const colorClasses = {
    green: {
      bg: "bg-gradient-to-br from-green-50 to-green-100",
      border: "border-green-200",
      text: "text-green-800",
      icon: "text-green-600",
      button: "bg-green-600 hover:bg-green-700",
      badge: "bg-green-100 text-green-800"
    },
    blue: {
      bg: "bg-gradient-to-br from-blue-50 to-blue-100",
      border: "border-blue-200",
      text: "text-blue-800",
      icon: "text-blue-600",
      button: "bg-blue-600 hover:bg-blue-700",
      badge: "bg-blue-100 text-blue-800"
    },
    red: {
      bg: "bg-gradient-to-br from-red-50 to-red-100",
      border: "border-red-200",
      text: "text-red-800",
      icon: "text-red-600",
      button: "bg-red-600 hover:bg-red-700",
      badge: "bg-red-100 text-red-800"
    }
  };

  const colors = colorClasses[student.outcomeColor as keyof typeof colorClasses];

  return (
    <div className={`${colors.bg} ${colors.border} border-2 rounded-xl shadow-lg p-6 
      transform transition-all duration-300 hover:scale-105 hover:shadow-2xl 
      relative overflow-hidden group`}>
      
      {/* Outcome Badge */}
      <div className={`${colors.badge} px-3 py-1 rounded-full text-sm font-semibold 
        absolute top-4 right-4 flex items-center`}>
        <Icon size={16} className="mr-1" />
        {student.outcome}
      </div>

      {/* Student Avatar */}
      <div className={`w-16 h-16 ${colors.bg} rounded-full flex items-center justify-center mb-4
        border-2 ${colors.border}`}>
        <User className={`${colors.icon}`} size={32} />
      </div>

      {/* Student Info */}
      <h3 className={`text-2xl font-bold ${colors.text} mb-2`}>
        {student.name}
      </h3>
      <p className={`${colors.text} opacity-80 mb-4 text-sm`}>
        {student.description}
      </p>

      {/* Key Highlights */}
      <div className="mb-6">
        <h4 className={`font-semibold ${colors.text} mb-2 text-sm`}>Key Characteristics:</h4>
        <ul className="space-y-1">
          {student.highlights.map((highlight, index) => (
            <li key={index} className={`text-xs ${colors.text} opacity-75 flex items-start`}>
              <span className="w-1 h-1 bg-current rounded-full mt-2 mr-2 flex-shrink-0"></span>
              {highlight}
            </li>
          ))}
        </ul>
      </div>

      {/* Use Sample Button */}
      <button
        onClick={() => onUseSample(student.data)}
        className={`w-full ${colors.button} text-white font-semibold py-3 px-4 rounded-lg 
          transition-all duration-300 transform hover:scale-105 hover:shadow-lg 
          relative overflow-hidden group`}
      >
        <span className="relative z-10 flex items-center justify-center">
          <Calculator className="mr-2" size={18} />
          Use This Sample
        </span>
        <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 
          transition-opacity duration-300"></div>
      </button>
    </div>
  );
};

interface ExampleProps {
  onUseSample: (data: any) => void;
}

const Example: React.FC<ExampleProps> = ({ onUseSample }) => {
  const navigate = useNavigate();

  const handleUseSample = (studentData: any) => {
    // Gọi callback để set data trong App component
    onUseSample(studentData);
    // Chuyển sang trang predict
    navigate('/predict');
  };

  const handleGoToPredict = () => {
    navigate('/predict');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Hero Section */}
      <div className="relative h-96 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-200 via-green-100 to-green-300 
          opacity-20 z-0"></div>
        <div className="z-10 text-center px-4 max-w-4xl">
          <AnimationWrapper direction="up">
            <h1 className="text-4xl md:text-5xl font-bold text-green-800 mb-4 drop-shadow-lg">
              Sample Student Profiles
            </h1>
          </AnimationWrapper>
          <AnimationWrapper direction="up" delay={0.2}>
            <p className="text-lg md:text-xl text-green-700 drop-shadow-md">
              Explore real student examples representing different academic outcomes and use their data for prediction testing.
            </p>
          </AnimationWrapper>
        </div>
      </div>

      {/* Stats Section */}
      <section className="py-8 px-4 md:px-8 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <AnimationWrapper direction="up" delay={0.1}>
            <div className="bg-white rounded-lg shadow-lg p-6 text-center border-l-4 border-green-500">
              <CheckCircle className="text-green-600 mx-auto mb-2" size={32} />
              <h3 className="text-2xl font-bold text-green-800">Graduate</h3>
              <p className="text-green-600">Successful completion</p>
            </div>
          </AnimationWrapper>
          <AnimationWrapper direction="up" delay={0.2}>
            <div className="bg-white rounded-lg shadow-lg p-6 text-center border-l-4 border-blue-500">
              <BookOpen className="text-blue-600 mx-auto mb-2" size={32} />
              <h3 className="text-2xl font-bold text-blue-800">Enrolled</h3>
              <p className="text-blue-600">Currently studying</p>
            </div>
          </AnimationWrapper>
          <AnimationWrapper direction="up" delay={0.3}>
            <div className="bg-white rounded-lg shadow-lg p-6 text-center border-l-4 border-red-500">
              <AlertTriangle className="text-red-600 mx-auto mb-2" size={32} />
              <h3 className="text-2xl font-bold text-red-800">Dropout</h3>
              <p className="text-red-600">Discontinued studies</p>
            </div>
          </AnimationWrapper>
        </div>
      </section>

      {/* Sample Students Section */}
      <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
        <AnimationWrapper direction="up">
          <h2 className="text-3xl md:text-4xl font-bold text-green-800 text-center mb-4 
            relative after:content-[''] after:w-20 after:h-1 after:bg-green-600 
            after:absolute after:bottom-[-8px] after:left-1/2 after:-translate-x-1/2">
            Student Examples
          </h2>
          <p className="text-lg text-green-700 text-center mb-12 max-w-3xl mx-auto">
            These sample profiles represent real student scenarios with different outcomes. 
            Click "Use This Sample" to test our prediction model with their actual data.
          </p>
        </AnimationWrapper>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sampleStudents.map((student, index) => (
            <AnimationWrapper key={student.id} direction="up" delay={0.1 * index}>
              <StudentCard 
                student={student} 
                onUseSample={handleUseSample}
              />
            </AnimationWrapper>
          ))}
        </div>
      </section>

      {/* How to Use Section */}
      <section className="py-16 bg-green-50">
        <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
          <AnimationWrapper direction="up">
            <h2 className="text-3xl font-bold text-green-800 mb-8">
              How to Use Sample Data
            </h2>
          </AnimationWrapper>
          
          <div className="grid md:grid-cols-3 gap-6">
            <AnimationWrapper direction="up" delay={0.1}>
              <div className="bg-white rounded-lg p-6 shadow-lg">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-green-600 font-bold text-lg">1</span>
                </div>
                <h3 className="font-semibold text-green-800 mb-2">Select a Sample</h3>
                <p className="text-green-600 text-sm">Choose one of the three student profiles above</p>
              </div>
            </AnimationWrapper>
            
            <AnimationWrapper direction="up" delay={0.2}>
              <div className="bg-white rounded-lg p-6 shadow-lg">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-green-600 font-bold text-lg">2</span>
                </div>
                <h3 className="font-semibold text-green-800 mb-2">Load Data</h3>
                <p className="text-green-600 text-sm">Click "Use This Sample" to pre-fill the prediction form</p>
              </div>
            </AnimationWrapper>
            
            <AnimationWrapper direction="up" delay={0.3}>
              <div className="bg-white rounded-lg p-6 shadow-lg">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-green-600 font-bold text-lg">3</span>
                </div>
                <h3 className="font-semibold text-green-800 mb-2">Test Prediction</h3>
                <p className="text-green-600 text-sm">Generate predictions and compare with known outcomes</p>
              </div>
            </AnimationWrapper>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 md:px-8 max-w-4xl mx-auto text-center">
        <AnimationWrapper direction="up">
          <h2 className="text-3xl font-bold text-green-800 mb-4">
            Ready to Make Your Own Prediction?
          </h2>
          <p className="text-lg text-green-700 mb-8">
            Use custom data or start fresh with our prediction tool
          </p>
          <button 
            onClick={handleGoToPredict}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 
              rounded-lg text-lg transition-all duration-300 transform hover:scale-105 
              hover:shadow-xl flex items-center mx-auto relative overflow-hidden group">
            <span className="relative z-10">Start Custom Prediction</span>
            <Calculator className="ml-2 relative z-10" size={20} />
            <div className="absolute inset-0 bg-green-500 opacity-0 group-hover:opacity-30 
              transition-opacity duration-300"></div>
          </button>
        </AnimationWrapper>
      </section>
    </div>
  );
};

export default Example;