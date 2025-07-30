import { Check, Octagon } from "lucide-react";
import TextButton from "../TextButton";

type TwoConfirmationWidgetProps = {
  title: string;
  onConfirm: () => void | Promise<void>;
  onCancel: () => void;
  loading?: boolean;
  confirmLabel?: string;
  cancelLabel?: string;
};

export const TwoConfirmationWidget: React.FC<TwoConfirmationWidgetProps> = ({
  title,
  onConfirm,
  onCancel,
  loading = false,
  confirmLabel = "Yes",
  cancelLabel = "No",
}) => {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-title-xs">{title}</h2>
      </div>
      <div className="flex justify-between">
        {/* ❌ Cancel - secondary/destructive outline */}
        <TextButton
          onClick={onCancel}
          className="border border-red-500 text-red-500 hover:bg-red-100"
        >
          <Octagon size={16} className="mr-2" />
          {cancelLabel}
        </TextButton>

        {/* ✅ Confirm - primary/success solid */}
        <TextButton
          loading={loading}
          onClick={onConfirm}
          className="bg-green-600 text-white hover:bg-green-700"
        >
          <Check size={16} className="mr-2" />
          {confirmLabel}
        </TextButton>
      </div>
    </div>
  );
};
