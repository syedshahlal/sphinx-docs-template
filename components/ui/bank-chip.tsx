import Image from "next/image"

export function BankChip() {
  return (
    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg transition-transform duration-200 group-hover:scale-105">
      {/* logo */}
      <Image
        src="/images/new-bank-logo.png"
        alt="Bank Logo"
        width={20}
        height={20}
        priority /* optional: preload if this icon is above the fold */
        className="w-5 h-5 object-contain"
      />
    </div>
  )
}
