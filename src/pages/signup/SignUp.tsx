import { useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";
import { z } from "zod";
import { auth } from "@/api/firebase/app";

export function SignUp() {
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      checked: false,
    },

    async onSubmit(props) {
      await createUserWithEmailAndPassword(
        auth,
        props.value.email,
        props.value.password,
      );
    },
  });

  return (
    <>
      <form
        onSubmit={async (evt) => {
          evt.preventDefault();
          evt.stopPropagation();

          await form.handleSubmit();

          if (!import.meta.env.DEV) {
            return;
          }

          const errorEntries = Object.entries(form.state.fieldMeta)
            .map(([key, value]) => {
              return [key, value.errors];
            })
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
      >
        <form.Field
          name="email"
          validatorAdapter={zodValidator()}
          validators={{
            onChange: z.string().email(),
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
                type="email"
              />
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
              />
            );
          }}
        </form.Field>
        <form.Field
          name="confirmPassword"
          validators={{
            onChangeListenTo: ["password"],
            onChange(evt) {
              return Object.is(
                evt.value,
                evt.fieldApi.form.getFieldValue("password"),
              )
                ? null
                : "Passwords do not match";
            },
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
              />
            );
          }}
        </form.Field>
        <form.Field
          name="checked"
          validatorAdapter={zodValidator()}
          validators={{
            onChange: z.literal(true),
          }}
        >
          {(field) => {
            return (
              <label>
                <input
                  checked={field.state.value}
                  onChange={(evt) => {
                    void evt;
                    field.handleChange(evt.target.checked);
                  }}
                  type="checkbox"
                />
                I agree to
                <Link to={"/privacy-policy"}>privacy policy & terms</Link>
              </label>
            );
          }}
        </form.Field>
        <form.Subscribe
          selector={(state) => state.values.checked && state.canSubmit}
        >
          {(canSubmit) => {
            return (
              <button type="submit" disabled={!canSubmit}>
                register
              </button>
            );
          }}
        </form.Subscribe>
      </form>
      <Link to={"/login"}>Sign in insead</Link>
    </>
  );
}
