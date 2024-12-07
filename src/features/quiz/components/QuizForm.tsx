import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { questions } from "constants/questions";
import { TransformedDataItem } from "../interfaces/quiz";
import QuestionStep from "./subset/QuestionStep";
import Results from "./subset/Results";
import { transformJson } from "@/utils/jsonTransformer";

const QuizForm = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [filteredData, setFilteredData] = useState<TransformedDataItem[]>([]);
  // const [transformedJson, setTransformedJson] = useState<TransformedDataItem[]>(
  //   []
  // );

  console.log("filteredData", filteredData);

  // Load and transform the JSON at the beginning
  useEffect(() => {
    fetch("/public/nilper.json")
      .then((response) => response.json())
      .then((data) => {
        const transformed = transformJson(data) as TransformedDataItem[];
        // setTransformedJson(transformed);
        setFilteredData(transformed); // Initialize filtered data
      });
  }, []);

  // Handle option selection and filter data
  const handleOptionSelect = (optionValue: string) => {
    const currentQuestion = questions[currentStep];

    // Filter the data based on the selected option
    setFilteredData((prevData) =>
      prevData.filter(
        (item) => item[currentQuestion.question.en] === optionValue
      )
    );

    // Move to the next question
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const goToPreviousQuestion = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <AnimatePresence mode="wait">
      {currentStep < questions.length ? (
        <QuestionStep
          currentStep={currentStep}
          question={questions[currentStep]}
          onOptionSelect={handleOptionSelect}
          onPrevious={goToPreviousQuestion}
        />
      ) : (
        <Results
          filteredData={filteredData}
          onRestart={() => {
            setCurrentStep(0);
          }}
        />
      )}
    </AnimatePresence>
  );
};

export default QuizForm;
