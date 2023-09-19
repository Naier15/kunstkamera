import { useMemo } from 'react'
import { DropzoneRootProps, useDropzone } from 'react-dropzone'
import { serverHost } from '../..'


const baseStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '10px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  transition: 'border .3s ease-in-out',
  height: '50px'
}

const activeStyle = {
  borderColor: '#2196f3'
}

const acceptStyle = {
  borderColor: '#00e676'
}

const rejectStyle = {
  borderColor: '#ff1744'
}

type Props = {
    stage: number
}

const Dropzone = ({ stage }: Props) => {
    const onDrop = async (acceptedFiles: File[]) => {
        const formData = new FormData()
        for (const imageFile of acceptedFiles) {
            formData.append(imageFile.name, imageFile)
        }
        await fetch(`${serverHost}/images/${stage}/`, {
            method: 'POST',
            body: formData
        })
    }

    const {
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject
    } = useDropzone({
        onDrop,
        accept: 'image/jpeg, image/png'
    })

    const style = useMemo(() => ({
        ...baseStyle,
        ...(isDragActive ? activeStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {})
    }), [ isDragActive, isDragReject, isDragAccept ])

    return (
        <div {...getRootProps({style} as DropzoneRootProps )}>
            <input {...getInputProps()} />
            <div>Перетащите текстуру сюда</div>
        </div>
    )
}

export default Dropzone