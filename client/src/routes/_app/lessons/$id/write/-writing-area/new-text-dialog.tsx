import { useState } from "react"
import { useAppDispatch } from "#/features/store"
import { writingAreaSlice } from "./store"
import { Dialog } from "#/components/ui/dialog"
import { btn } from "#/shared/skins"
import { input } from "#/features/forms/skins"

const { addText } = writingAreaSlice.actions

export function NewTextDialog({ onClose }: { onClose: () => void }) {
  const [content, setContent] = useState("")
  const dispatch = useAppDispatch()

  const submit = () => {
    dispatch(addText(content))
    setContent("")
    onClose()
  }

  return (
    <Dialog
      title="متن جدید"
      onClose={onClose}
      dismissOnCloseBtn={false}
      dismissOnOverlay={false}
      footer={
        <>
          <button onClick={onClose} className={btn({ theme: "light-neutral" })}>
            انصراف
          </button>

          <button
            onClick={submit}
            className={btn({ theme: "contained-primary" })}
          >
            ایجاد
          </button>
        </>
      }
    >
      <textarea
        value={content}
        className={input({ isMultiline: true, className: "min-h-80" })}
        onChange={e => setContent(e.target.value)}
      />
    </Dialog>
  )
}
