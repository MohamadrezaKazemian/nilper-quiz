import { TransformedDataItem } from "../interfaces/quiz";

export const fetchQuizData = async (
  setFilteredData: React.Dispatch<React.SetStateAction<TransformedDataItem[]>>
) => {
  try {
    const response = await fetch("/public/nilper.json");
    const data = await response.json();
    setFilteredData(data);
  } catch (error) {
    console.error("Error fetching quiz data:", error);
  }
};
