import { useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";
import { z } from "zod";
import { SignInWithGithub } from "@/components/shared/SignInWithGithub";
import { SignInWithGoogle } from "@/components/shared/SignInWithGoogle";

export function Login() {
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },

    async onSubmit(data) {
      await signInWithEmailAndPassword(
        getAuth(),
        data.value.email,
        data.value.password,
      );
    },
  });

  return (
    <div className="flex h-dvh md:divide-x">
      <div className="min-w-0 flex-1"></div>
      <div className="flex w-full max-w-96 flex-col justify-center px-5 py-2">
        <div>
          <form
            onSubmit={(evt) => {
              evt.preventDefault();
              evt.stopPropagation();
              form.handleSubmit();

              if (!import.meta.env.DEV) {
                return;
              }

              const errorEntries = Object.entries(form.state.fieldMeta)
                .map(([key, value]) => [key, value.errors])
                .filter(([, error]) => error.length);

              if (!errorEntries.length) {
                return;
              }

              console.error(
                "Error Message:",
                "\n",
                Object.fromEntries(errorEntries),
                "\n",
                "Form Values:",
                "\n",
                form.state.values,
              );
            }}
            onReset={(evt) => {
              evt.stopPropagation();
              form.reset();
            }}
            noValidate
            autoComplete="off"
            className="space-y-3"
          >
            <form.Field
              name="email"
              validatorAdapter={zodValidator()}
              validators={{ onChange: z.string().email() }}
              defaultValue=""
            >
              {(field) => {
                return (
                  <label>
                    <input
                      value={field.state.value}
                      onChange={(evt) => {
                        field.handleChange(evt.target.value);
                      }}
                      onBlur={field.handleBlur}
                      type="email"
                      className="block w-full focus:border-blue-500 focus:ring-blue-500"
                    />
                  </label>
                );
              }}
            </form.Field>
            <form.Field
              name="password"
              validatorAdapter={zodValidator()}
              validators={{
                onChange: z.string().min(8).max(16),
              }}
            >
              {(field) => {
                return (
                  <input
                    value={field.state.value}
                    onChange={(evt) => {
                      field.handleChange(evt.target.value);
                    }}
                    onBlur={field.handleBlur}
                    type="password"
                    className="block w-full"
                  />
                );
              }}
            </form.Field>
            <div className="flex justify-between">
              <Link
                to={"/forgot-password"}
                className="text-blue-500 hover:underline"
              >
                Forgot Password?
              </Link>
              <Link to={"/signup"} className="text-blue-500 hover:underline">
                Sign Up?
              </Link>
            </div>
            <form.Subscribe selector={(state) => state.canSubmit}>
              {(canSubmit) => {
                return (
                  <button
                    disabled={!canSubmit}
                    type="submit"
                    className="btn-blue block w-full px-5 py-2 text-base uppercase"
                  >
                    sign in
                  </button>
                );
              }}
            </form.Subscribe>
            <SignInWithGithub />
            <SignInWithGoogle />
          </form>
        </div>
      </div>
    </div>
  );
}
