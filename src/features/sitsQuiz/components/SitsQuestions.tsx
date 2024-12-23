import React from "react";
import Layout from "@/components/Layout";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormItem, FormControl, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import useTextQuizStore from "@/features/textQuiz/store/TextQuizStore";
import { CircleChevronLeft } from "lucide-react";

// Define the Zod schema: must choose 1 to 3 images
const formSchema = z.object({
  images: z
    .array(z.string())
    .min(3, "۳ مورد را انتخاب کنید")
    .max(3, "۳ مورد را انتخاب کنید"),
});

type FormValues = z.infer<typeof formSchema>;

interface QuizResultItem {
  model: string;
  link: string;
  // ... other properties as per your data
  [key: string]: any;
}

interface Props {
  setIsQuizFinished: (status: boolean) => void;
  onBack?: () => void; // <-- NEW: optional go-back function
}

const SitsQuestions: React.FC<Props> = ({ setIsQuizFinished, onBack }) => {
  const { textQuizResult, setTextQuizResult } = useTextQuizStore();
  const { toast } = useToast();

  // Example images in /public/assets/images/sits
  const imageFilenames = [
    "A1.jpg",
    "A2.jpg",
    "B.jpg",
    "C.jpg",
    "D1.jpg",
    "D2.jpg",
    "D3.jpg",
    "D4.jpg",
    "E.jpg",
    "F.jpg",
    "G1.jpg",
    "G2.jpg",
    "H1.jpg",
    "H2.jpg",
    "H3.jpg",
    "I1.jpg",
    "I2.jpg",
    "K.jpg",
  ];

  // 1. Initialize react-hook-form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      images: [],
    },
  });

  const { handleSubmit, watch, setValue } = form;
  const selectedImages = watch("images");

  // 2. Toggle image selection
  const toggleImageSelection = (img: string) => {
    const currentSelection = form.getValues("images");
    if (currentSelection.includes(img)) {
      // Remove the selected image
      setValue(
        "images",
        currentSelection.filter((i) => i !== img),
        { shouldValidate: true },
      );
    } else {
      // Add new image if max (3) not exceeded
      if (currentSelection.length < 3) {
        setValue("images", [...currentSelection, img], {
          shouldValidate: true,
        });
      } else {
        toast({
          title: "فقط ۳ مورد را می‌توانید انتخاب کنید",
          variant: "destructive",
        });
      }
    }
  };

  // 3. On form submit
  const onSubmit = (values: FormValues) => {
    // Remove ".jpg" from each selected image
    const rawSelections = values.images.map((img) => img.replace(".jpg", ""));

    // Create a letter map to count frequency and store variants
    const letterMap = new Map<string, { count: number; variants: string[] }>();

    rawSelections.forEach((sel) => {
      const match = sel.match(/^([A-Z]+)/i);
      const letter = match ? match[1] : sel;

      if (!letterMap.has(letter)) {
        letterMap.set(letter, { count: 0, variants: [] });
      }
      const data = letterMap.get(letter)!;
      data.count += 1;
      data.variants.push(sel);
      letterMap.set(letter, data);
    });

    // Sort letters by descending frequency
    const sortedLetters = Array.from(letterMap.entries()).sort(
      (a, b) => b[1].count - a[1].count,
    );

    // Priority levels
    const priorityLevels = [1, 2, 3];

    // Array to store all found objects
    const foundObjects: QuizResultItem[] = [];

    // Iterate through sorted letters and find matches in textQuizResult
    for (const [letter, info] of sortedLetters) {
      for (const level of priorityLevels) {
        for (const variant of info.variants) {
          for (const obj of textQuizResult as any) {
            if (obj.hasOwnProperty(variant) && obj[variant] === level) {
              // Avoid duplicates
              if (!foundObjects.includes(obj)) {
                foundObjects.push(obj);
              }
            }
          }
        }
      }
    }

    // If we found objects, update the store
    if (foundObjects.length > 0) {
      setTextQuizResult(foundObjects);
    } else {
      // No match found
      setTextQuizResult([]);
    }

    // Finish the quiz
    setIsQuizFinished(true);
  };

  return (
    <Layout>
      <div className="relative w-full max-w-screen-sm rounded-md bg-neutral-200 p-10">
        {/* Optional: Back button at the top */}
        {onBack && (
          <div className="absolute right-0 top-0 -translate-x-4 translate-y-1 sm:translate-y-4">
            <CircleChevronLeft
              className="w-5 -scale-x-100 cursor-pointer transition-all hover:-translate-y-[1px] sm:w-full"
              onClick={onBack}
            />
          </div>
        )}

        <h1 className="mb-4 text-center text-base font-semibold">
          به تصاویر زیر نگاه کنید. بین یک تا سه مورد از نزدیکترین حالت به عادات
          نشستن خود را انتخاب کنید.
        </h1>

        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="mx-auto w-full">
            <FormItem className="w-full">
              <FormMessage />
              <FormControl className="w-full">
                <div className="mt-4 grid w-full grid-cols-2 gap-4 sm:grid-cols-4">
                  {imageFilenames.map((img, index) => {
                    const isSelected = selectedImages.includes(img);
                    return (
                      <div
                        key={index}
                        onClick={() => toggleImageSelection(img)}
                        className={`cursor-pointer overflow-hidden rounded-lg border p-1 transition-all hover:scale-95 ${
                          isSelected ? "border-nilperRed" : "border-gray-300"
                        }`}
                      >
                        <img
                          src={`/assets/images/sits/${img}`}
                          alt={`Option ${index + 1}`}
                          width={100}
                          height={100}
                          loading="lazy"
                          className="h-auto w-full object-contain"
                        />
                      </div>
                    );
                  })}
                </div>
              </FormControl>
            </FormItem>

            {form.formState.errors.images && (
              <p className="mt-2 text-sm text-red-500">
                {form.formState.errors.images.message}
              </p>
            )}

            <div className="mt-6 flex justify-end">
              <Button
                type="submit"
                className="w-full"
                disabled={form.getValues("images").length !== 3}
              >
                ادامه
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </Layout>
  );
};

export default SitsQuestions;
