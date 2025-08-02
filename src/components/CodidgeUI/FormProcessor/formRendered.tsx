"use client";

import { FC, useEffect, useState, useTransition } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import Input from "../InputField";
import Select, { ISelectOption } from "../Select";
import PrimaryButton from "../PrimaryButton";
import Checkbox from "../Checkbox";
import TextArea from "../TextArea";
import FileInput from "../FileInput";

type FieldType =
  | "text"
  | "email"
  | "number"
  | "textarea"
  | "checkbox"
  | "file"
  | "phone"
  | "select";

export const validatePhone = (phone: string) => {
  const phoneno = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
  return !phone.match(phoneno);
};

export const validateEmail = (email: string) => {
  const emailCheck =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  return !email.match(emailCheck);
};

export interface FormField {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  placeholder?: string;
  fullRow?: boolean;
  options?: { value: string; label: string }[]; // used for select2
}

interface FormRendererProps {
  fields: FormField[];
  onSubmit: (values: Record<string, any>) => Promise<{
    success: boolean;
    message: string;
    data?: any;
  }>;
}

export const FormRenderer: FC<FormRendererProps> = ({ fields, onSubmit }) => {
  const [confirmation, setConfirmation] = useState("");

  const [isPending, startTransition] = useTransition();

  const defaultValues = Object.fromEntries(
    fields.map((field) => [field.name, ""])
  );

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isDirty },
  } = useForm({ defaultValues });

  useEffect(() => {
    const time = setTimeout(() => {
      setConfirmation("");
    }, 4000);

    return () => {
      clearTimeout(time);
    };
  }, [confirmation]);

  const onFormSubmit: SubmitHandler<any> = async (data) => {
    startTransition(async () => {
      try {
        const res = await onSubmit(data);
        if (res.success) {
          setConfirmation(res.message);
          reset();
        }
      } catch (error) {
        console.log(":::error", error);
      }
    });
  };

  const renderField = (field: FormField) => {
    switch (field.type) {
      case "text":
      case "number":
        return (
          <Controller
            name={field.name}
            control={control}
            rules={{ required: field.required }}
            render={({ field: inputField }) => (
              <Input
                type={field.type}
                placeholder={field.placeholder}
                {...inputField}
              />
            )}
          />
        );

      case "email":
        return (
          <Controller
            name={field.name}
            control={control}
            rules={{
              required: field.required,
              validate: (value) =>
                !validateEmail(value) || "Please enter a valid email",
            }}
            render={({ field: inputField }) => (
              <Input
                type="email"
                placeholder={field.placeholder}
                {...inputField}
              />
            )}
          />
        );

      case "phone":
        return (
          <Controller
            name={field.name}
            control={control}
            rules={{
              required: field.required,
              validate: (value) =>
                !validatePhone(value) || "Please enter a valid phone number",
            }}
            render={({ field: inputField }) => (
              <Input
                type="text"
                placeholder={field.placeholder}
                {...inputField}
              />
            )}
          />
        );

      case "textarea":
        return (
          <Controller
            name={field.name}
            control={control}
            rules={{ required: field.required }}
            render={({ field: inputField }) => (
              <TextArea placeholder={field.placeholder} {...inputField} />
            )}
          />
        );

      case "checkbox":
        return (
          <Controller
            name={field.name}
            control={control}
            render={({ field: checkboxField }) => (
              <div className="flex items-center gap-2">
                <Checkbox
                  id={field.name}
                  checked={!!checkboxField.value}
                  onChange={(checked) => checkboxField.onChange(!!checked)}
                />
                <label htmlFor={field.name}>{field.label}</label>
              </div>
            )}
          />
        );

      case "file":
        return (
          <Controller
            control={control}
            name={field.name}
            rules={{ required: field.required }}
            render={({ field: { onChange } }) => (
              <FileInput
                onChange={(e) => {
                  const file = e.target.files?.[0] ?? null;
                  onChange(file);
                }}
              />
            )}
          />
        );

      case "select":
        const selectOptions: ISelectOption[] = (field.options || []).map(
          (opt) => ({
            value: opt.value,
            valueToShow: opt.label,
          })
        );

        return (
          <Controller
            name={field.name}
            control={control}
            rules={{ required: field.required }}
            render={({ field: { onChange, value } }) => {
              const selected =
                selectOptions.find((o) => o.value === value) ||
                selectOptions[0];

              return (
                <Select
                  options={selectOptions}
                  defaultSelected={selected}
                  onChange={(selectedOption) => onChange(selectedOption.value)}
                  label={undefined}
                />
              );
            }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)}>
      <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        {fields.map((field) => (
          <div
            key={field.name}
            className={`flex flex-col gap-1  ${
              field.fullRow ? "md:col-span-2" : "md:col-span-1"
            }`}
          >
            <label htmlFor={field.name} className="font-medium">
              {field.label} {field.required && "*"}
            </label>
            {renderField(field)}
            {errors[field.name] && (
              <span className="text-red-500 text-sm">
                This field is required
              </span>
            )}
          </div>
        ))}
      </div>
      <PrimaryButton
        disabled={!isDirty}
        loading={isPending}
        type="submit"
        title="Send"
      >
        Send
      </PrimaryButton>
      {confirmation && (
        <div
          className="mt-[16px] p-[10px] text-base text-white rounded-lg bg-primary"
          role="alert"
        >
          <span className="text-[14px] lg:text-[18px] xl:text-[20px]">
            {confirmation}
          </span>
        </div>
      )}
    </form>
  );
};
