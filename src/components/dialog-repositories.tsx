import type { UserItem } from '@/types/user';

import axios from 'axios';
import { toast } from 'sonner';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog';

import { formatNumber } from '@/lib/utils';
import { useBoolean } from '@/hooks/use-boolean';

import type { Repository } from '@/types/repository';

// ----------------------------------------------------------------------

type Props = {
  data: UserItem;
};

export function DialogRepositories({ data }: Props) {
  const [repositories, setRepositories] = useState<Repository[] | undefined>(undefined);

  const isLoadingRepos = useBoolean();

  const getRepositories = async (url: string) => {
    isLoadingRepos.onTrue();

    try {
      const { status, data } = await axios.get(url);

      if (status === 200) {
        setRepositories(data);
      }
    } catch (error) {
      const errResp = error as Error;

      toast.error(errResp.message);
    } finally {
      isLoadingRepos.onFalse();
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size="sm"
          variant="outline"
          disabled={isLoadingRepos.value}
          onClick={() => getRepositories(data.repos_url)}
          className="text-xs cursor-pointer disabled:cursor-not-allowed"
        >
          See Repositories
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Repositories</DialogTitle>
        </DialogHeader>
        <ScrollArea
          className={`w-full mt-3 ${repositories && repositories.length ? 'h-80' : 'h-auto'}`}
        >
          {isLoadingRepos && !repositories ? (
            <div className="space-y-4">
              <Skeleton className="h-[77px] w-full" />
              <Skeleton className="h-[77px] w-full" />
              <Skeleton className="h-[77px] w-full" />
            </div>
          ) : repositories && repositories.length ? (
            repositories.map((repo, i) => (
              <div className="border p-4 rounded-lg mb-4" key={i}>
                <div className="flex flex-col gap-3">
                  <div className="flex flex-row items-center gap-3">
                    <img
                      className="w-12 h-12 rounded-sm border"
                      src={repo.owner.avatar_url}
                      alt={`avatar_${repo.owner.login}_${repo.owner.id}`}
                    />

                    <a
                      target="_blank"
                      href={repo.html_url !== '' ? repo.html_url : '#'}
                      className="text-base text-blue-700 dark:text-blue-500 font-semibold hover:underline"
                    >
                      {repo.full_name}
                    </a>
                  </div>

                  <p className="text-sm text-gray-500 dark:text-gray-400">{repo.description}</p>

                  {repo.topics.length ? (
                    <div className="flex flex-row items-center gap-2">
                      {repo.topics.map((topic, i) => (
                        <a
                          key={i}
                          target="_blank"
                          href={topic !== '' ? `https://github.com/topics/${topic}` : '#'}
                          className="block text-xs px-2.5 pt-0.5 pb-1 border rounded-full bg-blue-300/20 dark:bg-blue-300/40 hover:bg-blue-300 dark:hover:bg-blue-600"
                        >
                          {topic}
                        </a>
                      ))}
                    </div>
                  ) : null}

                  <p className="flex flex-row gap-1.5 items-center text-xs text-gray-500 dark:text-gray-400">
                    <span>{repo.language ?? '-'}</span>
                    <span>·</span>
                    <span className="flex flex-row gap-1">
                      <svg
                        aria-hidden="true"
                        focusable="false"
                        viewBox="0 0 16 16"
                        width="16"
                        height="16"
                        fill="currentColor"
                      >
                        <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Zm0 2.445L6.615 5.5a.75.75 0 0 1-.564.41l-3.097.45 2.24 2.184a.75.75 0 0 1 .216.664l-.528 3.084 2.769-1.456a.75.75 0 0 1 .698 0l2.77 1.456-.53-3.084a.75.75 0 0 1 .216-.664l2.24-2.183-3.096-.45a.75.75 0 0 1-.564-.41L8 2.694Z"></path>
                      </svg>
                      {formatNumber(repo.stargazers_count ?? 0)}
                    </span>
                    <span>·</span>
                    <span>Updated on {new Date(repo.updated_at).toLocaleDateString()}</span>
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-sm italic text-gray-400">
              Unfortunately this user doesn't have any repository at all.
            </p>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
