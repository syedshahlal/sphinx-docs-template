export const componentCategories = {
  basic: {
    label: "Basic",
    components: [
      {
        name: "Heading",
        type: "heading",
        icon: "Heading",
        description: "A heading for your content.",
        level: 1,
      },
      {
        name: "Paragraph",
        type: "paragraph",
        icon: "Paragraph",
        description: "A paragraph of text.",
      },
      {
        name: "Image",
        type: "image",
        icon: "Image",
        description: "An image.",
        src: "https://via.placeholder.com/150",
        alt: "Placeholder Image",
      },
      {
        name: "List",
        type: "list",
        icon: "List",
        description: "An unordered list.",
        items: ["Item 1", "Item 2", "Item 3"],
      },
      {
        name: "Ordered List",
        type: "orderedList",
        icon: "OrderedList",
        description: "An ordered list.",
        items: ["Item 1", "Item 2", "Item 3"],
      },
      {
        name: "Link",
        type: "link",
        icon: "Link",
        description: "A hyperlink.",
        href: "https://example.com",
        text: "Example Link",
      },
    ],
  },
  formatting: {
    label: "Formatting",
    components: [
      {
        name: "Bold",
        type: "bold",
        icon: "Bold",
        description: "Bold text.",
        content: "Bold Text",
      },
      {
        name: "Italic",
        type: "italic",
        icon: "Italic",
        description: "Italic text.",
        content: "Italic Text",
      },
      {
        name: "Code",
        type: "code",
        icon: "Code",
        description: "Inline code.",
        content: "Inline Code",
      },
      {
        name: "Code Block",
        type: "codeBlock",
        icon: "CodeBlock",
        description: "A block of code.",
        language: "javascript",
        content: "// Code Block",
      },
      {
        name: "Quote",
        type: "quote",
        icon: "Quote",
        description: "A quotation.",
        content: "A wise quote.",
      },
      {
        name: "Horizontal Rule",
        type: "horizontalRule",
        icon: "HorizontalRule",
        description: "A horizontal line.",
      },
    ],
  },
  table: {
    label: "Table",
    components: [
      {
        name: "Table",
        type: "table",
        icon: "Table",
        description: "A table.",
        rows: 2,
        cols: 3,
        content: [
          ["Header 1", "Header 2", "Header 3"],
          ["Cell 1", "Cell 2", "Cell 3"],
        ],
      },
    ],
  },
} as const
