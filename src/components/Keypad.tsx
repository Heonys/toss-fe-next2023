import { css } from '@emotion/react';
import { Button } from '_tosslib/components/Button';
import { KeypadInputResult } from 'pages/remotes';
import { Coords } from './KeypadGrid';

type Props = {
  value: string;
  onClick: (e: Coords) => void;
  coords: Coords;
  primary?: boolean;
};

const KeyPad = ({ value, onClick, coords, primary = false }: Props) => {
  return (
    <Button variant={primary ? 'primary' : 'secondary'} onClick={() => onClick(coords)}>
      <div
        css={css`
          font-size: 13px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        `}
        dangerouslySetInnerHTML={{ __html: value }}
      ></div>
    </Button>
  );
};

export default KeyPad;
