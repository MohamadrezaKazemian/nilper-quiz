import { Routes, Route } from "react-router-dom";
import QuizForm from "@/features/textQuiz/components/QuizForm"; // Adjust path based on your folder structure
import UserForm from "@/features/userInfoForm/components/UserForm";

function App() {
  console.log("version 1.0.0");
  return (
    <Routes>
      {/* <Route path="/" element={<HomePage />} /> */}
      <Route path="/" element={<UserForm />} />
      <Route path="/quiz" element={<QuizForm />} />
    </Routes>
  );
}

export default App;
