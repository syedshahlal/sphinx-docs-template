import type React from "react"

interface NavItem {
  label: string
  href: string
}

interface HeaderProps {
  navItems: NavItem[]
}

const Header: React.FC<HeaderProps> = ({ navItems }) => {
  return (
    <header>
      <nav>
        <ul>
          {navItems.map((item) => (
            <li key={item.href}>
              <a href={item.href}>{item.label}</a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}

export default Header
export { Header }
