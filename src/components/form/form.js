import React from 'react';
import pickUpBadgeBlankIcon from '../../assets/images/pickUpBadgeBlank.svg';
import dropOffBadgeBlankIcon from '../../assets/images/dropOffBadgeBlank.svg';
import Button from '../button';
import FormField from '../formField';
import './form.sass';

function Form() {
	return (
		<form className="form">
			<FormField
				className="form__field"
				icon={pickUpBadgeBlankIcon}
				inputTextId="pickup-address"
				label="Pick up address"
				placeholder="Pick up address"
			/>
			<FormField
				className="form__field"
				icon={dropOffBadgeBlankIcon}
				inputTextId="dropoff-address"
				label="Drop off address"
				placeholder="Drop off address"
			/>
			<Button
				className="form__button-submit"
				onClick={() => {}}
				text="Create job"
				type="submit"
			/>
		</form>
	);
}

export default Form;
