import React from 'react'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, info) {
    console.error('ErrorBoundary caught:', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '40px 20px', textAlign: 'center' }}>
          <h2>페이지를 불러오는 중 문제가 발생했습니다.</h2>
          <button
            onClick={() => window.location.reload()}
            style={{
              marginTop: 16,
              padding: '12px 32px',
              fontSize: 16,
              borderRadius: 8,
              border: 'none',
              background: '#7c3aed',
              color: '#fff',
              cursor: 'pointer'
            }}
          >
            다시 시도
          </button>
        </div>
      )
    }
    return this.props.children
  }
}

export default ErrorBoundary
