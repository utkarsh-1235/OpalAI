import { onAuthenticateUser } from "@/actions/user";
import { redirect } from "next/navigation";

export const AuthCallbackPage = async() => {
    // Authentication
   const auth = await onAuthenticateUser();
   if(auth.status === 200 || auth.status === 201){
        return redirect(`/dashboard/${auth.user?.firstname}${auth.user?.lastname}`);
   }
    // if account does not exist
    if(auth.status === 400 || auth.status === 500 || auth.status === 401){
        return redirect('/auth/sign-in');
    }
}
