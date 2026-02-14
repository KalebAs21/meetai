"use client"

import { ErrorState } from "@/components/error-state"
import { LoadingState } from "@/components/loading-state"
import { useTRPC } from "@/trpc/client";
import {
    useMutation,
    useQueryClient,
    useSuspenseQuery,
} from "@tanstack/react-query";
import { MeetingIdViewHeader } from "../components/meeting-id-view-header";
import { useRouter } from "next/navigation";
import { useConfirm } from "@/hooks/use-confirm";
import { UpdateMeetingDialog } from "../components/update-meeting -dialog";
import { useState } from "react";
import { UpComingState } from "../components/upcoming-state";
import { ActiveState } from "../components/active-state";
import { CancelledState } from "../components/cancelled-state";
import { ProcessingState } from "../components/processing-state";



interface Props{
    meetingId: string;
};

export const MeetingIdView = ({ meetingId }: Props) => {

    const [updateMeetingDialogOpen, setUpdateDialogOpen] = useState(false);

    const router = useRouter()
    const queryClient = useQueryClient();
    const trpc = useTRPC()

    const { data } = useSuspenseQuery(
        trpc.meetings.getOne.queryOptions({id: meetingId}),
    ) 

    const removeMeeting = useMutation(
            trpc.meetings.remove.mutationOptions({
                onSuccess: async() => {
              await  queryClient.invalidateQueries(trpc.meetings.getMany.queryOptions({}));
                    //Todo: invalidate free tire Usage
                    router.push("/meetings");
                },
            })
    )
    const [RemoveConfirmaion, confirmRemove] = useConfirm(
            "Are you sure?",
            `the following action will romve meeting`
        )
    
        const handleRemoveMeeting = async () => {
            const ok = await confirmRemove()
    
            if (!ok) return;
            await removeMeeting.mutateAsync({id: meetingId})
        }

        const isActive = data.status === "active";
        const isUpcoming = data.status === "upcoming";
        const isCancelled = data.status === "cancelled";
        const isCompleted = data.status === "completed";
        const isProcessing = data.status === "processing";

        

    return (
        <>
            <RemoveConfirmaion />
            <UpdateMeetingDialog
                open={updateMeetingDialogOpen}
                onOpenChange={setUpdateDialogOpen}
                initialValues={data}
            />
            <div className="flex-1 py-4 px-4 md:px-8 flex flex-col gap-y-4">
                <MeetingIdViewHeader
                    meetingId={meetingId}
                    meetingName={data.name}
                    onEdit={() => setUpdateDialogOpen(true)}
                    onRemove={handleRemoveMeeting}
                />
                {isCancelled && <CancelledState />}
                {isProcessing && <ProcessingState />}
                {isCompleted && <div>Completed</div>}
                {isActive &&
                    <ActiveState
                    meetingId={meetingId}
                    />}
                {isUpcoming &&
                    <UpComingState
                    meetingId={meetingId}
                    onCancelMeeting={()=>{}}
                    isCancelling={false}
                    />}
            </div>
        </>
    );
}


export const MeetingIdViewLoading = () => {
    return (
        <LoadingState
            title="Loading Meeting"
            description="this may takes a few second" />
    )
}
export const MeetingIdViewError = () => {
    return (
            <ErrorState
                title="Error loading Meeting"
                description="something went wrong"/>
        )
}