import { Button } from 'antd'
import { MoonOutlined, SunOutlined } from '@ant-design/icons'

export default function HeaderCom({
  isDark,
  setIsDark,
}: {
  isDark: boolean
  setIsDark: (val: boolean) => void
}) {
  function changeTheme() {
    const root = document.documentElement
    if (isDark) {
      if (root.classList.contains('dark')) root.classList.remove('dark')
      setIsDark(false)
      localStorage.setItem('theme', 'light')
    } else {
      if (!root.classList.contains('dark')) root.classList.add('dark')
      setIsDark(true)
      localStorage.setItem('theme', 'dark')
    }
  }
  return (
    <header className="flex flex-row p-2 justify-between items-center">
      <h1 className="text-xl mb-0!">电商列表页</h1>
      <Button
        icon={
          <span
            key={isDark ? 'moon' : 'sun'}
            className="inline-block animate-in spin-in-180 duration-500"
          >
            {isDark ? <MoonOutlined /> : <SunOutlined />}
          </span>
        }
        onClick={() => changeTheme()}
        color="default"
        variant="filled"
      />
    </header>
  )
}
