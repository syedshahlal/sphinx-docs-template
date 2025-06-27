"use client"

import type React from "react"
import { useState } from "react"
import { useDraggable } from "@dnd-kit/core"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import {
  Type,
  ImageIcon,
  Code,
  MousePointer,
  CreditCard,
  Minus,
  List,
  ListOrdered,
  CheckSquare,
  Quote,
  AlertTriangle,
  Space,
  Columns,
  Table,
  GitBranch,
  FileCode,
  ChevronDown,
  ChevronRight,
  Search,
  Grid3X3,
  BarChart3,
  Star,
  Award,
  Zap,
  Target,
  Layers,
  Layout,
  Palette,
  Sparkles,
  Users,
  Mail,
  Phone,
  MessageCircle,
  File,
  DollarSign,
} from "lucide-react"
import { cn } from "@/lib/utils"
import type { MarkdownComponent, HtmlBlockContent } from "./types"

// TailGrids component definitions with actual HTML content
const tailGridsComponents = {
  // Hero Sections
  heroGradient: `<section class="relative z-10 overflow-hidden bg-white pb-16 pt-[120px] dark:bg-gray-dark md:pb-[120px] md:pt-[150px] xl:pb-[160px] xl:pt-[180px] 2xl:pb-[200px] 2xl:pt-[210px]">
    <div class="container">
      <div class="-mx-4 flex flex-wrap">
        <div class="w-full px-4">
          <div class="mx-auto max-w-[800px] text-center">
            <h1 class="mb-5 text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl sm:leading-tight md:text-5xl md:leading-tight">
              Creative Digital Agency For Your Business
            </h1>
            <p class="mb-12 text-base !leading-relaxed text-body-color dark:text-body-color-dark sm:text-lg md:text-xl">
              There are many variations of passages of Lorem Ipsum available but the majority have suffered alteration in some form.
            </p>
            <div class="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
              <a href="#" class="rounded-sm bg-primary px-8 py-4 text-base font-semibold text-white duration-300 ease-in-out hover:bg-primary/80">
                🔥 Get Pro
              </a>
              <a href="#" class="inline-block rounded-sm bg-black px-8 py-4 text-base font-semibold text-white duration-300 ease-in-out hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90">
                Book a Demo
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="absolute right-0 top-0 z-[-1] opacity-30 lg:opacity-100">
      <svg width="450" height="556" viewBox="0 0 450 556" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="277" cy="63" r="225" fill="url(#paint0_linear_25:217)"/>
        <defs>
          <linearGradient id="paint0_linear_25:217" x1="652.5" y1="711" x2="652.5" y2="1" gradientUnits="userSpaceOnUse">
            <stop stopColor="#3056D3" stopOpacity="0.07"/>
            <stop offset="1" stopColor="#C4B5FD" stopOpacity="0"/>
          </linearGradient>
        </defs>
      </svg>
    </div>
  </section>`,

  heroMinimal: `<section class="bg-gray-1 pb-[110px] pt-[120px] dark:bg-dark lg:pt-[150px]">
    <div class="container">
      <div class="-mx-4 flex flex-wrap">
        <div class="w-full px-4 lg:w-5/12">
          <div class="hero-content">
            <h1 class="mb-5 text-4xl font-bold !leading-[1.208] text-dark dark:text-white sm:text-[42px] lg:text-[40px] xl:text-5xl">
              The Best Way to Showcase Your App.
            </h1>
            <p class="mb-8 max-w-[480px] text-base text-body-color dark:text-dark-6">
              With TailGrids, business and students thrive together. Business can perfectly match their staffing to changing demand throughout the dayed.
            </p>
            <ul class="flex flex-wrap items-center">
              <li>
                <a href="#" class="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-center text-base font-medium text-white hover:bg-blue-dark lg:px-7">
                  Get Started
                </a>
              </li>
              <li>
                <a href="#" class="inline-flex items-center justify-center px-5 py-3 text-center text-base font-medium text-[#464646] hover:text-primary dark:text-white">
                  <span class="mr-2">
                    <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="12.6152" r="12" fill="#3758F9"/>
                      <rect x="7.99893" y="8.61523" width="8.18182" height="8.18182" rx="4.09091" fill="white"/>
                    </svg>
                  </span>
                  Watch Intro
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div class="hidden px-4 lg:block lg:w-1/12"></div>
        <div class="w-full px-4 lg:w-6/12">
          <div class="lg:ml-auto lg:text-right">
            <div class="relative z-10 inline-block pt-11 lg:pt-0">
              <img src="https://cdn.tailgrids.com/1.0/assets/images/hero/hero-image-01.png" alt="hero" class="max-w-full lg:ml-auto"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>`,

  // Feature Sections
  featuresGrid: `<section class="pb-[120px] pt-[120px]">
    <div class="container">
      <div class="-mx-4 flex flex-wrap">
        <div class="w-full px-4">
          <div class="mx-auto mb-12 max-w-[510px] text-center lg:mb-20">
            <span class="mb-2 block text-lg font-semibold text-primary">
              Our Services
            </span>
            <h2 class="mb-3 text-3xl font-bold leading-[1.2] text-dark dark:text-white sm:text-4xl md:text-[40px]">
              What We Offer
            </h2>
            <p class="text-base text-body-color dark:text-dark-6">
              There are many variations of passages of Lorem Ipsum available but the majority have suffered alteration in some form.
            </p>
          </div>
        </div>
      </div>
      <div class="-mx-4 flex flex-wrap">
        <div class="w-full px-4 md:w-1/2 lg:w-1/3">
          <div class="mb-9 rounded-[20px] bg-white p-10 shadow-2 hover:shadow-lg dark:bg-dark-2 md:px-7 xl:px-10">
            <div class="mb-8 flex h-[70px] w-[70px] items-center justify-center rounded-2xl bg-primary">
              <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21.0375 1.2374C11.8125 -0.393851 2.92503 5.7374 1.29378 14.9624C0.450029 19.4061 1.46253 23.9624 4.05003 27.5624L1.23753 35.3249C1.01253 35.9999 1.57503 36.5624 2.25003 36.3374L10.0125 33.5249C13.6125 36.1124 18.1688 37.1249 22.6125 36.2811C31.8375 34.6499 37.9688 25.7624 36.3375 16.5374C34.7063 7.31239 25.8188 1.18114 16.5938 2.81239L21.0375 1.2374Z" fill="white"/>
              </svg>
            </div>
            <h4 class="mb-[14px] text-2xl font-semibold text-dark dark:text-white">
              Refreshing Design
            </h4>
            <p class="text-body-color dark:text-dark-6">
              We dejoy working with discerning clients, people for whom qualuty, service, integrity & aesthetics.
            </p>
          </div>
        </div>
        <div class="w-full px-4 md:w-1/2 lg:w-1/3">
          <div class="mb-9 rounded-[20px] bg-white p-10 shadow-2 hover:shadow-lg dark:bg-dark-2 md:px-7 xl:px-10">
            <div class="mb-8 flex h-[70px] w-[70px] items-center justify-center rounded-2xl bg-primary">
              <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M30.8437 15.75H26.25V11.1562C26.25 10.4062 25.6875 9.84375 24.9375 9.84375H11.0625C10.3125 9.84375 9.75 10.4062 9.75 11.1562V15.75H5.15625C4.40625 15.75 3.84375 16.3125 3.84375 17.0625V24.8437C3.84375 25.5937 4.40625 26.1562 5.15625 26.1562H9.75V30.75C9.75 31.5 10.3125 32.0625 11.0625 32.0625H24.9375C25.6875 32.0625 26.25 31.5 26.25 30.75V26.1562H30.8437C31.5937 26.1562 32.1562 25.5937 32.1562 24.8437V17.0625C32.1562 16.3125 31.5937 15.75 30.8437 15.75Z" fill="white"/>
              </svg>
            </div>
            <h4 class="mb-[14px] text-2xl font-semibold text-dark dark:text-white">
              Based on Tailwind CSS
            </h4>
            <p class="text-body-color dark:text-dark-6">
              We dejoy working with discerning clients, people for whom qualuty, service, integrity & aesthetics.
            </p>
          </div>
        </div>
        <div class="w-full px-4 md:w-1/2 lg:w-1/3">
          <div class="mb-9 rounded-[20px] bg-white p-10 shadow-2 hover:shadow-lg dark:bg-dark-2 md:px-7 xl:px-10">
            <div class="mb-8 flex h-[70px] w-[70px] items-center justify-center rounded-2xl bg-primary">
              <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 0.5625C8.15625 0.5625 0.5625 8.15625 0.5625 18C0.5625 27.8437 8.15625 35.4375 18 35.4375C27.8437 35.4375 35.4375 27.8437 35.4375 18C35.4375 8.15625 27.8437 0.5625 18 0.5625ZM18 32.0625C10.0312 32.0625 3.9375 25.9687 3.9375 18C3.9375 10.0312 10.0312 3.9375 18 3.9375C25.9687 3.9375 32.0625 10.0312 32.0625 18C32.0625 25.9687 25.9687 32.0625 18 32.0625Z" fill="white"/>
                <path d="M18 7.3125C17.1562 7.3125 16.3125 8.15625 16.3125 9V18C16.3125 18.8437 17.1562 19.6875 18 19.6875H25.3125C26.1562 19.6875 27 18.8437 27 18C27 17.1562 26.1562 16.3125 25.3125 16.3125H19.6875V9C19.6875 8.15625 18.8437 7.3125 18 7.3125Z" fill="white"/>
              </svg>
            </div>
            <h4 class="mb-[14px] text-2xl font-semibold text-dark dark:text-white">
              Speed Optimized
            </h4>
            <p class="text-body-color dark:text-dark-6">
              We dejoy working with discerning clients, people for whom qualuty, service, integrity & aesthetics.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>`,

  // Pricing Tables
  pricingCards: `<section class="relative z-10 overflow-hidden bg-white pb-12 pt-20 dark:bg-dark lg:pb-[90px] lg:pt-[120px]">
    <div class="container mx-auto">
      <div class="-mx-4 flex flex-wrap">
        <div class="w-full px-4">
          <div class="mx-auto mb-[60px] max-w-[510px] text-center">
            <span class="mb-2 block text-lg font-semibold text-primary">
              Pricing Table
            </span>
            <h2 class="mb-3 text-3xl font-bold text-dark dark:text-white sm:text-4xl md:text-[40px] md:leading-[1.2]">
              Our Pricing Plan
            </h2>
            <p class="text-base text-body-color dark:text-dark-6">
              There are many variations of passages of Lorem Ipsum available but the majority have suffered alteration in some form.
            </p>
          </div>
        </div>
      </div>
      <div class="-mx-4 flex flex-wrap justify-center">
        <div class="w-full px-4 md:w-1/2 lg:w-1/3">
          <div class="relative z-10 mb-10 overflow-hidden rounded-[10px] border-2 border-stroke bg-white px-8 py-10 shadow-pricing dark:border-dark-3 dark:bg-dark-2 sm:p-12 lg:px-6 lg:py-10 xl:p-[50px]">
            <span class="mb-3 block text-lg font-semibold text-primary">Personal</span>
            <h2 class="mb-5 text-[42px] font-bold text-dark dark:text-white">
              $59
              <span class="text-base font-medium text-body-color dark:text-dark-6">/ year</span>
            </h2>
            <p class="mb-8 border-b border-stroke pb-8 text-base text-body-color dark:border-dark-3 dark:text-dark-6">
              Perfect for using in a personal website or a client project.
            </p>
            <div class="mb-9 flex flex-col gap-[14px]">
              <p class="text-base text-body-color dark:text-dark-6">1 User</p>
              <p class="text-base text-body-color dark:text-dark-6">All UI components</p>
              <p class="text-base text-body-color dark:text-dark-6">Lifetime access</p>
              <p class="text-base text-body-color dark:text-dark-6">Free updates</p>
              <p class="text-base text-body-color dark:text-dark-6">Use on 1 (one) project</p>
              <p class="text-base text-body-color dark:text-dark-6">3 Months support</p>
            </div>
            <a href="#" class="block w-full rounded-md border border-primary bg-transparent p-3 text-center text-base font-medium text-primary transition hover:bg-primary hover:text-white">
              Choose Personal
            </a>
          </div>
        </div>
        <div class="w-full px-4 md:w-1/2 lg:w-1/3">
          <div class="relative z-10 mb-10 overflow-hidden rounded-[10px] border-2 border-primary bg-white px-8 py-10 shadow-pricing dark:bg-dark-2 sm:p-12 lg:px-6 lg:py-10 xl:p-[50px]">
            <div class="absolute right-[-50px] top-[-50px] h-[120px] w-[120px] rounded-full bg-primary"></div>
            <span class="relative z-20 mb-3 block text-lg font-semibold text-white">Commercial</span>
            <h2 class="relative z-20 mb-5 text-[42px] font-bold text-dark dark:text-white">
              $199
              <span class="text-base font-medium text-body-color dark:text-dark-6">/ year</span>
            </h2>
            <p class="relative z-20 mb-8 border-b border-stroke pb-8 text-base text-body-color dark:border-dark-3 dark:text-dark-6">
              Perfect for using in a commercial website or a client project.
            </p>
            <div class="relative z-20 mb-9 flex flex-col gap-[14px]">
              <p class="text-base text-body-color dark:text-dark-6">5 Users</p>
              <p class="text-base text-body-color dark:text-dark-6">All UI components</p>
              <p class="text-base text-body-color dark:text-dark-6">Lifetime access</p>
              <p class="text-base text-body-color dark:text-dark-6">Free updates</p>
              <p class="text-base text-body-color dark:text-dark-6">Use on 3 (Three) project</p>
              <p class="text-base text-body-color dark:text-dark-6">4 Months support</p>
            </div>
            <a href="#" class="relative z-20 block w-full rounded-md border border-primary bg-primary p-3 text-center text-base font-medium text-white transition hover:bg-opacity-90">
              Choose Commercial
            </a>
          </div>
        </div>
        <div class="w-full px-4 md:w-1/2 lg:w-1/3">
          <div class="relative z-10 mb-10 overflow-hidden rounded-[10px] border-2 border-stroke bg-white px-8 py-10 shadow-pricing dark:border-dark-3 dark:bg-dark-2 sm:p-12 lg:px-6 lg:py-10 xl:p-[50px]">
            <span class="mb-3 block text-lg font-semibold text-primary">Extended</span>
            <h2 class="mb-5 text-[42px] font-bold text-dark dark:text-white">
              $399
              <span class="text-base font-medium text-body-color dark:text-dark-6">/ year</span>
            </h2>
            <p class="mb-8 border-b border-stroke pb-8 text-base text-body-color dark:border-dark-3 dark:text-dark-6">
              Perfect for using in a commercial website or a client project.
            </p>
            <div class="mb-9 flex flex-col gap-[14px]">
              <p class="text-base text-body-color dark:text-dark-6">Unlimited Users</p>
              <p class="text-base text-body-color dark:text-dark-6">All UI components</p>
              <p class="text-base text-body-color dark:text-dark-6">Lifetime access</p>
              <p class="text-base text-body-color dark:text-dark-6">Free updates</p>
              <p class="text-base text-body-color dark:text-dark-6">Unlimited projects</p>
              <p class="text-base text-body-color dark:text-dark-6">12 Months support</p>
            </div>
            <a href="#" class="block w-full rounded-md border border-primary bg-transparent p-3 text-center text-base font-medium text-primary transition hover:bg-primary hover:text-white">
              Choose Extended
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>`,

  // Contact Forms
  contactForm: `<section class="relative z-10 overflow-hidden bg-white py-20 dark:bg-dark lg:py-[120px]">
    <div class="container">
      <div class="-mx-4 flex flex-wrap lg:justify-between">
        <div class="w-full px-4 lg:w-1/2 xl:w-6/12">
          <div class="mb-12 max-w-[570px] lg:mb-0">
            <span class="mb-4 block text-base font-semibold text-primary">
              Contact Us
            </span>
            <h2 class="mb-6 text-[32px] font-bold uppercase text-dark dark:text-white sm:text-[40px] lg:text-[36px] xl:text-[40px]">
              GET IN TOUCH WITH US
            </h2>
            <p class="mb-9 text-base leading-relaxed text-body-color dark:text-dark-6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eius tempor incididunt ut labore et dolore magna aliqua. Ut enim adiqua minim veniam quis nostrud exercitation ullamco
            </p>
            <div class="mb-8 flex w-full max-w-[370px]">
              <div class="mr-6 flex h-[60px] w-[60px] items-center justify-center overflow-hidden rounded bg-primary bg-opacity-5 text-primary sm:h-[70px] sm:w-[70px]">
                <svg width="24" height="24" viewBox="0 0 24 24" class="fill-current">
                  <path d="M21.8182 24H16.5584C15.3896 24 14.4156 23.0649 14.4156 21.9481V17.7922C14.4156 17.2338 13.9351 16.7792 13.3377 16.7792H10.6623C10.0649 16.7792 9.58441 17.2338 9.58441 17.7922V21.9481C9.58441 23.0649 8.61039 24 7.44156 24H2.18182C0.974026 24 0 23.0649 0 21.9481V8.90909C0 8.23377 0.337662 7.59740 0.909091 7.18182L10.9091 0.272727C11.5195 -0.090909 12.4805 -0.090909 13.0909 0.272727L23.0909 7.18182C23.6623 7.59740 24 8.23377 24 8.90909V21.9481C24 23.0649 23.0260 24 21.8182 24Z"/>
                </svg>
              </div>
              <div class="w-full">
                <h4 class="mb-1 text-xl font-bold text-dark dark:text-white">Our Location</h4>
                <p class="text-base text-body-color dark:text-dark-6">99 S.t Jomblo Park Pekanbaru 28292. Indonesia</p>
              </div>
            </div>
            <div class="mb-8 flex w-full max-w-[370px]">
              <div class="mr-6 flex h-[60px] w-[60px] items-center justify-center overflow-hidden rounded bg-primary bg-opacity-5 text-primary sm:h-[70px] sm:w-[70px]">
                <svg width="24" height="26" viewBox="0 0 24 26" class="fill-current">
                  <path d="M22.6149 15.1386C22.5307 14.6431 22.1737 14.2861 21.6782 14.2861H21.1827L20.8257 11.8119C20.8257 11.8119 20.8257 11.7277 20.8257 11.6436C20.8257 5.18812 15.5544 0 9.09901 0C2.64356 0 -2.62772 5.18812 -2.62772 11.6436C-2.62772 11.7277 -2.62772 11.8119 -2.62772 11.8119L-2.9703 14.2861H-3.46535C-3.96040 14.2861 -4.31683 14.6431 -4.40099 15.1386L-4.90099 18.0297C-4.98515 18.5252 -4.62871 18.9663 -4.13366 18.9663H-3.63861L-4.13366 25.0891C-4.13366 25.5 -3.80198 25.8317 -3.39109 25.8317H-2.31683C-1.90594 25.8317 -1.57426 25.5 -1.57426 25.0891L-1.07921 18.9663H20.4901L20.9851 25.0891C20.9851 25.5 21.3168 25.8317 21.7277 25.8317H22.8020C23.2129 25.8317 23.5446 25.5 23.5446 25.0891L23.0495 18.9663H23.5446C24.0396 18.9663 24.3960 18.5252 24.3119 18.0297L23.8119 15.1386H22.6149ZM9.09901 2.0297C14.4653 2.0297 18.7921 6.35644 18.7921 11.7228C18.7921 11.8069 18.7921 11.8911 18.7921 11.8911L18.4495 14.2861H-0.252475L-0.594059 11.8911C-0.594059 11.8911 -0.594059 11.8069 -0.594059 11.7228C-0.594059 6.35644 3.73267 2.0297 9.09901 2.0297Z"/>
                </svg>
              </div>
              <div class="w-full">
                <h4 class="mb-1 text-xl font-bold text-dark dark:text-white">Email Address</h4>
                <p class="text-base text-body-color dark:text-dark-6">info@yourdomain.com</p>
              </div>
            </div>
            <div class="mb-8 flex w-full max-w-[370px]">
              <div class="mr-6 flex h-[60px] w-[60px] items-center justify-center overflow-hidden rounded bg-primary bg-opacity-5 text-primary sm:h-[70px] sm:w-[70px]">
                <svg width="22" height="22" viewBox="0 0 22 22" class="fill-current">
                  <path d="M21.2532 15.4286C21.2532 15.4286 19.8852 16.8807 19.4736 17.2923C18.9787 17.8713 18.3997 18.1128 17.6514 18.1128C17.5673 18.1128 17.4832 18.1128 17.3991 18.0287C15.3624 17.7872 13.4098 16.9548 11.7094 15.5868C9.50746 13.8023 7.72299 11.5163 6.52239 8.89552C5.73507 7.27761 5.40597 6.02985 5.57015 4.86567C5.65433 4.11741 5.98343 3.53731 6.60746 2.91328L8.31343 1.20731C8.56493 0.955821 8.81642 0.871642 9.06791 0.871642C9.40537 0.871642 9.65686 1.04478 9.82104 1.20896C9.82104 1.20896 11.1049 2.49254 11.1049 2.49254C11.2691 2.65672 11.4333 2.82090 11.5975 2.98507C12.0924 3.56517 12.0924 4.06015 11.5975 4.64025C11.4333 4.80443 11.2691 4.96861 11.1049 5.13279C10.6941 5.54358 10.3666 5.87269 10.0391 6.20179C10.0391 6.20179 10.0391 6.20179 10.0391 6.20179C9.71164 6.52836 9.79582 6.85746 9.87999 7.10896C9.87999 7.10896 9.87999 7.10896 9.87999 7.10896C10.4591 8.39254 11.2691 9.59313 12.4697 10.7937C13.6703 11.9943 14.8709 12.8043 16.1545 13.3834C16.1545 13.3834 16.1545 13.3834 16.1545 13.3834C16.406 13.4676 16.7351 13.5517 17.0642 13.2243C17.3933 12.8968 17.7224 12.5693 18.1332 12.1585C18.2974 11.9943 18.4616 11.8301 18.6258 11.6659C19.2059 11.171 19.7009 11.171 20.1958 11.6659C20.36 11.8301 20.5242 11.9943 20.6884 12.1585L21.9719 13.442C22.2234 13.6935 22.2234 14.0226 21.2532 15.4286Z"/>
                </svg>
              </div>
              <div class="w-full">
                <h4 class="mb-1 text-xl font-bold text-dark dark:text-white">Phone Number</h4>
                <p class="text-base text-body-color dark:text-dark-6">(+62)81 414 257 9980</p>
              </div>
            </div>
          </div>
        </div>
        <div class="w-full px-4 lg:w-1/2 xl:w-5/12">
          <div class="relative rounded-lg bg-white p-8 shadow-lg dark:bg-dark-2 sm:p-12">
            <form>
              <div class="mb-6">
                <input type="text" placeholder="Your Name" class="w-full rounded border border-stroke px-[14px] py-3 text-base text-body-color outline-none focus:border-primary dark:border-dark-3 dark:bg-dark dark:text-dark-6"/>
              </div>
              <div class="mb-6">
                <input type="email" placeholder="Your Email" class="w-full rounded border border-stroke px-[14px] py-3 text-base text-body-color outline-none focus:border-primary dark:border-dark-3 dark:bg-dark dark:text-dark-6"/>
              </div>
              <div class="mb-6">
                <input type="text" placeholder="Your Phone" class="w-full rounded border border-stroke px-[14px] py-3 text-base text-body-color outline-none focus:border-primary dark:border-dark-3 dark:bg-dark dark:text-dark-6"/>
              </div>
              <div class="mb-6">
                <textarea rows="6" placeholder="Your Message" class="w-full resize-none rounded border border-stroke px-[14px] py-3 text-base text-body-color outline-none focus:border-primary dark:border-dark-3 dark:bg-dark dark:text-dark-6"></textarea>
              </div>
              <div>
                <button type="submit" class="w-full rounded border border-primary bg-primary p-3 text-white transition hover:bg-opacity-90">
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>`,

  // Team Sections
  teamGrid: `<section class="bg-gray-1 pb-20 pt-20 dark:bg-dark-2 lg:pb-[120px] lg:pt-[120px]">
    <div class="container">
      <div class="-mx-4 flex flex-wrap">
        <div class="w-full px-4">
          <div class="mx-auto mb-[60px] max-w-[510px] text-center">
            <span class="mb-2 block text-lg font-semibold text-primary">
              Our Team
            </span>
            <h2 class="mb-3 text-3xl font-bold leading-[1.2] text-dark dark:text-white sm:text-4xl md:text-[40px]">
              Our Awesome Team
            </h2>
            <p class="text-base text-body-color dark:text-dark-6">
              There are many variations of passages of Lorem Ipsum available but the majority have suffered alteration in some form.
            </p>
          </div>
        </div>
      </div>
      <div class="-mx-4 flex flex-wrap justify-center">
        <div class="w-full px-4 md:w-1/2 xl:w-1/4">
          <div class="mx-auto mb-10 w-full max-w-[370px]">
            <div class="relative overflow-hidden rounded-lg">
              <img src="https://cdn.tailgrids.com/2.0/image/marketing/images/team/team-01/image-01.jpg" alt="image" class="w-full"/>
              <div class="absolute bottom-5 left-0 w-full text-center">
                <div class="relative mx-5 overflow-hidden rounded-lg bg-white px-3 py-5 dark:bg-dark-2">
                  <h3 class="text-base font-semibold text-dark dark:text-white">
                    Coriss Ambady
                  </h3>
                  <p class="text-xs text-body-color dark:text-dark-6">
                    Web Developer
                  </p>
                  <div>
                    <span class="absolute bottom-0 left-0">
                      <svg width="61" height="30" viewBox="0 0 61 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="16" cy="45" r="45" fill="#13C296" fillOpacity="0.11"/>
                      </svg>
                    </span>
                    <span class="absolute right-0 top-0">
                      <svg width="20" height="25" viewBox="0 0 20 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="0.706257" cy="24.3533" r="0.646687" transform="rotate(-90 0.706257 24.3533)" fill="#3056D3"/>
                        <circle cx="6.39669" cy="24.3533" r="0.646687" transform="rotate(-90 6.39669 24.3533)" fill="#3056D3"/>
                        <circle cx="12.0881" cy="24.3533" r="0.646687" transform="rotate(-90 12.0881 24.3533)" fill="#3056D3"/>
                        <circle cx="17.7785" cy="24.3533" r="0.646687" transform="rotate(-90 17.7785 24.3533)" fill="#3056D3"/>
                        <circle cx="0.706257" cy="18.6624" r="0.646687" transform="rotate(-90 0.706257 18.6624)" fill="#3056D3"/>
                        <circle cx="6.39669" cy="18.6624" r="0.646687" transform="rotate(-90 6.39669 18.6624)" fill="#3056D3"/>
                        <circle cx="12.0881" cy="18.6624" r="0.646687" transform="rotate(-90 12.0881 18.6624)" fill="#3056D3"/>
                        <circle cx="17.7785" cy="18.6624" r="0.646687" transform="rotate(-90 17.7785 18.6624)" fill="#3056D3"/>
                        <circle cx="0.706257" cy="12.9717" r="0.646687" transform="rotate(-90 0.706257 12.9717)" fill="#3056D3"/>
                        <circle cx="6.39669" cy="12.9717" r="0.646687" transform="rotate(-90 6.39669 12.9717)" fill="#3056D3"/>
                        <circle cx="12.0881" cy="12.9717" r="0.646687" transform="rotate(-90 12.0881 12.9717)" fill="#3056D3"/>
                        <circle cx="17.7785" cy="12.9717" r="0.646687" transform="rotate(-90 17.7785 12.9717)" fill="#3056D3"/>
                        <circle cx="0.706257" cy="7.28077" r="0.646687" transform="rotate(-90 0.706257 7.28077)" fill="#3056D3"/>
                        <circle cx="6.39669" cy="7.28077" r="0.646687" transform="rotate(-90 6.39669 7.28077)" fill="#3056D3"/>
                        <circle cx="12.0881" cy="7.28077" r="0.646687" transform="rotate(-90 12.0881 7.28077)" fill="#3056D3"/>
                        <circle cx="17.7785" cy="7.28077" r="0.646687" transform="rotate(-90 17.7785 7.28077)" fill="#3056D3"/>
                        <circle cx="0.706257" cy="1.58989" r="0.646687" transform="rotate(-90 0.706257 1.58989)" fill="#3056D3"/>
                        <circle cx="6.39669" cy="1.58989" r="0.646687" transform="rotate(-90 6.39669 1.58989)" fill="#3056D3"/>
                        <circle cx="12.0881" cy="1.58989" r="0.646687" transform="rotate(-90 12.0881 1.58989)" fill="#3056D3"/>
                        <circle cx="17.7785" cy="1.58989" r="0.646687" transform="rotate(-90 17.7785 1.58989)" fill="#3056D3"/>
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="w-full px-4 md:w-1/2 xl:w-1/4">
          <div class="mx-auto mb-10 w-full max-w-[370px]">
            <div class="relative overflow-hidden rounded-lg">
              <img src="https://cdn.tailgrids.com/2.0/image/marketing/images/team/team-01/image-02.jpg" alt="image" class="w-full"/>
              <div class="absolute bottom-5 left-0 w-full text-center">
                <div class="relative mx-5 overflow-hidden rounded-lg bg-white px-3 py-5 dark:bg-dark-2">
                  <h3 class="text-base font-semibold text-dark dark:text-white">
                    Glorius Cristian
                  </h3>
                  <p class="text-xs text-body-color dark:text-dark-6">
                    App Developer
                  </p>
                  <div>
                    <span class="absolute bottom-0 left-0">
                      <svg width="61" height="30" viewBox="0 0 61 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="16" cy="45" r="45" fill="#13C296" fillOpacity="0.11"/>
                      </svg>
                    </span>
                    <span class="absolute right-0 top-0">
                      <svg width="20" height="25" viewBox="0 0 20 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="0.706257" cy="24.3533" r="0.646687" transform="rotate(-90 0.706257 24.3533)" fill="#3056D3"/>
                        <circle cx="6.39669" cy="24.3533" r="0.646687" transform="rotate(-90 6.39669 24.3533)" fill="#3056D3"/>
                        <circle cx="12.0881" cy="24.3533" r="0.646687" transform="rotate(-90 12.0881 24.3533)" fill="#3056D3"/>
                        <circle cx="17.7785" cy="24.3533" r="0.646687" transform="rotate(-90 17.7785 24.3533)" fill="#3056D3"/>
                        <circle cx="0.706257" cy="18.6624" r="0.646687" transform="rotate(-90 0.706257 18.6624)" fill="#3056D3"/>
                        <circle cx="6.39669" cy="18.6624" r="0.646687" transform="rotate(-90 6.39669 18.6624)" fill="#3056D3"/>
                        <circle cx="12.0881" cy="18.6624" r="0.646687" transform="rotate(-90 12.0881 18.6624)" fill="#3056D3"/>
                        <circle cx="17.7785" cy="18.6624" r="0.646687" transform="rotate(-90 17.7785 18.6624)" fill="#3056D3"/>
                        <circle cx="0.706257" cy="12.9717" r="0.646687" transform="rotate(-90 0.706257 12.9717)" fill="#3056D3"/>
                        <circle cx="6.39669" cy="12.9717" r="0.646687" transform="rotate(-90 6.39669 12.9717)" fill="#3056D3"/>
                        <circle cx="12.0881" cy="12.9717" r="0.646687" transform="rotate(-90 12.0881 12.9717)" fill="#3056D3"/>
                        <circle cx="17.7785" cy="12.9717" r="0.646687" transform="rotate(-90 17.7785 12.9717)" fill="#3056D3"/>
                        <circle cx="0.706257" cy="7.28077" r="0.646687" transform="rotate(-90 0.706257 7.28077)" fill="#3056D3"/>
                        <circle cx="6.39669" cy="7.28077" r="0.646687" transform="rotate(-90 6.39669 7.28077)" fill="#3056D3"/>
                        <circle cx="12.0881" cy="7.28077" r="0.646687" transform="rotate(-90 12.0881 7.28077)" fill="#3056D3"/>
                        <circle cx="17.7785" cy="7.28077" r="0.646687" transform="rotate(-90 17.7785 7.28077)" fill="#3056D3"/>
                        <circle cx="0.706257" cy="1.58989" r="0.646687" transform="rotate(-90 0.706257 1.58989)" fill="#3056D3"/>
                        <circle cx="6.39669" cy="1.58989" r="0.646687" transform="rotate(-90 6.39669 1.58989)" fill="#3056D3"/>
                        <circle cx="12.0881" cy="1.58989" r="0.646687" transform="rotate(-90 12.0881 1.58989)" fill="#3056D3"/>
                        <circle cx="17.7785" cy="1.58989" r="0.646687" transform="rotate(-90 17.7785 1.58989)" fill="#3056D3"/>
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="w-full px-4 md:w-1/2 xl:w-1/4">
          <div class="mx-auto mb-10 w-full max-w-[370px]">
            <div class="relative overflow-hidden rounded-lg">
              <img src="https://cdn.tailgrids.com/2.0/image/marketing/images/team/team-01/image-03.jpg" alt="image" class="w-full"/>
              <div class="absolute bottom-5 left-0 w-full text-center">
                <div class="relative mx-5 overflow-hidden rounded-lg bg-white px-3 py-5 dark:bg-dark-2">
                  <h3 class="text-base font-semibold text-dark dark:text-white">
                    Jackie Sanders
                  </h3>
                  <p class="text-xs text-body-color dark:text-dark-6">
                    Content Writer
                  </p>
                  <div>
                    <span class="absolute bottom-0 left-0">
                      <svg width="61" height="30" viewBox="0 0 61 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="16" cy="45" r="45" fill="#13C296" fillOpacity="0.11"/>
                      </svg>
                    </span>
                    <span class="absolute right-0 top-0">
                      <svg width="20" height="25" viewBox="0 0 20 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="0.706257" cy="24.3533" r="0.646687" transform="rotate(-90 0.706257 24.3533)" fill="#3056D3"/>
                        <circle cx="6.39669" cy="24.3533" r="0.646687" transform="rotate(-90 6.39669 24.3533)" fill="#3056D3"/>
                        <circle cx="12.0881" cy="24.3533" r="0.646687" transform="rotate(-90 12.0881 24.3533)" fill="#3056D3"/>
                        <circle cx="17.7785" cy="24.3533" r="0.646687" transform="rotate(-90 17.7785 24.3533)" fill="#3056D3"/>
                        <circle cx="0.706257" cy="18.6624" r="0.646687" transform="rotate(-90 0.706257 18.6624)" fill="#3056D3"/>
                        <circle cx="6.39669" cy="18.6624" r="0.646687" transform="rotate(-90 6.39669 18.6624)" fill="#3056D3"/>
                        <circle cx="12.0881" cy="18.6624" r="0.646687" transform="rotate(-90 12.0881 18.6624)" fill="#3056D3"/>
                        <circle cx="17.7785" cy="18.6624" r="0.646687" transform="rotate(-90 17.7785 18.6624)" fill="#3056D3"/>
                        <circle cx="0.706257" cy="12.9717" r="0.646687" transform="rotate(-90 0.706257 12.9717)" fill="#3056D3"/>
                        <circle cx="6.39669" cy="12.9717" r="0.646687" transform="rotate(-90 6.39669 12.9717)" fill="#3056D3"/>
                        <circle cx="12.0881" cy="12.9717" r="0.646687" transform="rotate(-90 12.0881 12.9717)" fill="#3056D3"/>
                        <circle cx="17.7785" cy="12.9717" r="0.646687" transform="rotate(-90 17.7785 12.9717)" fill="#3056D3"/>
                        <circle cx="0.706257" cy="7.28077" r="0.646687" transform="rotate(-90 0.706257 7.28077)" fill="#3056D3"/>
                        <circle cx="6.39669" cy="7.28077" r="0.646687" transform="rotate(-90 6.39669 7.28077)" fill="#3056D3"/>
                        <circle cx="12.0881" cy="7.28077" r="0.646687" transform="rotate(-90 12.0881 7.28077)" fill="#3056D3"/>
                        <circle cx="17.7785" cy="7.28077" r="0.646687" transform="rotate(-90 17.7785 7.28077)" fill="#3056D3"/>
                        <circle cx="0.706257" cy="1.58989" r="0.646687" transform="rotate(-90 0.706257 1.58989)" fill="#3056D3"/>
                        <circle cx="6.39669" cy="1.58989" r="0.646687" transform="rotate(-90 6.39669 1.58989)" fill="#3056D3"/>
                        <circle cx="12.0881" cy="1.58989" r="0.646687" transform="rotate(-90 12.0881 1.58989)" fill="#3056D3"/>
                        <circle cx="17.7785" cy="1.58989" r="0.646687" transform="rotate(-90 17.7785 1.58989)" fill="#3056D3"/>
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="w-full px-4 md:w-1/2 xl:w-1/4">
          <div class="mx-auto mb-10 w-full max-w-[370px]">
            <div class="relative overflow-hidden rounded-lg">
              <img src="https://cdn.tailgrids.com/2.0/image/marketing/images/team/team-01/image-04.jpg" alt="image" class="w-full"/>
              <div class="absolute bottom-5 left-0 w-full text-center">
                <div class="relative mx-5 overflow-hidden rounded-lg bg-white px-3 py-5 dark:bg-dark-2">
                  <h3 class="text-base font-semibold text-dark dark:text-white">
                    Nikolas Brooten
                  </h3>
                  <p class="text-xs text-body-color dark:text-dark-6">
                    UI/UX Designer
                  </p>
                  <div>
                    <span class="absolute bottom-0 left-0">
                      <svg width="61" height="30" viewBox="0 0 61 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="16" cy="45" r="45" fill="#13C296" fillOpacity="0.11"/>
                      </svg>
                    </span>
                    <span class="absolute right-0 top-0">
                      <svg width="20" height="25" viewBox="0 0 20 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="0.706257" cy="24.3533" r="0.646687" transform="rotate(-90 0.706257 24.3533)" fill="#3056D3"/>
                        <circle cx="6.39669" cy="24.3533" r="0.646687" transform="rotate(-90 6.39669 24.3533)" fill="#3056D3"/>
                        <circle cx="12.0881" cy="24.3533" r="0.646687" transform="rotate(-90 12.0881 24.3533)" fill="#3056D3"/>
                        <circle cx="17.7785" cy="24.3533" r="0.646687" transform="rotate(-90 17.7785 24.3533)" fill="#3056D3"/>
                        <circle cx="0.706257" cy="18.6624" r="0.646687" transform="rotate(-90 0.706257 18.6624)" fill="#3056D3"/>
                        <circle cx="6.39669" cy="18.6624" r="0.646687" transform="rotate(-90 6.39669 18.6624)" fill="#3056D3"/>
                        <circle cx="12.0881" cy="18.6624" r="0.646687" transform="rotate(-90 12.0881 18.6624)" fill="#3056D3"/>
                        <circle cx="17.7785" cy="18.6624" r="0.646687" transform="rotate(-90 17.7785 18.6624)" fill="#3056D3"/>
                        <circle cx="0.706257" cy="12.9717" r="0.646687" transform="rotate(-90 0.706257 12.9717)" fill="#3056D3"/>
                        <circle cx="6.39669" cy="12.9717" r="0.646687" transform="rotate(-90 6.39669 12.9717)" fill="#3056D3"/>
                        <circle cx="12.0881" cy="12.9717" r="0.646687" transform="rotate(-90 12.0881 12.9717)" fill="#3056D3"/>
                        <circle cx="17.7785" cy="12.9717" r="0.646687" transform="rotate(-90 17.7785 12.9717)" fill="#3056D3"/>
                        <circle cx="0.706257" cy="7.28077" r="0.646687" transform="rotate(-90 0.706257 7.28077)" fill="#3056D3"/>
                        <circle cx="6.39669" cy="7.28077" r="0.646687" transform="rotate(-90 6.39669 7.28077)" fill="#3056D3"/>
                        <circle cx="12.0881" cy="7.28077" r="0.646687" transform="rotate(-90 12.0881 7.28077)" fill="#3056D3"/>
                        <circle cx="17.7785" cy="7.28077" r="0.646687" transform="rotate(-90 17.7785 7.28077)" fill="#3056D3"/>
                        <circle cx="0.706257" cy="1.58989" r="0.646687" transform="rotate(-90 0.706257 1.58989)" fill="#3056D3"/>
                        <circle cx="6.39669" cy="1.58989" r="0.646687" transform="rotate(-90 6.39669 1.58989)" fill="#3056D3"/>
                        <circle cx="12.0881" cy="1.58989" r="0.646687" transform="rotate(-90 12.0881 1.58989)" fill="#3056D3"/>
                        <circle cx="17.7785" cy="1.58989" r="0.646687" transform="rotate(-90 17.7785 1.58989)" fill="#3056D3"/>
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>`,

  // CTA Sections
  ctaGradient: `<section class="relative z-10 overflow-hidden bg-primary py-20 lg:py-[115px]">
    <div class="container mx-auto">
      <div class="relative overflow-hidden">
        <div class="-mx-4 flex flex-wrap items-stretch">
          <div class="w-full px-4">
            <div class="mx-auto max-w-[570px] text-center">
              <h2 class="mb-2.5 text-3xl font-bold text-white md:text-[38px] md:leading-[1.44]">
                <span>What Are You Looking For?</span>
                <span class="text-3xl font-normal md:text-[40px]"> Get Started Now </span>
              </h2>
              <p class="mx-auto mb-6 max-w-[515px] text-base leading-[1.5] text-white">
                There are many variations of passages of Lorem Ipsum but the majority have suffered in some form.
              </p>
              <a href="#" class="inline-block rounded-md border border-transparent bg-secondary px-7 py-3 text-base font-medium text-white transition hover:bg-[#0BB489]">
                Let's have a meeting
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <span class="absolute left-0 top-0">
        <svg width="495" height="470" viewBox="0 0 495 470" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="55" cy="442" r="138" stroke="white" strokeOpacity="0.04" strokeWidth="50"/>
          <circle cx="446" r="39" stroke="white" strokeOpacity="0.04" strokeWidth="20"/>
          <path d="M245.406 137.609L233.985 94.9852L276.609 106.406L245.406 137.609Z" stroke="white" strokeOpacity="0.08" strokeWidth="12"/>
        </svg>
      </span>
      <span class="absolute bottom-0 right-0">
        <svg width="493" height="470" viewBox="0 0 493 470" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="462" cy="5" r="138" stroke="white" strokeOpacity="0.04" strokeWidth="50"/>
          <circle cx="49" cy="470" r="39" stroke="white" strokeOpacity="0.04" strokeWidth="20"/>
          <path d="M222.393 226.701L272.808 213.192L259.299 263.607L222.393 226.701Z" stroke="white" strokeOpacity="0.06" strokeWidth="13"/>
        </svg>
      </span>
    </div>
  </section>`,

  // Blog Sections
  blogGrid: `<section class="bg-gray-1 pb-[120px] pt-[120px] dark:bg-dark">
    <div class="container">
      <div class="-mx-4 flex flex-wrap">
        <div class="w-full px-4">
          <div class="mx-auto mb-[60px] max-w-[510px] text-center lg:mb-20">
            <span class="mb-2 block text-lg font-semibold text-primary">
              Our Blogs
            </span>
            <h2 class="mb-4 text-3xl font-bold text-dark dark:text-white sm:text-4xl md:text-[40px]">
              Our Recent News
            </h2>
            <p class="text-base text-body-color dark:text-dark-6">
              There are many variations of passages of Lorem Ipsum available but the majority have suffered alteration in some form.
            </p>
          </div>
        </div>
      </div>
      <div class="-mx-4 flex flex-wrap">
        <div class="w-full px-4 md:w-1/2 lg:w-1/3">
          <div class="mx-auto mb-10 max-w-[370px]">
            <div class="mb-8 overflow-hidden rounded">
              <img src="https://cdn.tailgrids.com/2.0/image/marketing/images/blogs/blog-01/image-01.jpg" alt="image" class="w-full"/>
            </div>
            <div>
              <span class="mb-5 inline-block rounded bg-primary px-4 py-1 text-center text-xs font-semibold leading-loose text-white">
                Dec 22, 2023
              </span>
              <h3>
                <a href="#" class="mb-4 inline-block text-xl font-semibold text-dark hover:text-primary dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
                  Meet AutoManage, the best AI management tools
                </a>
              </h3>
              <p class="text-base text-body-color dark:text-dark-6">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              </p>
            </div>
          </div>
        </div>
        <div class="w-full px-4 md:w-1/2 lg:w-1/3">
          <div class="mx-auto mb-10 max-w-[370px]">
            <div class="mb-8 overflow-hidden rounded">
              <img src="https://cdn.tailgrids.com/2.0/image/marketing/images/blogs/blog-01/image-02.jpg" alt="image" class="w-full"/>
            </div>
            <div>
              <span class="mb-5 inline-block rounded bg-primary px-4 py-1 text-center text-xs font-semibold leading-loose text-white">
                Mar 15, 2023
              </span>
              <h3>
                <a href="#" class="mb-4 inline-block text-xl font-semibold text-dark hover:text-primary dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
                  How to earn more money as a wellness coach
                </a>
              </h3>
              <p class="text-base text-body-color dark:text-dark-6">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              </p>
            </div>
          </div>
        </div>
        <div class="w-full px-4 md:w-1/2 lg:w-1/3">
          <div class="mx-auto mb-10 max-w-[370px]">
            <div class="mb-8 overflow-hidden rounded">
              <img src="https://cdn.tailgrids.com/2.0/image/marketing/images/blogs/blog-01/image-03.jpg" alt="image" class="w-full"/>
            </div>
            <div>
              <span class="mb-5 inline-block rounded bg-primary px-4 py-1 text-center text-xs font-semibold leading-loose text-white">
                Jan 05, 2023
              </span>
              <h3>
                <a href="#" class="mb-4 inline-block text-xl font-semibold text-dark hover:text-primary dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
                  The no-fuss guide to upselling and cross selling
                </a>
              </h3>
              <p class="text-base text-body-color dark:text-dark-6">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>`,

  // Testimonial Sections
  testimonialSlider: `<section class="bg-gray-1 py-20 dark:bg-dark-2 lg:py-[120px]">
    <div class="container">
      <div class="-mx-4 flex flex-wrap">
        <div class="w-full px-4">
          <div class="mx-auto mb-[60px] max-w-[510px] text-center lg:mb-20">
            <span class="mb-2 block text-lg font-semibold text-primary">
              Testimonials
            </span>
            <h2 class="mb-4 text-3xl font-bold text-dark dark:text-white sm:text-4xl md:text-[40px]">
              What our Clients Say
            </h2>
            <p class="text-base text-body-color dark:text-dark-6">
              There are many variations of passages of Lorem Ipsum available but the majority have suffered alteration in some form.
            </p>
          </div>
        </div>
      </div>
      <div class="-mx-4 flex flex-wrap">
        <div class="w-full px-4 lg:w-1/2">
          <div class="mb-10">
            <div class="w-full">
              <div class="rounded-xl bg-white px-8 py-[30px] shadow-testimonial dark:bg-dark sm:px-10 sm:py-12">
                <div class="mb-[18px] flex items-center gap-[2px]">
                  <img src="https://cdn.tailgrids.com/2.0/image/assets/images/star.svg" alt="star"/>
                  <img src="https://cdn.tailgrids.com/2.0/image/assets/images/star.svg" alt="star"/>
                  <img src="https://cdn.tailgrids.com/2.0/image/assets/images/star.svg" alt="star"/>
                  <img src="https://cdn.tailgrids.com/2.0/image/assets/images/star.svg" alt="star"/>
                  <img src="https://cdn.tailgrids.com/2.0/image/assets/images/star.svg" alt="star"/>
                </div>
                <p class="mb-6 text-base text-body-color dark:text-dark-6">
                  "Our members are so impressed. It's intuitive. It's clean. It's distraction free. If you're building a community.
                </p>
                <a href="#" class="flex items-center gap-4">
                  <div class="h-[50px] w-[50px] overflow-hidden rounded-full">
                    <img src="https://cdn.tailgrids.com/2.0/image/marketing/images/testimonials/testimonial-01/image-01.jpg" alt="image" class="h-[50px] w-[50px] object-cover"/>
                  </div>
                  <div class="w-full">
                    <h5 class="text-base font-semibold text-dark dark:text-white">
                      Sabo Masties
                    </h5>
                    <p class="text-sm text-body-color dark:text-dark-6">Founder @ Rolex</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div class="w-full px-4 lg:w-1/2">
          <div class="mb-10">
            <div class="w-full">
              <div class="rounded-xl bg-white px-8 py-[30px] shadow-testimonial dark:bg-dark sm:px-10 sm:py-12">
                <div class="mb-[18px] flex items-center gap-[2px]">
                  <img src="https://cdn.tailgrids.com/2.0/image/assets/images/star.svg" alt="star"/>
                  <img src="https://cdn.tailgrids.com/2.0/image/assets/images/star.svg" alt="star"/>
                  <img src="https://cdn.tailgrids.com/2.0/image/assets/images/star.svg" alt="star"/>
                  <img src="https://cdn.tailgrids.com/2.0/image/assets/images/star.svg" alt="star"/>
                  <img src="https://cdn.tailgrids.com/2.0/image/assets/images/star.svg" alt="star"/>
                </div>
                <p class="mb-6 text-base text-body-color dark:text-dark-6">
                  "Our members are so impressed. It's intuitive. It's clean. It's distraction free. If you're building a community.
                </p>
                <a href="#" class="flex items-center gap-4">
                  <div class="h-[50px] w-[50px] overflow-hidden rounded-full">
                    <img src="https://cdn.tailgrids.com/2.0/image/marketing/images/testimonials/testimonial-01/image-02.jpg" alt="image" class="h-[50px] w-[50px] object-cover"/>
                  </div>
                  <div class="w-full">
                    <h5 class="text-base font-semibold text-dark dark:text-white">
                      Margin Gesmu
                    </h5>
                    <p class="text-sm text-body-color dark:text-dark-6">Founder @ UI Hunter</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>`,

  // FAQ Sections
  faqAccordion: `<section class="relative z-20 overflow-hidden bg-white pb-12 pt-20 dark:bg-dark lg:pb-[90px] lg:pt-[120px]">
    <div class="container">
      <div class="-mx-4 flex flex-wrap">
        <div class="w-full px-4">
          <div class="mx-auto mb-[60px] max-w-[520px] text-center lg:mb-20">
            <span class="mb-2 block text-lg font-semibold text-primary">
              FAQ
            </span>
            <h2 class="mb-4 text-3xl font-bold text-dark dark:text-white sm:text-[40px]/[48px]">
              Any Questions? Look Here
            </h2>
            <p class="text-base text-body-color dark:text-dark-6">
              There are many variations of passages of Lorem Ipsum available but the majority have suffered alteration in some form.
            </p>
          </div>
        </div>
      </div>
      <div class="-mx-4 flex flex-wrap">
        <div class="w-full px-4 lg:w-1/2">
          <div class="mb-8 w-full rounded-lg bg-white p-4 shadow-[0px_20px_95px_0px_rgba(201,203,204,0.30)] dark:bg-dark-2 dark:shadow-[0px_20px_95px_0px_rgba(0,0,0,0.30)] sm:p-8 lg:px-6 xl:px-8">
            <button class="faq-btn flex w-full text-left">
              <div class="mr-5 flex h-10 w-full max-w-[40px] items-center justify-center rounded-lg bg-primary/5 text-primary dark:bg-white/5">
                <svg class="fill-primary stroke-primary duration-200 ease-in-out" width="17" height="10" viewBox="0 0 17 10" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7.28687 8.43257L7.28679 8.43265L7.29496 8.43985C7.62576 8.73124 8.02464 8.86001 8.41472 8.86001C8.83092 8.86001 9.22376 8.69083 9.53447 8.41713L9.53454 8.41721L9.54184 8.41052L15.7631 2.70784L15.7691 2.70231L15.7749 2.69659C16.0981 2.38028 16.1985 1.80579 15.7981 1.41393C15.4803 1.1028 14.9167 1.00854 14.5249 1.38489L8.41472 7.00806L2.29995 1.38063L2.29151 1.37286L2.28271 1.36548C1.93092 1.07036 1.38469 1.06804 1.03129 1.41393L1.01755 1.42738L1.00488 1.44184C0.69687 1.79355 0.695778 2.34549 1.0545 2.69659L1.05999 2.70196L1.06565 2.70717L7.28687 8.43257Z"/>
                </svg>
              </div>
              <div class="w-full">
                <h4 class="mt-1 text-lg font-semibold text-dark dark:text-white">
                  How long we deliver your first blog post?
                </h4>
              </div>
            </button>
            <div class="faq-content pl-[62px]">
              <p class="py-3 text-base leading-relaxed text-body-color dark:text-dark-6">
                It takes 2-3 weeks to get your first blog post ready. That includes the in-depth research & creation of your monthly content marketing strategy that we do before writing your first blog post, Ipsum available .
              </p>
            </div>
          </div>
        </div>
        <div class="w-full px-4 lg:w-1/2">
          <div class="mb-8 w-full rounded-lg bg-white p-4 shadow-[0px_20px_95px_0px_rgba(201,203,204,0.30)] dark:bg-dark-2 dark:shadow-[0px_20px_95px_0px_rgba(0,0,0,0.30)] sm:p-8 lg:px-6 xl:px-8">
            <button class="faq-btn flex w-full text-left">
              <div class="mr-5 flex h-10 w-full max-w-[40px] items-center justify-center rounded-lg bg-primary/5 text-primary dark:bg-white/5">
                <svg class="fill-primary stroke-primary duration-200 ease-in-out" width="17" height="10" viewBox="0 0 17 10" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7.28687 8.43257L7.28679 8.43265L7.29496 8.43985C7.62576 8.73124 8.02464 8.86001 8.41472 8.86001C8.83092 8.86001 9.22376 8.69083 9.53447 8.41713L9.53454 8.41721L9.54184 8.41052L15.7631 2.70784L15.7691 2.70231L15.7749 2.69659C16.0981 2.38028 16.1985 1.80579 15.7981 1.41393C15.4803 1.1028 14.9167 1.00854 14.5249 1.38489L8.41472 7.00806L2.29995 1.38063L2.29151 1.37286L2.28271 1.36548C1.93092 1.07036 1.38469 1.06804 1.03129 1.41393L1.01755 1.42738L1.00488 1.44184C0.69687 1.79355 0.695778 2.34549 1.0545 2.69659L1.05999 2.70196L1.06565 2.70717L7.28687 8.43257Z"/>
                </svg>
              </div>
              <div class="w-full">
                <h4 class="mt-1 text-lg font-semibold text-dark dark:text-white">
                  How long we deliver your first blog post?
                </h4>
              </div>
            </button>
            <div class="faq-content pl-[62px]">
              <p class="py-3 text-base leading-relaxed text-body-color dark:text-dark-6">
                It takes 2-3 weeks to get your first blog post ready. That includes the in-depth research & creation of your monthly content marketing strategy that we do before writing your first blog post, Ipsum available .
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>`,
}

