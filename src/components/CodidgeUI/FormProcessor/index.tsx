"use client";

import { submitContact } from "@/lib/actions/contact";
import { FormRenderer } from "./formRendered";

export const ProccessForm = ({ form }: { form: any }) => {
  const handleSubmit = async (values: Record<string, any>) => {
    return submitContact({
      formData: {
        formId: form.formId,
        fields: JSON.stringify(values),
      },
    });
  };

  return (
    <div>
      <FormRenderer fields={form.fields} onSubmit={handleSubmit} />
    </div>
  );
};
