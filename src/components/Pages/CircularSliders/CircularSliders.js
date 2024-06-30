import { useState } from 'react';
import { CircularSlider } from 'react-web-circular-slider';

function padTime(time) {
	if (`${time}`.length < 2) {
		return `0${time}`;
	}

	return time;
}

const formatTime = (time) => {
	const { h, m } = time;
	return `${padTime(h)}:${padTime(m)}`;
};


//! Starting Point This Component......
const CircularSliders = () => {
	const [bedTime, setBedTime] = useState('00:00');
	const [wakeTime, setWakeTime] = useState('00:00');
	const [durationHr, setDurationHr] = useState(0);
	const [durationMin, setDurationMin] = useState(0);

	const onStartChange = ({ startTime }) => {
		setBedTime(formatTime(startTime));
	};

	const onEndChange = ({ endTime }) => {
		setWakeTime(formatTime(endTime));
	};

	const onUpdate = ({ durationMinutes }) => {
		const hours = Math.floor(durationMinutes / 60);
		const minutes = durationMinutes - hours * 60;

		setDurationHr(hours);
		setDurationMin(minutes);
	};


    return (
		<div style={{ display: 'flex', flexDirection: 'column', marginTop: '5%' }}>
			
			{/* Top Value Code */}
			<div style={{ color: 'black', display: 'flex', justifyContent: 'space-evenly', marginTop: 20, marginBottom: 20 }}>
				
				
			<div style={{ display: 'flex', flexDirection: 'column' }}>
				<div style={{ color: 'blue' }}>Bedtime</div>
				<div style={{ fontSize: 30 }}>{bedTime}</div>
			</div>

			<div style={{ display: 'flex', flexDirection: 'column' }}>
				<div style={{ color: 'red' }}>Wake</div>
				<div style={{ fontSize: 30 }}>{wakeTime}</div>
			</div>
			
				
			</div>



		{/* Main Circle Slider Code */}
		<div style={{ display: 'flex', justifyContent: 'center', color: 'blue' }}>
		
				
			<div style={{ position: 'absolute', justifySelf: 'center', top: '31%' }}>
				<div style={{ display: 'flex' }}>
					<div style={{ fontSize: 40 }}>{durationHr}</div>
					<div style={{ alignSelf: 'end', paddingBottom: 5 }}>HR</div>
					<div style={{ margin: 5 }}></div>

					<div style={{ fontSize: 40 }}>{durationMin}</div>
					<div style={{ alignSelf: 'end', paddingBottom: 5 }}>MIN</div>
				</div>
			</div>

			<CircularSlider onStartUpdate={onStartChange} onEndUpdate={onEndChange} onUpdate={onUpdate} />
		</div>
		
			
	</div>
    );
};

export default CircularSliders;