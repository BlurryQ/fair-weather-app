export default function getClassName(index: number, isPlaceholder: boolean): string {
  let className: string = 'forecast';
  if (index === 0) className += ' far-left';
  if (index === 4) className += ' far-right';
  if (index === 0 || index === 1) className += ' left';
  else if (index === 2) className += ' center';
  else if (index === 3 || index === 4) className += ' right';
  // if placeholder show blank page and  logo
  if (isPlaceholder)
    className += ' out-of-range'
  // console.log(className)
  return className;
}