"use client";

import { LoadScript } from "@react-google-maps/api";
import { Amplify } from "aws-amplify";
import { ReactNode, useEffect } from "react";

type AmplifyProviderProps = {
  children: ReactNode;
};

export default function AmplifyProvider({ children }: AmplifyProviderProps) {
  useEffect(() => {
    Amplify.configure({
      Auth: {
        Cognito: {
          userPoolId: process.env.NEXT_PUBLIC_COGNITO_USERPOOL_ID ?? "",
          userPoolClientId: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID ?? "",
          loginWith: {
            email: true,
          },
        },
      },
    });
  }, []);

  return <>{children}</>;
}
