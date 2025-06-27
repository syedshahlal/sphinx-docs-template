import Image from "next/image"

export function BankChip() {
  return (
    <Image
      src="/images/gra-logo.png"
      alt="GRA Core Platform Logo"
      width={32}
      height={32}
      className="w-8 h-8 dark:invert"
    />
  )
}
