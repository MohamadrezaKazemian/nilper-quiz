import { Routes, Route } from "react-router-dom";
import QuizForm from "@/features/quiz/components/QuizForm"; // Adjust path based on your folder structure
import UserForm from "@/features/userInfoForm/components/UserForm";

function App() {
  return (
    <Routes>
      {/* <Route path="/" element={<HomePage />} /> */}
      <Route path="/" element={<UserForm />} />
      <Route path="/quiz" element={<QuizForm />} />
    </Routes>
  );
}

export default App;