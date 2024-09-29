import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";
import { z } from "zod";
import { SignInWithGithub } from "@/components/shared/SignInWithGithub";
import { SignInWithGoogle } from "@/components/shared/SignInWithGoogle";
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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(16),
});

export function Login() {
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },

    resolver: zodResolver(schema),
  });

  return (
    <div className="flex h-dvh md:divide-x">
      <div className="min-w-0 flex-1"></div>
      <div className="flex w-full max-w-96 flex-col justify-center px-5 py-2">
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(async (data) => {
                await signInWithEmailAndPassword(
                  auth,
                  data.email,
                  data.password,
                );
              }, console.error)}
              onReset={(evt) => {
                evt.stopPropagation();
                form.reset();
              }}
              noValidate
              autoComplete="off"
              className="space-y-3"
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
                        className="block w-full focus:border-blue-500 focus:ring-blue-500"
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
                        className="block w-full focus:border-blue-500 focus:ring-blue-500"
                      />
                    </FormControl>
                    <FormDescription>typing password here</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-between">
                <Button asChild variant={"link"}>
                  <Link to={"/forgot-password"} className="!p-0">
                    Forgot Password?
                  </Link>
                </Button>
                <Button asChild variant={"link"}>
                  <Link to={"/signup"} className="!p-0">
                    Sign Up?
                  </Link>
                </Button>
              </div>
              <Button type="submit" className="block w-full uppercase">
                sign in
              </Button>
              <SignInWithGithub />
              <SignInWithGoogle />
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
