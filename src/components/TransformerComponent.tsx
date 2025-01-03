import React, { useEffect, useState } from "react";
import { transformJson } from "../utils/jsonTransformer";

const TransformerComponent: React.FC = () => {
  const [originalData, setOriginalData] = useState<any>(null);
  const [transformedData, setTransformedData] = useState<any>(null);

  useEffect(() => {
    // Fetch the JSON file from the public folder
    fetch("/nilper.json")
      .then((response) => response.json())
      .then((data) => {
        setOriginalData(data);
        const transformed = transformJson(data);
        setTransformedData(transformed);
      })
      .catch((error) => console.error("Error loading JSON:", error));
  }, []);

  return (
    <div className="flex">
      <h1>JSON Transformer</h1>
      <h2>Original Data</h2>
      <pre>{JSON.stringify(originalData, null, 2)}</pre>
      <h2>Transformed Data</h2>
      <pre style={{ direction: "ltr" }}>
        {JSON.stringify(transformedData, null, 2)}
      </pre>
    </div>
  );
};

export default TransformerComponent;
