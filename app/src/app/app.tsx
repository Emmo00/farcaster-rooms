"use client"

import dynamic from "next/dynamic"
import { APP_NAME } from "~/lib/constants"
import { useRouter } from "next/navigation"

// note: dynamic import is required for components that use the Frame SDK
const WelcomeScreen = await dynamic(() => import("~/screens/WelcomeScreen"), {
  ssr: false,
})

export default function App(
  { title }: { title?: string } = { title: APP_NAME }
) {
  const router = useRouter()
  return (
    <WelcomeScreen
      onCreateRoom={() => router.push("/create-room")}
      onSkipToHome={() => router.push("/home")}
    />
  )
}
