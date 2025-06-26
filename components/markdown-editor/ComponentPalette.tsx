// ----- Component catalogue -----
export const componentCategories = [
  {
    name: "Basic",
    components: [
      { type: "heading", icon: "Heading", label: "Heading", color: "text-blue-500" },
      { type: "paragraph", icon: "Paragraph", label: "Paragraph", color: "text-gray-500" },
      { type: "image", icon: "Image", label: "Image", color: "text-green-500" },
      { type: "list", icon: "List", label: "List", color: "text-yellow-500" },
      { type: "orderedList", icon: "OrderedList", label: "Ordered List", color: "text-yellow-600" },
    ],
  },
  {
    name: "Formatting",
    components: [
      { type: "bold", icon: "Bold", label: "Bold", color: "text-purple-500" },
      { type: "italic", icon: "Italic", label: "Italic", color: "text-purple-400" },
      { type: "code", icon: "Code", label: "Inline Code", color: "text-purple-600" },
      { type: "codeBlock", icon: "CodeBlock", label: "Code Block", color: "text-purple-700" },
      { type: "quote", icon: "Quote", label: "Quote", color: "text-cyan-500" },
      { type: "horizontalRule", icon: "HorizontalRule", label: "Horizontal Rule", color: "text-gray-400" },
    ],
  },
  {
    name: "Table",
    components: [{ type: "table", icon: "Table", label: "Table", color: "text-red-600" }],
  },
]

// ----- Default content helper -----
export function getDefaultContent(type: string) {
  switch (type) {
    case "heading":
      return { level: 1, text: "New Heading" }
    case "paragraph":
      return { text: "Start writing here…" }
    case "image":
      return { src: "/placeholder.svg?height=200&width=400", alt: "Placeholder image" }
    case "list":
      return { items: ["Item 1", "Item 2"] }
    case "orderedList":
      return { items: ["Item 1", "Item 2"], start: 1 }
    case "bold":
    case "italic":
      return { text: "Sample text" }
    case "code":
      return { code: "`code`" }
    case "codeBlock":
      return { language: "javascript", code: "// code block" }
    case "quote":
      return { text: "A wise quote." }
    case "horizontalRule":
      return {}
    case "table":
      return {
        headers: ["Header 1", "Header 2"],
        rows: [
          ["Row 1 Cell 1", "Row 1 Cell 2"],
          ["Row 2 Cell 1", "Row 2 Cell 2"],
        ],
      }
    default:
      return {}
  }
}
