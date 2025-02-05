import './ErrorMessage.css';

interface ErrorMessageProps {
  onClose: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ onClose }) => {
  return (
    <div className="overlay">
      <div className="errorMessage">
        <img src="./gif.gif" alt="gif" />
        <h1 className="error-title">Something went wrong..</h1>
        <button type="button" onClick={onClose}>
          Back
        </button>
      </div>
    </div>
  );
};
export default ErrorMessage;
