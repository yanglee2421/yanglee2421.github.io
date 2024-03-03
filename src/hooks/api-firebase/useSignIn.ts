// Query Imports
import { useMutation } from "@tanstack/react-query";
import type {
  UserCredential} from "firebase/auth";
import {
  getAuth,
  signInWithEmailAndPassword
} from "firebase/auth";

import { app } from "@/api/firebase";

export function useSignIn() {
  return useMutation<UserCredential, Error, Req>({
    mutationFn({ email, password }) {
      return signInWithEmailAndPassword(getAuth(app), email, password);
    },
  });
}

export interface Req {
  email: string;
  password: string;
}
