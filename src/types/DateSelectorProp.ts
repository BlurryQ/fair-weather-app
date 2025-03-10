export type DateSelectorProp = {
    chosenDay: number,
    setChosenDay: React.Dispatch<React.SetStateAction<number>>,
    setChosenHour: React.Dispatch<React.SetStateAction<number>>,
    dateEpoch: number,
    setDateEpoch: React.Dispatch<React.SetStateAction<number>>,
  }