// Enhanced component categories with TailGrids components
export const componentCategories = [
  {
    name: "Basic Components",
    icon: Type,
    color: "blue",
    components: [
      { type: "heading", name: "Heading", icon: Type, description: "Add headings (H1-H6)", tags: ["text", "title"] },
      {
        type: "paragraph",
        name: "Paragraph",
        icon: Type,
        description: "Add text paragraphs",
        tags: ["text", "content"],
      },
      {
        type: "image",
        name: "Image",
        icon: ImageIcon,
        description: "Add images with captions",
        tags: ["media", "visual"],
      },
      {
        type: "button",
        name: "Button",
        icon: MousePointer,
        description: "Add interactive buttons",
        tags: ["interactive", "cta"],
      },
      {
        type: "divider",
        name: "Divider",
        icon: Minus,
        description: "Add horizontal dividers",
        tags: ["layout", "separator"],
      },
      { type: "spacer", name: "Spacer", icon: Space, description: "Add vertical spacing", tags: ["layout", "spacing"] },
    ],
  },
  {
    name: "Layout & Structure",
    icon: Layout,
    color: "purple",
    components: [
      {
        type: "grid",
        name: "Grid Layout",
        icon: Grid3X3,
        description: "Create responsive grid layouts",
        tags: ["layout", "responsive"],
      },
      {
        type: "columns",
        name: "Columns",
        icon: Columns,
        description: "Add multi-column layouts",
        tags: ["layout", "columns"],
      },
      {
        type: "card",
        name: "Card",
        icon: CreditCard,
        description: "Add content cards",
        tags: ["container", "content"],
      },
      {
        type: "banner",
        name: "Banner",
        icon: Layers,
        description: "Add promotional banners",
        tags: ["marketing", "promotion"],
      },
      {
        type: "hero",
        name: "Hero Section",
        icon: Target,
        description: "Add hero sections",
        tags: ["marketing", "landing"],
      },
    ],
  },
  {
    name: "Data & Charts",
    icon: BarChart3,
    color: "green",
    components: [
      { type: "table", name: "Table", icon: Table, description: "Add data tables", tags: ["data", "tabular"] },
      {
        type: "chart",
        name: "Chart",
        icon: BarChart3,
        description: "Add interactive charts",
        tags: ["data", "visualization"],
      },
    ],
  },
  {
    name: "Content Components",
    icon: FileCode,
    color: "orange",
    components: [
      {
        type: "code",
        name: "Code Block",
        icon: Code,
        description: "Add syntax-highlighted code",
        tags: ["code", "technical"],
      },
      { type: "blockquote", name: "Quote", icon: Quote, description: "Add blockquotes", tags: ["text", "emphasis"] },
      { type: "list", name: "Bullet List", icon: List, description: "Add unordered lists", tags: ["text", "list"] },
      {
        type: "orderedList",
        name: "Numbered List",
        icon: ListOrdered,
        description: "Add ordered lists",
        tags: ["text", "list"],
      },
      {
        type: "taskList",
        name: "Task List",
        icon: CheckSquare,
        description: "Add task/todo lists",
        tags: ["interactive", "tasks"],
      },
      {
        type: "alert",
        name: "Alert",
        icon: AlertTriangle,
        description: "Add alert messages",
        tags: ["notification", "message"],
      },
    ],
  },
  {
    name: "Advanced Components",
    icon: Sparkles,
    color: "indigo",
    components: [
      {
        type: "mermaid",
        name: "Mermaid Diagram",
        icon: GitBranch,
        description: "Add flowcharts and diagrams",
        tags: ["diagram", "flowchart"],
      },
      {
        type: "gallery",
        name: "Image Gallery",
        icon: ImageIcon,
        description: "Add image galleries",
        tags: ["media", "gallery"],
      },
      {
        type: "testimonial",
        name: "Testimonial",
        icon: Star,
        description: "Add customer testimonials",
        tags: ["social", "review"],
      },
      {
        type: "pricing",
        name: "Pricing Table",
        icon: Award,
        description: "Add pricing tables",
        tags: ["pricing", "comparison"],
      },
      {
        type: "htmlBlock",
        name: "HTML Block",
        icon: FileCode,
        description: "Add custom HTML content",
        tags: ["custom", "html"],
      },
    ],
  },
  {
    name: "TailGrids - Hero Sections",
    icon: Target,
    color: "blue",
    components: [
      {
        type: "htmlBlock",
        name: "Hero Gradient",
        icon: Zap,
        description: "Modern gradient hero section with CTA buttons",
        htmlBlockKey: "heroGradient",
        tags: ["hero", "gradient", "cta"],
      },
      {
        type: "htmlBlock",
        name: "Hero Minimal",
        icon: Layout,
        description: "Clean minimal hero with image",
        htmlBlockKey: "heroMinimal",
        tags: ["hero", "minimal", "image"],
      },
    ],
  },
  {
    name: "TailGrids - Features",
    icon: Star,
    color: "green",
    components: [
      {
        type: "htmlBlock",
        name: "Features Grid",
        icon: Grid3X3,
        description: "Professional features grid with icons",
        htmlBlockKey: "featuresGrid",
        tags: ["features", "grid", "icons"],
      },
    ],
  },
  {
    name: "TailGrids - Pricing",
    icon: DollarSign,
    color: "purple",
    components: [
      {
        type: "htmlBlock",
        name: "Pricing Cards",
        icon: CreditCard,
        description: "Professional pricing table with popular badge",
        htmlBlockKey: "pricingCards",
        tags: ["pricing", "cards", "popular"],
      },
    ],
  },
  {
    name: "TailGrids - Contact",
    icon: Mail,
    color: "orange",
    components: [
      {
        type: "htmlBlock",
        name: "Contact Form",
        icon: Phone,
        description: "Complete contact section with form and info",
        htmlBlockKey: "contactForm",
        tags: ["contact", "form", "info"],
      },
    ],
  },
  {
    name: "TailGrids - Team",
    icon: Users,
    color: "teal",
    components: [
      {
        type: "htmlBlock",
        name: "Team Grid",
        icon: Users,
        description: "Professional team member grid",
        htmlBlockKey: "teamGrid",
        tags: ["team", "grid", "members"],
      },
    ],
  },
  {
    name: "TailGrids - CTA",
    icon: Zap,
    color: "red",
    components: [
      {
        type: "htmlBlock",
        name: "CTA Gradient",
        icon: Target,
        description: "Eye-catching gradient call-to-action",
        htmlBlockKey: "ctaGradient",
        tags: ["cta", "gradient", "action"],
      },
    ],
  },
  {
    name: "TailGrids - Blog",
    icon: FileCode,
    color: "indigo",
    components: [
      {
        type: "htmlBlock",
        name: "Blog Grid",
        icon: File,
        description: "Modern blog posts grid layout",
        htmlBlockKey: "blogGrid",
        tags: ["blog", "grid", "posts"],
      },
    ],
  },
  {
    name: "TailGrids - Testimonials",
    icon: MessageCircle,
    color: "pink",
    components: [
      {
        type: "htmlBlock",
        name: "Testimonial Slider",
        icon: Star,
        description: "Customer testimonials with ratings",
        htmlBlockKey: "testimonialSlider",
        tags: ["testimonial", "slider", "ratings"],
      },
    ],
  },
  {
    name: "TailGrids - FAQ",
    icon: MessageCircle,
    color: "yellow",
    components: [
      {
        type: "htmlBlock",
        name: "FAQ Accordion",
        icon: List,
        description: "Expandable FAQ accordion section",
        htmlBlockKey: "faqAccordion",
        tags: ["faq", "accordion", "questions"],
      },
    ],
  },
]

