import type { TResponseUsers } from '@/types/user';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import { SkeletonCard } from './skeleton-card';
import RepoCardDescription from './repo-card-desc';

// ----------------------------------------------------------------------

type Props = {
  username: string;
  loading: boolean;
  users?: TResponseUsers;
};

export function RepoCardList({ username, loading, users }: Props) {
  if (loading) return <SkeletonCard />;

  return (
    <>
      {username !== '' && (
        <h4 className="mb-6 text-sm font-medium leading-none">
          Result users list for {`"${username}"`}:
        </h4>
      )}
      {!users ? null : users.items.length ? (
        users.items.map((user, index) => (
          <div className="border p-4 rounded-lg mb-4" key={index}>
            <div className="flex flex-row items-center gap-3">
              <Avatar className="w-10 h-10">
                <AvatarImage src={user.avatar_url} alt={`${user.login}-${user.id}`} />
                <AvatarFallback>{user.login}</AvatarFallback>
              </Avatar>

              <RepoCardDescription urlDetail={user.url} urlHtml={user.html_url} />
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-sm italic text-gray-400">
          Unfortunately we could not find users for the username you provided.
        </p>
      )}
    </>
  );
}
