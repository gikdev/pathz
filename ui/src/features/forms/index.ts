import { createFormHook, createFormHookContexts } from "@tanstack/react-form"
import { SimpleTextField } from "./components/simple-text-field"
import { Btn } from "./components/btn"

const { fieldContext, formContext, useFieldContext, useFormContext } =
  createFormHookContexts()

const { useAppForm } = createFormHook({
  formContext,
  formComponents: {
    Btn,
  },
  fieldContext,
  fieldComponents: {
    SimpleTextField,
  },
})

export { useAppForm, useFieldContext, useFormContext }