// Get default content for each component type
export function getDefaultContent(type: MarkdownComponent["type"], htmlBlockKey?: string): any {
  switch (type) {
    case "heading":
      return { text: "New Heading", level: 2 }
    case "paragraph":
      return { text: "This is a new paragraph. Click to edit this text and add your content." }
    case "image":
      return {
        src: "/placeholder.svg?height=300&width=500",
        alt: "Sample image",
        caption: "",
        width: "100%",
        height: "auto",
        objectFit: "cover",
        borderRadius: "8px",
      }
    case "button":
      return {
        text: "Click me",
        variant: "default",
        size: "default",
        link: "",
        icon: "",
      }
    case "card":
      return {
        title: "Card Title",
        description:
          "This is a card description that provides more details about the content. You can customize this text to match your needs.",
        imageUrl: "",
        imagePosition: "top",
        layout: "default",
        buttons: [{ text: "Learn More", variant: "default", link: "#" }],
      }
    case "grid":
      return {
        columns: 3,
        gap: "1.5rem",
        items: [
          { id: "1", type: "card", content: { title: "Item 1", description: "Description 1" } },
          { id: "2", type: "card", content: { title: "Item 2", description: "Description 2" } },
          { id: "3", type: "card", content: { title: "Item 3", description: "Description 3" } },
        ],
      }
    case "banner":
      return {
        title: "Special Offer",
        subtitle: "Limited time only",
        description: "Get 50% off on all premium features",
        backgroundImage: "",
        backgroundColor: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        textColor: "white",
        buttons: [{ text: "Get Started", variant: "default", link: "#" }],
      }
    case "hero":
      return {
        title: "Welcome to Our Platform",
        subtitle: "Build Amazing Things",
        description: "Create stunning websites and applications with our powerful tools and intuitive interface.",
        backgroundImage: "",
        backgroundColor: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        textAlign: "center",
        buttons: [
          { text: "Get Started", variant: "default", link: "#" },
          { text: "Learn More", variant: "outline", link: "#" },
        ],
      }
    case "table":
      return {
        headers: ["Name", "Email", "Role", "Status"],
        rows: [
          ["John Doe", "john@example.com", "Admin", "Active"],
          ["Jane Smith", "jane@example.com", "User", "Active"],
          ["Bob Johnson", "bob@example.com", "User", "Inactive"],
        ],
      }
    case "divider":
      return { style: "solid", color: "#e5e7eb", thickness: "1px", margin: "2rem 0" }
    case "list":
      return { items: ["First item", "Second item", "Third item"] }
    case "orderedList":
      return { items: ["First item", "Second item", "Third item"], start: 1 }
    case "taskList":
      return {
        items: [
          { text: "Complete this task", checked: false },
          { text: "This task is done", checked: true },
          { text: "Another pending task", checked: false },
        ],
      }
    case "blockquote":
      return { text: "This is a quote that provides insight or emphasis to your content.", author: "" }
    case "alert":
      return { type: "info", title: "Information", text: "This is an informational alert message." }
    case "code":
      return {
        code: "// Your code here\nconsole.log('Hello, World!');",
        language: "javascript",
        showLineNumbers: true,
        theme: "dark",
      }
    case "spacer":
      return { height: "40px" }
    case "columns":
      return {
        column1Text: "This is the content for the first column. You can add any text or information here.",
        column2Text: "This is the content for the second column. You can add different content here.",
        columnRatio: "1:1",
        gap: "2rem",
      }
    case "mermaid":
      return {
        code: "graph TD;\n    A[Start] --> B[Process];\n    B --> C[Decision];\n    C -->|Yes| D[End];\n    C -->|No| B;",
        theme: "default",
      }
    case "chart":
      return {
        type: "bar",
        data: {
          labels: ["Jan", "Feb", "Mar", "Apr", "May"],
          datasets: [
            {
              label: "Sales",
              data: [12, 19, 3, 5, 2],
              backgroundColor: "#3b82f6",
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: "Monthly Sales",
            },
          },
        },
      }
    case "gallery":
      return {
        images: [
          { src: "/placeholder.svg?height=300&width=400", alt: "Gallery image 1", caption: "" },
          { src: "/placeholder.svg?height=300&width=400", alt: "Gallery image 2", caption: "" },
          { src: "/placeholder.svg?height=300&width=400", alt: "Gallery image 3", caption: "" },
        ],
      }
    case "testimonial":
      return {
        quote: "This product has completely transformed our workflow. Highly recommended!",
        author: "John Smith",
        title: "CEO, Tech Company",
        avatarUrl: "/placeholder.svg?height=60&width=60",
      }
    case "pricing":
      return {
        plans: [
          {
            name: "Basic",
            price: "$9",
            period: "/ month",
            features: ["Feature 1", "Feature 2", "Feature 3"],
            buttonText: "Get Started",
            popular: false,
          },
          {
            name: "Pro",
            price: "$29",
            period: "/ month",
            features: ["All Basic features", "Feature 4", "Feature 5", "Priority support"],
            buttonText: "Get Started",
            popular: true,
          },
          {
            name: "Enterprise",
            price: "$99",
            period: "/ month",
            features: ["All Pro features", "Custom integrations", "Dedicated support"],
            buttonText: "Contact Sales",
            popular: false,
          },
        ],
      }
    case "htmlBlock":
      if (htmlBlockKey && tailGridsComponents[htmlBlockKey as keyof typeof tailGridsComponents]) {
        return {
          htmlContent: tailGridsComponents[htmlBlockKey as keyof typeof tailGridsComponents],
          name: htmlBlockKey.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase()),
          category: "tailgrids",
          editable: true,
          responsive: true,
        } as HtmlBlockContent
      }
      return {
        htmlContent:
          "<div class='p-8 border-2 border-dashed border-gray-300 rounded-xl text-center bg-gray-50'><h3 class='text-lg font-semibold text-gray-700 mb-2'>Custom HTML Block</h3><p class='text-gray-500'>Add your custom HTML content here</p></div>",
        name: "Custom HTML Block",
        category: "custom",
        editable: true,
        responsive: true,
      } as HtmlBlockContent
    default:
      return {}
  }
}

