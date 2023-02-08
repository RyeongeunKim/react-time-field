import React, { useState, useRef } from 'react';
import classes from './TimeField.module.css';

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

		if (
			(isHour && numValue > 24) ||
			(!isHour &&
				((+refs.current.get(id).value >= 24 && numValue > 0) ||
					(valueLength <= 1 && numValue > 5) ||
					(valueLength >= 2 && numValue > 59)))
		) {
			return false;
		} else if (isHour && numValue > 0 && numValue < 10) {
			return `0${numValue}`;
		} else {
			return numValue;
		}
	};

	const inputFocus = (id) => {
		const getRef = refs.current.get(id);
		const end = getRef.value.length;
		getRef.focus();
		getRef.setSelectionRange(end, end); // cursor 맨끝으로 이동
	};

	const handleChange = (target) => {
		const { id, value } = target;
		const isHour = id.toLowerCase().includes('hour');
		const inputValue = getValid(id, value.trim(), isHour);

		if (isHour && inputValue >= 24 && +refs.current.get(id).value > 0) {
			const changeId = refs.current.get(id).id;
			setState((prevState) => ({
				...prevState,
				[id]: inputValue,
				[changeId]: '00',
			}));
		} else if (inputValue || inputValue === 0) {
			setState((prevState) => ({
				...prevState,
				[id]: inputValue,
			}));
		}
	};

	const handleKeyUp = (e) => {
		if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
		const {
			target: { id, selectionStart, selectionEnd },
		} = e;
		const isHour = id.toLowerCase().includes('hour');

		if (
			(!isHour && e.key === 'ArrowLeft' && selectionStart <= 0) ||
			(isHour && e.key === 'ArrowRight' && selectionEnd >= 2)
		) {
			inputFocus(id);
			refs.current.get(id).select();
		}
	};

	return (
		<>
			<div>
				<h3>시간을 입력해주세요</h3>
				<div id="time" tabIndex="0" className={classes.time}>
					<input
						className={classes.input}
						id="hour"
						type="text"
						value={state.hour}
						onChange={({ target }) => handleChange(target)}
						ref={(e) => refs.current.set('minutes', e)}
						maxLength={3}
						onKeyUp={handleKeyUp}
						placeholder="_ _"
						size="1"
						autoComplete="off"
					/>
					:
					<input
						className={classes.input}
						id="minutes"
						type="text"
						value={state.minutes}
						onChange={({ target }) => handleChange(target)}
						ref={(e) => refs.current.set('hour', e)}
						maxLength={3}
						onKeyUp={handleKeyUp}
						placeholder="_ _"
						size="1"
						autoComplete="off"
					/>
				</div>
			</div>
		</>
	);
};

export default TimeField;
