import { toast } from 'sonner';
import { Octokit } from 'octokit';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useMemo, useState, useCallback } from 'react';

import { GITHUB_TOKEN } from '@/config-global';

import { Button } from '@/components/ui/button';
import { SearchForm } from '@/components/search-form';
import { ModeToggle } from '@/components/mode-toggle';
import { RepoCardList } from '@/components/repo-card-list';
import { ThemeProvider } from '@/components/theme-provider';

import { useBoolean } from '@/hooks/use-boolean';
import { TResponseUsers } from './types/user';

// ----------------------------------------------------------------------

const octokit = new Octokit({
  auth: GITHUB_TOKEN,
});

const headers = {
  accept: 'application/vnd.github+json',
  'X-GitHub-Api-Version': '2022-11-28',
};

// ----------------------------------------------------------------------

function App() {
  const [username, setUsername] = useState<string>('');

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [perPage] = useState<number>(3);

  const isSubmitting = useBoolean();

  const [users, setUsers] = useState<TResponseUsers | undefined>(undefined);

  const searchRepoByUsername = useCallback(
    async (username: string, page: number) => {
      isSubmitting.onTrue();

      try {
        const { data, status } = await octokit.request('GET /search/users', {
          q: username,
          page,
          per_page: perPage,
          ...headers,
        });

        if (status === 200) {
          setUsers(data);
        }
      } catch (error) {
        const errResp = error as Error;

        toast.error(errResp.message);
      } finally {
        isSubmitting.onFalse();
      }
    },
    [username, perPage]
  );

  const pagination = useMemo(() => {
    const totalItems = users?.total_count || 0;
    const totalPages = Math.ceil(totalItems / perPage);

    return { totalItems, totalPages };
  }, [users, perPage]);

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);

      searchRepoByUsername(username, currentPage - 1);
    }
  };

  const handleNext = useCallback(() => {
    if (currentPage < pagination.totalPages) {
      setCurrentPage(currentPage + 1);

      searchRepoByUsername(username, currentPage + 1);
    }
  }, [users, pagination]);

  const isPreviousDisabled = currentPage === 1;
  const isNextDisabled = pagination.totalItems === 0 || currentPage === pagination.totalPages;

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="flex flex-col gap-4 items-center justify-center min-h-svh">
        <div className="w-full md:w-md mx-auto px-6 md:px-0">
          <div className="flex flex-row gap-4 items-center justify-between w-full mb-6">
            <div className="flex flex-row gap-3 items-center">
              <img src="/favicon.png" alt="github_logo" width={30} />
              <p>GitHub Repositories Explorer</p>
            </div>

            <ModeToggle />
          </div>

          <SearchForm
            loading={isSubmitting.value}
            handleOnSubmit={(res) => {
              setUsername(res);
              searchRepoByUsername(res, 1);
            }}
          />

          <RepoCardList users={users} username={username} loading={isSubmitting.value} />

          {users && (
            <div className="flex flex-row items-center justify-center gap-2 mt-4">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={isPreviousDisabled || isSubmitting.value}
                className="cursor-pointer disabled:cursor-not-allowed"
              >
                <ChevronLeft />
              </Button>
              <Button
                variant="outline"
                onClick={handleNext}
                disabled={isNextDisabled || isSubmitting.value}
                className="cursor-pointer disabled:cursor-not-allowed"
              >
                <ChevronRight />
              </Button>
            </div>
          )}
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
