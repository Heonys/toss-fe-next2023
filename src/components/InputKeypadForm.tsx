import { Input } from '_tosslib/components/Input';
import KeypadGrid from 'components/KeypadGrid';
import { useEffect, useRef, useState, useCallback, KeyboardEvent } from 'react';
import type { CreateKeypad } from 'pages/remotes';
import { usePassword } from 'context/PasswordContext';

type Props = {
  name: 'password' | 'passwordCheck';
  keyPad: CreateKeypad | undefined;
  label: string;
};

const InputKeypadForm = ({ name, keyPad, label }: Props) => {
  const [isOpenKeypad, setIsOpenKeypad] = useState(false);
  const [text, setText] = useState('');
  const sectionRef = useRef<HTMLDivElement>(null);
  const { setPassword, setPasswordCheck } = usePassword();
  const setState = name === 'password' ? setPassword : setPasswordCheck;

  const handleOutsideClick = useCallback(
    (e: FocusEvent) => {
      const target = e.target as Node;
      if (sectionRef.current && !sectionRef.current.contains(target)) {
        setIsOpenKeypad(false);
        setText(prev => (prev.length < 6 ? '' : prev));
        setState(prev => {
          const copy = { ...prev };
          copy.coords.length < 6 ? (copy.coords = []) : null;
          return copy;
        });
      }
    },
    [setState]
  );

  useEffect(() => {
    document.addEventListener('focusin', handleOutsideClick);
    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('focusin', handleOutsideClick);
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [handleOutsideClick]);

  const onKeyDown = (evnet: KeyboardEvent) => {
    if (evnet.key === 'Backspace') {
      setText(prev => prev.slice(0, -1));
      setState(prev => {
        const copy = { ...prev };
        copy.coords = copy.coords.slice(0, -1);
        return copy;
      });
    }
  };

  return (
    <section ref={sectionRef} onKeyDown={onKeyDown}>
      <Input label={label}>
        <Input.TextField type="password" name={name} value={text} readOnly onFocus={() => setIsOpenKeypad(true)} />
      </Input>
      {keyPad && isOpenKeypad && (
        <KeypadGrid name={name} keyPad={keyPad} text={text} setText={setText} setIsOpenKeypad={setIsOpenKeypad} />
      )}
    </section>
  );
};

export default InputKeypadForm;
