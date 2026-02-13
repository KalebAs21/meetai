
import { MeetigsViewLoading, MeetingsView, MeetingsViewError } from '@/modules/meetings/ui/views/meetings-view'
import React, { Suspense } from 'react'
import { getQueryClient, trpc } from '@/trpc/server';
import { QueryClient, dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';
import { MeetingsListHeader } from '@/modules/meetings/ui/components/meetings-list-header';


const queryClient = new QueryClient();

function page() {
//   const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.meetings.getMany.queryOptions({})
  )
  
    return (
        <>
            <MeetingsListHeader />
            <HydrationBoundary state={dehydrate(queryClient)}>
                <Suspense fallback={<MeetigsViewLoading />}>
                    <ErrorBoundary fallback={<MeetingsViewError />}>
                        <MeetingsView />
                    </ErrorBoundary>
                </Suspense>
            </HydrationBoundary>
        </>
    );
}

export default page
