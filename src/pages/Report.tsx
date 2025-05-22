import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { ChevronDown, Download, FileText } from "lucide-react";

// Animation Wrapper Component (unchanged)
const AnimationWrapper = ({
  children,
  direction = "up",
  delay = 0,
}: {
  children: React.ReactNode;
  direction?: "up" | "down" | "left" | "right";
  delay?: number;
}) => {
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
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

// Set the workerSrc for PDF.js
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

// Updated PDF Navigation Component with wider spacing
const PDFNavigation = ({
  pageNumber,
  numPages,
  onPrevious,
  onNext,
}: {
  pageNumber: number;
  numPages: number | null;
  onPrevious: () => void;
  onNext: () => void;
}) => {
  if (!numPages) return null;

  return (
    <div className="flex items-center justify-center gap-8 py-4 mt-4">
      <button
        onClick={onPrevious}
        disabled={pageNumber === 1}
        className="px-6 py-2 border border-green-300 text-green-700 rounded-lg 
          hover:bg-green-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        Previous
      </button>
      <span className="text-green-700 font-medium">
        Page {pageNumber} of {numPages}
      </span>
      <button
        onClick={onNext}
        disabled={pageNumber === numPages}
        className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 
          disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        Next
      </button>
    </div>
  );
};

// PDF Error Component (unchanged)
const PDFError = ({ error, pdfUrl }: { error: string; pdfUrl: string }) => (
  <div className="p-6 text-center text-red-600">
    <p className="font-semibold">{error}</p>
    <p className="mt-2">
      Please try{" "}
      <a href={pdfUrl} download className="underline hover:text-red-800 transition-colors">
        downloading the PDF
      </a>{" "}
      or contact support.
    </p>
  </div>
);

// PDF Viewer Component (unchanged)
const PDFViewer = ({
  pdfUrl,
  pageNumber,
  setPageNumber,
  setNumPages,
  setError,
}: {
  pdfUrl: string;
  pageNumber: number;
  setPageNumber: React.Dispatch<React.SetStateAction<number>>;
  setNumPages: React.Dispatch<React.SetStateAction<number | null>>;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
}) => {
  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setError(null);
  };

  const onDocumentLoadError = (error: Error) => {
    setError(`Failed to load PDF: ${error.message}`);
  };

  return (
    <Document
      file={pdfUrl}
      onLoadSuccess={onDocumentLoadSuccess}
      onLoadError={onDocumentLoadError}
      className="flex justify-center"
    >
      <Page
        pageNumber={pageNumber}
        renderTextLayer={false}
        renderAnnotationLayer={false}
        width={Math.min(800, window.innerWidth - 40)}
        className="mx-auto"
      />
    </Document>
  );
};

// Main Report Component (unchanged except for the updated PDFNavigation usage)
const Report: React.FC = () => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const pdfUrl = "/report_ML.pdf"; // Replace with your actual PDF path

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-16">
      {/* Header Section */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 text-center">
        <AnimationWrapper direction="up">
          <h1 className="text-4xl md:text-5xl font-bold text-green-800 mb-4 drop-shadow-lg">
            Student Success Prediction Report
          </h1>
        </AnimationWrapper>
        <AnimationWrapper direction="up" delay={0.2}>
          <p className="text-lg md:text-xl text-green-700 mb-12 max-w-3xl mx-auto">
            Explore our comprehensive report detailing the predictive analysis of student academic outcomes, powered by advanced machine learning models.
          </p>
        </AnimationWrapper>
      </div>

      {/* PDF Viewer Section */}
      <section className="max-w-5xl mx-auto px-4 md:px-8">
        <AnimationWrapper direction="up" delay={0.4}>
          <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-green-800 flex items-center">
                <FileText className="mr-2 text-green-600" size={28} />
                Report Preview
              </h2>
              <a
                href={pdfUrl}
                download="Student_Success_Report.pdf"
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 
                  transition-all duration-300 transform hover:scale-105 flex items-center 
                  relative overflow-hidden group"
              >
                <span className="relative z-10">Download PDF</span>
                <Download className="ml-2 relative z-10" size={20} />
                <div className="absolute inset-0 bg-green-500 opacity-0 group-hover:opacity-30 
                  transition-opacity duration-300"></div>
              </a>
            </div>

            {/* PDF Viewer with Error Handling */}
            <div className="border border-green-200 rounded-lg overflow-auto bg-gray-50">
              {error ? (
                <PDFError error={error} pdfUrl={pdfUrl} />
              ) : (
                <>
                  <PDFViewer
                    pdfUrl={pdfUrl}
                    pageNumber={pageNumber}
                    setPageNumber={setPageNumber}
                    setNumPages={setNumPages}
                    setError={setError}
                  />
                  <PDFNavigation
                    pageNumber={pageNumber}
                    numPages={numPages}
                    onPrevious={() => setPageNumber((prev) => Math.max(1, prev - 1))}
                    onNext={() => setPageNumber((prev) => Math.min(numPages!, prev + 1))}
                  />
                </>
              )}
            </div>
          </div>
        </AnimationWrapper>
      </section>
    </div>
  );
};

// CSS (unchanged)
const styles = `
  @keyframes fade-in {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
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

  .animate-fade-in {
    animation: fade-in 0.5s ease-out forwards;
  }

  .animate-gradient-bg {
    background-size: 200% 200%;
    animation: gradient-bg 15s ease infinite;
  }

  .animate-pulse-slow {
    animation: pulse-slow 3s ease-in-out infinite;
  }
`;

export default Report;