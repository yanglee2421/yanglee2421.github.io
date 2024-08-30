import { getAuth } from "firebase/auth";

export const auth = getAuth();
export const authReady = auth.authStateReady();
