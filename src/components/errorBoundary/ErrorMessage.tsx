import Image from 'next/image';

import './ErrorMessage.module.css';

interface ErrorMessageProps {
  onClose(): void;
}

const ErrorMessage = ({ onClose }: ErrorMessageProps) => {
  return (
    <div className="overlay">
      <div className="errorMessage">
        <Image src="/error.png" alt="NotFound" width={120} height={120} />
        <h1 className="error-title">Something went wrong..</h1>
        <button className={`button`} type="button" onClick={onClose}>
          Back
        </button>
      </div>
    </div>
  );
};
export default ErrorMessage;
