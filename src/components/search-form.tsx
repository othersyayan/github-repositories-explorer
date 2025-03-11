import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/components/ui/button';
import { Form, FormItem, FormField, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const formSchema = z.object({
  username: z.string().min(1, {
    message: 'Username must be at least 1 characters.',
  }),
});

// ----------------------------------------------------------------------

type Props = {
  loading: boolean;
  handleOnSubmit: (username: string) => void;
};

export function SearchForm({ loading, handleOnSubmit }: Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    handleOnSubmit(values.username);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Enter GitHub Username" autoFocus {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
          disabled={loading}
        />
        <Button className="cursor-pointer w-full" type="submit" disabled={loading}>
          {loading ? (
            <>
              <svg
                className="mr-1 size-5 animate-spin "
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Searching ...
            </>
          ) : (
            'Search'
          )}
        </Button>
      </form>
    </Form>
  );
}
