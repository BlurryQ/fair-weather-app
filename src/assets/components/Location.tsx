import '../../styles/location.css'

export default function Location(): JSX.Element {
    return <div className="location">
        <label htmlFor="location"></label>
        <input id="location" placeholder="@location"></input>
    </div>
}