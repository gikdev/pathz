import {
  coursesControllerCreateOneV1Mutation,
  coursesControllerUpdateOneByIdV1Mutation,
  type CourseResDto,
} from "#/api-client"
import { useAppForm } from "#/features/forms"
import { btn } from "#/shared/skins"
import { tvcn } from "#/shared/utils"
import { FloppyDiskIcon } from "@phosphor-icons/react"
import { useMutation } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { z } from "zod"

const CourseFormSchema = z.object({
  title: z.string().min(1, "این ورودی اجباری است."),
  description: z.string(),
})
type CourseFormValues = z.infer<typeof CourseFormSchema>

const emptyDefaultValues: CourseFormValues = {
  title: "",
  description: "",
}

type SelectFn = (book: CourseResDto) => CourseFormValues
export const select: SelectFn = c => ({
  title: c.title,
  description: c.description || "",
})

type CommonProps = {
  onSuccess?: () => void
}

type EditModeProps = {
  mode: "edit"
  defaultValues: CourseFormValues
  courseId: number
}

type CreateModeProps = {
  mode: "create"
}

type CourseFromProps = CommonProps & (EditModeProps | CreateModeProps)

const onSuccess = () => toast.success("انجام شد...")
const onError = (err: unknown) =>
  toast.error(`یه مشکلی پیش اومد: ${JSON.stringify(err)}`)

const useCreateCourseMutation = () =>
  useMutation({
    ...coursesControllerCreateOneV1Mutation(),
    onSuccess,
    onError,
  })

const useUpdateCourseMutation = () =>
  useMutation({
    ...coursesControllerUpdateOneByIdV1Mutation(),
    onSuccess,
    onError,
  })

export function CourseForm(p: CourseFromProps) {
  const { mutate: createCourse } = useCreateCourseMutation()
  const { mutate: updateCourse } = useUpdateCourseMutation()

  const form = useAppForm({
    defaultValues: p.mode === "create" ? emptyDefaultValues : p.defaultValues,
    validators: { onChange: CourseFormSchema },
    onSubmit: async ({ value }) => {
      const onSuccess = () => {
        form.reset(emptyDefaultValues)
        p.onSuccess?.()
      }

      const body = {
        title: value.title,
        description: value.description || null,
      }

      switch (p.mode) {
        case "create":
          createCourse({ body }, { onSuccess })
          return
        case "edit":
          const path = { id: p.courseId }
          updateCourse({ body, path }, { onSuccess })
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

      <form.AppField name="description">
        {f => <f.SimpleTextField label="توضیحات" isMultiline />}
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
