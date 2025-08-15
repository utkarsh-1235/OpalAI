import { useEffect, useState } from "react"
import { useQueryData } from "./useQueryData";
import { searchUsers} from "@/actions/user";

export const useSearch = (key: string, type: 'USERS') => {
    const [query, setQuery] = useState('');
    const [debounce, setDebounce] = useState('');
    type User = {
        id: string;
        subscription: {
            plan: 'PRO' | 'FREE';
        } | null;
        firstname: string | null;
        lastname: string | null;
        image: string | null;
        email: string | null;
    }[] | undefined;

    const [onusers, setOnUsers] = useState<User>();

    const onSearchQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value)
    }

    useEffect(() => {
        const delayInputTimeoutId = setTimeout(() => {
            setDebounce(query)
        }, 1000)
        return () => clearTimeout(delayInputTimeoutId)
    },[query])

    const {refetch, isFetching} = useQueryData(
          [key, debounce],
          async({queryKey}) => {
            if(type === "USERS"){
                const workspace = await searchUsers(queryKey[1] as string);
                if(workspace.status === 200) setOnUsers(workspace.data as User)
            }
          },
        false
    )
    
    useEffect(() => {
        if(debounce) refetch()
        if(!debounce) setOnUsers(undefined)
      
    },[debounce, refetch])

    return {onSearchQuery, query, isFetching, onusers}
    
}