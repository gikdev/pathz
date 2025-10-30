import { iconBtn } from "#/shared/skins"
import { XIcon } from "@phosphor-icons/react"
import type { ReactNode } from "react"
import { tv } from "tailwind-variants"

const dialog = tv({
  slots: {
    overlay: "fixed inset-0 z-50 bg-black/50",
    header: "flex flex-col gap-4 text-start",
    footer: "flex flex-col sm:flex-row sm:justify-end gap-2",
    title: "text-xl leading-none font-bold text-gray-900",
    description: "text-gray-600 text-base",
    container: `
      -- ARRANGEMENT
      flex flex-col gap-4 

      -- SIZING
      w-full max-w-[calc(100%-2rem)] sm:max-w-lg rounded-lg p-6 

      -- SKIN
      bg-gray-100 shadow-lg border-2 border-gray-300

      -- PLACEMENT
      z-50 fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]
    `,
  },
})

interface DialogContentProps {
  title: string
  description?: string
  children?: ReactNode
  footer?: ReactNode

  onClose: () => void

  dismissOnOverlay?: boolean
  dismissOnCloseBtn?: boolean
}

export function Dialog({
  children,
  description,
  onClose,
  title,
  footer,
  dismissOnCloseBtn = true,
  dismissOnOverlay = true,
}: DialogContentProps) {
  const styles = dialog()

  return (
    <div>
      <button
        disabled={!dismissOnOverlay}
        onClick={onClose}
        className={styles.overlay()}
      />

      <div className="text-xl" />
      <div className={styles.container()}>
        <div className={styles.header()}>
          <p className={styles.title()}>{title}</p>
          {description && <p className={styles.description()}>{description}</p>}
        </div>

        {children}

        {footer && <div className={styles.footer()}>{footer}</div>}

        {dismissOnCloseBtn && <CloseBtn onClose={onClose} />}
      </div>
    </div>
  )
}

interface CloseBtnProps {
  onClose: () => void
}

const CloseBtn = ({ onClose }: CloseBtnProps) => (
  <button
    className={iconBtn({ className: "absolute top-2 left-2", size: 8 })}
    onClick={onClose}
  >
    <XIcon />
  </button>
)
