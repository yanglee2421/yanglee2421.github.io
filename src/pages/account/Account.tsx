import { updateCurrentUser, updateProfile } from "firebase/auth";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useFormStatus } from "react-dom";
import { NavLink } from "react-router-dom";
import { auth, storage } from "@/api/firebase/app";
import { useCurrentUser } from "@/hooks/firebase/useCurrentUser";

export function Component() {
  return (
    <>
      <title>Account</title>
      <Account />
    </>
  );
}
function Account() {
  const user = useCurrentUser();

  if (!user) {
    return null;
  }

  return (
    <>
      <header>
        {user.photoURL && (
          <figure>
            <img src={user.photoURL} alt="" width={64} height={64} />
            <figcaption>{user.displayName}</figcaption>
          </figure>
        )}
      </header>
      <aside>
        <ul>
          <li>
            <NavLink to="/">home</NavLink>
          </li>
        </ul>
      </aside>
      <main>
        <form
          action={async (formData) => {
            const displayName = (() => {
              const nameField = formData.get("displayName");

              // Not a string or the string is empty
              if (!nameField) {
                return;
              }

              if (typeof nameField !== "string") {
                return;
              }

              // Validation passed
              return nameField;
            })();

            const photoURL = await (async () => {
              const fileField = formData.get("photoURL");

              // Not a file or the file is empty
              if (!fileField) {
                return;
              }

              if (typeof fileField === "string") {
                return;
              }

              if (!fileField.size) {
                return;
              }

              // Upload file to get image href
              const fileRef = ref(storage, `user/avatar/${user.uid}`);
              await uploadBytes(fileRef, fileField);
              const href = await getDownloadURL(fileRef);

              return href;
            })();

            await updateProfile(user, { displayName, photoURL });
            await updateCurrentUser(auth, user);
          }}
        >
          <input type="file" name="photoURL" accept="image/*" />
          <input type="text" name="displayName" />
          <SubmitButton />
        </form>
      </main>
      <footer></footer>
    </>
  );
}

function SubmitButton() {
  const formStatus = useFormStatus();

  return (
    <button disabled={formStatus.pending} type="submit">
      update
    </button>
  );
}
