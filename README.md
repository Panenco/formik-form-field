# Formik Form Field

`FormikFormField` is a wrapper that helps you to forget about writing wrappers around your custom inputs.

## Installation

To install breadcrumbs from Panenco's registry follow next steps:

1. Create `.npmrc` file with the next content `registry=https://npm.pkg.github.com/Panenco` near to your `package.json` file you want to add this package to
2. `npm install @panenco/formik-field-wrapper`

## Usage

You supposed to use `FormField` instead of `Field` imported from `Formik` as shown:

```javascript
import * as React from 'react';
import { Form } from 'formik';
import { TextInput } from '@panenco/pui';
import Field from '@panenco/formik-form-field';

const countries = [
  { value: 'UA', label: 'Ukraine' },
  { value: 'BE', label: 'Belgium' },
];

const FormComponent = () => {
  return (
    <Form>
      <Field name="firstName" placeholder="Firstname" component={TextInput} />
      <Field name="lastName" placeholder="Lastname" component={TextInput} />
      <Field
        name="birthDate"
        component={DayPicker}
        labelText="Date of birth"
        onChangeAdapter={v => v}
        valueAdapter={v => v}
      />
      <Field
        name="country"
        component={ReactSelect}
        options={countries}
        label="Country of origin"
        onChangeAdapter={v => v.value}
        valueAdapter={value => countries.find(country => value === country.value)}
      />
      <PrimaryButton type="submit">Submit</PrimaryButton>
    </Form>
  );
};
```

## Explanation of `valueAdapter: (...args: any) => any` and `onChangeAdapter: (...args: any) => any`

### `onChangeAdapter`

When you need to use custom components as inputs in your form, most of them won't use default signature as `onChange(e: React.SyntheticEvent) => void` or `onBlur(e: React.SyntheticEvent) => void`. Instead, they might pass you `value` itself or whatever it can be. That's why we are replacing formik default handler to ours that also has middleware `onChangeAdapter`.

On change `value` thrown from your field -> `onChangeAdapter` -> set field in `formik` values.

### `valueAdapter`

Because our fields are controlled, we are obliged to have both `value` and `onChanged` props. Usually we need to keep in sync `value` that is passed by `FormikField` to component and it's presentation before applying `onChangeAdapter`. That's why we are transforming it back.

Formik values -> `valueAdapter` -> field `value` prop

## You are marvelous!
