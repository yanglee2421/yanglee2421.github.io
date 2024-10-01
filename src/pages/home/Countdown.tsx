import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React from "react";
import { useForm } from "react-hook-form";

export function Countdown() {
  const [second, setSecond] = React.useState(100);
  const form = useForm({
    defaultValues: {},
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>{Math.round(second) + "s"}</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            action=""
            className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            <FormItem>
              <FormLabel>Hour</FormLabel>
              <FormControl>
                <Input />
              </FormControl>
              <FormDescription>hour</FormDescription>
              <FormMessage />
            </FormItem>
            <FormItem>
              <FormLabel>minute</FormLabel>
              <FormControl>
                <Input />
              </FormControl>
              <FormDescription>minute</FormDescription>
              <FormMessage />
            </FormItem>
            <FormItem>
              <FormLabel>second</FormLabel>
              <FormControl>
                <Input />
              </FormControl>
              <FormDescription>second</FormDescription>
              <FormMessage />
            </FormItem>
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <div className="flex gap-3">
          <Button onClick={() => {}} className="uppercase">
            start
          </Button>
          <Button
            onClick={() => {
              setSecond(100);
            }}
            variant={"outline"}
            className="uppercase"
          >
            restore
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
