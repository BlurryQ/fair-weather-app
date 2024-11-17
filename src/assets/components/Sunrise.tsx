export default function Sunrise({ time }: { time: string }): JSX.Element {
    return <>
        <p>Sunrise:
            <time id="sunrise"> {time}</time></p>
    </>
}