import { Input } from '_tosslib/components/Input';
import KeypadGrid from 'components/KeypadGrid';
import React, { useEffect, useRef, useState } from 'react';
import type { CreateKeypad } from 'pages/remotes';

type Props = {
  name: string;
  keyPad: CreateKeypad | undefined;
};

const InputKeypadForm = ({ name, keyPad }: Props) => {
  const [isOpenKeypad, setIsOpenKeypad] = useState(false);
  const [text, setText] = useState('');
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  const handleOutsideClick = (e: MouseEvent) => {
    const target = e.target as Node;
    if (sectionRef.current && !sectionRef.current.contains(target)) {
      setIsOpenKeypad(false);
    }
  };

  const onFocus = () => setIsOpenKeypad(true);

  return (
    <section ref={sectionRef}>
      <Input.TextField name={name} value={text} readOnly onFocus={onFocus} />
      {keyPad && isOpenKeypad && <KeypadGrid keyPad={keyPad} setText={setText} setIsOpenKeypad={setIsOpenKeypad} />}
    </section>
  );
};

export default InputKeypadForm;
