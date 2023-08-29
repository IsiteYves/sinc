const routes = {
  analytics: {
    label: 'Analytics',
    url: '/dashboard/analytics',
    name: 'analytics',
  },
  login: {
    label: 'Login',
    url: '/',
    name: 'login',
  },
  signup: {
    label: 'Sign up',
    url: '/signup',
    name: 'signup',
  },
  serverLogin: {
    url: '/api/login',
  },
  setCookie: {
    url: '/api/setCookie',
  },
  serverLogout: {
    url: '/api/logout',
  },
  admins: {
    label: 'Admins',
    url: '/dashboard/admins',
    name: 'admins',
  },
  event: {
    label: 'Events',
    url: '/dashboard/events',
    name: 'events',
  },
  users: {
    label: 'Users',
    url: '/dashboard/users',
    name: 'users',
  },
  welcome: {
    label: 'Welcome',
    url: '/dashboard/welcome',
    name: 'welcome',
  },
  pricing: {
    label: 'Pricing',
    url: '/dashboard/pricing',
    name: 'pricing',
  },
  join: {
    label: 'Join',
    url: '/dashboard/join',
    name: 'join',
  },
  settings: {
    label: 'Settings',
    url: '/dashboard/settings',
    name: 'settings',
  },
  add: {
    label: 'Add',
    url: '/dashboard/add',
    name: 'add',
  },
  verify: {
    label: 'Verify account',
    url: '/verify',
    name: 'verify',
  },
  usernamePrompt: {
    label: 'User name',
    url: '/username',
    name: 'username',
  },
  forgotPassword: {
    label: 'Forgot Password',
    url: '/forgot-password',
    name: 'forgot-password',
  },
}

export default routes
