import { deleteUserList } from "../../services/userListsService";
import { toastError } from "../../lib/toast";

export const useDeleteList = (
    onClose: () => void,
    onSave: () => void,
) => {

    const handleDelete = async (listId: string) => {
        try {
            await deleteUserList(listId);
            onSave();
        } catch (error) {
            toastError("Failed to delete list, please try again")
        } finally {
            onClose();
        }
    }

    return { handleDelete };
}