// Draggable component item with enhanced styling
interface DraggableComponentProps {
  component: {
    type: MarkdownComponent["type"]
    name: string
    icon: React.ComponentType<{ className?: string }>
    description: string
    htmlBlockKey?: string
    tags?: string[]
  }
}

function DraggableComponent({ component }: DraggableComponentProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: `palette-${component.name.toLowerCase().replace(/\s+/g, "-")}`,
    data: {
      type: component.type,
      htmlBlockKey: component.htmlBlockKey,
    },
  })

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined

  const IconComponent = component.icon

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={cn(
        "group flex items-start space-x-3 rounded-xl border border-border bg-card p-4 shadow-sm transition-all duration-200 hover:border-border/80 hover:shadow-lg cursor-grab active:cursor-grabbing",
        isDragging && "opacity-50 shadow-2xl scale-105 rotate-2",
      )}
    >
      <div className="flex-shrink-0 p-2 rounded-lg bg-muted group-hover:bg-primary/10 transition-all duration-200">
        <IconComponent className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors duration-200" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors duration-200">
          {component.name}
        </p>
        <p className="text-xs text-muted-foreground mt-1 line-clamp-2 group-hover:text-foreground/80 transition-colors duration-200">
          {component.description}
        </p>
        {component.tags && component.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {component.tags.slice(0, 2).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs px-2 py-0.5">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// Main component palette with enhanced features
export function ComponentPalette() {
  const [expandedCategories, setExpandedCategories] = useState<string[]>(["Basic Components"])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  const toggleCategory = (categoryName: string) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryName) ? prev.filter((name) => name !== categoryName) : [...prev, categoryName],
    )
  }

  // Get all unique tags
  const allTags = Array.from(
    new Set(
      componentCategories.flatMap((category) => category.components.flatMap((component) => component.tags || [])),
    ),
  ).sort()

  // Filter components based on search and tags
  const filteredCategories = componentCategories
    .map((category) => ({
      ...category,
      components: category.components.filter((component) => {
        const matchesSearch =
          searchQuery === "" ||
          component.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          component.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (component.tags || []).some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

        const matchesTags =
          selectedTags.length === 0 || selectedTags.some((tag) => (component.tags || []).includes(tag))

        return matchesSearch && matchesTags
      }),
    }))
    .filter((category) => category.components.length > 0)

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
  }

  return (
    <div className="h-full flex flex-col bg-card">
      <div className="p-4 border-b border-border bg-card">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-primary">
            <Palette className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-foreground">Components</h2>
            <p className="text-sm text-muted-foreground">Drag to canvas to add</p>
          </div>
        </div>

        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search components..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-10"
          />
        </div>

        {/* Tag filters */}
        <div className="flex flex-wrap gap-1">
          {allTags.slice(0, 6).map((tag) => (
            <Badge
              key={tag}
              variant={selectedTags.includes(tag) ? "default" : "secondary"}
              className={cn(
                "text-xs cursor-pointer transition-all duration-200 hover:scale-105",
                selectedTags.includes(tag) ? "bg-primary text-primary-foreground" : "hover:bg-secondary",
              )}
              onClick={() => toggleTag(tag)}
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      <Tabs defaultValue="components" className="flex-1 flex flex-col">
        <TabsList className="mx-4 mt-4 grid w-auto grid-cols-2">
          <TabsTrigger value="components" className="text-sm">
            Components
          </TabsTrigger>
          <TabsTrigger value="templates" className="text-sm">
            Templates
          </TabsTrigger>
        </TabsList>

        <TabsContent value="components" className="flex-1">
          <ScrollArea className="flex-1">
            <div className="p-4 space-y-4">
              {filteredCategories.map((category) => {
                const isExpanded = expandedCategories.includes(category.name)
                const IconComponent = category.icon

                return (
                  <Collapsible key={category.name} open={isExpanded} onOpenChange={() => toggleCategory(category.name)}>
                    <CollapsibleTrigger className="flex w-full items-center justify-between rounded-xl p-4 text-left hover:bg-muted/70 transition-all duration-200 bg-card border border-border shadow-sm">
                      <div className="flex items-center space-x-3">
                        <div
                          className={cn(
                            "p-2 rounded-lg transition-all duration-200",
                            category.color === "blue" &&
                              "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
                            category.color === "purple" &&
                              "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400",
                            category.color === "green" &&
                              "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400",
                            category.color === "orange" &&
                              "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400",
                            category.color === "indigo" &&
                              "bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400",
                            category.color === "teal" &&
                              "bg-teal-100 text-teal-600 dark:bg-teal-900/30 dark:text-teal-400",
                            category.color === "pink" &&
                              "bg-pink-100 text-pink-600 dark:bg-pink-900/30 dark:text-pink-400",
                            category.color === "red" && "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400",
                            category.color === "yellow" &&
                              "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400",
                          )}
                        >
                          <IconComponent className="h-4 w-4" />
                        </div>
                        <div>
                          <span className="text-sm font-semibold text-foreground">{category.name}</span>
                          <Badge variant="secondary" className="ml-2 text-xs">
                            {category.components.length}
                          </Badge>
                        </div>
                      </div>
                      {isExpanded ? (
                        <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform duration-200" />
                      ) : (
                        <ChevronRight className="h-4 w-4 text-muted-foreground transition-transform duration-200" />
                      )}
                    </CollapsibleTrigger>

                    <CollapsibleContent className="mt-3 space-y-3 animate-in slide-in-from-top-2 duration-200">
                      {category.components.map((component) => (
                        <DraggableComponent key={`${category.name}-${component.name}`} component={component} />
                      ))}
                    </CollapsibleContent>
                  </Collapsible>
                )
              })}

              {filteredCategories.length === 0 && (
                <div className="text-center py-12">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                    <Search className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">No components found</h3>
                  <p className="text-muted-foreground max-w-sm mx-auto">
                    Try adjusting your search terms or removing some tag filters to see more components.
                  </p>
                </div>
              )}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="templates" className="flex-1">
          <ScrollArea className="flex-1">
            <div className="p-4">
              <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                  <Layout className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Templates Coming Soon</h3>
                <p className="text-muted-foreground max-w-sm mx-auto">
                  Pre-built page templates and component combinations will be available here soon.
                </p>
              </div>
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Named export for compatibility
export { ComponentPalette as default }
