import './ErrorMessage.css';
import { useTheme } from '../themeContext/UseTheme';

interface ErrorMessageProps {
  onClose: () => void;
}

const ErrorMessage = ({ onClose }: ErrorMessageProps) => {
  const { theme } = useTheme();

  return (
    <div className="overlay">
      <div className="errorMessage">
        <img src="./gif.gif" alt="gif" />
        <h1 className="error-title">Something went wrong..</h1>
        <button className={`button-${theme}`} type="button" onClick={onClose}>
          Back
        </button>
      </div>
    </div>
  );
};
export default ErrorMessage;
