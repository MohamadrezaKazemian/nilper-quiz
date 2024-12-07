// Define types for questions and options
export type Option = {
  label: string;
  value: string;
};

export type Question = {
  question: {
    en: string;
    fa: string;
    description?: string;
  };
  options: Option[];
  help?: string;
};

export type TransformedDataItem = {
  [key: string]: any; // Generic object type for transformed JSON items
};
