import { Txt } from '_tosslib/components/Txt';
import colors from '_tosslib/constants/colors';
import { CreateKeypad } from 'pages/remotes';
import KeyPad from './Keypad';
import React, { SetStateAction } from 'react';
import styled from '@emotion/styled';
import { usePassword } from 'context/PasswordContext';
import { KeyedMutator } from 'swr';

type Props = {
  keyPad: CreateKeypad;
  setText: (text: SetStateAction<string>) => void;
  setIsOpenKeypad: (text: SetStateAction<boolean>) => void;
  name: 'password' | 'passwordCheck';
  mutate: KeyedMutator<CreateKeypad>;
};

export type Coords = { uid: string; x: number; y: number };

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
  const [blank, shuffle] = keypad.functionKeys.map(keypad => ({ uid, x: keypad.rowIndex, y: keypad.columnIndex }));
  const { setPassword, setPasswordCheck } = usePassword();
  const setState = name === 'password' ? setPassword : setPasswordCheck;

  const DEFAULT_RESULT = { uid: '', coords: [] };

  const onClick = (coords: Coords) => {
    if (equals(coords, blank)) {
      return;
    }
    if (equals(coords, shuffle)) {
      mutate();
      setText('');
      setState(DEFAULT_RESULT);
      return;
    }
    setText(prev => (prev.length > 5 ? prev : prev + '*'));
    setState(prev => {
      return prev.coords.length > 5
        ? prev
        : {
            ...prev,
            coords: [...prev.coords, { x: coords.x, y: coords.y }],
            uid: coords.uid,
          };
    });
  };

  const onSubButtonClick = (coords: Coords) => {
    switch (coords.x) {
      case 0: // <-
        setText(prev => prev.slice(0, -1));
        setState(prev => {
          const copy = { ...prev };
          copy.coords = copy.coords.slice(0, -1);
          return copy;
        });
        break;
      case 1: // 전부삭제
        setText('');
        setState(DEFAULT_RESULT);
        break;
      case 2: // 확인
        setIsOpenKeypad(false);
        setText(prev => (prev.length < 6 ? '' : prev));
        setState(prev => {
          const copy = { ...prev };
          copy.coords.length < 6 ? (copy.coords = []) : null;
          return copy;
        });
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
                <KeyPad coords={{ uid, x: rowIndex, y: colIndex }} value={svg} onClick={onClick} />
              </React.Fragment>
            ))}
            <KeyPad
              coords={{ uid, x: rowIndex, y: 4 }}
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
