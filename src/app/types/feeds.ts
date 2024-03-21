export type AppFeed = {
  id: string;
  authorPhotoURL: string;
  author: string;
  occupation: string;
  date: string;
  title: string;
  content: string;
  authorUid: string;
  postPhotoURL: string;
  postVideoURL?: string;
  views: View[];
  likes: Like[];
  bookmarks: Bookmarks[];
  likedByIds: string[];
  bookmarkedIds: string[];
  viewedByIds: string[];
  isAuthor?: boolean;
  isUser?: boolean;
  comments: ChatComment[];
};

export type View = {
  id: string;
  displayName: string;
  photoURL: string;
};
export type Like = {
  id: string;
  displayName: string;
  photoURL: string;
};
export type Bookmarks = {
  id: string;
  displayName: string;
  photoURL: string;
};
export type ChatComment = {
  id: string;
  displayName: string;
  photoURL: string;
  uid: string;
  text: string;
  date: number;
  parentId: string | null;
  childNodes: ChatComment[];
};
