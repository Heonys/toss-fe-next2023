import { Txt } from '_tosslib/components/Txt';
import colors from '_tosslib/constants/colors';
import { CreateKeypad } from 'pages/remotes';
import KeyPad from './Keypad';
import React, { SetStateAction } from 'react';
import styled from '@emotion/styled';

type Props = {
  keyPad: CreateKeypad;
  setText: (text: SetStateAction<string>) => void;
  setIsOpenKeypad: (text: SetStateAction<boolean>) => void;
};

const Container = styled.section`
  position: absolute;
  z-index: 100;
  width: 100%;
  padding: 15px;
  background-color: white;
  border: solid 0.1rem #ddd;
  margin-top: 0.5rem;
`;

const GridContainer = styled.article`
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  row-gap: 8px;
  column-gap: 8px;
`;

const TextContainer = styled.div`
  padding: 0.3rem;
  margin-top: 0.3rem;
`;

const sideButton = [
  '<div data-testid="back">⬅️<div>',
  '<div data-testid="delete">전체삭제</div>',
  '<div data-testid="check">확인<div>',
];

const equals = (a: number[], b: number[]) => {
  return JSON.stringify(a) === JSON.stringify(b);
};

export default function KeypadGrid({ keyPad: { keypad }, setText, setIsOpenKeypad }: Props) {
  const [blank, shuffle] = keypad.functionKeys.map(keypad => [keypad.rowIndex, keypad.columnIndex]);

  const onClick = (position: number[]) => {
    if (equals(position, blank)) {
      return;
    }
    if (equals(position, shuffle)) {
      // 셔플 로직
      return;
    }
    setText(prev => prev + '*');
    // 실제 좌표를 추가
  };

  const onSubButtonClick = (position: number[]) => {
    switch (position[0]) {
      case 0:
        setText(prev => prev.slice(0, -1));
        // 최근 좌표 삭제
        break;
      case 1:
        setText('');
        // 좌표 전부삭제
        break;
      case 2:
        setIsOpenKeypad(false);
        break;
    }
  };

  return (
    <Container>
      <GridContainer>
        {keypad.svgGrid.map((row, rowIndex) => (
          <React.Fragment key={rowIndex}>
            {row.map((svg, colIndex) => (
              <React.Fragment key={colIndex}>
                <KeyPad position={[rowIndex, colIndex]} value={svg} onClick={onClick} />
              </React.Fragment>
            ))}
            <KeyPad
              position={[rowIndex, 4]}
              value={sideButton[rowIndex]}
              onClick={onSubButtonClick}
              primary={rowIndex === 2}
            />
          </React.Fragment>
        ))}
      </GridContainer>
      <TextContainer>
        <Txt color={colors.grey700} style={{ margin: '8px' }}>
          비밀번호를 입력해주세요
        </Txt>
        <br />
        <Txt color={colors.grey700} style={{ margin: '8px', marginTop: '12px', marginBottom: '24px' }}>
          6자리로 입력해주세요
        </Txt>
      </TextContainer>
    </Container>
  );
}
