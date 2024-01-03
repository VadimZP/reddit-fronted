"use client";

import React from "react";
import {
  QueryClientProvider,
  QueryClient,
  QueryCache,
  MutationCache,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ReactQueryStreamedHydration } from "@tanstack/react-query-next-experimental";
import { ZodError } from "zod";
import { toast } from "react-toastify";

function Providers({ children }: React.PropsWithChildren) {
  const [client] = React.useState(
    new QueryClient({
      queryCache: new QueryCache({
        onError: (error) => {
          console.error("queryCache", error);
        },
      }),
      mutationCache: new MutationCache({
        onError: (error) => {
          if (error instanceof ZodError) {
            const { fieldErrors } = error.flatten((issue) => issue.message);

            toast.error(JSON.stringify(fieldErrors, null, 2));
          }
        },
      }),
    })
  );

  return (
    <QueryClientProvider client={client}>
      <ReactQueryStreamedHydration>{children}</ReactQueryStreamedHydration>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default Providers;
