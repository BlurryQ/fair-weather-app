export default function Sunset({ time }: { time: string }): JSX.Element {
    return <>
        <p>Sunset:
            <time id="sunset"> {time}</time></p>
    </>
}