import { useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { sendPasswordResetEmail } from "firebase/auth";
import { Link } from "react-router-dom";
import { z } from "zod";
import { auth } from "@/api/firebase/auth";

export function ForgotPassword() {
  const form = useForm({
    defaultValues: {
      email: "",
    },

    async onSubmit(props) {
      await sendPasswordResetEmail(auth, props.value.email);
    },
  });

  return (
    <>
      <form
        onSubmit={async (evt) => {
          evt.preventDefault();
          evt.stopPropagation();

          await form.handleSubmit();
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
        <form.Subscribe selector={(state) => state.canSubmit}>
          {(canSubmit) => {
            return (
              <button type="submit" disabled={!canSubmit}>
                send reset link
              </button>
            );
          }}
        </form.Subscribe>
      </form>
      <Link to={"/login"}>Back to login</Link>
    </>
  );
}
