import { CreateKeypad } from 'pages/remotes';
import KeyPad from './Keypad';
import { css } from '@emotion/react';
import React from 'react';

type Props = {
  keyPad: CreateKeypad;
};

const sideButton = [
  '<div data-testid="back">⬅️<div>',
  '<div data-testid="delete">전체삭제</div>',
  '<div data-testid="check">확인<div>',
];

export default function KeypadGrid({ keyPad: { keypad } }: Props) {
  const onClick = (pos: number[]) => {
    console.log(pos);
  };

  return (
    <section
      css={css`
        z-index: 100;
        width: 30rem;
        position: absolute;
        display: grid;
        grid-template-columns: repeat(5, minmax(0, 1fr));
        row-gap: 8px;
        column-gap: 8px;
        padding: 24px;
        background-color: white;
      `}
    >
      {keypad.svgGrid.map((row, rowIndex) => (
        <React.Fragment key={rowIndex}>
          {row.map((svg, colIndex) => (
            <React.Fragment key={colIndex}>
              <KeyPad position={[rowIndex, colIndex]} value={svg} onClick={onClick} />
            </React.Fragment>
          ))}
          <KeyPad position={[rowIndex, 3]} value={sideButton[rowIndex]} onClick={onClick} />
        </React.Fragment>
      ))}
    </section>
  );
}
