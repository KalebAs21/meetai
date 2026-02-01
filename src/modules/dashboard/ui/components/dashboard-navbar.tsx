"use client";
import { useState, useEffect } from "react";

import { PanelLeftIcon, PanelLeftCloseIcon, SearchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { DashboardCommand } from "./dashboard-command";


export const DashboardNavbar = () => {
    const [commandOpen, setCommandOpen] = useState(false)
    const { state, toggleSidebar, isMobile } = useSidebar();
   
   useEffect(() => {
  const down = (e: KeyboardEvent) => {
    if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      setCommandOpen((open) => !open);
    }
  };

  document.addEventListener("keydown", down);
  return () => document.removeEventListener("keydown", down);
}, []); // 'state' is assigned a value but not used

    return (
        <>
            <DashboardCommand open={commandOpen} setOpen={setCommandOpen} />
            <nav className="flex px-4 gap-x-2 items-center py-3 border-b bg-background">
                <Button
                    className="size-9 mt-3"
                    variant="outline"
                    onClick={toggleSidebar}
                >
                    {state === "collapsed" || isMobile ? (
                        <PanelLeftIcon className="size-4" />
                    ) : (
                        <PanelLeftCloseIcon className="size-4" />
                    )}
                </Button>
                <Button
                    className="h-9 w-[240px] justify-start font-normal text-muted-foreground
                hover:text-muted-foreground"
                    variant="outline"
                    size="sm"
                    onClick={() => setCommandOpen((open) => !open)}
                >
                    <SearchIcon />
                    Search
                    <kbd
                        className="ml-auto pointer-events-none rounded-border bg-muted px-1.5 text-[10px]
                gap-1 font-mono font-medium text-muted-foreground"
                    >
                        <span>Ctrl k</span>
                    </kbd>
                </Button>
            </nav>
        </>
    );
}