import type { User } from '@/types/user';

import axios from 'axios';
import { toast } from 'sonner';
import { useEffect, useState } from 'react';

// ----------------------------------------------------------------------

type Props = {
  urlDetail: string;
  urlHtml: string;
};

export default function RepoCardDescription({ urlDetail, urlHtml }: Props) {
  const [userDetail, setUserDetail] = useState<User | undefined>(undefined);

  const getUserDetail = async (url: string) => {
    try {
      const { status, data } = await axios.get(url);

      if (status === 200) {
        setUserDetail(data);
      }
    } catch (error) {
      const errResp = error as Error;

      toast.error(errResp.message);
    }
  };

  useEffect(() => {
    if (urlDetail !== '') {
      getUserDetail(urlDetail);
    }
  }, [urlDetail]);

  return (
    <div>
      <p className="flex flex-row gap-1.5 items-center mb-2">
        <a
          target="_blank"
          href={urlHtml || '#'}
          className="text-sm text-blue-700 dark:text-blue-500 font-semibold hover:underline "
        >
          {userDetail?.name ?? ''}
        </a>
        <a
          target="_blank"
          href={urlHtml || '#'}
          className="text-sm text-gray-500 dark:text-gray-400 hover:underline"
        >
          {userDetail?.login ?? ''}
        </a>
      </p>
      <p className="flex flex-row gap-1.5 items-center text-xs text-gray-500 dark:text-gray-400">
        <span>{userDetail?.bio ? userDetail.bio : userDetail?.location ?? '-'}</span>
        <span>·</span>
        <a
          target="_blank"
          className="flex flex-row gap-1 hover:underline"
          href={urlHtml !== '' ? `${urlHtml}?tab=repositories` : '#'}
        >
          <svg
            aria-hidden="true"
            focusable="false"
            viewBox="0 0 16 16"
            width="16"
            height="16"
            fill="currentColor"
          >
            <path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8ZM5 12.25a.25.25 0 0 1 .25-.25h3.5a.25.25 0 0 1 .25.25v3.25a.25.25 0 0 1-.4.2l-1.45-1.087a.249.249 0 0 0-.3 0L5.4 15.7a.25.25 0 0 1-.4-.2Z" />
          </svg>
          {userDetail?.public_repos ?? 0}
        </a>
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
            <path d="M2 5.5a3.5 3.5 0 1 1 5.898 2.549 5.508 5.508 0 0 1 3.034 4.084.75.75 0 1 1-1.482.235 4 4 0 0 0-7.9 0 .75.75 0 0 1-1.482-.236A5.507 5.507 0 0 1 3.102 8.05 3.493 3.493 0 0 1 2 5.5ZM11 4a3.001 3.001 0 0 1 2.22 5.018 5.01 5.01 0 0 1 2.56 3.012.749.749 0 0 1-.885.954.752.752 0 0 1-.549-.514 3.507 3.507 0 0 0-2.522-2.372.75.75 0 0 1-.574-.73v-.352a.75.75 0 0 1 .416-.672A1.5 1.5 0 0 0 11 5.5.75.75 0 0 1 11 4Zm-5.5-.5a2 2 0 1 0-.001 3.999A2 2 0 0 0 5.5 3.5Z" />
          </svg>
          {userDetail?.followers ?? 0}
        </span>
      </p>
    </div>
  );
}
