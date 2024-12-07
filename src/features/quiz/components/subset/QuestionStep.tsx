import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import { Question } from "../../interfaces/quiz";
import { animationVariants } from "@/utils/animationHelpers";
import { CircleHelp } from "lucide-react";
import { CircleChevronLeft } from "lucide-react";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
type QuestionStepProps = {
  currentStep: number;
  question: Question;
  onOptionSelect: (optionValue: string) => void;
  onPrevious: () => void;
};

const QuestionStep = ({
  currentStep,
  question,
  onOptionSelect,
  onPrevious,
}: QuestionStepProps) => {
  return (
    <Layout className="flex flex-col justify-center items-center w-full max-w-screen-sm mx-auto">
      <motion.div
        key={currentStep}
        variants={animationVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        transition={{ duration: 0.6 }}
        className="w-full bg-neutral-200 p-5 sm:p-10 pt-10 sm:pt-16 border-2 rounded-md relative"
      >
        <div className="absolute top-0 left-0 right-0 flex  -translate-y-1/2 justify-center w-full">
          <a
            href="https://nilperoffice.com/"
            target="_blank"
            className=" hover:animate-pulse"
          >
            <img
              src="https://nilperoffice.com/Portals/0/Logo.png"
              className="shadow-2xl bg-white  shadow-nilperRed border  p-2 rounded-md w-full max-w-20 sm:max-w-32"
              alt="nilper"
            />
          </a>
        </div>
        <div className="flex gap-2 items-center relative w-fit">
          <h2 className="text-sm sm:text-xl font-semibold">
            {question.question.fa}
          </h2>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger className=" ">
                {question.help && (
                  <Drawer>
                    <DrawerTrigger>
                      {" "}
                      <CircleHelp className=" cursor-pointer w-5 sm:w-7" />
                    </DrawerTrigger>
                    <DrawerContent>
                      <DrawerHeader>
                        <DrawerTitle>
                          منظور از {question.question.fa.replace("؟", " ")}
                          چیست؟
                        </DrawerTitle>
                        <DrawerDescription>
                          <p className="text-sm sm:text-xl sm:text-justify text-right">
                            {question.help}
                          </p>
                        </DrawerDescription>
                      </DrawerHeader>
                      <DrawerFooter>
                        <DrawerClose>
                          <Button variant="default" className="w-full">
                            متوجه شدم
                          </Button>
                        </DrawerClose>
                      </DrawerFooter>
                    </DrawerContent>
                  </Drawer>
                )}
              </TooltipTrigger>
              <TooltipContent className="hidden sm:block">
                <p>راهنما</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <p className="mb-3 my-2 text-sm  sm:text-lg">
          {question.question.description}
        </p>

        <div className="flex w-full gap-3">
          {question.options.map((option, index) => (
            <Button
              onClick={() => onOptionSelect(option.value)}
              variant={"outline"}
              key={index}
              className="w-full p-2 sm:p-6 text-sm sm:text-xl"
            >
              {option.label}
            </Button>
          ))}
        </div>
        <div className="absolute  -translate-x-4 sm:translate-y-4 translate-y-1 right-0 top-0">
          <CircleChevronLeft
            className="-scale-x-100 cursor-pointer transition-all hover:-translate-y-[1px] w-5 sm:w-full"
            onClick={onPrevious}
          />
        </div>
      </motion.div>
    </Layout>
  );
};

export default QuestionStep;
