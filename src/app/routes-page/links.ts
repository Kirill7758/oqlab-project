export enum LINKS {
    MAIN = '/',
    NEWS = '/news',
    LOGIN = '/login',
    PROFILE = '/profile/:id',
    REDIRECT = '/login'
}

export const PATHS = {
    MAIN: '/',
    NEWS: '/news',
    LOGIN: '/login',
    PROFILE: (id: string | number) => `/profile/${id}`,
    REDIRECT: '/login'
}

export const LINKS_STATE = {
    MAIN: { path: LINKS.MAIN, title: 'Main Page' },
    NEWS: { path: LINKS.NEWS, title: 'News Page' },
    LOGIN: { path: LINKS.LOGIN, title: 'Login Page' },
    PROFILE: { path: '/profile', title: 'Profile Page' },
}
