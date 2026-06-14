import type { AppPage } from '../types'
import { PAGE_LABELS } from '../types'
import { useEffect, useState } from 'react'

interface HamburgerMenuProps {
  currentPage: AppPage
  onNavigate: (page: AppPage) => void
  setupComplete: boolean
}

const MENU_PAGES: AppPage[] = ['inicio', 'escalacao', 'exibicao', 'partida']

export function HamburgerMenu({ currentPage, onNavigate, setupComplete }: HamburgerMenuProps) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open])

  const handleNav = (page: AppPage) => {
    onNavigate(page)
    setOpen(false)
  }

  return (
    <>
      <button
        type="button"
        className="hamburger-btn"
        aria-label={open ? 'Fechar menu' : 'Abrir menu'}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span className={`hamburger-icon ${open ? 'open' : ''}`}>
          <span />
          <span />
          <span />
        </span>
      </button>

      {open && (
        <div className="menu-overlay" onClick={() => setOpen(false)} aria-hidden />
      )}

      <nav className={`side-menu ${open ? 'open' : ''}`} aria-hidden={!open}>
        <p className="menu-title">Menu</p>
        <ul className="menu-list">
          {MENU_PAGES.map((page) => {
            const disabled = !setupComplete && page !== 'inicio'
            return (
              <li key={page}>
                <button
                  type="button"
                  className={`menu-item ${currentPage === page ? 'active' : ''}`}
                  disabled={disabled}
                  onClick={() => handleNav(page)}
                >
                  {PAGE_LABELS[page]}
                </button>
              </li>
            )
          })}
        </ul>
      </nav>
    </>
  )
}
