import { useEffect, useState } from 'react'

import type { weatherData } from '../../App'

export default function CurrentCondition({ weatherData }: { weatherData: weatherData }): JSX.Element {
    const [currentCondition, setCurrentCondition] = useState<string>('')
    const [currentConditionIcon, setcurrentConditionIcon] = useState<string>('')


    useEffect(() => {

        if (Object.keys(weatherData).length < 1) return
        console.log(weatherData)
        const weather: string = weatherData.text
        const iconData: string = weatherData.icon
        const iconURL: string = iconData.split("").slice(2,).join("")
        setCurrentCondition(weather)
        setcurrentConditionIcon(`https://${iconURL}`)

    }, [weatherData])

    return <>
        {currentConditionIcon ? <img src={currentConditionIcon}></img> : null}
        <p>{currentCondition}</p>
    </>
}