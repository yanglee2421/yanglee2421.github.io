import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { sendPasswordResetEmail } from "firebase/auth";
import { Link } from "react-router-dom";
import { z } from "zod";
import { auth } from "@/api/firebase/app";
import {
  Form,
  FormField,
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const schema = z.object({
  email: z.string().email(),
});

export function ForgotPassword() {
  const form = useForm({
    defaultValues: {
      email: "",
    },

    resolver: zodResolver(schema),
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(async (data) => {
          await sendPasswordResetEmail(auth, data.email);
        })}
        onReset={(evt) => {
          evt.stopPropagation();

          form.reset();
        }}
        noValidate
        autoComplete="off"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>email</FormLabel>
              <FormControl>
                <Input
                  value={field.value}
                  onChange={(evt) => {
                    field.onChange(evt.target.value);
                  }}
                  onBlur={field.onBlur}
                  type="email"
                />
              </FormControl>
              <FormDescription>field FormDescription</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={form.formState.isSubmitting}>
          send reset link
        </Button>
      </form>
      <Button asChild variant={"link"}>
        <Link to={"/login"}>Back to login</Link>
      </Button>
    </Form>
  );
}
