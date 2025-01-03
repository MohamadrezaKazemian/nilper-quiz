import { useState, useEffect } from "react";
import { ApiRoutes } from "constants/apiRoutes";
import { SubmitQuizData } from "../interfaces/sendQuiz";

const baseUrl = "https://backend.winergotech.com/api";

const useSendQuiz = (quizData: SubmitQuizData) => {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${baseUrl}/${ApiRoutes.submitForm}`, {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(quizData),
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error: any) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, isLoading, error };
};

export default useSendQuiz;
