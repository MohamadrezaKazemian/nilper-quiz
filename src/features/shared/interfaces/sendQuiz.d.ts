export interface Answers {
  question: string;
  answer: string;
}

interface UserInfo {
  fullName: string;
  phoneNumber: string;
}

export interface SubmitQuizData {
  userInfo?: UserInfo;
  selectedSits: string[];
  answers: Answers[];
}
