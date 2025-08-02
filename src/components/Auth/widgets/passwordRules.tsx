import clsx from "clsx";
import { Check, X } from "lucide-react";
import React from "react";

const passwordRules = {
  minLength: 8,
  lowercase: /[a-z]/,
  uppercase: /[A-Z]/,
  number: /[0-9]/,
  special: /[^A-Za-z0-9]/,
};

export const PasswordRules = ({ password }: { password: string }) => {
  const checkRules = (pwd: string) => ({
    minLength: pwd?.length >= passwordRules.minLength,
    lowercase: passwordRules.lowercase.test(pwd),
    uppercase: passwordRules.uppercase.test(pwd),
    number: passwordRules.number.test(pwd),
    special: passwordRules.special.test(pwd),
  });

  const rules = checkRules(password);

  return (
    <ul className="mt-3 mb-4 space-y-1 text-sm text-gray-600 dark:text-gray-300">
      <li className="flex items-center gap-2">
        {rules.minLength ? (
          <Check className="w-4 h-4 text-green-600" />
        ) : (
          <X className="w-4 h-4 text-gray-400" />
        )}
        <span
          className={clsx(rules.minLength ? "text-green-600" : "text-gray-400")}
        >
          Minimum 8 characters
        </span>
      </li>
      <li className="flex items-center gap-2">
        {rules.lowercase ? (
          <Check className="w-4 h-4 text-green-600" />
        ) : (
          <X className="w-4 h-4 text-gray-400" />
        )}
        <span
          className={clsx(rules.lowercase ? "text-green-600" : "text-gray-400")}
        >
          At least one lowercase letter
        </span>
      </li>
      <li className="flex items-center gap-2">
        {rules.uppercase ? (
          <Check className="w-4 h-4 text-green-600" />
        ) : (
          <X className="w-4 h-4 text-gray-400" />
        )}
        <span
          className={clsx(rules.uppercase ? "text-green-600" : "text-gray-400")}
        >
          At least one uppercase letter
        </span>
      </li>
      <li className="flex items-center gap-2">
        {rules.number ? (
          <Check className="w-4 h-4 text-green-600" />
        ) : (
          <X className="w-4 h-4 text-gray-400" />
        )}
        <span
          className={clsx(rules.number ? "text-green-600" : "text-gray-400")}
        >
          At least one number
        </span>
      </li>
      <li className="flex items-center gap-2">
        {rules.special ? (
          <Check className="w-4 h-4 text-green-600" />
        ) : (
          <X className="w-4 h-4 text-gray-400" />
        )}
        <span
          className={clsx(rules.special ? "text-green-600" : "text-gray-400")}
        >
          At least one special character
        </span>
      </li>
    </ul>
  );
};
