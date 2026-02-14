
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { useTRPC } from "@/trpc/client";
import { CommandSelect } from "@/components/command-select";
import { GeneratedAvatar } from "@/components/generated-avatar";

import { useMeetingsFilters } from "../../hooks/use-meetings-filters";

export const AgentIdFilter = () => {
    const [filters, setFilters] = useMeetingsFilters();
    const trpc = useTRPC();
}