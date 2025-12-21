'use client'

import z from 'zod'
import { signInSchema } from '../schemas/authSchema'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Field, FieldError, FieldGroup } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { signIn } from '../actions'

type SignInFormData = z.infer<typeof signInSchema>

const SignInForm = () => {
  const form = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'all',
  })

  const onSubmit = async (data: SignInFormData) => {
    await signIn(data)
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

export default SignInForm
