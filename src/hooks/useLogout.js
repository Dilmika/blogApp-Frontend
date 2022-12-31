import { useAuthContext } from "./useAuthContext"
import { useWorkoutsContext } from "./useWorkoutsContext"
import { useBlogContext } from "./useBlog"
export const useLogout = () => {
    const { dispatch } = useAuthContext()
    const { dispatch : workoutsDispatch } = useWorkoutsContext()
    const { dispatch : blogDispatch } = useBlogContext() 

    const logout = () => {
        localStorage.removeItem('user')

        dispatch({type: 'LOGOUT'})
        workoutsDispatch({type : 'SET_WORKOUTS', payload : null})
        blogDispatch({type : 'BLOG_LOADED', payload : false})

    }

    return { logout }
}