import React, { useState } from 'react'
import './style.scss'

type Props = {
	label: string
	toggled: boolean | undefined
	onClick: (item: boolean) => void
}

const ToggleButton = ({ label, toggled, onClick }: Props) => {
	const [isToggled, toggle] = useState(toggled)

	const callback = () => {
		toggle(!isToggled)
		onClick(!isToggled)
	}

	return (
		<>
			<label>
				<input
					className='input'
					type='checkbox'
					defaultChecked={isToggled}
					onClick={callback}
				/>
				<span className='checkbox' />
			</label>
			<strong>{label}</strong>
		</>
	)
}

export default ToggleButton
