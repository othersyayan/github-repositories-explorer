export interface Repository {
  id: number;
  name: string;
  full_name: string;
  private: boolean;
  stargazers_count: number;
  watchers_count: number;
  language: string;
  topics: string[];
  owner: {
    id: number;
    login: string;
    avatar_url: string;
  };
  html_url: string;
  description: string;
  created_at: string;
  updated_at: string;
  pushed_at: string;
}

export const MOCK_REPO: Repository[] = [
  {
    id: 250199188,
    name: '20-vanillaJs-web-projects',
    full_name: 'othersyayan/20-vanillaJs-web-projects',
    private: false,
    stargazers_count: 0,
    watchers_count: 0,
    language: 'HTML',
    topics: [],
    owner: {
      login: 'othersyayan',
      id: 40633972,
      avatar_url: 'https://avatars.githubusercontent.com/u/40633972?v=4',
    },
    html_url: 'https://github.com/othersyayan/20-vanillaJs-web-projects',
    description: '20 Web Projects With Vanilla Javascript',
    created_at: '2020-03-26T08:17:20Z',
    updated_at: '2020-03-26T11:45:07Z',
    pushed_at: '2020-03-26T11:45:05Z',
  },
];
