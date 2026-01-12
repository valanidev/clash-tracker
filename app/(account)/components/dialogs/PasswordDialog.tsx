'use client'

import { Button } from '@/components/ui/button'
import {
  DialogHeader,
  DialogFooter,
  DialogTrigger,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Lock } from 'lucide-react'
import LinkButton from '../LinkButton'
import { Field, FieldError, FieldGroup } from '@/components/ui/field'
import AlertMessage from '@/components/AlertMessage'
import { Controller, useForm } from 'react-hook-form'
import z from 'zod'
import { passwordSchema } from '@/app/(auth)/schemas/authSchema'
import { useState } from 'react'
import { ActionResult } from '@/types/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { isPasswordValid, setPassword } from '../../actions'

const changePasswordSchema = z
  .object({
    currentPassword: z.string(),
    newPassword: passwordSchema,
    newPasswordConfirm: z.string(),
  })
  .superRefine((data, ctx) => {
    if (data.newPassword && !data.currentPassword) {
      ctx.addIssue({
        code: 'custom',
        message: 'Current password is required',
        path: ['currentPassword'],
      })
    }

    if (data.newPassword && data.newPassword !== data.newPasswordConfirm) {
      ctx.addIssue({
        code: 'custom',
        message: 'Passwords do not match',
        path: ['newPasswordConfirm'],
      })
    }
  })

type ChangePasswordFormData = z.infer<typeof changePasswordSchema>

const EmailDialog = ({ className }: { className?: string }) => {
  const [result, setResult] = useState<ActionResult | null>(null)

  const form = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      newPasswordConfirm: '',
    },
    mode: 'all',
  })

  const onSubmit = async (data: ChangePasswordFormData) => {
    if (!(await isPasswordValid(data.currentPassword))) {
      setResult({
        success: false,
        message: 'Current password is incorrect',
      })
      return
    }

    const res = await setPassword(data.newPassword)
    setResult(res)
    if (res.success) form.reset()
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <LinkButton
          text="Change Password"
          icon={<Lock />}
          type="default"
          className={className}
        />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form className={'space-y-4'} onSubmit={form.handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Edit Password</DialogTitle>
            <DialogDescription>
              Make changes to your password and click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>

          <FieldGroup className="gap-4">
            <Controller
              name="currentPassword"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <Input
                    {...field}
                    id="currentPassword"
                    aria-invalid={fieldState.invalid}
                    placeholder="Current Password"
                    type="password"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="newPassword"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <Input
                    {...field}
                    id="newPassword"
                    aria-invalid={fieldState.invalid}
                    placeholder="New Password"
                    type="password"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="newPasswordConfirm"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <Input
                    {...field}
                    id="newPasswordConfirm"
                    aria-invalid={fieldState.invalid}
                    placeholder="New Password Confirmation"
                    type="password"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            {result && (
              <AlertMessage
                type={result.success ? 'success' : 'error'}
                message={result.message ? result.message : ''}
              />
            )}
          </FieldGroup>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default EmailDialog
