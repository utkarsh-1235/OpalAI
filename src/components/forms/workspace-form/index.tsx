import { useCreateWorkspace } from "@/hooks/use-create-workspace";

type Props = {}

const WorkspaceForm = (props: Props) => {

    const {erros, isPending, onFormSubmit, register} = useCreateWorkspace()
return(
    <form
     onSubmit={onFormSubmit}
     className="flex flex-col gap-y-3">

    </form>
)
}

export default WorkspaceForm;