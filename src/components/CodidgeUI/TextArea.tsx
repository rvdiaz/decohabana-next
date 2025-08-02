interface TextareaProps {
  placeholder?: string; // Placeholder text
  rows?: number; // Number of rows
  value?: string; // Current value
  onChange?: (value: string) => void; // Change handler
  className?: string; // Additional CSS classes
  disabled?: boolean; // Disabled state
  error?: boolean; // Error state
  hint?: string; // Hint text to display
}

const TextArea: React.FC<TextareaProps> = ({
  placeholder = "Enter your message", // Default placeholder
  rows = 3, // Default number of rows
  value = "", // Default value
  onChange, // Callback for changes
  className = "", // Additional custom styles
  disabled = false, // Disabled state
  error = false, // Error state
  hint = "", // Default hint text
  ...rest
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };

  let textareaClasses = `max-h-[104px] text-[16px] leading-[24px] placeholder:text-borderNeutralColor font-normal flex-grow w-full p-4 transition duration-200 rounded-lg !bg-black/50 border !border-gray-600 text-white appearance-none focus:border-primary focus:outline-none focus:shadow-outline ${className}`;

  if (disabled) {
    textareaClasses += ` border-error-500 focus:border-error-300 focus:ring-error-500/10 dark:text-error-400 dark:border-error-500 dark:focus:border-error-800`;
  } else if (error) {
    textareaClasses += ` border-success-500 focus:border-success-300 focus:ring-success-500/10 dark:text-success-400 dark:border-success-500 dark:focus:border-success-800`;
  } else {
    textareaClasses += ` bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-brand-500/10 dark:border-gray-700 dark:text-white/90 dark:focus:border-brand-800`;
  }

  return (
    <div className="relative">
      <textarea
        placeholder={placeholder}
        rows={rows}
        value={value}
        onChange={handleChange}
        disabled={disabled}
        className={textareaClasses}
        {...rest}
      />
      {hint && (
        <p
          className={`mt-2 text-sm ${
            error ? "text-error-500" : "text-gray-500 dark:text-gray-400"
          }`}
        >
          {hint}
        </p>
      )}
    </div>
  );
};

export default TextArea;
