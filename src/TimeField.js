import React, { useState, useRef } from 'react';

const TimeField = (props) => {
	const [state, setState] = useState({
		hour: '',
		minutes: '',
	});
	const refs = useRef(new Map());

	// 시간 유효성 검사
	const getValid = (id, value, isHour) => {
		if (isNaN(value)) return false;

		const numValue = Number(value);
		const valueLength = value.length;
		let valid1;
		let valid2;

		if (isHour) {
			valid1 = 2;
			valid2 = 24;
		} else {
			if (refs.current.get(id).value === '24' && numValue > 0) {
				return false;
			}
			valid1 = 5;
			valid2 = 59;
		}

		if (
			(valueLength === 1 && numValue > valid1) ||
			(valueLength === 2 && numValue > valid2)
		) {
			return false;
		} else {
			return true;
		}
	};

	const handleChange = (target) => {
		const { id, value } = target;
		const inputValue = value.trim();
		const isHour = id.toLowerCase().includes('hour');
		const isValid = getValid(id, inputValue, isHour);

		if (isValid) {
			// 분 포커스
			if (isHour && inputValue.length === 2) {
				refs.current.get(id).focus();
			}
			setState((prevState) => ({
				...prevState,
				[id]: inputValue,
			}));
		}
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
					:
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
