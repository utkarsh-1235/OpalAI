import { UseMutateFunction } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import z,{ ZodSchema } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
const useZodForm = (
  schema: ZodSchema,
  mutation: UseMutateFunction,
  defaultValues?: any
) => {
  const {
    register,
    watch,
    reset,
    handleSubmit,
    formState: {errors }   
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {...defaultValues},
  })

  const onFormSubmit = handleSubmit(async(values) => mutation({...values}))

  return {register, watch, reset, onFormSubmit, errors}
}

export default useZodForm;