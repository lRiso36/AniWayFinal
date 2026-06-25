import { useState } from "react";
import { toastError } from "../../lib/toast";
import { getComments, addComment } from "../../services/postService";

export const usePostComments = (postId: string, initialCommentCount: number) => {
    const [comments, setComments] = useState<any[]>([]);
    const [commentsLoading, setCommentsLoading] = useState(false);
    const [commentCount, setCommentCount] = useState(initialCommentCount);
    const [submitting, setSubmitting] = useState(false);

    const handleToggleComments = async (commentsOpen: boolean, setCommentsOpen: (val: boolean) => void) => {
            if (commentsOpen) {
                setCommentsOpen(false);
                return;
            }
            setCommentsOpen(true);
            if (comments.length > 0) return; // already loaded
            setCommentsLoading(true);
    
            try {
                const data = await getComments(postId);
                setComments(data);
            } catch {
                toastError("Unable to load comments for this post. Try again later.")
            } finally {
                setCommentsLoading(false)
            }
        }
    
        const handleAddComment = async (newComment: string, setNewComment: (val: string) => void) => {
            if (!newComment.trim() || submitting) return;
            setSubmitting(true);
    
            try {
                await addComment(postId, newComment.trim());
            } catch {
                toastError("Unable to add comment. Try again later.")
                return;
            }

            try {
                const data = await getComments(postId);
                setComments(data);
                setCommentCount(prev => prev + 1);
                setNewComment('');
            } catch {
                toastError("Comment was added but unable to load. Refresh page.")
                setCommentCount(prev => prev + 1);
                setNewComment('')
            } finally {
                setSubmitting(false);
            }
        }

        return { comments, commentsLoading, commentCount, submitting, handleToggleComments, handleAddComment };
}