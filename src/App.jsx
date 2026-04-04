import { Routes, Route } from 'react-router-dom'
import ErrorBoundary from './components/ErrorBoundary.jsx'
import Home from './pages/Home.jsx'
import Guide from './pages/Guide.jsx'
import Review from './pages/Review.jsx'
import Price from './pages/Price.jsx'

export default function App() {
  return (
    <ErrorBoundary>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/guide" element={<Guide />} />
        <Route path="/review" element={<Review />} />
        <Route path="/price" element={<Price />} />
      </Routes>
    </ErrorBoundary>
  )
}
