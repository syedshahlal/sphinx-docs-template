import { Node, mergeAttributes, nodeInputRule } from "@tiptap/core"

export interface MermaidDiagramOptions {
  HTMLAttributes: Record<string, any>
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    mermaidDiagram: {
      setMermaidDiagram: (options: { code?: string }) => ReturnType
    }
  }
}

// Basic input rule: type ```mermaid + space to insert a mermaid block
const inputRegex = /^```mermaid\s$/

export const MermaidDiagram = Node.create<MermaidDiagramOptions>({
  name: "mermaidDiagram",
  group: "block",
  atom: true, // Treat as a single, indivisible unit
  defining: true,
  isolating: true,

  addOptions() {
    return {
      HTMLAttributes: {},
    }
  },

  addAttributes() {
    return {
      code: {
        default: "graph TD;\nA-->B;",
        parseHTML: (element) => element.querySelector("pre > code")?.textContent,
        renderHTML: (attributes) => {
          return { "data-code": attributes.code }
        },
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: "div[data-mermaid-diagram]",
        getAttrs: (dom) => {
          const pre = (dom as HTMLElement).querySelector("pre.mermaid")
          return { code: pre?.textContent || "" }
        },
      },
      // Also parse from ```mermaid code blocks if they are not handled by CodeBlockLowlight
      {
        tag: "pre.mermaid",
        getAttrs: (dom) => ({ code: (dom as HTMLElement).textContent || "" }),
        preserveWhitespace: "full",
      },
    ]
  },

  renderHTML({ HTMLAttributes, node }) {
    const code = (node.attrs.code as string) || ""
    return [
      "div",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, { "data-mermaid-diagram": "true" }),
      ["pre", { class: "mermaid" }, code], // Render as pre for server-side, mermaid.js will pick this up client-side
    ]
  },

  addCommands() {
    return {
      setMermaidDiagram:
        (options) =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: options,
          })
        },
    }
  },

  addInputRules() {
    return [
      nodeInputRule({
        find: inputRegex,
        type: this.type,
        getAttributes: () => ({ code: "graph TD;\n  A-->B;\n  C-->D;" }), // Default code on input rule
      }),
    ]
  },
})
