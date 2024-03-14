export type Profile = {
  id: string;
  photoURL: string | null;
  firstName: string;
  lastName: string;
  displayName: string;
  createdAt: string;
  description: string;
  followerCount?: number;
  followingCount?: number;
  isFollowing: boolean;
  role: string;
};

export type Photo = {
  id: string;
  name: string;
  url: string;
};

export type Follow = {
  id: string;
  displayName: string;
  photoURL: string;
};
