import { ResponsiveDialog } from "@/components/responsive-dialog";
import { MeetingForm } from "./meeting-form";
import { MeetingGetOne } from "../../types";


interface UpdateMeetingDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    initialValues: MeetingGetOne
}

export const UpdateMeetingDialog = ({ open, onOpenChange, initialValues }: UpdateMeetingDialogProps) => {

    return (
        <ResponsiveDialog
            title="update Meeting"
            description="update the Meeting"
            open={open}
            onOpenChange={onOpenChange}
        >
            {/* <div>new agent form</div> */}
            <MeetingForm
                onSuccess={(id) => {
                    onOpenChange(false);
                }}
                onCancel={() => onOpenChange(false)}
                initialValues={initialValues}
            />
        </ResponsiveDialog>
    );
};
