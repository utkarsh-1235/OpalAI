"use client";

import { Modal } from "@/components/ui/modal";

const SetUpPage = () => {
    return(
        <div className="p-4">
            <Modal title="test" description="test description" isOpen onClose={() => {}}>
                Children
            </Modal>
        </div>
    )
}

export default SetUpPage;