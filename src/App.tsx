import { Octokit } from 'octokit';

import { GITHUB_TOKEN } from '@/config-global';

import { SearchForm } from '@/components/search-form';
import { ModeToggle } from '@/components/mode-toggle';
import { ThemeProvider } from '@/components/theme-provider';

import { useBoolean } from './hooks/use-boolean';

// ----------------------------------------------------------------------

const octokit = new Octokit({
  auth: GITHUB_TOKEN,
});

const headers = {
  'X-GitHub-Api-Version': '2022-11-28',
};

// ----------------------------------------------------------------------

function App() {
  const isSubmitting = useBoolean();

  const searchRepoByUsername = async (username: string) => {
    isSubmitting.onTrue();

    try {
      const { data, status } = await octokit.request('GET /search/users', {
        q: username,
        per_page: 5,
        ...headers,
      });

      console.log(data, status);
    } catch (error) {
      console.error(error);
    } finally {
      isSubmitting.onFalse();
    }
  };

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="flex flex-col gap-4 items-center justify-center min-h-svh">
        <div className="w-full md:w-md mx-auto px-6 md:px-0">
          <div className="flex flex-row gap-4 items-center justify-between w-full mb-6 ">
            <div className="flex flex-row gap-3 items-center">
              <img src="/src/assets/github.png" alt="github_logo" width={30} />
              <p>GitHub Repositories Explorer</p>
            </div>

            <ModeToggle />
          </div>

          <SearchForm
            loading={isSubmitting.value}
            handleOnSubmit={(res) => searchRepoByUsername(res)}
          />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
