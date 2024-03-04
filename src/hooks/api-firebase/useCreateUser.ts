// Query Imports
import { useMutation } from "@tanstack/react-query";
import {
  createUserWithEmailAndPassword,
  getAuth
} from "firebase/auth";

import { app } from "@/api/firebase";

import type {
  UserCredential} from "firebase/auth";

export function useCreateUser() {
  return useMutation<UserCredential, Error, CreateUserData>({
    mutationFn({ email, password }) {
      return createUserWithEmailAndPassword(getAuth(app), email, password);
    },
  });
}

export interface CreateUserData {
  email: string;
  password: string;
}
