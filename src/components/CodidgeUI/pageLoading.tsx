import { LoadingSpinner } from "./loadingSpinner";
import { LoadingIndicator } from "./loadingWidget";

interface ILoadingPageProps {
  className?: string;
}

export const PageLoading = ({ className }: ILoadingPageProps) => {
  return (
    <div
      className={`w-full h-[70vh] flex items-center justify-center ${
        className ?? ""
      }`}
    >
      <LoadingIndicator />
    </div>
  );
};
