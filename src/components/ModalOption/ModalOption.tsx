import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { changeModalType } from '../../store/modalSlice'

// Параметры селекта модалки
const options = [
	{ label: 'Выберите', value: '' },
	{ label: 'Шкаф', value: 'content' },
	{ label: 'Экспонат', value: 'exhibit' },
	{ label: 'Модель', value: 'model' },
]

type Props = {
	id: number
	modalType?: string
}

const ModalOption = ({ id, modalType = '' }: Props) => {
	const dispatch = useDispatch()
	const [value, setValue] = useState<string>(modalType)
	const [selected, setSelected] = useState<boolean>(
		modalType.length > 0 ? true : false
	)
	const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setValue(event.target.value)
		setSelected(true)
		dispatch(changeModalType({ id, type: event.target.value }))
	}

	return (
		<>
			{selected ? (
				<div>{options.find(option => option.value === value)?.label}</div>
			) : (
				<select value={value} onChange={handleChange}>
					{options.map((option: { label: string; value: string }) => (
						<option key={option.value} value={option.value}>
							{option.label}
						</option>
					))}
				</select>
			)}
		</>
	)
}

export default ModalOption
