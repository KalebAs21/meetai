import { Loader2Icon } from "lucide-react";

interface Props{
    title: string;
    description: string
}

export const LoadingState = ({ title, description }: Props) => { 

    return (
        <div className="py-4 py-8 flex-1 items-center justify-center">
            <div className="flex flex-col items-center justify-center gap-y-6 bg-background rounded-leg p-10 shadow-8">
                <Loader2Icon className=" animate-spin" />
            </div>
        </div>
    )
}