---
title: "Homepage Layout"
type: "layout"
template: "homepage.html"
components:
  - banner
  - hero
  - feature-cards
  - quick-links
  - whats-new
  - support-section
  - chatbot
---

# Homepage Layout

## Overview
The homepage layout is the main entry point for the GRA Core Platform documentation, featuring a modern, interactive design with multiple components.

## Layout Structure
\`\`\`html
<!DOCTYPE html>
<html lang="en" data-theme="light">
<head>
  <!-- Head content -->
</head>
<body class="homepage-layout">
  <!-- Banner Component -->
  <section class="banner-section">
    {% include components/banner/index.html %}
  </section>
  
  <!-- Hero Section -->
  <section class="hero-section">
    {% include components/hero/index.html %}
  </section>
  
  <!-- Feature Cards Section -->
  <section class="feature-cards-section">
    {% include components/feature-
