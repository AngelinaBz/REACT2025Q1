import { Component } from 'react';
import './ErrorMessage.css';

interface ErrorMessageProps {
  onClose: () => void;
}

class ErrorMessage extends Component<ErrorMessageProps> {
  render() {
    return (
      <div className="overlay">
        <div className="errorMessage">
          <img src="./gif.gif" alt="gif" />
          <h1 className="error-title">Something went wrong..</h1>
          <button type="button" onClick={this.props.onClose}>
            Back
          </button>
        </div>
      </div>
    );
  }
}
export default ErrorMessage;
