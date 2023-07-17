import { Button } from '_tosslib/components/Button';
import { Input } from '_tosslib/components/Input';
import { Spacing } from '_tosslib/components/Spacing';
import { Txt } from '_tosslib/components/Txt';
import colors from '_tosslib/constants/colors';
import { useEffect, useState } from 'react';
import { createKeypad } from './remotes';
import type { CreateKeypad } from './remotes';
import InputKeypadForm from 'components/InputKeypadForm';
import styled from '@emotion/styled';

const KeypadContainer = styled.div`
  position: relative;
`;

export function KeypadPage() {
  const [keyPad, setKeypad] = useState<CreateKeypad>();

  useEffect(() => {
    createKeypad().then(res => setKeypad(res));
  }, []);

  return (
    <section>
      <Txt typography="h1" color={colors.black}>
        토스 보안키패드 기술과제
      </Txt>
      <Input label="비밀번호">
        <KeypadContainer>
          <InputKeypadForm name="password" keyPad={keyPad} />
        </KeypadContainer>
      </Input>
      <Spacing size={24} />
      <Input label="비밀번호 확인">
        <KeypadContainer>
          <InputKeypadForm name="passwordCheck" keyPad={keyPad} />
        </KeypadContainer>
      </Input>
      <Spacing size={24} />
      <Button css={{ width: '100%' }}>완료</Button>
    </section>
  );
}
