import React from "react";
import { Button } from "./components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./components/ui/dialog";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";

interface Props {
  title: string;
  desc: string;
  children: React.ReactNode;
}

export function Modal({ title, desc, children }: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">{title}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{desc}</DialogDescription>
        </DialogHeader>
        {children}
        {/* <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter> */}
      </DialogContent>
    </Dialog>
  );
}
