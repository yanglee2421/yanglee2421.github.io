import {
  Table,
  TableHead,
  TableHeader,
  TableRow,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import React from "react";
import {
  DialogFooter,
  DialogTitle,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { useCurrentUser } from "@/hooks/firebase/useCurrentUser";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { queryOvertime } from "./queryOvertime";

export function Overtime() {
  const [showDialog, setShowDialog] = React.useState(false);
  const user = useCurrentUser();
  const form = useForm({
    defaultValues: {},
  });
  const query = useQuery(queryOvertime);

  if (!user) {
    return null;
  }

  if (query.isPending) {
    return null;
  }

  if (query.isError) {
    return null;
  }

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Overtime</CardTitle>
        </CardHeader>
        <CardContent>
          <Dialog open={showDialog} onOpenChange={setShowDialog}>
            <DialogTrigger>
              <Button className="uppercase">add</Button>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>ADD</DialogTitle>
              </DialogHeader>
              <Form {...form}>
                <form></form>
              </Form>
              <DialogFooter>
                <Button>ADD</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardContent>
        <Table>
          <TableHeader></TableHeader>
          <TableBody></TableBody>
        </Table>
      </Card>
    </div>
  );
}
