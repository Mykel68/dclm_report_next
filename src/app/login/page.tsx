import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Logo from '@/assets/logo.png'

export default function Dashboard() {
  return (
      <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2 ">
           <div className="hidden bg-muted lg:flex items-center justify-center">
        <Image
          src={Logo}
          alt="Image"
  width={300}
          className="  object-cover dark:brightness-[0.2] dark:grayscale " 
        />
      </div>
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email below to login to your account
            </p>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
           
              </div>
              <Input id="password" type="password" required />
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
        
          </div>
          
        </div>
      </div>
     
    </div>
  )
}
