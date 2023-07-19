import { Button } from '_tosslib/components/Button';
import { Spacing } from '_tosslib/components/Spacing';
import { Txt } from '_tosslib/components/Txt';
import colors from '_tosslib/constants/colors';
import { createKeypad, submitPassword } from './remotes';
import type { CreateKeypad } from './remotes';
import InputKeypadForm from 'components/InputKeypadForm';
import styled from '@emotion/styled';
import { usePassword } from 'context/PasswordContext';
import useSWR from 'swr';

const KeypadContainer = styled.div`
  position: relative;
`;

const swrOption = {
  revalidateOnFocus: false,
};

export function KeypadPage() {
  const { password, passwordCheck } = usePassword();
  const { data: passwordKeyPad } = useSWR<CreateKeypad>('password', createKeypad, swrOption);
  const { data: confirmKeyPad } = useSWR<CreateKeypad>('passwordCheck', createKeypad, swrOption);

  const onClick = async () => {
    if (password.coords.length !== 6 || passwordCheck.coords.length !== 6) {
      return;
    }
    await submitPassword(password, passwordCheck);
  };

  return (
    <section>
      <Txt typography="h1" color={colors.black}>
        토스 보안키패드 기술과제
      </Txt>
      <KeypadContainer>
        <InputKeypadForm name="password" label="비밀번호" keyPad={passwordKeyPad} />
        <Spacing size={24} />
        <InputKeypadForm name="passwordCheck" label="비밀번호 확인" keyPad={confirmKeyPad} />
      </KeypadContainer>
      <Spacing size={24} />
      <Button onClick={onClick} css={{ width: '100%' }}>
        완료
      </Button>
    </section>
  );
}
