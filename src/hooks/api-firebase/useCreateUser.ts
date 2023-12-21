// Query Imports
import { useMutation } from "@tanstack/react-query";
import {
  createUserWithEmailAndPassword,
  getAuth,
  UserCredential,
} from "firebase/auth";
import { app } from "@/api/firebase";

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
