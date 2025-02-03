export type DateSelectorProp = {
    chosenDay: number,
    setChosenDay: React.Dispatch<React.SetStateAction<number>>,
    dateEpoch: number,
    setDateEpoch: React.Dispatch<React.SetStateAction<number>>,
    dateString: string,
    setDateString: React.Dispatch<React.SetStateAction<string>>,
    setChosenHour: React.Dispatch<React.SetStateAction<number>>,
  }