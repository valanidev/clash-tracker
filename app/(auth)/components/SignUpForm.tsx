'use client'

import z from 'zod'
import { signUpSchema } from '../schemas/authSchema'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Field, FieldError, FieldGroup } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { signUp } from '../actions'

type SignUpFormData = z.infer<typeof signUpSchema>

const SignUpForm = () => {
  const form = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    mode: 'all',
  })

  const onSubmit = async (data: SignUpFormData) => {
    await signUp(data)
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <Input
                {...field}
                id="email"
                aria-invalid={fieldState.invalid}
                placeholder="Your email address"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <Input
                {...field}
                type="password"
                id="password"
                aria-invalid={fieldState.invalid}
                placeholder="Your password"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Button type="submit">Submit</Button>
      </FieldGroup>
    </form>
  )
}

export default SignUpForm
