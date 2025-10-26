import {
  coursesControllerCreateOneLessonByCourseIdV1Mutation,
  lessonsControllerUpdateOneByIdV1Mutation,
  type LessonResDto,
} from "#/generated/api-client"
import { useAppForm } from "#/features/forms"
import { btn } from "#/shared/skins"
import { tvcn } from "#/shared/utils"
import { FloppyDiskIcon } from "@phosphor-icons/react"
import { useMutation } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { z } from "zod"

const LessonFormSchema = z.object({
  title: z.string().min(1, "این ورودی اجباری است."),
})
type LessonFormValues = z.infer<typeof LessonFormSchema>

const emptyDefaultValues: LessonFormValues = {
  title: "",
}

type SelectFn = (lesson: LessonResDto) => LessonFormValues
export const select: SelectFn = c => ({
  title: c.title,
})

interface CommonProps {
  onSuccess?: () => void
}

interface EditModeProps {
  mode: "edit"
  defaultValues: LessonFormValues
  courseId: number
}

interface CreateModeProps {
  mode: "create"
  courseId: number
}

type LessonFormProps = CommonProps & (EditModeProps | CreateModeProps)

const onSuccess = () => toast.success("انجام شد...")
const onError = (err: unknown) =>
  toast.error(`یه مشکلی پیش اومد: ${JSON.stringify(err)}`)

const useCreateMutation = () =>
  useMutation({
    ...coursesControllerCreateOneLessonByCourseIdV1Mutation(),
    onSuccess,
    onError,
  })

const useUpdateMutation = () =>
  useMutation({
    ...lessonsControllerUpdateOneByIdV1Mutation(),
    onSuccess,
    onError,
  })

export function LessonForm(p: LessonFormProps) {
  const { mutate: create } = useCreateMutation()
  const { mutate: update } = useUpdateMutation()

  const form = useAppForm({
    defaultValues: p.mode === "create" ? emptyDefaultValues : p.defaultValues,
    validators: { onChange: LessonFormSchema },
    onSubmit: async ({ value }) => {
      const onSuccess = () => {
        form.reset(emptyDefaultValues)
        p.onSuccess?.()
      }

      const path = { id: p.courseId }
      const body = {
        title: value.title,
      }

      switch (p.mode) {
        case "create":
          create({ body, path }, { onSuccess })
          return
        case "edit":
          update({ body, path }, { onSuccess })
          return
        default:
          return
      }
    },
  })

  return (
    <div className={tvcn("flex flex-col gap-4")}>
      <form.AppField name="title">
        {f => <f.SimpleTextField label="نام *" />}
      </form.AppField>

      <form.AppForm>
        <form.Btn className={btn()}>
          <FloppyDiskIcon />
          <span>ثبت</span>
        </form.Btn>
      </form.AppForm>
    </div>
  )
}
