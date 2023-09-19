import { useMemo } from 'react'
import { DropzoneRootProps, useDropzone } from 'react-dropzone'
import { useDispatch } from 'react-redux'
import { serverHost } from '../..'
import { saveImage, saveVideo, saveExhibitImage } from '../../store/modalSlice'

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

const activeStyle = {
	borderColor: '#2196f3',
}

const acceptStyle = {
	borderColor: '#00e676',
}

const rejectStyle = {
	borderColor: '#ff1744',
}

export type saveImageType = {
	modalName: string
	itemId: number
	modalId: number
	fileName: string
	preview: boolean
	slides?: string[]
}

type Props = {
	modalName: string
	itemId?: number
	modalId: number
	preview?: boolean
	exhibit?: boolean
}

const ImageDropzone = ({
	modalName,
	itemId,
	modalId,
	preview = false,
	exhibit = false,
}: Props) => {
	const dispatch = useDispatch()

	const onDrop = async (acceptedFiles: File[]) => {
		const formData = new FormData()
		const slides = acceptedFiles.map(file => file.name)
		for (const imageFile of acceptedFiles) {
			formData.append(imageFile.name, imageFile)
			if (exhibit) {
				dispatch(
					saveExhibitImage({
						modalName,
						itemId,
						modalId,
						fileName: imageFile.name,
						preview,
					} as saveImageType)
				)
			} else {
				if (imageFile.type === 'image/jpeg' || imageFile.type === 'image/png') {
					dispatch(
						saveImage({
							modalName,
							itemId,
							modalId,
							fileName: imageFile.name,
							preview,
							slides: slides,
						} as saveImageType)
					)
				} else {
					dispatch(
						saveVideo({
							modalName,
							itemId,
							modalId,
							fileName: imageFile.name,
						})
					)
				}
			}
		}
		await fetch(`${serverHost}/imgs/${modalId}/`, {
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
		// accept: 'video/mp4, video/mov',
		// accept: {
		// 	'image/jpeg': ['.jpeg', '.jpg', '.JPEG', '.JPG'],
		// 	'image/png': ['.png', '.PNG'],
		// 	'video/mp4': ['.mp4', '.MP4'],
		// },
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
			<div>Перетащите изображение сюда</div>
		</div>
	)
}

export default ImageDropzone
