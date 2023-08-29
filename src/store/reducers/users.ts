import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import routes from '@utils/routes'
import { clearStorage } from '@utils/storage'
import { IOrganizationSchema } from '@utils/types/organization'
import { UserInitialState, UserSchema } from '@utils/types/user'

const initialState: UserInitialState = {
    token: undefined,
    user: undefined,
    activeOrganization: undefined,
    verifyEmail: undefined,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setToken: (state, action: PayloadAction<string>) => {
            const { payload } = action
            state.token = payload
        },
        setVerifyEmail: (state, action: PayloadAction<string>) => {
            const { payload } = action
            state.verifyEmail = payload
        },
        updateUser: (state, action: PayloadAction<UserSchema>) => {
            const { payload } = action
            state.user = payload
        },
        setActiveOrganization: (state, action: PayloadAction<IOrganizationSchema>) => {
            const { payload } = action
            state.activeOrganization = payload
        },
        logout: (state) => {
            state = initialState
            clearStorage()
            window.location.href = routes.login.url
        },
    },
})

// Action creators are generated for each case reducer function
export const { logout, updateUser, setVerifyEmail, setToken, setActiveOrganization } =
    userSlice.actions

export default userSlice.reducer
