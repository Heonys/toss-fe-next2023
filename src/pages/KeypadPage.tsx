import { Button } from '_tosslib/components/Button';
import { Input } from '_tosslib/components/Input';
import { Spacing } from '_tosslib/components/Spacing';
import { Txt } from '_tosslib/components/Txt';
import colors from '_tosslib/constants/colors';
import { useEffect, useState } from 'react';
import { createKeypad } from './remotes';
import type { CreateKeypad } from './remotes';
import KeypadGrid from 'components/KeypadGrid';
import { css } from '@emotion/react';

type PadName = {
  password: boolean;
  passwordCheck: boolean;
};

export function KeypadPage() {
  const [keyPad, setKeypad] = useState<CreateKeypad>();
  const [isPadOpen, setIsPadOpen] = useState<PadName>({ password: false, passwordCheck: false });

  useEffect(() => {
    createKeypad().then(res => setKeypad(res));
  }, []);

  const onFocus = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    const name = e.currentTarget.name;
    setIsPadOpen(prev => ({ ...prev, [name]: true }));
  };

  return (
    <section>
      <Txt typography="h1" color={colors.black}>
        토스 보안키패드 기술과제
      </Txt>
      <Input label="비밀번호">
        <div
          css={css`
            position: relative;
          `}
        >
          <Input.TextField name="password" onFocus={onFocus} readOnly />
          {keyPad && isPadOpen.password && <KeypadGrid keyPad={keyPad} />}
        </div>
      </Input>
      <Spacing size={24} />
      <Input label="비밀번호 확인">
        <div
          css={css`
            position: relative;
          `}
        >
          <Input.TextField name="passwordCheck" onFocus={onFocus} readOnly />
          {keyPad && isPadOpen.passwordCheck && <KeypadGrid keyPad={keyPad} />}
        </div>
      </Input>
      <Spacing size={24} />
      <Button css={{ width: '100%' }}>완료</Button>
    </section>
  );
}
