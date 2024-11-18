import '../../styles/header.css'
import Location from './Location'

export default function Header(): JSX.Element {

    return <>
        <h1 className='header'>Fair Weather App</h1>
        <Location />
    </>
}