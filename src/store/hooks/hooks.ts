import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '..'

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

/**
 * Redux provides useDispatch and useSelector hooks for React,
 * but in order to have them aware of the types that we've just defined in our index.ts file,
 *  we have to re-export new functions that are type aware.
 */
