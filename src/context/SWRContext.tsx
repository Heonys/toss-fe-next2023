import { SWRConfig } from 'swr';

type Props = {
  children: React.ReactNode;
};

const SWRConfigContext = ({ children }: Props) => {
  return (
    <SWRConfig
      value={{
        fetcher: (url: string) => fetch(url).then(res => res.json()),
      }}
    >
      {children}
    </SWRConfig>
  );
};

export default SWRConfigContext;
