// Query Imports
import { useMutation } from "@tanstack/react-query";

// Firebase Imports
import { ref, getStorage, uploadBytes, getDownloadURL } from "firebase/storage";
import { getAuth, updateProfile, User } from "firebase/auth";
import { app } from "@/api/firebase";

// Store Imports
import { useAuthStore } from "@/hooks/store";
import { useShallow } from "zustand/react/shallow";

export function useUploadAvator() {
  const update = useAuthStore(
    useShallow((store) => {
      return store.update;
    })
  );
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
      update();
    },
  });
}
