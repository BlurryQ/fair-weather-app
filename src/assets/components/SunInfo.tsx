import '../../styles/sunInfo.css'

import { sunInfo } from '../../types/sunInfo'

export default function Sunrise({ data }: { data: sunInfo }): JSX.Element {
    return <div className={`sun${data.type}`}>
        <p>{`Sun${data.type}`}:</p>
        <p>{data.time}</p>
    </div>
}