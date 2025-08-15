import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { useSearch } from "@/hooks/use-search"
import { AvatarFallback } from "@radix-ui/react-avatar"
import { User } from "lucide-react"
import Loader from "../loader/index";
type props = {
  workspaceId: string
}
const Search = ({workspaceId}: props) => {
  const {query, onSearchQuery, isFetching, onusers} = useSearch(
    'get-users',
    'USERS'
  )

  // Sending inviation component 
  // const { mutate, isPending} = useMutationData(
     
  // )
  console.log(workspaceId);
    return (
    <div className="flex flex-col gap-y-5">
       <Input
       onChange={onSearchQuery}
       value={query}
       className="bg-transparent border-2 outline-none"
       placeholder="Search for your user"
       type="text"
       />
         
       {isFetching ? <div className="flex flex-col gap-y-5">
        <Skeleton className="w-full h-8 rounded-xl"/>
       </div> : !onusers ? (
          <p className="text-center text-sm text-[#a4a4a4]"> No Users Found</p>
       ) : (
          <div>
          {onusers.map((user) => (
              <div
              key={user.id}
              className="flex gap-x-3 items-center border-2 w-full p-3 rounded-xl">
                <Avatar>
                  <AvatarImage src={user.image as string}/>
                  <AvatarFallback>
                    <User/>
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col items-start">
                  <h3 className="text-bold text-lg capitalize">{user.firstname} {user.lastname}</h3>
                  <p className="lowercase text-xs bg-white px-2 rounded-lg text-[#1e1e1e]">{user.subscription?.plan}</p>
                </div>
                <div className="flex-1 flex justify-end items-center">
                  <Button onClick={() => {}} variant={'default'} className="w-5/12 font-bold">
                    <Loader
                     state={false}
                     color="#000"
                     className="">
                      Invite
                    </Loader>
                  </Button>
                </div>
              </div>
            ))} 
          </div>
       )}
    </div>
    )
}

export default Search;