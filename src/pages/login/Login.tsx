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
    <>
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
      >
        <form.Field
          name="email"
          validatorAdapter={zodValidator()}
          validators={{ onChange: z.string().email() }}
          defaultValue=""
        >
          {(field) => {
            return (
              <input
                value={field.state.value}
                onChange={(evt) => {
                  field.handleChange(evt.target.value);
                }}
                onBlur={field.handleBlur}
                type="email"
              />
            );
          }}
        </form.Field>
        <hr />
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
              />
            );
          }}
        </form.Field>
        <hr />
        <form.Subscribe selector={(state) => state.canSubmit}>
          {(canSubmit) => {
            return (
              <button disabled={!canSubmit} type="submit">
                sign in
              </button>
            );
          }}
        </form.Subscribe>
      </form>
      <Link to={"/forgot-password"}>Forgot Password?</Link>
      <Link to={"/signup"}>Sign Up?</Link>
      <hr />
      <SignInWithGithub />
      <SignInWithGoogle />
    </>
  );
}
