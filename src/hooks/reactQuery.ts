import { useMutation } from "@tanstack/react-query";

interface RequestSignInPayload {
  email: string
  password: string
}

interface RequestSignInResponse {
  id: number
  email: string
  username: string
  password: string
  createdAt: Date
  updatedAt: Date
}

export function useRequestSignIn() {
  return useMutation<Response, unknown, RequestSignInPayload>({
    mutationFn: async (signInPayload) =>
      fetch("http://localhost:8000/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signInPayload),
      }),
    onSuccess: async (response) => {
      const { data }: { data: RequestSignInResponse } = await response.json();

      localStorage.setItem("userData", JSON.stringify(data));
    },
    onError: (error, variables, context) => {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  });
}