import { z } from "zod";

export const formValidationSchema = z.object({
  name: z
    .string({ message: "فیلد اجباری" })
    .min(2, { message: "نام باید حداقل ۲ کاراکتر باشد" })
    .max(20, { message: "نام حداکثر میتواند ۲۰ کاراکتر باشد" }),
  lastName: z
    .string({ message: "فیلد اجباری" })
    .min(4, { message: "نام خانوادگی باید حداقل ۴ کاراکتر باشد" })
    .max(20, { message: "نام خانوادگی باید حداکثر ۲۰ کاراکتر باشد" }),
  phoneNumber: z
    .string({ message: "فیلد اجباری" })
    .min(11, { message: "شماره موبایل باید ۱۲ رقم باشد" })
    .max(11, { message: "شماره موبایل باید ۱۲ رقم باشد" }),
});

export type FormValidationSchema = z.infer<typeof formValidationSchema>;
