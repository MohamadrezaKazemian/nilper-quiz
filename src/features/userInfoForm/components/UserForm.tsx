import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { formValidationSchema } from "../validation/formValidation";
import { FormInputs } from "../interfaces/formInterfaces";
import { Routes } from "constants/appRoutes";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";

const UserForm: React.FC = () => {
  const navigate = useNavigate();

  const form = useForm<FormInputs>({
    resolver: zodResolver(formValidationSchema),
    mode: "onSubmit", // Change to "onBlur" or "onChange" for real-time validation
  });

  const onSubmit = (data: FormInputs) => {
    console.log("Form Data: ", data);
    navigate(Routes.quiz);
  };

  return (
    <Layout>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full max-w-md space-y-3 rounded-md bg-slate-200 p-10"
        >
          {/* Name Field */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>نام</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="نام خود را وارد کنید" />
                </FormControl>
                <FormMessage className="m-0 p-0">
                  {form.formState.errors.name?.message}
                </FormMessage>
              </FormItem>
            )}
          />

          {/* Last Name Field */}
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>نام خانوادگی</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="نام خانوادگی خود را وارد کنید"
                  />
                </FormControl>
                <FormMessage>
                  {form.formState.errors.lastName?.message}
                </FormMessage>
              </FormItem>
            )}
          />

          {/* Phone Number Field */}
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>شماره تماس</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="text" // Use text to allow Persian and Arabic input
                    placeholder="شماره تماس خود را وارد کنید"
                    inputMode="numeric"
                    onInput={(e) => {
                      const input = e.target as HTMLInputElement;

                      // Convert Persian digits to English digits
                      const persianToEnglish = input.value.replace(
                        /[۰-۹]/g,
                        (char) =>
                          String.fromCharCode(char.charCodeAt(0) - 1728),
                      );

                      // Remove any non-numeric characters (Arabic, Persian, or English)
                      input.value = persianToEnglish.replace(/[^0-9]/g, "");
                    }}
                  />
                </FormControl>
                <FormMessage>
                  {form.formState.errors.phoneNumber?.message}
                </FormMessage>
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <Button type="submit" className="w-full">
            شروع
          </Button>
        </form>
      </Form>
    </Layout>
  );
};

export default UserForm;
