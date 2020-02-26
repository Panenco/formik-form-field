import * as React from 'react';
import { FieldMetaProps, useFormikContext, useField } from 'formik';

export interface FormFieldComponent extends FieldMetaProps<any> {
  value: any;
  name: string;
  multiple?: boolean;
  checked?: boolean;
  onChange: (...args: any) => void;
  onBlur: () => void;
  ref: React.Ref<any>;
}

export interface FormFieldProps {
  component: keyof JSX.IntrinsicElements | React.ComponentType<FormFieldComponent> | React.ComponentType;
  name: string;
  value?: any;
  type?: string;
  ref?: (instance: any) => void;
  valueAdapter: (...args: any) => any;
  onChangeAdapter: (...args: any) => any;
}

export const isFunction = (obj: any): obj is Function => typeof obj === 'function';

const FormField: React.FunctionComponent<FormFieldProps> = React.forwardRef((props, ref) => {
  if (!props.name) {
    console.warn(`Your field doesn't have any name property.`);
  }

  const formik = useFormikContext();
  const [field, meta] = useField(props);

  const { component, valueAdapter, onChangeAdapter, children, ...leftProps } = props;

  const onChange = (...args) => {
    formik.setFieldValue(props.name as never, onChangeAdapter(...args));
  };

  const onBlur = () => {
    formik.setFieldTouched(props.name as never, true);
  };

  const fieldProps = {
    ...field,
    ...leftProps,
    ...meta,
    error: meta.touched && meta.error,
    value: valueAdapter ? valueAdapter(field.value) : field.value,
    onChange: onChangeAdapter ? onChange : field.onChange,
    onBlur,
    ref,
  };

  return React.createElement<any>(component, fieldProps, children);
});

FormField.displayName = 'FormField';

export default FormField;
