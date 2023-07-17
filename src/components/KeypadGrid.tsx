import { Txt } from '_tosslib/components/Txt';
import colors from '_tosslib/constants/colors';
import { CreateKeypad } from 'pages/remotes';
import KeyPad from './Keypad';
import React, { SetStateAction } from 'react';
import styled from '@emotion/styled';
import { usePassword } from 'context/PasswordContext';
import { KeyedMutator } from 'swr';
import type { KeypadInputResult } from 'pages/remotes';

type Props = {
  keyPad: CreateKeypad;
  setText: (text: SetStateAction<string>) => void;
  setIsOpenKeypad: (text: SetStateAction<boolean>) => void;
  name: 'password' | 'passwordCheck';
  mutate: KeyedMutator<CreateKeypad>;
};

export type Coords = { x: number; y: number };

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

const equals = (a: Coords, b: Coords) => {
  return JSON.stringify(a) === JSON.stringify(b);
};

export default function KeypadGrid({ keyPad: { keypad, uid }, setText, setIsOpenKeypad, name, mutate }: Props) {
  const [blank, shuffle] = keypad.functionKeys.map(keypad => ({ x: keypad.rowIndex, y: keypad.columnIndex }));
  const { setPassword, setPasswordCheck } = usePassword();
  const setState = name === 'password' ? setPassword : setPasswordCheck;

  const DEFAULT_RESULT = { uid: '', coords: [] };

  const onClick = (coords: KeypadInputResult) => {
    if (equals(coords, blank)) {
      return;
    }
    if (equals(coords, shuffle)) {
      mutate();
      return;
    }
    setText(prev => (prev.length > 5 ? prev : prev + '*'));
    setState(prev => {
      return prev.coords.length > 5 ? prev.coords : { ...prev, x: coords.x, y: coords.y };
    });
  };

  const onSubButtonClick = (coords: KeypadInputResult) => {
    switch (coords.x) {
      case 0: // <-
        setText(prev => prev.slice(0, -1));
        setState(prev => prev.slice(0, -1));
        break;
      case 1: // 전부삭제
        setText('');
        setState(DEFAULT_RESULT);
        break;
      case 2: // 확인
        setIsOpenKeypad(false);
        setText(prev => (prev.length < 6 ? '' : prev));
        setState(prev => (prev.length < 6 ? [] : prev));
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
                <KeyPad coords={{ x: rowIndex, y: colIndex }} value={svg} onClick={onClick} />
              </React.Fragment>
            ))}
            <KeyPad
              coords={{ x: rowIndex, y: 4 }}
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
