import { useMemo } from 'react'
import { DropzoneRootProps, useDropzone } from 'react-dropzone'
import { useDispatch } from 'react-redux'
import { serverHost } from '../..'
import { saveModel } from '../../store/modalSlice'

const baseStyle = {
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	justifyContent: 'center',
	height: '200px',
	padding: '10px',
	borderWidth: 2,
	borderRadius: 10,
	borderColor: '#1b1515',
	borderStyle: 'dashed',
	backgroundColor: '#c6a984',
	color: '#fff',
	transition: 'border .3s ease-in-out',
	textAlign: 'center',
	zIndex: 6,
}

export type saveModelType = {
	modalName: string
	itemId: number
	modalId: number
	fileName: string
}

const activeStyle = {
	borderColor: '#2196f3',
}

const acceptStyle = {
	borderColor: '#00e676',
}

const rejectStyle = {
	borderColor: '#ff1744',
}

type Props = {
	modalName: string
	itemId?: number | undefined
	modalId: number
}

const ModelDropzone = ({ modalName, itemId, modalId }: Props) => {
	const dispatch = useDispatch()

	const onDrop = async (acceptedFiles: File[]) => {
		const formData = new FormData()
		for (const modelFile of acceptedFiles) {
			formData.append(modelFile.name, modelFile)
			dispatch(
				saveModel({
					modalName,
					itemId,
					modalId,
					fileName: modelFile.name,
				} as saveModelType)
			)
		}
		await fetch(`${serverHost}/models/`, {
			method: 'POST',
			body: formData,
		})
	}

	const {
		getRootProps,
		getInputProps,
		isDragActive,
		isDragAccept,
		isDragReject,
	} = useDropzone({
		onDrop,
		// accept: '.zip',
	})

	const style = useMemo(
		() => ({
			...baseStyle,
			...(isDragActive ? activeStyle : {}),
			...(isDragAccept ? acceptStyle : {}),
			...(isDragReject ? rejectStyle : {}),
		}),
		[isDragActive, isDragReject, isDragAccept]
	)

	return (
		<div
			className='drop-image'
			{...getRootProps({ style } as DropzoneRootProps)}
		>
			<input {...getInputProps()} />
			<div>Перетащите архив модели сюда</div>
		</div>
	)
}

export default ModelDropzone
