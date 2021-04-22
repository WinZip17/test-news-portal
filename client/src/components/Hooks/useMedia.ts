import { useEffect, useState } from "react"
import useDebounce from "./useDebouncing";

export const useMedia: (width: number) => boolean = (width: number) => {
  const [isMatch, setIsMatch] = useState<boolean>(false)
  const [innerWidth, setInnerWidth] = useState<number>(window.innerWidth)

  const debouncedValue = useDebounce(innerWidth, 100);

  const resize = () => {
    setInnerWidth(window.innerWidth);
  }

  useEffect(() => {
    setIsMatch(debouncedValue <= width)
  }, [debouncedValue])

  useEffect(() => {
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  })

  return isMatch
}
