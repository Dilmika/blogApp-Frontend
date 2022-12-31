import { createContext, useReducer } from "react";

export const BlogContext = createContext()

export const blogReducer = (state, action) => {
    console.log(' BlogContext action.payload: ',  action.payload);
    console.log('BlogContext action.type: ', action.type);

    switch (action.type) {
        case 'BLOG_LOADED':
            return {
                blog_loaded: action.payload
            }
        case 'CREATE_BLOG':
            return {
                blogs: [action.payload, ...state.blogs]
            }
        case 'SET_BLOGS':
            return {
                blogs: action.payload
            }
        default:
            return state
    }
}

export const BlogContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(blogReducer, {
        blogs: null,
        blog_loaded: false,
    })

    return (
        <BlogContext.Provider value={{ ...state, dispatch }}>
            {children}
        </BlogContext.Provider>
    )
}