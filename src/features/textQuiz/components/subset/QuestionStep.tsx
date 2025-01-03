import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import { Question, QuestionStepProps } from "../../interfaces/quiz";
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

const QuestionStep = ({
  currentStep,
  question,
  onOptionSelect,
  onPrevious,
}: QuestionStepProps) => {
  return (
    <Layout>
      <motion.div
        key={currentStep}
        variants={animationVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        transition={{ duration: 0.6 }}
        className="relative w-full max-w-screen-sm rounded-md border-2 bg-neutral-200 p-5 pt-10 sm:p-10 sm:pt-16"
      >
        <div className="absolute left-0 right-0 top-0 flex w-full -translate-y-1/2 justify-center">
          <a
            href="https://nilperoffice.com/"
            target="_blank"
            className="hover:animate-pulse"
          >
            <img
              src="https://nilperoffice.com/Portals/0/Logo.png"
              className="w-full max-w-20 rounded-md border bg-white p-2 shadow-2xl shadow-nilperRed sm:max-w-32"
              alt="nilper"
            />
          </a>
        </div>
        <div className="relative flex w-fit items-center gap-2">
          <h2 className="text-sm font-semibold sm:text-xl">
            {question.question.fa}
          </h2>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger className=" ">
                {question.help && (
                  <Drawer>
                    <DrawerTrigger asChild>
                      <div>
                        <CircleHelp className="w-5 cursor-pointer sm:w-7" />
                      </div>
                    </DrawerTrigger>
                    <DrawerContent>
                      <DrawerHeader>
                        <DrawerTitle>
                          منظور از {question.question.fa.replace("؟", " ")}{" "}
                          چیست؟
                        </DrawerTitle>
                        <DrawerDescription>
                          <span className="text-right text-sm sm:text-justify sm:text-xl">
                            {question.help}
                          </span>
                        </DrawerDescription>
                      </DrawerHeader>
                      <DrawerFooter>
                        <DrawerClose asChild>
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

        <p className="my-2 mb-3 text-sm sm:text-lg">
          {question.question.description}
        </p>

        <div className="flex w-full gap-3">
          {question.options.map((option, index) => (
            <Button
              onClick={() => onOptionSelect(option)}
              variant={"outline"}
              key={index}
              className="w-full p-2 text-sm sm:p-6 sm:text-xl"
            >
              {option.label}
            </Button>
          ))}
        </div>
        <div className="absolute right-0 top-0 -translate-x-4 translate-y-1 sm:translate-y-4">
          {currentStep !== 0 && (
            <CircleChevronLeft
              className="w-5 -scale-x-100 cursor-pointer transition-all hover:-translate-y-[1px] sm:w-full"
              onClick={onPrevious}
            />
          )}
        </div>
      </motion.div>
    </Layout>
  );
};

export default QuestionStep;
