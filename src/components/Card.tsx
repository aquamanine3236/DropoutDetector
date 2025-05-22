import AnimationWrapper from "./AnimationWrapper";

interface CardProps {
  title: string;
  description: string;
  source?: string;
  icon?: React.FC<{ className?: string; size?: string | number }>;
  animationDirection?: "left" | "right" | "up";
  delay?: number;
  className?: string;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({
  title,
  description,
  source,
  icon: Icon,
  animationDirection = "up",
  delay = 0,
  className = "",
  onClick,
}) => {
  return (
    <AnimationWrapper direction={animationDirection} delay={delay}>
      <div
        className={`bg-white rounded-lg shadow-lg p-6 transform transition-all duration-300 hover:scale-105 ${className}`}
        onClick={onClick}
      >
        <div className="flex items-center mb-4">
          {Icon && <Icon className="text-green-600 mr-2" size={24} />}
          <h3 className="text-xl font-semibold text-green-800">{title}</h3>
        </div>
        <p className="text-green-700 mb-4">{description}</p>
        {source && <p className="text-xs text-green-500 italic">Source: {source}</p>}
      </div>
    </AnimationWrapper>
  );
};

export default Card;