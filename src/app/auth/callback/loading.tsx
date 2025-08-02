import Spinner from "@/components/global/loader/spinner";

const AuthLoading = () => {
    return (
        <div className="flex h-screen w-full justify-center items-center ">
             <Spinner size={18} className="text-white"/>
        </div>
    )
}

export default AuthLoading;