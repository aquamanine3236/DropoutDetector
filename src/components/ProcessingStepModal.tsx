import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface ProcessingStepModalProps {
  isOpen: boolean;
  onClose: () => void;
  step: {
    icon: React.FC<{ className?: string; size?: string | number }>;
    title: string;
    description: string;
    details: React.ReactNode;
    code: string;
    image: string;
    imageDescription: string;
  } | null;
}

const ProcessingStepModal: React.FC<ProcessingStepModalProps> = ({ isOpen, onClose, step }) => {
  if (!step) return null;

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3, ease: "easeOut" } },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.3, ease: "easeIn" } },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={modalVariants}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
          <div className="bg-white rounded-lg p-8 max-w-5xl w-full h-[90vh] overflow-y-auto scrollbar scrollbar-thumb-green-600 scrollbar-track-green-100">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center">
                <step.icon className="text-green-600 mr-2" size={28} />
                <h3 className="text-2xl font-semibold text-green-800">{step.title}</h3>
              </div>
              <button onClick={onClose} className="text-green-600 hover:text-green-800">
                <X size={24} />
              </button>
            </div>
            <p className="text-lg text-green-700 mb-4">{step.description}</p>
            {step.details}
            <h4 className="text-green-800 font-semibold mt-6 mb-2 text-lg">Code Snippet:</h4>
            <pre className="bg-gray-100 p-4 rounded-lg text-sm text-gray-800 overflow-x-auto">
              <code>{step.code.trim()}</code>
            </pre>
            <h4 className="text-green-800 font-semibold mt-6 mb-2 text-lg">Visualization:</h4>
            <img
              src={step.image}
              alt={`Visualization for ${step.title}`}
              className="w-full h-auto rounded-lg mb-2"
            />
            <p className="text-sm text-green-600 italic">{step.imageDescription}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProcessingStepModal;