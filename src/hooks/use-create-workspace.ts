import { createWorkspace } from "@/actions/workspace";
import { useMutationData } from "./userMutationData";
import useZodForm from "./use-zod-form";
import { workspaceFormSchema } from "@/components/forms/workspace-form/schema";

export const useCreateWorkspace = () => {
    const {mutate, isPending} = useMutationData(
        ['create-workspace'],
        (data: {name: string}) => createWorkspace(data.name),
        'user-workspaces'
    )

    const {errors, onFormSubmit, register} = useZodForm(workspaceFormSchema, mutate);

    return {errors, onFormSubmit, register, isPending}
}