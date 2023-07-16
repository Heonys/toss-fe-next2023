import { Button } from '_tosslib/components/Button';
import { css } from '@emotion/react';

type Props = {
  value: string;
  onClick: (e: number[]) => void;
  position: number[];
};

const KeyPad = ({ value, onClick, position }: Props) => {
  return (
    <Button variant="secondary" onClick={() => onClick(position)}>
      <div
        css={css`
          font-size: 12px;
        `}
        dangerouslySetInnerHTML={{ __html: value }}
      ></div>
    </Button>
  );
};

export default KeyPad;
