import { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { fb } from "../../config/firebase";

export const useCommentCount = (postId: string): number => {
  const [commentCount, setCommentCount] = useState<number>(0);

  useEffect(() => {
    const commentRef = ref(fb, `comments/${postId}`);
    const unsubscribe = onValue(commentRef, (snapshot) => {
      const commentData = snapshot.val();
      const count = commentData ? Object.keys(commentData).length : 0;
      setCommentCount(count);
    });

    return () => unsubscribe();
  }, [postId]);

  return commentCount;
};
