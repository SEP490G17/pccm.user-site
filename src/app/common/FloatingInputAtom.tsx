import { FastField } from 'formik';
import { Form, Input, Typography } from 'antd';

const { Text } = Typography;

interface FloatingInputProps {
  label?: string;
  name: string;
  height?: string; // Add height here
}

function FloatingInputAtom({ label, name, height, ...props }: FloatingInputProps) {
  return (
    <FastField name={name}>
      {({ field, form }: any) => (
        <Form.Item
          validateStatus={form.errors[field.name] && form.touched[field.name] ? 'error' : ''}
          help={form.touched[field.name] && form.errors[field.name]}
          style={{ position: 'relative', marginBottom: '24px' }}
        >
          <Input
            {...field}
            {...props}
            placeholder=" "
            size="large"
            style={{ borderColor: 'gray', height: height || '2.5rem' }} 
          />
          <label
            style={{
              position: 'absolute',
              top: field.value ? '-10px' : '50%',
              left: '12px',
              fontSize: field.value ? '12px' : '16px',
              color: field.value ? 'blue' : 'gray',
              transition: '0.2s ease-in-out',
              backgroundColor: 'white',
              padding: '0 4px',
              pointerEvents: 'none',
            }}
          >
            {label}
          </label>
          {form.touched[field.name] && form.errors[field.name] && (
            <Text type="danger">{form.errors[field.name]}</Text>
          )}
        </Form.Item>
      )}
    </FastField>
  );
}

export default FloatingInputAtom;
