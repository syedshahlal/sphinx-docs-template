"use client"

import type React from "react"
import { Box, Heading, Text, Stack, Link, useColorModeValue } from "@chakra-ui/react"
import type { Feature } from "../../types"
import { handleDocClick, getDocStatus } from "../../utils/docs"
import { useNavigate } from "react-router-dom"

interface FeatureCardProps {
  feature: Feature
}

const FeatureCard: React.FC<FeatureCardProps> = ({ feature }) => {
  return (
    <Box
      p={6}
      bg={useColorModeValue("white", "gray.700")}
      boxShadow={"md"}
      rounded={"md"}
      textAlign={"left"}
      height="100%"
    >
      <Heading fontSize={"xl"} fontWeight={500} mb={2}>
        {feature.title}
      </Heading>
      <Text color={"gray.500"} mb={4}>
        {feature.description}
      </Text>
      <Link
        href={feature.href}
        onClick={(event) => handleCardClick(feature.sectionId, feature.href, event)}
        color={"blue.400"}
        _hover={{
          textDecoration: "underline",
        }}
      >
        Learn more
      </Link>
    </Box>
  )
}

interface FeatureCardsProps {
  features: Feature[]
}

const FeatureCards: React.FC<FeatureCardsProps> = ({ features }) => {
  const navigate = useNavigate()

  const handleCardClick = async (sectionId: string, href: string, event: React.MouseEvent) => {
    event.preventDefault()

    const status = getDocStatus(sectionId)
    if (!status.available) {
      alert(status.message || "Documentation not available")
      return
    }

    // Route to markdown pages for specific sections
    if (sectionId === "platform-overview") {
      navigate("/platform-introduction")
      return
    }

    if (sectionId === "getting-started") {
      navigate("/getting-started")
      return
    }

    if (sectionId === "api-reference") {
      navigate("/api-reference")
      return
    }

    // For other sections, use the original Sphinx documentation
    await handleDocClick(sectionId, {
      openInNewTab: true,
      trackClick: true,
      fallbackUrl: href,
    })
  }

  return (
    <Stack spacing={8} direction={{ base: "column", md: "row" }}>
      {features.map((feature) => (
        <FeatureCard key={feature.title} feature={feature} />
      ))}
    </Stack>
  )
}

export default FeatureCards
