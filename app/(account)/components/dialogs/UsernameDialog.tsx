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
import { User } from 'lucide-react'
import LinkButton from '../LinkButton'
import { Field, FieldError, FieldGroup } from '@/components/ui/field'
import AlertMessage from '@/components/AlertMessage'
import { Controller, useForm } from 'react-hook-form'
import z from 'zod'
import { usernameSchema } from '@/app/(auth)/schemas/authSchema'
import { useState } from 'react'
import { ActionResult } from '@/types/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { setUsername } from '../../actions'
import { cn } from '@/lib/utils'

const changeUsernameSchema = z.object({
  newUsername: usernameSchema,
})

type ChangeUsernameFormData = z.infer<typeof changeUsernameSchema>

const UsernameDialog = ({ className }: { className?: string }) => {
  const [result, setResult] = useState<ActionResult | null>(null)

  const form = useForm<ChangeUsernameFormData>({
    resolver: zodResolver(changeUsernameSchema),
    defaultValues: {
      newUsername: '',
    },
    mode: 'onSubmit',
  })

  const onSubmit = async (data: ChangeUsernameFormData) => {
    const res = await setUsername(data.newUsername)
    setResult(res)
    if (res.success) form.reset()
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <LinkButton text="Change Username" icon={<User />} style="default" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-106.25">
        <form
          className={cn(className, 'space-y-4')}
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <DialogHeader>
            <DialogTitle>Edit Username</DialogTitle>
            <DialogDescription>
              Make changes to your username and click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>

          <FieldGroup className="gap-4">
            <Controller
              name="newUsername"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <Input
                    {...field}
                    id="newUsername"
                    aria-invalid={fieldState.invalid}
                    placeholder="New Username"
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

export default UsernameDialog
