import { createFileRoute } from "@tanstack/react-router"
import { btn, list, phonePage } from "#/shared/skins"
import { AppBar } from "#/components/app-bar"
import { GoBackInHistoryBtn } from "#/components/go-back-in-history-btn"
import { PlusIcon } from "@phosphor-icons/react"
import { useAppForm } from "#/features/forms"
import { useMutation } from "@tanstack/react-query"
import { coursesControllerCreateOneV1Mutation } from "#/api-client"

export const Route = createFileRoute("/_app/courses/new")({
  component: RouteComponent,
})

interface FormData {
  title: string
  description: string
}

const defaultValues: FormData = {
  title: "",
  description: "",
}

function RouteComponent() {
  const { mutate: createCourse, isPending } = useMutation({
    ...coursesControllerCreateOneV1Mutation(),
    onError: error => {
      alert(error?.message || "خطای ناشناخته")
    },
    onSuccess: () => {
      alert("انجام شد!")
    },
  })

  const form = useAppForm({
    defaultValues,
    validators: {
      onChange: p => {
        const { title } = p.value

        if (title.trim().length < 1) return "نام دوره اجباری هست!"

        return undefined
      },
    },
    onSubmit: async p => {
      const { title, description } = p.value

      createCourse({
        body: {
          title,
          description: description || null,
        },
      })
    },
  })

  return (
    <div className={phonePage()}>
      <AppBar title="دوره جدید" slotStart={<GoBackInHistoryBtn />} />

      <div className={list()}>
        <form.AppField name="title">
          {f => <f.SimpleTextField label="نام *" />}
        </form.AppField>

        <form.AppField name="description">
          {f => <f.SimpleTextField label="توضیحات" isMultiline />}
        </form.AppField>

        <form.AppForm>
          <form.Btn className={btn()} isLoading={isPending}>
            <PlusIcon />
            <span>ایجاد دوره</span>
          </form.Btn>
        </form.AppForm>
      </div>
    </div>
  )
}
