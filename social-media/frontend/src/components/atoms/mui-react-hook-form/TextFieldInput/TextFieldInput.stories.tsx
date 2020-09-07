import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import TextFieldInput, { TextFieldInputProps } from '.'
import { FormProvider, useForm } from 'react-hook-form'

export default {
  title: 'Atoms/Mui React Hook Form/TextFieldInput',
  component: TextFieldInput,
} as Meta

const Template: Story<TextFieldInputProps> = (args) => {
  const methods = useForm()
  const onSubmit = (data: any) => console.log(data)

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <TextFieldInput {...args} />
      </form>
    </FormProvider>
  )
}

export const Outlined = Template.bind({})
Outlined.args = {
  label: 'Outlined Input',
  variant: 'outlined',
  name: 'outlined'
}