"use client"

import type React from "react"
import { useState, useRef } from "react"
import type {
  MarkdownComponent,
  ComponentStyle,
  ImageContent,
  GridContent,
  TableContent,
  ChartContent,
  ButtonContent,
  AlertContent,
  ListContent,
  TaskListContent,
  BlockquoteContent,
  CodeContent,
  SpacerContent,
  ColumnsContent,
  HtmlBlockContent,
  HeroContent,
  BannerContent,
  TestimonialContent,
  PricingContent,
  GalleryContent,
} from "./types"
import { Button as UIButton } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Edit3, BarChart3, AlertTriangle, Info, Check } from "lucide-react"
import { cn } from "@/lib/utils"
import type { JSX } from "react/jsx-runtime"

// A simple chart component for demonstration
function SimpleChart({ data, type, title }: { data: ChartContent; type: string; title?: string }) {
  const datasets = data.data?.datasets?.length
    ? data.data.datasets
    : [
        {
          label: "Dataset 1",
          data: new Array(data.data?.labels?.length || 0).fill(0),
          backgroundColor: "#3b82f6",
        },
      ]

  const maxValue = Math.max(1, ...datasets.flatMap((d) => d.data))

  if (type === "bar") {
    return (
      <div className="p-4 bg-card border border-border rounded-lg">
        {title && <h3 className="text-lg font-semibold mb-4 text-foreground">{title}</h3>}
        <div className="space-y-3">
          {data.data.labels.map((label, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="w-20 text-sm text-muted-foreground">{label}</div>
              <div className="flex-1 bg-muted rounded-full h-6 relative overflow-hidden">
                {datasets.map((dataset, datasetIndex) => (
                  <div
                    key={datasetIndex}
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${(dataset.data[index] / maxValue) * 100}%`,
                      backgroundColor: Array.isArray(dataset.backgroundColor)
                        ? dataset.backgroundColor[index] || dataset.backgroundColor[0] || "#3b82f6"
                        : dataset.backgroundColor || "#3b82f6",
                    }}
                  />
                ))}
              </div>
              <div className="w-12 text-sm text-foreground text-right">{datasets[0]?.data[index] || 0}</div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="p-4 bg-card border border-border rounded-lg">
      {title && <h3 className="text-lg font-semibold mb-4 text-foreground">{title}</h3>}
      <div className="text-center py-8 text-muted-foreground">
        <BarChart3 className="w-8 h-8 mx-auto mb-2 opacity-50" />
        <p>Chart type "{type}"</p>
      </div>
    </div>
  )
}

const applyStyles = (style?: ComponentStyle): React.CSSProperties => {
  if (!style) return {}
  const cssProps: React.CSSProperties = {}
  if (style.color) cssProps.color = style.color
  if (style.backgroundColor) cssProps.backgroundColor = style.backgroundColor
  if (style.fontSize) cssProps.fontSize = style.fontSize
  if (style.fontWeight) cssProps.fontWeight = style.fontWeight as React.CSSProperties["fontWeight"]
  if (style.textAlign) cssProps.textAlign = style.textAlign as React.CSSProperties["textAlign"]
  if (style.width) cssProps.width = style.width
  if (style.height) cssProps.height = style.height
  if (style.padding) cssProps.padding = style.padding
  if (style.margin) cssProps.margin = style.margin
  if (style.border) cssProps.border = style.border
  if (style.borderRadius) cssProps.borderRadius = style.borderRadius
  if (style.boxShadow) cssProps.boxShadow = style.boxShadow
  if (style.opacity !== undefined) cssProps.opacity = style.opacity
  if (style.backgroundImage) cssProps.backgroundImage = `url(${style.backgroundImage})`
  if (style.backgroundSize) cssProps.backgroundSize = style.backgroundSize
  if (style.backgroundPosition) cssProps.backgroundPosition = style.backgroundPosition
  return cssProps
}

interface ComponentRendererProps {
  component: MarkdownComponent
  isSelected: boolean
  updateComponentContent: (id: string, contentUpdates: any) => void
}

export function ComponentRenderer({ component, isSelected, updateComponentContent }: ComponentRendererProps) {
  const [editingField, setEditingField] = useState<string | null>(null)
  const [tempValue, setTempValue] = useState<string>("")
  const [isHovered, setIsHovered] = useState(false)
  const editRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null)

  const handleStartEdit = (field: string, currentValue: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setEditingField(field)
    setTempValue(currentValue || "")
  }

  const handleSaveEdit = () => {
    if (!editingField) return
    updateComponentContent(component.id, { ...component.content, [editingField]: tempValue })
    setEditingField(null)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSaveEdit()
    } else if (e.key === "Escape") {
      e.preventDefault()
      setEditingField(null)
    }
  }

  const renderEditableText = (
    field: string,
    value: string,
    placeholder = "Click to edit",
    multiline = false,
    className = "",
  ) => {
    if (editingField === field) {
      const commonProps = {
        value: tempValue,
        onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setTempValue(e.target.value),
        onKeyDown: handleKeyDown,
        onBlur: handleSaveEdit,
        className: cn(
          "w-full bg-background border-2 border-primary rounded-md px-2 py-1 focus:outline-none text-foreground",
          className,
        ),
        autoFocus: true,
      }
      return multiline ? (
        <Textarea ref={editRef as React.RefObject<HTMLTextAreaElement>} {...commonProps} />
      ) : (
        <Input ref={editRef as React.RefObject<HTMLInputElement>} type="text" {...commonProps} />
      )
    }
    return (
      <span
        className={cn(
          "cursor-pointer hover:bg-primary/10 rounded-md px-1 py-0.5 transition-colors min-h-[1.5rem] inline-block w-full",
          !value && "text-muted-foreground italic",
          className,
        )}
        onClick={(e) => handleStartEdit(field, value, e)}
      >
        {value || placeholder}
      </span>
    )
  }

  const baseClasses = cn(
    "relative group transition-all duration-200 my-4",
    isSelected && "ring-2 ring-primary ring-offset-2 ring-offset-background",
  )
  const style = applyStyles(component.style)

  const renderComponent = (): JSX.Element => {
    const content = component.content

    switch (component.type) {
      case "heading":
        const HeadingTag = `h${content.level || 2}` as keyof JSX.IntrinsicElements
        return (
          <HeadingTag style={style} className={baseClasses}>
            {renderEditableText("text", content.text, "Heading")}
          </HeadingTag>
        )

      case "paragraph":
        return (
          <p style={style} className={baseClasses}>
            {renderEditableText("text", content.text, "Paragraph text", true)}
          </p>
        )

      case "image":
        const imageContent = content as ImageContent
        return (
          <div style={style} className={baseClasses}>
            <img
              src={imageContent.src || "/placeholder.svg?height=300&width=500"}
              alt={imageContent.alt || "Image"}
              className="rounded-lg w-full"
            />
            {imageContent.caption && (
              <p className="text-sm text-muted-foreground text-center mt-2">
                {renderEditableText("caption", imageContent.caption, "Add caption")}
              </p>
            )}
          </div>
        )

      case "button":
        const buttonContent = content as ButtonContent
        return (
          <div className={baseClasses}>
            <UIButton style={style} variant={buttonContent.variant} size={buttonContent.size}>
              {buttonContent.text || "Button"}
            </UIButton>
          </div>
        )

      case "card":
        const cardContent = content as CardContent
        return (
          <Card style={style} className={baseClasses}>
            <CardHeader>
              {cardContent.imageUrl && (
                <img
                  src={cardContent.imageUrl || "/placeholder.svg"}
                  alt={cardContent.title}
                  className="mb-4 rounded-md"
                />
              )}
              <CardTitle>{renderEditableText("title", cardContent.title, "Card Title")}</CardTitle>
              <CardDescription>
                {renderEditableText("description", cardContent.description, "Card description", true)}
              </CardDescription>
            </CardHeader>
            <CardFooter>
              {cardContent.buttons?.map((btn, i) => (
                <UIButton key={i} variant={btn.variant as any}>
                  {btn.text}
                </UIButton>
              ))}
            </CardFooter>
          </Card>
        )

      case "table":
        const { headers = [], rows = [] } = content as TableContent
        return (
          <Table style={style} className={baseClasses}>
            <TableHeader>
              <TableRow>
                {headers.map((h, i) => (
                  <TableHead key={i}>{h}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((row, i) => (
                <TableRow key={i}>
                  {row.map((cell, j) => (
                    <TableCell key={j}>{cell}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )

      case "grid":
        const { columns = 3, gap = "1rem", items = [] } = content as GridContent
        return (
          <div
            style={{ ...style, display: "grid", gridTemplateColumns: `repeat(${columns}, 1fr)`, gap }}
            className={baseClasses}
          >
            {items.map((item) => (
              <Card key={item.id}>
                <CardHeader>
                  <CardTitle>{item.content.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{item.content.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )

      case "list":
        return (
          <ul style={style} className={cn(baseClasses, "list-disc list-inside space-y-1")}>
            {(content as ListContent).items.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        )

      case "orderedList":
        return (
          <ol style={style} className={cn(baseClasses, "list-decimal list-inside space-y-1")}>
            {(content as ListContent).items.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ol>
        )

      case "taskList":
        return (
          <div style={style} className={cn(baseClasses, "space-y-2")}>
            {(content as TaskListContent).items.map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <Checkbox checked={item.checked} />
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        )

      case "blockquote":
        const bqContent = content as BlockquoteContent
        return (
          <blockquote style={style} className={cn(baseClasses, "border-l-4 pl-4 italic")}>
            <p>"{bqContent.text}"</p>
            {bqContent.author && <footer className="mt-2 text-sm not-italic">- {bqContent.author}</footer>}
          </blockquote>
        )

      case "alert":
        const alertContent = content as AlertContent
        const Icon = alertContent.type === "warning" ? AlertTriangle : Info
        return (
          <Alert
            style={style}
            className={baseClasses}
            variant={alertContent.type === "warning" ? "destructive" : "default"}
          >
            <Icon className="h-4 w-4" />
            <AlertTitle>{renderEditableText("title", alertContent.title, "Alert Title")}</AlertTitle>
            <AlertDescription>{renderEditableText("text", alertContent.text, "Alert message")}</AlertDescription>
          </Alert>
        )

      case "code":
        return (
          <pre style={style} className={cn(baseClasses, "bg-muted p-4 rounded-md overflow-x-auto")}>
            <code className={`language-${(content as CodeContent).language}`}>{(content as CodeContent).code}</code>
          </pre>
        )

      case "divider":
        return <hr style={style} className={baseClasses} />

      case "spacer":
        return <div style={{ ...style, height: (content as SpacerContent).height }} className={baseClasses} />

      case "columns":
        const colContent = content as ColumnsContent
        return (
          <div style={style} className={cn(baseClasses, "flex gap-4")}>
            <div className="flex-1">{colContent.column1Text}</div>
            <div className="flex-1">{colContent.column2Text}</div>
          </div>
        )

      case "htmlBlock":
        return (
          <div
            style={style}
            className={baseClasses}
            dangerouslySetInnerHTML={{ __html: (content as HtmlBlockContent).htmlContent }}
          />
        )

      case "hero":
        const heroContent = content as HeroContent
        return (
          <div style={style} className={cn(baseClasses, "text-center p-16 rounded-lg")}>
            <h1 className="text-5xl font-bold">{heroContent.title}</h1>
            <p className="text-xl mt-4">{heroContent.subtitle}</p>
            <p className="mt-2">{heroContent.description}</p>
            <div className="mt-8 flex justify-center gap-4">
              {heroContent.buttons?.map((btn, i) => (
                <UIButton key={i} variant={btn.variant} size="lg">
                  {btn.text}
                </UIButton>
              ))}
            </div>
          </div>
        )

      case "banner":
        const bannerContent = content as BannerContent
        return (
          <div style={style} className={cn(baseClasses, "p-8 rounded-lg flex items-center justify-between")}>
            <div>
              <h2 className="text-2xl font-bold">{bannerContent.title}</h2>
              <p>{bannerContent.description}</p>
            </div>
            <div>
              {bannerContent.buttons?.map((btn, i) => (
                <UIButton key={i} variant={btn.variant}>
                  {btn.text}
                </UIButton>
              ))}
            </div>
          </div>
        )

      case "gallery":
        return (
          <div style={style} className={cn(baseClasses, "grid grid-cols-3 gap-4")}>
            {(content as GalleryContent).images?.map((img, i) => (
              <img
                key={i}
                src={img.src || "/placeholder.svg"}
                alt={img.alt}
                className="w-full h-40 object-cover rounded-md"
              />
            ))}
          </div>
        )

      case "testimonial":
        const testimonial = content as TestimonialContent
        return (
          <Card style={style} className={baseClasses}>
            <CardContent className="pt-6">
              <blockquote className="border-none p-0">
                <p>"{testimonial.quote}"</p>
                <footer className="mt-4 flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src={testimonial.avatarUrl || "/placeholder.svg"} alt={testimonial.author} />
                    <AvatarFallback>{testimonial.author.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                  </div>
                </footer>
              </blockquote>
            </CardContent>
          </Card>
        )

      case "pricing":
        return (
          <div style={style} className={cn(baseClasses, "grid md:grid-cols-3 gap-6")}>
            {(content as PricingContent).plans?.map((plan, i) => (
              <Card key={i} className={cn("flex flex-col", plan.popular ? "border-primary" : "")}>
                {plan.popular && (
                  <div className="text-center py-1 bg-primary text-primary-foreground text-sm font-semibold rounded-t-lg">
                    Most Popular
                  </div>
                )}
                <CardHeader className="text-center">
                  <CardTitle>{plan.name}</CardTitle>
                  <p className="text-4xl font-bold">{plan.price}</p>
                  <CardDescription>{plan.period}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <ul className="space-y-2">
                    {plan.features.map((feat, j) => (
                      <li key={j} className="flex items-center">
                        <Check className="w-4 h-4 mr-2 text-green-500" />
                        {feat}
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <UIButton className="w-full" variant={plan.popular ? "default" : "outline"}>
                    {plan.buttonText}
                  </UIButton>
                </CardFooter>
              </Card>
            ))}
          </div>
        )

      case "chart":
        const chartContent = content as ChartContent
        return (
          <div style={style} className={baseClasses}>
            <SimpleChart
              data={chartContent}
              type={chartContent.type}
              title={chartContent.options?.plugins?.title?.text}
            />
          </div>
        )

      case "mermaid":
        return (
          <pre className={cn(baseClasses, "bg-muted p-4 rounded-md")}>
            <code>{content.code}</code>
          </pre>
        )

      default:
        return (
          <div className={cn(baseClasses, "p-4 border-2 border-dashed rounded-lg text-center text-red-500")}>
            Unsupported component type: {component.type}
          </div>
        )
    }
  }

  return (
    <div className="relative" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      {renderComponent()}
      {(isHovered || isSelected) && (
        <div className="absolute -top-3 -right-3 z-10">
          <button className="bg-primary text-primary-foreground p-1.5 rounded-full shadow-lg hover:bg-primary/80">
            <Edit3 className="w-3 h-3" />
          </button>
        </div>
      )}
    </div>
  )
}
