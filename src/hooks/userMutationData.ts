import { MutationFunction, MutationKey, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useMutationData = <
  TData = unknown, // result type
  TVariables = void // variables type
>(
    mutationKey: MutationKey,
    mutationFn: MutationFunction<TData, TVariables>,
    queryKey?: string,
    onSuccess?: () => void
) => {
    const client = useQueryClient();
    const {mutate, isPending} = useMutation<TData, Error, TVariables>({
        mutationKey,
        mutationFn,
        onSuccess (data: TData) {
            if(onSuccess) onSuccess()
                return toast((data as { status?: number; data?: string })?.status === 200 ? 'Success' : 'Error', {
            description: (data as { status?: number; data?: string })?.data
        })
        },
        onSettled: async() => {
              return await client.invalidateQueries({ queryKey: [queryKey]})
        }
    })
  return {mutate, isPending}
}