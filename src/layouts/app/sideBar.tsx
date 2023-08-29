import { Logo } from '@components/logo'
import { baseAPI } from '@store/api'
import { logout } from '@store/reducers/users'
import { SideBarLinks } from '@utils/links'
import routes from '@utils/routes'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ArrowCircleLeft, Power } from 'phosphor-react'
import { FC, useState } from 'react'
import { useDispatch } from 'react-redux'

const SideBar: FC = () => {
  const [open, setOpen] = useState(false)

  const dispatch = useDispatch()

  const { pathname } = useRouter()
  const routeArr = pathname.split('/')
  const routeName = routeArr[routeArr.length - 1]
  const { push } = useRouter()

  const logoutAction = async () => {
    await fetch(routes.serverLogout.url, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    dispatch(logout())
    baseAPI.util.resetApiState()
  }

  return (
    <div
      className={`relative min-h-screen p-5 pt-8  ${
        open ? 'w-56' : 'w-24'
      } duration-300 bg-secondary z-50`}>
      <ArrowCircleLeft
        size={30}
        className={`absolute text-3xl bg-secondary border rounded-full cursor-pointer border-secondary text-white -right-3 top-20 ${
          !open && 'rotate-180'
        }`}
        onClick={() => setOpen(!open)}
      />
      <div className="inline-flex ml-3">
        <div
          className={`duration-500 flex items-center gap-4 text-center  ${
            !open && 'rotate-[360deg]'
          }`}>
          <Logo />
        </div>
        <span
          className={`text-white origin-left font-medium text-xl duration-300 ${
            !open && 'scale-0'
          }`}>
          Dashboard
        </span>
      </div>

      <div className="flex flex-col gap-2 pt-16">
        {SideBarLinks.map((link) => {
          const { url, name, icon } = link
          const isActive = pathname.includes(name)

          return (
            <Link key={name} href={url}>
              <div
                className={`flex items-center py-4  rounded-md w-full hover:bg-secondary-dark  px-4 ${
                  isActive ? 'bg-secondary-dark px-4' : 'bg-none'
                } `}>
                <div
                  className={`text-gray-400 flex items-center ${
                    isActive ? 'text-white text-center ' : ''
                  }`}>
                  <span className="pr-2">{icon}</span>
                  <span
                    className={`flex-1 text-lg font-medium duration-200 ${
                      !open && 'hidden'
                    } -pt-4`}>
                    {name}
                  </span>
                </div>
              </div>
            </Link>
          )
        })}
      </div>

      <button
        onClick={logoutAction}
        className="absolute inset-x-0 bottom-0 py-4 text-center rounded-lg hover:bg-secondary-dark">
        <Power className="inline text-gray-400 hover:text-white" size={22} />
      </button>
    </div>
  )
}

export default SideBar
