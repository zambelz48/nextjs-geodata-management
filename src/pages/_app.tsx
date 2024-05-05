import { SessionProvider } from "next-auth/react"
import type { AppProps } from "next/app"
import { QueryClient, QueryClientProvider } from "react-query"

import "leaflet/dist/leaflet.css"
import "@/styles/globals.css"

const queryClient = new QueryClient()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider session={pageProps.session}>
        <Component {...pageProps} />
      </SessionProvider>
    </QueryClientProvider>
  )
}
