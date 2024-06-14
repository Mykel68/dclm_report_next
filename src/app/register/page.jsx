"use client";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Logo from "@/assets/logo.png";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    section: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}api/auth/register`,
        user
      );
      if (response.status === 201) {
        toast.success("Registered successfully");
      } else {
        toast.error(" Error");
      }
    } catch (err) {
      toast.error("Error Registering User");
      console.error(err);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
      <Image
        src={Logo}
        alt="Image"
        width={80}
        className="object-cover dark:brightness-[0.2] dark:grayscale mb-3 "
      />
      <Card className="max-w-[300px] lg:max-w-sm ">
        <CardHeader>
          <CardTitle className="text-xl">Register</CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="grid gap-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="first-name">First name</Label>
                <Input
                  id="first_name"
                  name="first_name"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="last-name">Last name</Label>
                <Input
                  id="last_name"
                  name="last_name"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                name="email"
                onChange={handleChange}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="section">Section</Label>
              <select
                id="section"
                name="section"
                onChange={handleChange}
                className=" py-3 rounded-md text-xs bg-background border border-blue-950"
              >
                <option value="">Select your section...</option>
                <option value="Zoom and Playback">Zoom and Playback</option>
                <option value="Teleprompting">Teleprompting</option>
                <option value="Video">Video</option>
                <option value="Audio">Audio</option>
                <option value="Streaming">Streaming</option>
                <option value="Uplink">Uplink</option>
                <option value="Graphics">Graphics</option>
              </select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                name="password"
                onChange={handleChange}
              />
            </div>
            <Button type="submit" className="w-full">
              Create an account
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
