import { useCallback, useRef, useState } from 'react'
import { errorInputClassName, inputClassName, selectClassName, textareaClassName } from '../lib/registrationStyles.js'
import { validateFile, validateRegistration } from '../lib/registrationValidation.js'
import type { FieldValue, FormErrors, FormValues, RegistrationConfig } from '../types/registration.js'

export interface RegistrationFormApi {
  config: RegistrationConfig
  values: FormValues
  errors: FormErrors
  setValue: (name: string, value: FieldValue) => void
  setFile: (name: string, file: File | null) => void
  valueFor: (name: string) => string
  fileFor: (name: string) => File | null
  errorFor: (name: string) => string | undefined
  isChecked: (name: string) => boolean
  inputClassFor: (name: string) => string
  selectClassFor: (name: string) => string
  textareaClassFor: (name: string) => string
  clearError: (name: string) => void
  setFieldError: (name: string, message: string) => void
  validateNow: () => FormErrors
  replaceValues: (values: FormValues) => void
}

function createInitialValues(config: RegistrationConfig): FormValues {
  // Sesuai desain referensi, "Jenis Kelamin" (Putra) mengikuti opsi pertama.
  const initial: FormValues = { gender: 'Laki-laki' }

  for (const field of config.specificFields) {
    initial[field.name] = ''
  }

  return initial
}

/** State bersama seluruh bagian formulir pendaftaran. */
export function useRegistrationForm(config: RegistrationConfig): RegistrationFormApi {
  const [values, setValues] = useState<FormValues>(() => createInitialValues(config))
  const [errors, setErrors] = useState<FormErrors>({})
  const valuesRef = useRef(values)
  valuesRef.current = values

  const clearError = useCallback((name: string) => {
    setErrors((previous) => {
      if (!(name in previous)) return previous
      const next = { ...previous }
      delete next[name]
      return next
    })
  }, [])

  const setValue = useCallback(
    (name: string, value: FieldValue) => {
      setValues((previous) => ({ ...previous, [name]: value }))
      clearError(name)
    },
    [clearError],
  )

  const setFile = useCallback(
    (name: string, file: File | null) => {
      if (file) {
        const fileError = validateFile(file)
        if (fileError) {
          setErrors((previous) => ({ ...previous, [name]: fileError }))
          return
        }
      }

      setValues((previous) => ({ ...previous, [name]: file }))
      clearError(name)
    },
    [clearError],
  )

  const valueFor = useCallback(
    (name: string) => {
      const value = values[name]
      return typeof value === 'string' ? value : ''
    },
    [values],
  )

  const fileFor = useCallback(
    (name: string) => {
      const value = values[name]
      return value instanceof File ? value : null
    },
    [values],
  )

  const errorFor = useCallback((name: string) => errors[name], [errors])

  const isChecked = useCallback(
    (name: string) => values[name] === true,
    [values],
  )

  const withError = useCallback(
    (name: string, base: string) => (errors[name] ? `${base} ${errorInputClassName}` : base),
    [errors],
  )

  const inputClassFor = useCallback(
    (name: string) => withError(name, inputClassName),
    [withError],
  )
  const selectClassFor = useCallback(
    (name: string) => withError(name, selectClassName),
    [withError],
  )
  const textareaClassFor = useCallback(
    (name: string) => withError(name, textareaClassName),
    [withError],
  )

  const setFieldError = useCallback((name: string, message: string) => {
    setErrors((previous) => ({ ...previous, [name]: message }))
  }, [])

  const validateNow = useCallback(() => {
    const nextErrors = validateRegistration(valuesRef.current, config)
    setErrors(nextErrors)
    return nextErrors
  }, [config])

  const replaceValues = useCallback((next: FormValues) => {
    setValues(next)
    setErrors({})
  }, [])

  return {
    config,
    values,
    errors,
    setValue,
    setFile,
    valueFor,
    fileFor,
    errorFor,
    isChecked,
    inputClassFor,
    selectClassFor,
    textareaClassFor,
    clearError,
    setFieldError,
    validateNow,
    replaceValues,
  }
}