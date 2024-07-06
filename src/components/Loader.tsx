import { Loader } from "lucide-react";

const LoaderComponent = () => {
  return (
    <div className="flex items-center justify-center min-h-screen dark:bg-slate-900">
      <Loader className="animate-spin text-gray-800 dark:text-white w-12 h-12" />
    </div>
  );
};

export default LoaderComponent;
