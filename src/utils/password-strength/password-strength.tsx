import './password-strength.css';

interface PasswordStrengthProps {
  password: string;
}

const PasswordStrength = ({ password }: PasswordStrengthProps) => {
  function testPasswordStrength(password: string) {
    if (!password) return 0;

    const tests = [
      /(?=.*\d)/g,
      /(?=.*[A-ZА-Я])/g,
      /(?=.*[a-zа-я])/g,
      /(?=.*[@$!%*?&])/g,
    ];
    return tests.filter((test) => test.test(password)).length;
  }

  const strength = testPasswordStrength(password);
  let width = '0%';
  let backgroundColor = 'lightgray';

  if (strength === 1) {
    width = '25%';
    backgroundColor = 'red';
  } else if (strength === 2) {
    width = '50%';
    backgroundColor = 'yellow';
  } else if (strength === 3) {
    width = '75%';
    backgroundColor = 'yellow';
  } else if (strength === 4) {
    width = '100%';
    backgroundColor = 'green';
  }

  return (
    <div className="passwordStrength">
      <div className="strength" style={{ width, backgroundColor }} />
    </div>
  );
};

export default PasswordStrength;
