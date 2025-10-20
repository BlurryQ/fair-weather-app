export default function showWeatherDetails(e: React.MouseEvent<HTMLDivElement>): void {
    // toggles mobile weather details display
    const target = e.target as HTMLDivElement;

    // below = target.dataset.hourId || target.parent.Nodedataset.hourId but better error handling
    const hourID: string = target.dataset.hourId
        ?? (target.parentNode as HTMLElement | null)?.dataset?.hourId
        ?? "";
    const weatherCard = document.querySelector(`[data-hour-id="${hourID}"`) as HTMLFormElement

    if (!weatherCard) return
    const tableData: HTMLElement | null = weatherCard.querySelector("#weather-details-desktop")
    const displayLocation: HTMLElement | null = weatherCard.querySelector("#weather-details-mobile")
    const carrat: HTMLElement | null = weatherCard.querySelector("#carrat")
    if (!tableData || !displayLocation || !carrat) return

    if (displayLocation.innerHTML) {
        carrat.classList.remove("up")
        carrat.classList.add("down")
        displayLocation.innerHTML = ""
    } else {
        carrat.classList.remove("down")
        carrat.classList.add("up")
        displayLocation.innerHTML = tableData.innerHTML
    }
}