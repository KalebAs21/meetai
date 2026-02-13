"use client";

import { LoadingState } from "@/components/loading-state";
import { ErrorState } from "@/components/error-state";
import { useTRPC } from "@/trpc/client";
import {useSuspenseQuery } from "@tanstack/react-query";
//import { ResponsiveDialog } from "@/components/responsive-dialog";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/data-table"
import { columns } from "./components/columns";
import { EmptyState } from "@/components/empty-state";
import { useAgentsFilters } from "../../hooks/use-agents-filters";
import { DataPagination } from "./components/data-pagination";
import { useRouter } from "next/navigation";


export const AgentsView = () => {
    const router = useRouter()
    const [filters, setFilters] = useAgentsFilters()

    const trpc = useTRPC();
    const { data } = useSuspenseQuery(trpc.agents.getMany.queryOptions({
        ...filters
    }))
    return (
        <div className="flex-1 pb-4 px-4 md:px-8 flex flex-col gap-y-4">
            {/* <ResponsiveDialog
                title="Responsive test"
                description="Responsive description test" 
                open={true}
                onOpenChange={()=>{}}
            >
                <Button>
                  some action
                </Button>
            </ResponsiveDialog> */}
            {/* {
                JSON.stringify(data, null, 2)
            } */}
            <DataTable
                data={data.items}
                columns={columns}
                onRowClick={(row) => {
                    console.log(row);
                    router.push(`/agents/${row.id}`);
                }}
            />
            <DataPagination
                page={filters.page}
                totalPages={data.totalPages}
                onPageChange={(page) => setFilters({ page })}
            />
            {data.items.length === 0 && (
                <EmptyState
                    title="Create new agent"
                    description="Creat your agent to join your meetings. 
                each agent will follow your instruction  and intract with praticipat during call"
                />
            )}
        </div>
    );
}

export const AgentsViewLoading = () => {
    return (
        <LoadingState
            title="Loading Agents"
            description="this may takes a few second" />
    )
}
export const AgentsViewError = () => {
    return (
            <ErrorState
                title="Error loading agents"
                description="something want wrong"/>
        )
}