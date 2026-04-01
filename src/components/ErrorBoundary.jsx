import { Component } from "react";

export default class ErrorBoundary extends Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error("[ErrorBoundary]", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-stone-950 px-6 text-center">
          <p className="text-7xl mb-6">⚠️</p>
          <h1 className="text-3xl font-bold text-stone-100 mb-3">
            Something went wrong
          </h1>
          <p className="text-stone-400 max-w-md mb-8">
            An unexpected error occurred. Please refresh the page or contact
            support if the problem persists.
          </p>
          <p className="text-xs text-stone-600 bg-stone-900 rounded-lg px-4 py-2 font-mono max-w-sm truncate">
            {this.state.error?.message}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-8 btn-primary"
          >
            Refresh page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
