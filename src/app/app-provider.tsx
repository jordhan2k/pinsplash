'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';




function AppProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = React.useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false
      }
    }
  }))
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* <ReactQueryDevtools initialIsOpen={true} /> */}
    </QueryClientProvider>
  )
}

export default AppProvider