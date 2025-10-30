import { Dialog } from "#/components/ui/dialog"
import { btn } from "#/shared/skins"
import { createFileRoute } from "@tanstack/react-router"
import { useState } from "react"

export const Route = createFileRoute("/dev/test")({
  component: RouteComponent,
})

function RouteComponent() {
  const [isOpen, setOpen] = useState(false)

  const open = () => setOpen(true)
  const close = () => setOpen(false)

  return (
    <div>
      <button className={btn()} onClick={open}>
        باز کردن
      </button>

      {isOpen && (
        <Dialog
          title="واقعا مطمئنی؟"
          description="چطوری شما؟"
          onClose={close}
          footer={
            <>
              <button
                onClick={close}
                className={btn({ theme: "light-neutral" })}
              >
                انصراف
              </button>

              <button className={btn({ theme: "contained-primary" })}>
                باز کردن
              </button>
            </>
          }
        />
      )}
    </div>
  )
}
