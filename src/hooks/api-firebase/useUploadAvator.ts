// Query Imports
import { useMutation } from "@tanstack/react-query";

// Firebase Imports
import { ref, getStorage, uploadBytes, getDownloadURL } from "firebase/storage";
import { getAuth, updateProfile, User } from "firebase/auth";
import { app } from "@/api/firebase";

// Store Imports
import { useAuth } from "@/hooks/store";

export function useUploadAvator() {
  const [, setUpdateAt] = useAuth();
  return useMutation<User, Error, Blob>({
    async mutationFn(blob) {
      const user = getAuth(app).currentUser;

      if (!user) {
        throw new Error("Not authorization");
      }

      const fileRef = ref(getStorage(app), `user/avatar/${user.uid}`);
      await uploadBytes(fileRef, blob);
      const photoURL = await getDownloadURL(fileRef);
      await updateProfile(user, { photoURL });

      return user;
    },
    onError(error) {
      console.error(error);
    },
    onSuccess() {
      setUpdateAt(Date.now());
    },
  });
}
