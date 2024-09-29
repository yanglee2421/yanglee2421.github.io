import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";
import { z } from "zod";
import { auth } from "@/api/firebase/app";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

const schema = z
  .object({
    email: z.string().email(),
    password: z.string().min(6).max(16),
    confirmPassword: z.string().min(6).max(16),
    checked: z.boolean(),
  })
  .refine((value) => Object.is(value.password, value.confirmPassword), {
    path: ["confirmPassword"],
    message: "The password is not as same as confirm password",
  });

export function SignUp() {
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      checked: false,
    },

    resolver: zodResolver(schema),
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(async (data) => {
          console.log(data);

          await createUserWithEmailAndPassword(auth, data.email, data.password);
        }, console.error)}
        onReset={(evt) => {
          evt.stopPropagation();
          form.reset();
        }}
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
              <FormDescription>typing email here</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>password</FormLabel>
              <FormControl>
                <Input
                  value={field.value}
                  onChange={(evt) => {
                    field.onChange(evt.target.value);
                  }}
                  onBlur={field.onBlur}
                  type="password"
                />
              </FormControl>
              <FormDescription>typing password here</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>confirm password</FormLabel>
              <FormControl>
                <Input
                  value={field.value}
                  onChange={(evt) => {
                    field.onChange(evt.target.value);
                  }}
                  onBlur={field.onBlur}
                  type="password"
                />
              </FormControl>
              <FormDescription>typing confirm password here</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="checked"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <span>I agree to</span>
                <Link to={"/privacy-policy"}>privacy policy & terms</Link>
              </FormLabel>
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={(evt) => {
                    field.onChange(evt);
                  }}
                />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="uppercase">
          register
        </Button>
      </form>
      <Button asChild variant={"link"}>
        <Link to={"/login"}>Sign in insead</Link>
      </Button>
    </Form>
  );
}
