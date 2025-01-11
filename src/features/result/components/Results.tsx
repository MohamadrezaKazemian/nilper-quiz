import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { animationVariants } from "@/utils/animationHelpers";
import { Frown } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useTextQuizStore from "../../textQuiz/store/textQuizStore";
import { ImageData } from "../interfaces/interfaces";
import persianSorter from "../utils/persianSorter";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import useSendQuiz from "@/features/shared/hooks/useSendQuiz";
import useSelectedSitsStore from "@/features/sitsQuiz/store/sitsStore";
import useQuizAnswersStore from "@/features/shared/store/quizAnswersStore";
import useUserInfoStore from "@/features/userInfoForm/store/UserInfoStore";
const Results = ({ onRestart }: { onRestart: () => void }) => {
  const { textQuizResult } = useTextQuizStore();
  const { selectedSits } = useSelectedSitsStore();
  const { quizAnswers } = useQuizAnswersStore();
  const { userInfo } = useUserInfoStore();
  const [images, setImages] = useState<ImageData[]>([]);
  const { data, error, isLoading } = useSendQuiz({
    answers: quizAnswers,
    selectedSits: selectedSits,
    userInfo: {
      fullName: `${userInfo?.name ?? ""} ${userInfo?.lastName ?? ""}`,
      phoneNumber: userInfo?.phoneNumber ?? "",
    },
  });

  useEffect(() => {
    // Fetch the images.json file
    const fetchImages = async () => {
      try {
        const response = await fetch("/images.json");
        const data = await response.json();
        setImages(data);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, []);

  const getImageSrc = (link: string) => {
    const image = images.find((img) => img.link === link);
    return image ? image.img_src : ""; // Return img_src if found, otherwise an empty string
  };

  return (
    <Layout className="mx-auto flex w-full max-w-screen-xl flex-col items-center justify-center overflow-x-hidden">
      <motion.div
        variants={animationVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        transition={{ duration: 0.6 }}
        className="relative w-full rounded-md border-2 bg-neutral-200 p-5 pt-10 sm:p-10 sm:pt-16"
      >
        <h2 className="mb-4 text-center text-2xl font-bold">نتیجه نهایی</h2>
        <div
          className={`grid grid-cols-1 items-center justify-center gap-10 lg:flex`}
        >
          {textQuizResult?.slice(0, 3).map((product: any, index: number) => {
            const imageSrc = getImageSrc(product.link); // Get the image src based on the product link

            return (
              <a
                key={index}
                href={product.link}
                target="_blank"
                className="transition-all duration-200 hover:scale-[0.97]"
              >
                <Card
                  className={cn("", {
                    "bg-green-100": index + 1 === 1,
                  })}
                >
                  <CardHeader className="relative">
                    <Badge
                      variant="secondary"
                      className={cn(
                        "pointer-events-none absolute right-0 top-0 -translate-x-2 translate-y-2",
                        {
                          "bg-[#FFD700]": index + 1 === 1,
                        },
                      )}
                    >
                      اولویت {persianSorter(index + 1)}
                    </Badge>
                    <CardTitle className="text-center font-Roboto">
                      {product.model}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex justify-center">
                    <img
                      src={imageSrc}
                      alt={product.model}
                      className="h-full w-full max-w-xs mix-blend-multiply lg:max-w-full"
                    />
                  </CardContent>
                  <CardFooter className="flex justify-center">
                    <Button className="w-full bg-nilperRed text-sm md:text-lg">
                      راهنمای خرید و ثبت سفارش
                    </Button>
                  </CardFooter>
                </Card>
              </a>
            );
          })}
          {textQuizResult.slice(0, 3).length === 0 && (
            <div className="flex flex-col items-center justify-center gap-4">
              <Frown size={50} />
              <span className="text-center text-lg">
                متاسفانه باتوجه به حالات انتخابی شما صندلی موجود در سبد محصولات
                نیلپر یافت نشد. لطفا در صورت نیاز به دریافت مشاوره بیشتر با
                شماره زیر تماس حاصل فرمایید
              </span>
              <span className="rounded-md bg-white p-2 font-bold">
                شماره تماس: (داخلی 231) 82750-021
              </span>
            </div>
          )}
        </div>
        <Button onClick={onRestart} className="mx-auto mt-4 flex">
          شروع مجدد
        </Button>
      </motion.div>
    </Layout>
  );
};

export default Results;
