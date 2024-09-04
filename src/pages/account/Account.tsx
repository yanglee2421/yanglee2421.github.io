import { updateCurrentUser, updateProfile } from "firebase/auth";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useFormStatus } from "react-dom";
import { auth, storage } from "@/api/firebase/app";
import { useCurrentUser } from "@/hooks/firebase/useCurrentUser";
import { NavMenus } from "@/components/shared/NavMenus";

export function Account() {
  const user = useCurrentUser();

  if (!user) {
    return null;
  }

  return (
    <div className="flex h-dvh flex-col">
      <header className="px-5 py-2">
        {user.photoURL && (
          <figure>
            <img src={user.photoURL} alt="" width={64} height={64} />
            <figcaption>{user.displayName}</figcaption>
          </figure>
        )}
      </header>
      <main className="flex-auto px-5 py-2">
        <aside>
          <NavMenus />
        </aside>
        <form
          action={async (formData) => {
            const displayName = getFormValueAsString(formData, "displayName");
            const photoURL = await getFormValueAsHref(
              formData,
              "photoURL",
              user.uid,
            );
            await updateProfile(user, { displayName, photoURL });
            await updateCurrentUser(auth, user);
          }}
          className="mt-6 space-y-3 border px-5 py-2"
        >
          <div>
            <h1 className="text-2xl font-semibold text-slate-700">
              Account Settings
            </h1>
            <p className="text-slate-500">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem
              quaerat nam corporis sed illum modi, doloremque distinctio quam
              sequi unde, magni reiciendis libero ipsum, magnam facilis nihil
              ratione similique laudantium.
            </p>
          </div>
          <fieldset>
            <label htmlFor="">Avatar</label>
            <input
              type="file"
              className="block w-full text-sm text-slate-500 file:mr-4 file:rounded-full file:border-0 file:bg-violet-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-violet-700 hover:file:bg-violet-100"
            />
          </fieldset>
          <fieldset>
            <label htmlFor="">Display Name</label>
            <input
              type="text"
              name="displayName"
              className="block w-full focus:border-blue-500 focus:first-letter:ring-blue-500"
            />
          </fieldset>
          <SubmitButton />
        </form>
      </main>
      <footer className="px-5 py-2">
        &copy;2024 by{" "}
        <a
          href="https://github.com/yanglee2421"
          className="text-blue-500 hover:underline"
        >
          yanglee2421
        </a>
      </footer>
    </div>
  );
}

function SubmitButton() {
  const formStatus = useFormStatus();

  return (
    <button
      disabled={formStatus.pending}
      type="submit"
      className="btn-blue px-5 py-2 text-base uppercase"
    >
      update
    </button>
  );
}

function getFormValueAsString(formData: FormData, field: string) {
  const fieldValue = formData.get(field);

  // Not a string or the string is empty
  if (!fieldValue) {
    return;
  }

  if (typeof fieldValue !== "string") {
    return;
  }

  // Validation passed
  return fieldValue;
}

async function getFormValueAsHref(
  formData: FormData,
  field: string,
  userId: string,
) {
  const fieldValue = formData.get(field);

  // Not a file or the file is empty
  if (!fieldValue) {
    return;
  }

  if (typeof fieldValue === "string") {
    return;
  }

  if (!fieldValue.size) {
    return;
  }

  // Upload file to get image href
  const fileRef = ref(storage, `user/avatar/${userId}`);
  await uploadBytes(fileRef, fieldValue);
  const href = await getDownloadURL(fileRef);

  return href;
}
