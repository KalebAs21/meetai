"use client"

import { ErrorState } from "@/components/error-state"
import { LoadingState } from "@/components/loading-state"
import { useTRPC } from "@/trpc/client"
import { useQuery } from "@tanstack/react-query"
import { DataTable } from "@/components/data-table"
import {columns} from "../components/columns"
import { EmptyState } from "@/components/empty-state"

export const MeetingsView = () => {

    const trpc = useTRPC()
    const {data} = useQuery(trpc.meetings.getMany.queryOptions({}))


    return (
        <div className="flex pb-4 px-4 md:px-8 flex-col gap-4 gap-y-4">
            <DataTable data={data?.items ?? []} columns={columns} />

             {data?.items.length === 0 && (
                            <EmptyState
                                title="Create new meeting"
                                description="Schedule a meeting to connect with other and agents. 
                            each agent will follow your instruction  and intract with praticipat during call"
                            />
                        )}
        </div>
    )
}

export const MeetigsViewLoading = () => {
    return (
        <LoadingState
            title="Loading Meetings"
            description="this may takes a few second" />
    )
}
export const MeetingsViewError = () => {
    return (
            <ErrorState
                title="Error loading Meetings"
                description="something want wrong"/>
        )
}