import { Books, Gauge, Gear, House, Plus, UsersThree } from 'phosphor-react'
import routes from './routes'

export const SideBarLinks = [
  {
    name: routes.analytics.name,
    url: routes.analytics.url,
    icon: <Gauge size={22} />,
  },

  {
    name: routes.event.name,
    url: routes.event.url,
    icon: <House size={22} />,
  },
  // {
  //   name: routes.analytics.name,
  //   url: routes.analytics.url,
  //   icon: <Books size={22} />,
  // },
  {
    name: routes.users.name,
    url: routes.users.url,
    icon: <UsersThree size={20} />,
  },
  // {
  //   name: routes.settings.name,
  //   url: routes.settings.url,
  //   icon: <Gear size={22} weight="fill" />,
  // },
  {
    name: routes.add.name,
    url: routes.add.url,
    icon: <Plus size={22} color="#FCA311" />,
  },
]
