import React, { useEffect, useState } from 'react'
import Dropzone from './Dropzone'
import Hdri from '../../scripts/entities/hdri'
import Dot from '../../scripts/entities/dot'
import { serverHost } from '../..'
import './styles.scss'


type DataImage = {
    name: string
    path: string
}

type Props = {
    stage: number
}

const HdriConsole = React.memo(({stage}: Props) => {
    const [images, setImages] = useState<DataImage[]>([])

    useEffect(() => {
        if (stage === 0) { return }
        fetch(`${serverHost}/images/${stage}/`).then(async response => {
            if (response.ok) {
                const data: string[] = await response.json()
                if (data && data.length > 0) {
                    const imgs: DataImage[] = data.map((img) => {
                        return { name: img, path: `cache/${stage}/${img}` }
                    })
                    setImages(imgs)
                }
            }
        }) 
    }, [stage])

    return <ul className='console'>
        <Dropzone stage={stage} />
        { images.length > 0 && <h3>Всего {images.length} карт</h3> }
        <div className='imgs'>
            { images.length > 0 && 
                images.map((image: DataImage, idx: number) => { 
                    return <li key={idx}>
                        <div className='image-data'>
                            <h3>{idx + 1}</h3>
                            <h6>{image.name}</h6>
                        </div>
                        <img src={image.path} alt="img" onClick={async () => {
                            const hdri = new Hdri(image.path, 0)
                            await (await Dot.New(hdri, { x: 0, y: 0 }, false)).start()
                        }}/>
                    </li> 
                }) 
            }
        </div>
    </ul>
})

export default HdriConsole