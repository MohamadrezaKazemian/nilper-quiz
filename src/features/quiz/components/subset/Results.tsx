import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { TransformedDataItem } from "../../interfaces/quiz";
import { animationVariants } from "@/utils/animationHelpers";

type ResultsProps = {
  filteredData: TransformedDataItem[];
  onRestart: () => void;
};

const Results = ({ filteredData, onRestart }: ResultsProps) => (
  <Layout className="flex flex-col justify-center items-center w-full">
    <motion.div
      variants={animationVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{ duration: 0.6 }}
      className="w-full bg-neutral-200 p-10 py-12 border-2 rounded-md"
    >
      <h2 className="text-xl font-semibold">Filtered Results</h2>
      <pre className="mt-4">{JSON.stringify(filteredData, null, 2)}</pre>
      <Button onClick={onRestart}>Restart Quiz</Button>
    </motion.div>
  </Layout>
);

export default Results;
