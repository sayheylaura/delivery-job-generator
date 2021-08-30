import React from 'react';
import PropTypes from 'prop-types';

import Button from '../button';
import FormItem from '../formItem';

import './form.sass';

const FORM_ITEMS = [
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
	form,
	onClickCreateButton,
	onItemChange
}) {
	return (
		<form className="form">
			{FORM_ITEMS.map(({ id, label, name, placeholder }) => {
				return (
					<FormItem
						className={{ wrapper: 'form__item--margin-bottom' }}
						icon={form[name].icon}
						id={id}
						key={id}
						label={label}
						name={name}
						onChange={onItemChange}
						placeholder={placeholder}
						value={form[name].value}
					/>
				);
			})}
			<Button
				className="form__btn--margin-left"
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
	form: PropTypes.shape({
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
	onItemChange: PropTypes.func.isRequired
};

export default Form;
