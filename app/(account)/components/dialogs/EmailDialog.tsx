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
import { AtSign } from 'lucide-react'
import LinkButton from '../LinkButton'
import { Field, FieldError, FieldGroup } from '@/components/ui/field'
import AlertMessage from '@/components/AlertMessage'
import { Controller, useForm } from 'react-hook-form'
import z from 'zod'
import { emailSchema } from '@/app/(auth)/schemas/authSchema'
import { useState } from 'react'
import { ActionResult } from '@/types/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { setEmail } from '../../actions'

const changeEmailSchema = z.object({
  newEmail: emailSchema,
})

type ChangeEmailFormData = z.infer<typeof changeEmailSchema>

const EmailDialog = ({ className }: { className?: string }) => {
  const [result, setResult] = useState<ActionResult | null>(null)

  const form = useForm<ChangeEmailFormData>({
    resolver: zodResolver(changeEmailSchema),
    defaultValues: {
      newEmail: '',
    },
    mode: 'onSubmit',
  })

  const onSubmit = async (data: ChangeEmailFormData) => {
    const res = await setEmail(data.newEmail)
    setResult(res)
    if (res.success) form.reset()
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <LinkButton
          text="Change Email"
          icon={<AtSign />}
          style="default"
          className={className}
        />
      </DialogTrigger>
      <DialogContent className="sm:max-w-106.25">
        <form className={'space-y-4'} onSubmit={form.handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Edit Email</DialogTitle>
            <DialogDescription>
              Make changes to your email and click save when you&apos;re done.
            </DialogDescription>
          </DialogHeader>

          <FieldGroup className="gap-4">
            <Controller
              name="newEmail"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <Input
                    {...field}
                    id="newEmail"
                    aria-invalid={fieldState.invalid}
                    placeholder="New Email"
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
