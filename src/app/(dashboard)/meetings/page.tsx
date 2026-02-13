import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

import { MeetigsViewLoading, MeetingsView, MeetingsViewError } from '@/modules/meetings/ui/views/meetings-view'
import React, { Suspense } from 'react'
import { getQueryClient, trpc } from '@/trpc/server';
import { QueryClient, dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';
import { MeetingsListHeader } from '@/modules/meetings/ui/components/meetings-list-header';
import { loadSearchParams } from '@/modules/meetings/params';
import { SearchParams } from 'nuqs/server';

interface Props{
    searchPramas: Promise<SearchParams>
}

const queryClient = new QueryClient();

async function page({ searchPramas }: Props) {

    //   const queryClient = getQueryClient();
    const filters = await loadSearchParams(searchPramas);

      const session = await auth.api.getSession({
             headers: await headers(),
         });
    
         if (!session) {
             redirect("/sign-in");
         }

  void queryClient.prefetchQuery(
      trpc.meetings.getMany.queryOptions({
        ...filters
    })
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
