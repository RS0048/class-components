import { Component, ErrorInfo, ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  errorBoundary: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { errorBoundary: false };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('Uncaught error:', error, errorInfo);
    this.setState({ errorBoundary: true });
  }

  render(): React.ReactNode {
    if (this.state.errorBoundary) {
      return <h1>We have a problem, but we are already solving it</h1>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
