import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import BottomBar from './BottomBar.jsx'
import SearchBar from './SearchBar.jsx'

const navItems = [
  { path: '/', label: '홈' },
  { path: '/guide', label: '초보자 가이드' },
  { path: '/review', label: '지역별 후기' },
  { path: '/price', label: '가격 비교' },
]

export default function Layout({ children }) {
  const { pathname } = useLocation()

  useEffect(() => {
    const key = `scrollPos_${pathname}`
    const saved = sessionStorage.getItem(key)
    if (saved) {
      window.scrollTo(0, parseInt(saved, 10))
    } else {
      window.scrollTo(0, 0)
    }

    const handleScroll = () => {
      sessionStorage.setItem(key, String(window.scrollY))
    }
    window.addEventListener('scroll', handleScroll, { passive: true })

    const visits = parseInt(sessionStorage.getItem('visitCount') || '0', 10) + 1
    sessionStorage.setItem('visitCount', String(visits))

    return () => window.removeEventListener('scroll', handleScroll)
  }, [pathname])

  return (
    <>
      <header className="site-header">
        <div className="site-header-inner">
          <nav className="site-nav">
            <Link to="/" className="site-logo">일산룸</Link>
            <ul className="nav-links">
              {navItems.map(item => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={pathname === item.path ? 'active' : ''}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <SearchBar />
        </div>
      </header>
      <main>{children}</main>
      <footer className="site-footer">
        <p>본 사이트는 정보 제공 목적으로 운영됩니다.</p>
        <p>&copy; 2026 일산룸 가이드</p>
      </footer>
      <BottomBar />
    </>
  )
}
