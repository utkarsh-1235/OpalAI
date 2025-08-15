import { cn } from "@/lib/utils"
import Spinner from "./spinner"

type Props = {
    state: boolean
    className?: string
    color?: string
    children?: React.ReactNode
}
const index = ({state, className, color, children}: Props) => {
    return state ? (
  
        <div className={cn(className)}>
          <Spinner/>
          {color}
        </div>
    ) : (
        <>{children}</>
    )
}

export default index;