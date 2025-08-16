export type WorkspaceProps = {
    data: {
        subscription: {
            plan: 'FREE' | 'PRO'
        } | null
        workspaces: {
            id: string
            name: string
            type: 'PUBLIC' | 'PERSONAL'
        }[]
        members: {
            Workspace: {
                id: string
                name: string
                type: 'PUBLIC' | 'PERSONAL'
            }
        }[]
    }
}

export type NotificationProps = {
    status: number
    data: {
      _count: {
         notification: number
      }  
    }
}