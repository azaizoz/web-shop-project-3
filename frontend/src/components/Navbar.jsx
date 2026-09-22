import React from 'react'
import { ShoppingCart } from 'lucide-react' 
import { Link, useResolvedPath } from 'react-router-dom'  

function Navbar() {
  const {pathname} = useResolvedPath();
  const isHomePage = pathname === '/';

  return (
    <div className="bg-base-100/80 background-blue-lg border-b border-base-content/10 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto">
        <div className="navbar px-4 min-h-[4rem] justify-between">
          {/* logo */}
          <div className="flex-1 lg:flex-none">
            <Link to="/" className="hover:opacity-80 transition-opacity">
              <div className="flex items-center gap-2">
                <ShoppingCart className="size-9 text-primary" />
                <span className="font-semibold font-mono tracking-widest text-3xl 
                bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                  PostgresShop
                </span>

              </div>
            </Link>
          </div>
          {/* RIGHT SECTION */}
          <div className="flex items-center gap-4">
            <p>ThemeSelector</p>

            {isHomePage && (
              <div className="indicator">
                <div className="p-2 rounded-full hover:bg-base-200 transition-colors">
                  <ShoppingCart className="size-5" />
                  <span className="badge badge-sm indicator-item bg-primary">8</span>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
