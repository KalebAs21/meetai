import { ResponsiveDialog } from "@/components/responsive-dialog";
import { AgentForm } from "./agent-form";
import { AgentGetOne } from "@/modules/agents/types";

interface NewAgentDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    initialValues: AgentGetOne;
}

export const UpdateAgentDialog = ({ open, onOpenChange, initialValues }:
     NewAgentDialogProps) => {
    return (
        <ResponsiveDialog
            title="Edit Agent"
            description="Edit the agent details"
            open={open}
            onOpenChange={onOpenChange}
        >
            {/* <div>new agent form</div> */}
            <AgentForm
                onSuccess={() => onOpenChange(false)}
                onCancel={() => onOpenChange(false)}
                initialValues={initialValues}
            />
        </ResponsiveDialog>
    );
};
