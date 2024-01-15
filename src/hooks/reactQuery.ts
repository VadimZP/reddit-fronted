import { useMutation, useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { z } from "zod";

function throwOnError(error: unknown) {
  if (error instanceof AxiosError && error.response) {
    return error.response.status >= 500;
  }

  return false;
}

export const UserSchema = z.object({
  id: z.number(),
  email: z.string(),
  username: z.string(),
  createdAt: z.string(),
  updatedAt: z.string()
});

interface RequestSignUpPayload {
  email: string
  username: string
  password: string
}

async function signUpAPIRequest(payload: RequestSignUpPayload) {
  const response = await axios.post("http://localhost:8000/login", payload, { withCredentials: true });

  return UserSchema.parse(response.data);
}

export function useRequestSignUp() {
  return useMutation({
    mutationFn: signUpAPIRequest,
    throwOnError,
  });
}

interface RequestSignInPayload {
  email: string
  password: string
}

async function signInAPIRequest(payload: RequestSignInPayload) {
  const response = await axios.post("http://localhost:8000/login", payload, { withCredentials: true });

  return UserSchema.parse(response.data);
}

export function useRequestSignIn() {
  return useMutation({
    mutationFn: signInAPIRequest,
    onSuccess: (data) => {
      localStorage.setItem("userData", JSON.stringify(data));
    },
    throwOnError,
  });
}

export const CommunitySchema = z.object({
  id: z.number(),
  title: z.string(),
  createdAt: z.string(),
  creatorId: z.number(),
});

interface RequestCreateCommunityPayload {
  title: string
  creatorId: number
}

async function createCommunityAPIRequest(payload: RequestCreateCommunityPayload) {
  const response = await axios.post("http://localhost:8000/communities", payload, { withCredentials: true });

  return CommunitySchema.parse(response.data);
}

export function useRequestCreateCommunity() {
  return useMutation({
    mutationFn: createCommunityAPIRequest,
    throwOnError,
  });
}

interface RequestGetCommunitiesPayload {
  userId: number
}

export async function getCommunitiesAPIRequest(payload: RequestGetCommunitiesPayload) {
  const response = await axios.get(`http://localhost:8000/${payload.userId}/communities`);

  // return CommunitySchema.parse(response.data);
  return response.data;
}

export function useRequestGetCommunities(payload: RequestGetCommunitiesPayload) {
  return useQuery({
    queryKey: ['communities'],
    queryFn: () => getCommunitiesAPIRequest(payload),
  });
}