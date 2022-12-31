import React, { useEffect, useState } from 'react'
import { useBlogContext } from '../hooks/useBlog'
import { useAuthContext } from '../hooks/useAuthContext'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AddBlog() {

    const { dispatch } = useBlogContext()
    const { user } = useAuthContext()

    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')

    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])
    const [blogLoaded, setBlogLoad] = useState(false)

    useEffect(() => {

        setBlogLoad(true)

        dispatch({ type: 'BLOG_LOADED', payload: blogLoaded })

        const fetchBlogs = async () => {
            const response = await fetch('https://blogapp-backend-vdcx.onrender.com/api/blog', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()

            if (response.ok) {
                dispatch({ type: 'SET_BLOGS', payload: json })
            }
        }

        if (user) {
            fetchBlogs()
        }


    }, [user, dispatch])


    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!user) {
            setError('You must be logged in')
            return
        }

        const blog = { title, content }
        console.log('blog: ', blog);

        // const response = await fetch('https://blogapp-backend-vdcx.onrender.com/api/blog', {
        //     method: 'POST',
        //     body: JSON.stringify(blog),
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Authorization': `Bearer ${user.token}`
        //     }
        // })

        // const result = await response.json()


        // if (!response.ok) {
        //     setError(result.error)
        //     setEmptyFields(result.emptyFields)
        //     toast(`${result.error}`, {
        //         type: toast.TYPE.ERROR
        //     })
        // }

        // if (response.ok) {
        //     setTitle('')
        //     setContent('')
        //     setError(null)
        //     setEmptyFields([])

        //     console.log('result: ', result);
        //     toast("Blog added successfully", {
        //         type: toast.TYPE.SUCCESS
        //     })

        //     dispatch({ type: 'CREATE_BLOG', payload: result })

        // }

    }

    return (
        <div className='add-blog' >

            <form onSubmit={handleSubmit}>

                <label>Blog Title:</label>
                <input
                    type="text"
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                    className={emptyFields.includes('title') ? 'addblog-input-error' : 'blog-input-title'}
                />

                <label>Content</label>
                <textarea
                    type="text"
                    onChange={(e) => setContent(e.target.value)}
                    value={content}
                    className={emptyFields.includes('content') ? 'text-area-error' : 'blog-input-field'}
                />

                <button>Add Blog</button>
                {error && <div className="error">{error}</div>}
            </form>
        </div>
    )
}
