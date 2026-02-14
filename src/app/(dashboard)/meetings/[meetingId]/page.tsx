import { auth } from '@/lib/auth'
import { trpc } from '@/trpc/server'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import React from 'react'
import { getQueryClient } from '@/trpc/server'
import { HydrationBoundary, dehydrate } from '@tanstack/react-query'
import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { MeetingIdView, MeetingIdViewError, MeetingIdViewLoading } from '@/modules/meetings/ui/views/meeting-id-view'
//import { AgentIdView, AgentIdViewError, AgentIdViewLoading } from '@/modules/agents/ui/views/agent-id-view'

interface Props{
  params: Promise<{
    meetingId: string
  }>
}

async function page({ params }: Props) {

  const{ meetingId} = await params;

    const session = await auth.api.getSession({
            headers: await headers(),
        });
   
        if (!session) {
            redirect("/sign-in");
        }
  
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.meetings.getOne.queryOptions({id: meetingId})
  )
  // todo: prefetch "meetings.getTranscript"
   

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
                <Suspense fallback={<MeetingIdViewLoading />}>
                    <ErrorBoundary fallback={<MeetingIdViewError />}>
                        <MeetingIdView meetingId={meetingId}  />
                    </ErrorBoundary>
                </Suspense>
            </HydrationBoundary>
  )
}

export default page


