import { Controller } from 'react-hook-form';
import { Form } from 'react-bootstrap';

const FormInput = ({ control, name, label, type = 'text', rules }: any) => (
	<Form.Group controlId={`form${name}`} className='mb-3'>
		<Form.Label>{label}</Form.Label>
		<Controller
			name={name}
			control={control}
			rules={rules}
			render={({ field, fieldState: { error } }) => (
				<>
					<Form.Control size='sm' type={type} isInvalid={!!error} {...field} />
					<Form.Control.Feedback type='invalid'>{error?.message}</Form.Control.Feedback>
				</>
			)}
		/>
	</Form.Group>
);

export default FormInput;
