"use client"

import { ErrorState } from "@/components/error-state"

 const ErrorPage = () => {
    return (
        <ErrorState
            title="Error loading agents"
            description="something want wrong"/>
    )
}

export default ErrorPage