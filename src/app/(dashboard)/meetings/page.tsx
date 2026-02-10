
import { MeetigsViewLoading, MeetingsView, MeetingsViewError } from '@/modules/meetings/ui/views/meetings-view'
import React, { Suspense } from 'react'
import { getQueryClient, trpc } from '@/trpc/server';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';


function page() {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.meetings.getMany.queryOptions({})
  )
  
  return (
      <HydrationBoundary state={dehydrate(queryClient)}>
          <Suspense fallback={<MeetigsViewLoading />}>
              <ErrorBoundary fallback={<MeetingsViewError />}>
                  <MeetingsView />
              </ErrorBoundary>
          </Suspense>
      </HydrationBoundary>
  );
}

export default page
