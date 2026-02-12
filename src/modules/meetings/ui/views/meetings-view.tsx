"use client"

import { ErrorState } from "@/components/error-state"
import { LoadingState } from "@/components/loading-state"
import { useTRPC } from "@/trpc/client"
import { useQuery } from "@tanstack/react-query"


export const MeetingsView = () => {

    const trpc = useTRPC()
    const {data} = useQuery(trpc.meetings.getMany.queryOptions({}))


    return (
        <div className="overflow-x-scroll">
          {JSON.stringify(data)}
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