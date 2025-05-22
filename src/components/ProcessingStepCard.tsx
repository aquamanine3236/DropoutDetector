import HorizontalAnimationWrapper from "./HorizontalAnimationWrapper";

interface ProcessingStepCardProps {
  step: {
    icon: React.FC<{ className?: string; size?: string | number }>;
    title: string;
    description: string;
    details: React.ReactNode;
    code: string;
    image: string;
    imageDescription: string;
  };
  index: number;
  onClick: () => void;
}

const ProcessingStepCard: React.FC<ProcessingStepCardProps> = ({ step, index, onClick }) => {
  return (
    <HorizontalAnimationWrapper direction={index % 2 === 0 ? "left" : "right"} delay={index * 0.2}>
      <div
        className="bg-white rounded-lg shadow-lg p-6 h-full flex flex-col justify-between transform transition-all duration-300 hover:scale-105 cursor-pointer"
        onClick={onClick}
      >
        <div>
          <div className="flex items-center mb-4">
            <step.icon className="text-green-600 mr-2" size={24} />
            <h3 className="text-xl font-semibold text-green-800">{step.title}</h3>
          </div>
          <p className="text-green-700 mb-4">{step.description}</p>
          {step.details}
        </div>
      </div>
    </HorizontalAnimationWrapper>
  );
};

export default ProcessingStepCard;