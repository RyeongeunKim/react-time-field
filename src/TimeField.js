import React, { useState, useRef } from 'react';

const TimeField = (props) => {
	const [state, setState] = useState({
		hour: '',
		minutes: '',
	});
	const refs = useRef(new Map());

	const getValid = () => {
		
	}

	const handleChange = (target) => {
		const { id, value } = target;
		setState((prevState) => ({
			...prevState,
			[id]: value,
		}));
	};

	const handleKyeDown = (e) => {
		if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
		const {
			target: { id },
		} = e;
		refs.current.get(id).focus();
	};

	return (
		<>
			<div>
				<label htmlFor="name">tabIndex test 용 input:</label>
				<input type="text" id="name" name="name" size="10" />
			</div>
			<div>
				<label htmlFor="time">시간 : </label>
				<div id="time" tabIndex="0">
					<input
						id="hour"
						type="text"
						value={state.hour}
						onChange={({ target }) => handleChange(target)}
						ref={(e) => refs.current.set('minutes', e)}
						maxLength={2}
						onKeyDown={handleKyeDown}
						placeholder="_ _"
					/>
					<input
						id="minutes"
						type="text"
						value={state.minutes}
						onChange={({ target }) => handleChange(target)}
						ref={(e) => refs.current.set('hour', e)}
						maxLength={2}
						onKeyDown={handleKyeDown}
						placeholder="_ _"
					/>
				</div>
			</div>
		</>
	);
};

export default TimeField;
