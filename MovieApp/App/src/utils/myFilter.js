
export function MyFilter(arr, predicate) {
  const result = []
  for (let i = 0; i < arr.length; i++) {
    if (predicate(arr[i])) result.push(arr[i])
  }
  return result
}