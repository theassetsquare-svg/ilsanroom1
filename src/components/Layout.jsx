import { Link, useLocation } from 'react-router-dom'

const navItems = [
  { path: '/', label: '홈' },
  { path: '/guide', label: '초보자 가이드' },
  { path: '/review', label: '지역별 후기' },
  { path: '/price', label: '가격 비교' },
]

export default function Layout({ children }) {
  const { pathname } = useLocation()

  return (
    <>
      <header className="site-header">
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
      </header>
      <main>{children}</main>
      <footer className="site-footer">
        <p>본 사이트는 정보 제공 목적으로 운영됩니다.</p>
        <p>&copy; 2026 일산룸 가이드</p>
      </footer>
    </>
  )
}
