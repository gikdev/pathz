import { linkOptions } from "@tanstack/react-router"
import {
  ChatsIcon,
  HouseIcon,
  MapTrifoldIcon,
  StackIcon,
  UserCircleIcon,
} from "@phosphor-icons/react"
import type { Icon } from "@phosphor-icons/react"
import { Link, useLocation } from "@tanstack/react-router"

const DEFAULT_TAB_ITEMS: TabItem[] = [
  {
    id: 0,
    Icon: HouseIcon,
    title: "خانه",
    to: linkOptions({ to: "/" }).to,
  },
  {
    id: 1,
    Icon: StackIcon,
    title: "دوره‌ها",
    to: linkOptions({ to: "/" }).to,
    disabled: true,
  },
  {
    id: 2,
    Icon: MapTrifoldIcon,
    title: "مسیر",
    to: linkOptions({ to: "/folders" }).to,
  },
  {
    id: 3,
    Icon: ChatsIcon,
    title: "چت",
    to: linkOptions({ to: "/" }).to,
    disabled: true,
  },
  {
    id: 4,
    Icon: UserCircleIcon,
    title: "پروفایل",
    to: linkOptions({ to: "/" }).to,
    disabled: true,
  },
]

export interface TabItem {
  id: number
  Icon: Icon
  title: string
  to: string
  disabled?: boolean
}

interface BottomTabsProps {
  tabItems?: TabItem[]
}

export function BottomTabs({ tabItems = DEFAULT_TAB_ITEMS }: BottomTabsProps) {
  const { pathname } = useLocation()

  return (
    <div className="h-16 bg-zinc-100 border-t border-zinc-300 w-full grid [grid-template-columns:repeat(auto-fit,minmax(0,1fr))]">
      {tabItems.map(t => (
        <BottomTab
          Icon={t.Icon}
          id={t.id}
          key={t.id}
          isActive={pathname === t.to}
          title={t.title}
          to={t.to}
          disabled={t.disabled}
        />
      ))}
    </div>
  )
}

interface BottomTabProps extends TabItem {
  isActive: boolean
}

function BottomTab({
  Icon,
  id,
  isActive,
  title,
  to,
  disabled,
}: BottomTabProps) {
  if (disabled)
    return (
      <button className="cursor-not-allowed flex flex-col gap-0.5 p-2 items-center text-xs opacity-50">
        <Icon size={24} />
        <span>{title}</span>
      </button>
    )

  if (isActive)
    return (
      <div className="flex flex-col items-center justify-center">
        <div className="flex gap-1 py-2 px-4 items-center justify-center rounded-4xl bg-indigo-600 text-zinc-100">
          <Icon size={24} weight="fill" />
        </div>
      </div>
    )

  return (
    <Link
      to={to}
      key={id}
      className="flex flex-col gap-0.5 p-2 items-center text-xs cursor-pointer hover:bg-zinc-200"
    >
      <Icon size={24} />
      <span>{title}</span>
    </Link>
  )
}
