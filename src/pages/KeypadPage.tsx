import { Button } from '_tosslib/components/Button';
import { Input } from '_tosslib/components/Input';
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
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
};

const DEFAULT_RESULT = { uid: '', coords: [] };

export function KeypadPage() {
  const { password, passwordCheck, setPassword, setPasswordCheck } = usePassword();
  const { data: passwordKeyPad, mutate: passwordMutate } = useSWR<CreateKeypad>('password', createKeypad, swrOption);
  const { data: confirmKeyPad, mutate: confirmMutate } = useSWR<CreateKeypad>('passwordCheck', createKeypad, swrOption);

  const onSubmit = async () => {
    if (password.coords.length !== 6 || passwordCheck.coords.length !== 6) {
      return;
    }
    const data = await submitPassword(password, passwordCheck);
    setPassword(DEFAULT_RESULT);
    setPasswordCheck(DEFAULT_RESULT);
  };

  return (
    <section>
      <Txt typography="h1" color={colors.black}>
        토스 보안키패드 기술과제
      </Txt>
      <KeypadContainer>
        <InputKeypadForm name="password" label="비밀번호" keyPad={passwordKeyPad} mutate={passwordMutate} />
        <Spacing size={24} />
        <InputKeypadForm name="passwordCheck" label="비밀번호 확인" keyPad={confirmKeyPad} mutate={confirmMutate} />
      </KeypadContainer>
      <Spacing size={24} />
      <Button onClick={onSubmit} css={{ width: '100%' }}>
        완료
      </Button>
    </section>
  );
}
