import { Component, ReactNode, ErrorInfo } from 'react';

import ErrorMessage from './ErrorMessage';

interface Props {
  children: ReactNode;
  onError(): void;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, ErrorBoundaryState> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    console.log('Error caught in ErrorBoundary: ', error);
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught in ErrorBoundary: ', error, errorInfo);
    this.props.onError();
  }

  closeErrorMessage = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      return <ErrorMessage onClose={this.closeErrorMessage} />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
