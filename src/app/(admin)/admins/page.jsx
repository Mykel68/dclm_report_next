"use client";
import React, { useState, useEffect } from "react";
import PageTitle from "@/components/PageTitle";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MoreHorizontal } from "lucide-react";
import axios from "axios";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
const page = () => {
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    const fetchAdmin = async () => {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}api/auth/`
      );
      console.log(response);
      setAdmins(response.data);
    };
    fetchAdmin();
  }, []);

  return (
    <div className="flex flex-col gap-5  w-full">
      <div className="flex justify-between items-center mt-3">
        <PageTitle title="Admin" />

        <Dialog>
          <DialogTrigger asChild>
            <Button>Add Admin</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Register an Admin</DialogTitle>
              <DialogDescription>
                Add admin to manage section of departments.
              </DialogDescription>
            </DialogHeader>
            <form action="">
              <Input type="text" name="name" placeholder="Enter admin name" />

              <Input type="text" name="name" placeholder="Enter admin name" />
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead className=" sm:table-cell">Email</TableHead>
            <TableHead className=" sm:table-cell">Role</TableHead>
            <TableHead className=" md:table-cell">Section</TableHead>
            <TableHead className=" md:table-cell">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {" "}
          {admins.map((admin) => (
            <TableRow className=" hover:cursor-pointer" key={admin.Id}>
              <TableCell>{admin.first_name}</TableCell>
              <TableCell className=" sm:table-cell">{admin.email}</TableCell>
              <TableCell className=" sm:table-cell">{admin.role}</TableCell>
              <TableCell className=" sm:table-cell">{admin.role}</TableCell>

              <TableCell className=" sm:table-cell">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button aria-haspopup="true" size="icon" variant="ghost">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Toggle menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem>View</DropdownMenuItem>
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem>Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default page;
