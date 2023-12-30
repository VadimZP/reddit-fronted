import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

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

/* fetch("http://localhost:8000/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signInPayload),
      }) */

export function useRequestSignIn() {
  return useMutation<Response, unknown, RequestSignInPayload>({
    mutationFn: async (signInPayload) => axios.post("http://localhost:8000/login", signInPayload),
    onSuccess: async (response) => {
      console.log("🚀 ~ file: reactQuery.ts:31 ~ onSuccess: ~ response:", response)
      const { data }: { data: RequestSignInResponse } = await response.json();

      localStorage.setItem("userData", JSON.stringify(data));
    },
    onError: (error, variables, context) => {},
    // 🚀 only server errors will go to the Error Boundary 
    // @ts-ignore
    throwOnError: (error) => error.response?.status >= 500,
  });
}