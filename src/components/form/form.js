import React from 'react';
import PropTypes from 'prop-types';
import Button from '../button';
import FormItem from '../formItem';
import './form.sass';

const items = [
	{
		id: 'pickupAddress',
		label: 'Pick up address',
		name: 'pickupAddress',
		placeholder: 'Pick up address'
	},
	{
		id: 'dropoffAddress',
		label: 'Drop off address',
		name: 'dropoffAddress',
		placeholder: 'Drop off address'
	}
];

function Form({
	creating,
	enableFormButton,
	formState,
	onClickCreateButton,
	onItemBlur,
	onItemChange
}) {
	return (
		<form className="form">
			{items.map(({ id, label, name, placeholder }) => {
				return (
					<FormItem
						className="form__item"
						icon={formState[name].icon}
						id={id}
						key={id}
						label={label}
						name={name}
						onBlur={onItemBlur}
						onChange={onItemChange}
						placeholder={placeholder}
						value={formState[name].value}
					/>
				);
			})}
			<Button
				className="form__button-submit"
				category="primary"
				disabled={!enableFormButton}
				loading={creating}
				onClick={onClickCreateButton}
				text={creating ? 'Creating...' : 'Create job'}
				type="submit"
			/>
		</form>
	);
}

Form.propTypes = {
	creating: PropTypes.bool.isRequired,
	enableFormButton: PropTypes.bool.isRequired,
	formState: PropTypes.shape({
		dropoffAddress: PropTypes.shape({
			icon: PropTypes.shape({
				url: PropTypes.string,
				viewBox: PropTypes.string
			}),
			value: PropTypes.string
		}),
		pickupAddress: PropTypes.shape({
			icon: PropTypes.shape({
				url: PropTypes.string,
				viewBox: PropTypes.string
			}),
			value: PropTypes.string
		})
	}).isRequired,
	onClickCreateButton: PropTypes.func.isRequired,
	onItemBlur: PropTypes.func.isRequired,
	onItemChange: PropTypes.func.isRequired
};

export default Form;
