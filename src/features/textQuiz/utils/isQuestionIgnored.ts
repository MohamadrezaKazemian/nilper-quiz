const isQuestionIgnored = (englishName: string, selectedOption: string) => {
  const ignoredQuestions = [
    "table_type",
    "back_height_adjustment",
    "seat_depth_adjustment",
  ];

  const ignoredOptions = ["below 75 cm", "not needed"];
  console.log(
    "asdasdsa",
    ignoredQuestions.includes(englishName) &&
      ignoredOptions.includes(selectedOption),
  );

  return (
    ignoredQuestions.includes(englishName) &&
    ignoredOptions.includes(selectedOption)
  );
};

export default isQuestionIgnored;
