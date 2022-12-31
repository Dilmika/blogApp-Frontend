import { Link, Navigate } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'
import { useBlogContext } from '../hooks/useBlog'
import React, { useEffect } from 'react'


const Navbar = () => {

  const { logout } = useLogout()
  const { user } = useAuthContext()
  const { blog_loaded, blogs } = useBlogContext()
  
  useEffect(() => {
    console.log('blog_loaded navbar ', blog_loaded);
    console.log('blogs: navbar ', blogs);
  }, [blog_loaded, blogs])
  

  const handleClick = () => {
    logout()
  }
  
  return (
    <header>
      <div className="container">

        <div className='menu-add-blog'>
          <Link to="/">
            <h1>Blogger</h1>
          </Link>

          <menu>
            <div>
              {
                !blog_loaded
                  ?
                  <Link to="/addBlog"><button>Add a new Blog</button></Link>
                  :
                  <Link to="/"><button>Homepage</button></Link>
              }
            </div>
            <div>
              <button>All Blogs</button>
            </div>
          </menu>
        </div>


        <nav>
          {user && (
            <div>
              <span>{user.email}</span>
              <button onClick={handleClick} >Logout</button>
            </div>
          )}

          {!user && (
            <div>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </div>
          )}

        </nav>

      </div>

    </header>
  )
}

export default Navbar