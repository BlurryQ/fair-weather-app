export default function capitalisedEachWord(input: string): string {
  // capitalise the first letter of each word in a string
    return input
      .split('_')                  
      .map(word => 
        word.charAt(0).toUpperCase() + word.slice(1) 
      )
      .join(' ');                   
  }