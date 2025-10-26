import { tv, type VariantProps } from "tailwind-variants"
import { ListIcon, XIcon, type Icon } from "@phosphor-icons/react"
import { tvcn } from "#/shared/utils"

const fabBtnItem = tv({
  base: "cursor-pointer active:scale-95",
  variants: {
    theme: {
      "secondary-brand":
        "bg-indigo-200 hover:bg-indigo-300 text-indigo-600 hover:text-indigo-900",
      "secondary-danger":
        "bg-red-200 hover:bg-red-300 text-red-600 hover:text-red-900",
      "secondary-neutral":
        "bg-gray-200 hover:bg-gray-300 text-gray-600 hover:text-gray-900",
      "secondary-success":
        "bg-emerald-200 hover:bg-emerald-300 text-emerald-600 hover:text-emerald-900",
    },
    size: {
      md: "px-6 py-1 gap-1 items-center flex min-h-14 [&_svg]:text-[1.3em] rounded-lg",
    },
  },
  defaultVariants: {
    theme: "secondary-neutral",
    size: "md",
  },
})

const fabBtn = tv({
  base: "cursor-pointer active:scale-95",
  variants: {
    theme: {
      "contained-brand":
        "rounded-2xl bg-indigo-600 text-gray-100 hover:bg-indigo-700",
    },
    size: {
      md: "p-4",
    },
  },
  defaultVariants: {
    size: "md",
    theme: "contained-brand",
  },
})

export interface FabItem {
  key: string
  label: string
  icon?: Icon
  hidden?: boolean
  onClick: () => void
  theme?: VariantProps<typeof fabBtnItem>["theme"]
  closeAfterClick?: boolean
}

interface FabMenuProps {
  items: FabItem[]
  isOpen?: boolean
  className?: string
  onClick?: () => void
}

export function FabMenu({
  items,
  isOpen = false,
  className,
  onClick,
}: FabMenuProps) {
  return (
    <div
      className={tvcn(
        "absolute bottom-4 left-4 flex flex-col gap-2 items-end",
        className,
      )}
    >
      {isOpen && (
        <div className="flex flex-col gap-1 items-end">
          {items.map(item => (
            <FabItem {...item} key={item.key} onClose={onClick} />
          ))}
        </div>
      )}

      <button type="button" className={fabBtn()} onClick={onClick}>
        {isOpen ? <XIcon size={24} /> : <ListIcon size={24} />}
      </button>
    </div>
  )
}

type FabItemProps = FabItem & {
  onClose?: () => void
}

function FabItem({
  label,
  onClick,
  hidden = false,
  icon: Icon,
  theme,
  closeAfterClick = false,
  onClose = () => {},
}: FabItemProps) {
  if (hidden) return true

  return (
    <button
      type="button"
      className={fabBtnItem({ theme })}
      onClick={() => {
        onClick()
        if (!closeAfterClick) return
        onClose()
      }}
    >
      {Icon && <Icon />}
      <span>{label}</span>
    </button>
  )
}
