export type DateSelectorProp = {
    chosenIndex: number,
    setChosenIndex: React.Dispatch<React.SetStateAction<number>>,
    dateEpoch: number,
    setDateEpoch: React.Dispatch<React.SetStateAction<number>>,
    dateString: string,
    setDateString: React.Dispatch<React.SetStateAction<string>>,
  }