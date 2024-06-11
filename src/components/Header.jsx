"use client";
import React from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, CircleUser } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const Header = () => {
  const router = useRouter();
  const Logout = async () => {
    try {
      // Make a request to log out the user
      await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}api/auth/logout`);

      // Remove token from cookie
      Cookies.remove("token");

      // Redirect to login page
      router.push("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };
  return (
    <div className="flex  items-center justify-center gap-1 mb-3">
      <div className="w-full flex-1">
        <form>
          <div className="relative  ">
            <Search className=" absolute  left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products..."
              className="w-full appearance-none bg-background  pl-8 shadow-none md:w-2/3 lg:w-1/3"
            />
          </div>
        </form>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" size="icon" className="rounded-full">
            <CircleUser className="h-5 w-5" />
            <span className="sr-only">Toggle user menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuItem>Support</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={Logout}>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Header;
