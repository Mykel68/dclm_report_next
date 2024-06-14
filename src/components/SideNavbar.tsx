/** @format */
"use client";

import { useState } from "react";
import { Nav } from "./ui/nav";

type Props = {};

import {
  ShoppingCart,
  LayoutDashboard,
  UsersRound,
  Settings,
  ChevronRight,
} from "lucide-react";
import { Button } from "./ui/button";
import Logo from "@/assets/logo.png";
import Image from "next/image";

import { useWindowWidth } from "@react-hook/window-size";

export default function SideNavbar({}: Props) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const onlyWidth = useWindowWidth();
  const mobileWidth = onlyWidth < 768;

  function toggleSidebar() {
    setIsCollapsed(!isCollapsed);
  }

  return (
    <div className="relative  min-w-[200px] border-r px-3  pb-10 pt-10 ">
      {!mobileWidth && (
        <div className="absolute right-[-20px] top-7 ">
          <Button
            onClick={toggleSidebar}
            variant="secondary"
            className=" rounded-full p-2"
          >
            <ChevronRight />
          </Button>
        </div>
      )}
      <div className="flex  items-center justify-center gap-1 mb-3">
        <Image src={Logo} alt="logo" style={{ width: 70, height: 70 }} />
      </div>
      <Nav
        isCollapsed={mobileWidth ? true : isCollapsed}
        links={[
          {
            title: "Home",
            href: "/home",
            icon: LayoutDashboard,
            variant: "default",
          },
          {
            title: "Report",
            href: "/reports",
            icon: LayoutDashboard,
            variant: "default",
          },
          // {
          //   title: "Users",
          //   href: "/users",
          //   icon: UsersRound,
          //   variant: "ghost",
          // },
          // {
          //   title: "Ordrs",
          //   href: "/orders",
          //   icon: ShoppingCart,
          //   variant: "ghost",
          // },
          {
            title: "Settings",
            href: "/settings",
            icon: Settings,
            variant: "ghost",
          },
          {
            title: "Admin",
            href: "/admins",
            icon: ShoppingCart,
            variant: "ghost",
          },
        ]}
      />
    </div>
  );
}
