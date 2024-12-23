import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { questions } from "constants/questions";
import { TransformedDataItem } from "../interfaces/quiz";
import QuestionStep from "./subset/QuestionStep";
import Results from "../../result/components/Results";
import { transformJson } from "@/utils/jsonTransformer";
import useTextQuizStore from "../store/TextQuizStore";
import SitsQuestions from "@/features/sitsQuiz/components/SitsQuestions";

const QuizForm = () => {
  const { setTextQuizResult } = useTextQuizStore();

  // Current question index
  const [currentStep, setCurrentStep] = useState<number>(0);
  // Current filtered data
  const [filteredData, setFilteredData] = useState<TransformedDataItem[]>([]);
  // History of filtered data states
  const [filteredDataHistory, setFilteredDataHistory] = useState<
    TransformedDataItem[][]
  >([]);
  console.log("filteredData", filteredData);

  // After finishing the text questions, we show SitsQuestions, then Results
  const [isQuizFinished, setIsQuizFinished] = useState<boolean>(false);

  // Store the initial transformed data for easy reset
  const [initialData, setInitialData] = useState<TransformedDataItem[]>([]);

  // 1. Load & transform the JSON on mount
  useEffect(() => {
    fetch("/nilper.json")
      .then((response) => response.json())
      .then((data) => {
        const transformed = transformJson(data) as TransformedDataItem[];
        // Initialize filteredData and history with the entire dataset
        setFilteredData(transformed);
        setFilteredDataHistory([transformed]);
        setInitialData(transformed); // Store initial data
      })
      .catch((error) => {
        console.error("Error fetching or transforming data:", error);
        // Handle error appropriately, possibly set an error state
      });
  }, []);

  // 2. Handle option selection and filter data
  const handleOptionSelect = (optionValue: string) => {
    const currentQuestion = questions[currentStep];

    // Filter the data based on the selected option
    const newFilteredData = filteredData.filter(
      (item) => item[currentQuestion.question.en] === optionValue,
    );

    // Push the new filtered data onto the history stack
    setFilteredDataHistory((prevHistory) => [...prevHistory, newFilteredData]);

    // Update our main filteredData
    setFilteredData(newFilteredData);

    // Move to the next question
    setCurrentStep((prevStep) => prevStep + 1);
  };

  // 3. Go back to the previous text question & revert filtered data
  const goToPreviousQuestion = () => {
    if (currentStep > 0) {
      setCurrentStep((prevStep) => prevStep - 1);

      setFilteredDataHistory((prevHistory) => {
        const updatedHistory = [...prevHistory];
        // Remove the latest snapshot
        updatedHistory.pop();
        // The new "top" is the previous step's filtered data
        const revertedData = updatedHistory[updatedHistory.length - 1] || [];

        setFilteredData(revertedData);
        return updatedHistory;
      });
    }
  };

  // 4. When all text questions are done, store the result in Redux (or store)
  useEffect(() => {
    if (currentStep === questions.length) {
      setTextQuizResult(filteredData);
    }
  }, [currentStep, filteredData, setTextQuizResult]);

  // 5. Go back from SitsQuestions to the final text question (optional)
  const handleBackFromSits = () => {
    // The user is at SitsQuestions => step is questions.length
    // We want to revert to step = questions.length - 1
    if (currentStep > 0) {
      setCurrentStep((prevStep) => prevStep - 1);

      setFilteredDataHistory((prevHistory) => {
        const updatedHistory = [...prevHistory];
        // Remove the latest snapshot
        updatedHistory.pop();
        // Revert to what's now on top
        const revertedData = updatedHistory[updatedHistory.length - 1] || [];
        setFilteredData(revertedData);

        return updatedHistory;
      });
    }
  };

  // 6. onRestart function to reset the quiz
  const onRestart = () => {
    // Reset current step to the first question
    setCurrentStep(0);

    // Reset filtered data to the initial data
    setFilteredData(initialData);

    // Reset the history to contain only the initial data
    setFilteredDataHistory([initialData]);

    // Mark the quiz as not finished
    setIsQuizFinished(false);

    // Clear any stored quiz results
    setTextQuizResult([]);
  };

  // 7. Render logic
  return (
    <AnimatePresence mode="wait">
      {/* Still answering text questions? */}
      {currentStep < questions.length ? (
        <QuestionStep
          key={`question-${currentStep}`} // Ensure AnimatePresence works correctly
          currentStep={currentStep}
          question={questions[currentStep]}
          onOptionSelect={handleOptionSelect}
          onPrevious={goToPreviousQuestion}
        />
      ) : // We are beyond the text questions
      !isQuizFinished ? (
        // Show SitsQuestions and pass handleBackFromSits
        <SitsQuestions
          key="sits-questions" // Ensure AnimatePresence works correctly
          setIsQuizFinished={setIsQuizFinished}
          onBack={handleBackFromSits}
        />
      ) : (
        // Or show final results
        <Results key="results" onRestart={onRestart} />
      )}
    </AnimatePresence>
  );
};

export default QuizForm;
