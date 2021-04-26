import React from 'react';
import PropTypes from 'prop-types';
import pickUpBadgeBlankIcon from '../../assets/images/sprite/pickUpBadgeBlank.svg';
import dropOffBadgeBlankIcon from '../../assets/images/sprite/dropOffBadgeBlank.svg';
import Button from '../button';
import FormItem from '../formItem';
import './form.sass';

const items = [
	{
		icon: pickUpBadgeBlankIcon,
		id: 'pickupAddress',
		label: 'Pick up address',
		name: 'pickupAddress',
		placeholder: 'Pick up address'
	},
	{
		icon: dropOffBadgeBlankIcon,
		id: 'dropoffAddress',
		label: 'Drop off address',
		name: 'dropoffAddress',
		placeholder: 'Drop off address'
	}
];

function Form({ onItemBlur, onItemChange, state }) {
	return (
		<form className="form">
			{items.map(({ icon, id, label, name, placeholder }) => {
				return (
					<FormItem
						className="form__item"
						icon={icon}
						id={id}
						key={id}
						label={label}
						name={name}
						onBlur={onItemBlur}
						onChange={onItemChange}
						placeholder={placeholder}
						value={state[name]}
					/>
				);
			})}
			<Button
				className="form__button-submit"
				onClick={() => {}}
				text="Create job"
				type="submit"
			/>
		</form>
	);
}

Form.propTypes = {
	onItemBlur: PropTypes.func.isRequired,
	onItemChange: PropTypes.func.isRequired,
	state: PropTypes.shape({
		pickupAddress: PropTypes.string,
		dropoffAddress: PropTypes.string
	}).isRequired
};

export default Form;
