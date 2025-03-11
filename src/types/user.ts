export interface UserItem {
  id: number;
  url: string;
  login: string;
  score: number;
  html_url: string;
  avatar_url: string;
}

export type TResponseUsers = {
  total_count: number;
  incomplete_results: boolean;
  items: UserItem[];
};

export interface User {
  id: number;
  login: string;
  html_url: string;
  name: string | null;
  bio: string | null;
  location: string | null;
  public_repos: number;
  followers: number;
}
