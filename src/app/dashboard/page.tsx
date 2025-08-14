import { onAuthenticateUser } from "@/actions/user";
import { redirect } from "next/navigation";


const DashboardPage = async() => {
    // Authentication
   const auth = await onAuthenticateUser();
   if(auth.status === 200 || auth.status === 201){
        return redirect(`/dashboard/${auth.user?.firstname}${auth.user?.lastname}`);
   }
    // if account does not exist
    if(auth.status === 400 || auth.status === 500 || auth.status === 401){
        return redirect('/auth/sign-in');
    }

   return(
    <div>
        Dashboard Page
    </div>
   )
}

export default DashboardPage;