import SignIn from "@/components/SignIn/SignIn";
import ErrorBoundary from "@/utils/ErrorBoundary";
import Error from "./error";

export default function Page() {
  return (
    // @ts-ignore TODO: fix typescript
    <ErrorBoundary fallback={Error}>
      <SignIn />
    </ErrorBoundary>
  );
}
