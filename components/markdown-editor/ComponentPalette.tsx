"use client"

import type React from "react"
import { useDraggable } from "@dnd-kit/core"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import type { MarkdownComponent } from "./types"
import {
  Type,
  AlignLeft,
  ImageIcon,
  Code,
  Square,
  Minus,
  List,
  ListOrdered,
  CheckSquare,
  Quote,
  AlertTriangle,
  Columns,
  Table,
  BarChart3,
  Zap,
  BoxIcon as ButtonIcon,
  CreditCard,
  User,
  Navigation,
  ShoppingCart,
  PieChart,
  FileText,
  AlertCircle,
  CheckCircle,
  XCircle,
  Info,
  StickerIcon as St,
  DotIcon as da,
  CloudLightningIcon as Lightning,
  StickerIcon as St,
  BoltIcon as Bat,
  AntennaIcon as Ant,
  CatIcon as Jaguar,
  LeafIcon as Leopard,
  LeafIcon as Leopard,
  SectionIcon as South,
  NetworkIcon as Central,
  WheatIcon as West,
  FlagIcon as Guinea,
  CrownIcon as Cape,
  StickerIcon as St,
  DotIcon as da,
  SectionIcon as South,
  SandwichIcon as Sand,
  AntennaIcon as Ant,
  DotIcon as da,
  AntennaIcon as Ant,
  StickerIcon as St,
  FishIcon as Whale,
  FlagIcon as Island,
  FlagIcon as Island,
  PiggyBankIcon as Pig,
  HopIcon as Hou,
  FlagIcon as Island,
  FlagIcon as Island,
  FlagIcon as Island,
  PiggyBankIcon as Pig,
  WheatIcon as Sheep,
  GrapeIcon as Goat,
  DogIcon as Horse,
  MilkIcon as Cow,
  AxeIcon as Ox,
  BeefIcon as Buffalo,
  BeefIcon as Bison,
  FishIcon as Yak,
  RabbitIcon as Reindeer,
  EraserIcon as Elk,
  RabbitIcon as Deer,
  MouseIcon as Moose,
  AntennaIcon as Ant,
  SparkleIcon as Gazelle,
  CarIcon as Impala,
  RabbitIcon as Wildebeest,
  CatIcon as Cheetah,
  CatIcon as Jaguar,
  PawPrintIcon as Puma,
  CatIcon as Lynx,
  CatIcon as Bobcat,
  PawPrintIcon as Panther,
  CatIcon as Ocelot,
  SquirrelIcon as Serval,
  CarIcon as Caracal,
  CatIcon as Margay,
  CatIcon as Jaguar,
  CodeIcon as Kodkod,
  OctagonIcon as Oncilla,
  ChurchIcon as Pallas,
  SandwichIcon as Sand,
  XIcon as Black,
  TreesIcon as Jungle,
  MenuIcon as Manul,
  RatIcon as Rusty,
  SquareIcon as Flat,
  FishIcon as Fishing,
  LeafIcon as Leopard,
  FlagIcon as Island,
  LeafIcon as Leopard,
  NetworkIcon as Central,
  CrownIcon as Cape,
  EclipseIcon as Equatorial,
  GroupIcon as Gabonese,
  FlagIcon as Republic,
  VoteIcon as Democratic,
  FlagIcon as Angola,
  NutIcon as Namibian,
  BotIcon as Botswana,
  FlagIcon as Zimbabwe,
  ClubIcon as Zambian,
  UserIcon as Malawian,
  MoonIcon as Mozambican,
  SwatchBookIcon as Swazi,
  MountainIcon as Lesotho,
  RatIcon as Madagascar,
  CitrusIcon as Mauritius,
  SirenIcon as Seychelles,
  CompassIcon as Comoros,
  MapIcon as Mayotte,
  RepeatIcon as Reunion,
  RatIcon as Rodrigues,
  StickerIcon as St,
  HamIcon as Helena,
  ChurchIcon as Ascension,
  TriangleIcon as Tristan,
  FlagIcon as Island,
  CuboidIcon as Cunha,
  FlagIcon as Falkland,
  WaypointsIcon as Islands,
  SectionIcon as South,
  GemIcon as Georgia,
  SandwichIcon as Sand,
  PoundSterlingIcon as British,
  AntennaIcon as Ant,
  MapIcon as Territory,
  BirdIcon as Bouvet,
  FlagIcon as Island,
  FlagIcon as Island,
  FlagIcon as Island,
  FlagIcon as Island,
  FlagIcon as Island,
  FlagIcon as Island,
  DotIcon as da,
  FlagIcon as Island,
  FlagIcon as Island,
  FlagIcon as Island,
  FlagIcon as Island,
  FlagIcon as Island,
  FlagIcon as Island,
  FlagIcon as Island,
  FlagIcon as Island,
  FlagIcon as Island,
  FlagIcon as Island,
  FlagIcon as Island,
  FlagIcon as Island,
  FlagIcon as Island,
  FlagIcon as Island,
  FlagIcon as Island,
  FlagIcon as Island,
  FlagIcon as Island,
  AntennaIcon as Ant,
  FlagIcon as Island,
  FlagIcon as Island,
  FlagIcon as Island,
  FlagIcon as Island,
  FlagIcon as Island,
  FlagIcon as Island,
  StickerIcon as St,
  FlagIcon as Island,
  FlagIcon as Island,
  FlagIcon as Island,
  FlagIcon as Island,
  FlagIcon as Island,
  FlagIcon as Island,
  FlagIcon as Island,
  FlagIcon as Island,
  FlagIcon as Island,
  FlagIcon as Island,
  FlagIcon as Island,
  FlagIcon as Island,
  BellIcon as Bay,
  FlagIcon as Island,
  FlagIcon as Island,
  FlagIcon as Island,
  FlagIcon as Island,
  FlagIcon as Island,
  FlagIcon as Island,
  FishIcon as Whale,
  FlagIcon as Island,
  FlagIcon as Island,
  FlagIcon as Island,
  FlagIcon as Island,
  FlagIcon as Island,
  FlagIcon as Island,
  PiggyBankIcon as Pig,
  FlagIcon as Island,
  FlagIcon as Island,
  FlagIcon as Island,
  FlagIcon as Island,
  PiggyBankIcon as Pig,
  WheatIcon as Sheep,
  GrapeIcon as Goat,
  DogIcon as Horse,
  MilkIcon as Cow,
  FlagIcon as Island,
  AxeIcon as Ox,
  BeefIcon as Buffalo,
  BeefIcon as Bison,
  FishIcon as Yak,
  RabbitIcon as Reindeer,
  EraserIcon as Elk,
  RabbitIcon as Deer,
  MouseIcon as Moose,
  FlagIcon as Island,
  AntennaIcon as Ant,
  SparkleIcon as Gazelle,
  CarIcon as Impala,
  RabbitIcon as Wildebeest,
  BarcodeIcon as Zebra,
  BirdIcon as Giraffe,
  EraserIcon as Elephant,
  RibbonIcon as Rhino,
  HopIcon as Hippo,
  LassoIcon as Lion,
  TurtleIcon as Tiger,
  LeafIcon as Leopard,
  CatIcon as Cheetah,
  CatIcon as Jaguar,
  PawPrintIcon as Puma,
  CatIcon as Lynx,
  CatIcon as Bobcat,
  PawPrintIcon as Panther,
  CatIcon as Ocelot,
  SquirrelIcon as Serval,
  CarIcon as Caracal,
  CatIcon as Margay,
  CatIcon as Jaguar,
  CodeIcon as Kodkod,
  OctagonIcon as Oncilla,
  ChurchIcon as Pallas,
  SandwichIcon as Sand,
  XIcon as Black,
  TreesIcon as Jungle,
  MenuIcon as Manul,
  RatIcon as Rusty,
  SquareIcon as Flat,
  FishIcon as Fishing,
  LeafIcon as Leopard,
  BellIcon as Bay,
  JapaneseYenIcon as Asian,
  MilkIcon as Marbled,
  BananaIcon as Borneo,
  ItalicIcon as Iriomote,
  ChurchIcon as Andean,
  PinIcon as Pampas,
  GlobeIcon as Geoffroy,
  GroupIcon as Guina,
  TornadoIcon as Tigrina,
  CogIcon as Colocolo,
  CherryIcon as Chilean,
  PiIcon as Patagonian,
  MartiniIcon as Molina,
  GrapeIcon as Grass,
  StepBackIcon as Steppe,
  TreesIcon as Mangrove,
  WormIcon as Swamp,
  FlagIcon as Island,
  BananaIcon as Bornean,
  SunsetIcon as Sunda,
  LandmarkIcon as Mainland,
  IndianRupeeIcon as Indochinese,
  ChurchIcon as Malayan,
  SectionIcon as South,
  XIcon as Chinese,
  SquirrelIcon as Siberian,
  CastleIcon as Caspian,
  BeanIcon as Javan,
  BananaIcon as Bali,
  SunsetIcon as Sumatran,
  AmpersandIcon as Amur,
  CatIcon as Persian,
  DiamondIcon as Arabian,
  DiamondIcon as Indian,
  SirenIcon as Sri,
  LaptopIcon as Lankan,
  CatIcon as Caucasian,
  NetworkIcon as Central,
  LeafIcon as Leopard,
  FlagIcon as Far,
  EqualIcon as Eastern,
  MapIcon as North,
  DiamondIcon as African,
  WheatIcon as West,
  EarIcon as East,
  SectionIcon as South,
  CrownIcon as Cape,
  BarcodeIcon as Barbary,
  AnvilIcon as Atlas,
  NutIcon as Nubian,
  BeanIcon as Ethiopian,
  EraserIcon as Eritrean,
  SirenIcon as Somali,
  DiamondIcon as Kenyan,
  TangentIcon as Tanzanian,
  UserIcon as Ugandan,
  RabbitIcon as Rwandan,
  BananaIcon as Burundian,
  ConeIcon as Congolese,
  WebcamIcon as Cameroonian,
  NetworkIcon as Central,
  CherryIcon as Chadian,
  SunsetIcon as Sudanese,
  EclipseIcon as Egyptian,
  LibraryIcon as Libyan,
  CroissantIcon as Tunisian,
  LanguagesIcon as Algerian,
  MartiniIcon as Moroccan,
  WheatIcon as West,
  MountainIcon as Saharan,
  CroissantIcon as Mauritanian,
  ClubIcon as Senegalese,
  GavelIcon as Gambian,
  FlagIcon as Guinea,
  BugIcon as Bissau,
  MountainIcon as Sierra,
  LeafIcon as Leone,
  LibraryIcon as Liberian,
  CroissantIcon as Ivorian,
  ClubIcon as Ghanaian,
  TurtleIcon as Togolese,
  BeanIcon as Beninese,
  TwitterIcon as Nigerian,
  NutIcon as Niger,
  BadgeIcon as Burkina,
  FigmaIcon as Faso,
  BananaIcon as Malian,
  FlagIcon as Guinea,
  CrownIcon as Cape,
  LeafyGreenIcon as Verde,
  SirenIcon as Sao,
  TabletsIcon as Tome,
  CrownIcon as Principe,
  EclipseIcon as Equatorial,
  GroupIcon as Gabonese,
  FlagIcon as Republic,
  VoteIcon as Democratic,
  FlagIcon as Angola,
  NutIcon as Namibian,
  BotIcon as Botswana,
  FlagIcon as Zimbabwe,
  ClubIcon as Zambian,
  UserIcon as Malawian,
  MoonIcon as Mozambican,
  SwatchBookIcon as Swazi,
  MountainIcon as Lesotho,
  RatIcon as Madagascar,
  CitrusIcon as Mauritius,
  SirenIcon as Seychelles,
  CompassIcon as Comoros,
  MapIcon as Mayotte,
  RepeatIcon as Reunion,
  RatIcon as Rodrigues,
  StickerIcon as St,
  HamIcon as Helena,
  ChurchIcon as Ascension,
  TriangleIcon as Tristan,
  FlagIcon as Island,
  CuboidIcon as Cunha,
  FlagIcon as Falkland,
  WaypointsIcon as Islands,
  SectionIcon as South,
  GemIcon as Georgia,
  SandwichIcon as Sand,
  PoundSterlingIcon as British,
  AntennaIcon as Ant,
  MapIcon as Territory,
  BirdIcon as Bouvet,
  FlagIcon as Island,
  FlagIcon as Island,
  FlagIcon as Island,
  FlagIcon as Island,
  FlagIcon as Island,
  FlagIcon as Island,
  DotIcon as da,
  FlagIcon as Island,
  FlagIcon as Island,
  FlagIcon as Island,
  FlagIcon as Island,
  FlagIcon as Island,
  FlagIcon as Island,
  FlagIcon as Island,
  FlagIcon as Island,
  FlagIcon as Island,
  FlagIcon as Island,
  FlagIcon as Island,
  FlagIcon as Island,
  FlagIcon as Island,
  FlagIcon as Island,
  FlagIcon as Island,
  FlagIcon as Island,
  FlagIcon as Island,
  AntennaIcon as Ant,
  FlagIcon as Island,
  FlagIcon as Island,
  FlagIcon as Island,
  FlagIcon as Island,
  FlagIcon as Island,
  FlagIcon as Island,
  StickerIcon as St,
  FlagIcon as Island,
  FlagIcon as Island,
  FlagIcon as Island,
  FlagIcon as Island,
  FlagIcon as Island,
  FlagIcon as Island,
  FlagIcon as Island,
  FlagIcon as Island,
  FlagIcon as Island,
  FlagIcon as Island,
  FlagIcon as Island,
  FlagIcon as Island,
  BellIcon as Bay,
  FlagIcon as Island,
  FlagIcon as Island,
  FlagIcon as Island,
  FlagIcon as Island,
  FlagIcon as Island,
  FlagIcon as Island,
  FishIcon as Whale,
  FlagIcon as Island,
  FlagIcon as Island,
  FlagIcon as Island,
} from "lucide-react"

// Comprehensive TailGrids HTML snippets
const sampleTailGridsSnippets: Record<string, { name: string; htmlContent: string }> = {
  // TG - Buttons
  tgPrimaryButton: {
    name: "Primary Button",
    htmlContent: `<button class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
      Get Started
    </button>`,
  },
  tgSecondaryButton: {
    name: "Secondary Button",
    htmlContent: `<button class="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-6 rounded-lg transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50">
      Learn More
    </button>`,
  },
  tgOutlineButton: {
    name: "Outline Button",
    htmlContent: `<button class="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-semibold py-3 px-6 rounded-lg transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
      Contact Us
    </button>`,
  },
  tgGradientButton: {
    name: "Gradient Button",
    htmlContent: `<button class="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50">
      Download Now
    </button>`,
  },
  tgIconButton: {
    name: "Icon Button",
    htmlContent: `<button class="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 ease-in-out flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50">
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
      </svg>
      <span>Add Item</span>
    </button>`,
  },

  // TG - Alerts
  tgInfoAlert: {
    name: "Info Alert",
    htmlContent: `<div class="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-md">
      <div class="flex">
        <div class="flex-shrink-0">
          <svg class="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
        </div>
        <div class="ml-3">
          <p class="text-sm text-blue-700">
            This is an informational message. Click here to learn more about our services.
          </p>
        </div>
      </div>
    </div>`,
  },
  tgSuccessAlert: {
    name: "Success Alert",
    htmlContent: `<div class="bg-green-50 border-l-4 border-green-400 p-4 rounded-md">
      <div class="flex">
        <div class="flex-shrink-0">
          <svg class="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        </div>
        <div class="ml-3">
          <p class="text-sm text-green-700">
            Success! Your changes have been saved successfully.
          </p>
        </div>
      </div>
    </div>`,
  },
  tgWarningAlert: {
    name: "Warning Alert",
    htmlContent: `<div class="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-md">
      <div class="flex">
        <div class="flex-shrink-0">
          <svg class="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        </div>
        <div class="ml-3">
          <p class="text-sm text-yellow-700">
            Warning: Please review your information before proceeding.
          </p>
        </div>
      </div>
    </div>`,
  },
  tgErrorAlert: {
    name: "Error Alert",
    htmlContent: `<div class="bg-red-50 border-l-4 border-red-400 p-4 rounded-md">
      <div class="flex">
        <div class="flex-shrink-0">
          <svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
        </div>
        <div class="ml-3">
          <p class="text-sm text-red-700">
            Error: There was a problem processing your request. Please try again.
          </p>
        </div>
      </div>
    </div>`,
  },

  // TG - Cards
  tgBasicCard: {
    name: "Basic Card",
    htmlContent: `<div class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
      <h3 class="text-xl font-semibold text-gray-900 mb-2">Card Title</h3>
      <p class="text-gray-600 mb-4">This is a basic card component with some sample content. You can customize it according to your needs.</p>
      <button class="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition duration-300">
        Read More
      </button>
    </div>`,
  },
  tgImageCard: {
    name: "Image Card",
    htmlContent: `<div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <img src="/placeholder.svg?height=200&width=400" alt="Card Image" class="w-full h-48 object-cover">
      <div class="p-6">
        <h3 class="text-xl font-semibold text-gray-900 mb-2">Featured Article</h3>
        <p class="text-gray-600 mb-4">Discover the latest trends and insights in our featured article. Learn from industry experts.</p>
        <div class="flex items-center justify-between">
          <span class="text-sm text-gray-500">March 15, 2024</span>
          <button class="text-blue-600 hover:text-blue-800 font-medium">Read More →</button>
        </div>
      </div>
    </div>`,
  },
  tgProductCard: {
    name: "Product Card",
    htmlContent: `<div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div class="relative">
        <img src="/placeholder.svg?height=250&width=300" alt="Product" class="w-full h-64 object-cover">
        <div class="absolute top-2 right-2">
          <span class="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">Sale</span>
        </div>
      </div>
      <div class="p-4">
        <h3 class="text-lg font-semibold text-gray-900 mb-2">Premium Product</h3>
        <p class="text-gray-600 text-sm mb-3">High-quality product with excellent features and great value for money.</p>
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-2">
            <span class="text-xl font-bold text-gray-900">$99.99</span>
            <span class="text-sm text-gray-500 line-through">$129.99</span>
          </div>
          <button class="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition duration-300">
            Add to Cart
          </button>
        </div>
      </div>
    </div>`,
  },
  tgProfileCard: {
    name: "Profile Card",
    htmlContent: `<div class="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow duration-300">
      <img src="/placeholder.svg?height=100&width=100" alt="Profile" class="w-24 h-24 rounded-full mx-auto mb-4 object-cover">
      <h3 class="text-xl font-semibold text-gray-900 mb-1">John Doe</h3>
      <p class="text-gray-600 mb-4">Senior Developer</p>
      <p class="text-gray-500 text-sm mb-4">Passionate about creating amazing user experiences and building scalable applications.</p>
      <div class="flex justify-center space-x-4">
        <button class="text-blue-600 hover:text-blue-800">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84"></path>
          </svg>
        </button>
        <button class="text-blue-600 hover:text-blue-800">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd"></path>
          </svg>
        </button>
      </div>
    </div>`,
  },

  // TG - Forms
  tgInputField: {
    name: "Input Field",
    htmlContent: `<div class="mb-4">
      <label for="email" class="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
      <input type="email" id="email" name="email" class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300" placeholder="Enter your email">
    </div>`,
  },
  tgTextarea: {
    name: "Textarea",
    htmlContent: `<div class="mb-4">
      <label for="message" class="block text-sm font-medium text-gray-700 mb-2">Message</label>
      <textarea id="message" name="message" rows="4" class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300" placeholder="Enter your message"></textarea>
    </div>`,
  },
  tgSelectField: {
    name: "Select Field",
    htmlContent: `<div class="mb-4">
      <label for="country" class="block text-sm font-medium text-gray-700 mb-2">Country</label>
      <select id="country" name="country" class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300">
        <option value="">Select a country</option>
        <option value="us">United States</option>
        <option value="ca">Canada</option>
        <option value="uk">United Kingdom</option>
        <option value="de">Germany</option>
        <option value="fr">France</option>
      </select>
    </div>`,
  },
  tgCheckbox: {
    name: "Checkbox",
    htmlContent: `<div class="flex items-center mb-4">
      <input id="terms" name="terms" type="checkbox" class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded">
      <label for="terms" class="ml-2 block text-sm text-gray-900">
        I agree to the <a href="#" class="text-blue-600 hover:text-blue-800">Terms and Conditions</a>
      </label>
    </div>`,
  },

  // TG - Navigation
  tgNavbar: {
    name: "Navigation Bar",
    htmlContent: `<nav class="bg-white shadow-lg">
      <div class="max-w-7xl mx-auto px-4">
        <div class="flex justify-between items-center py-4">
          <div class="flex items-center">
            <a href="#" class="text-xl font-bold text-gray-800">Brand</a>
          </div>
          <div class="hidden md:flex items-center space-x-8">
            <a href="#" class="text-gray-600 hover:text-blue-600 transition duration-300">Home</a>
            <a href="#" class="text-gray-600 hover:text-blue-600 transition duration-300">About</a>
            <a href="#" class="text-gray-600 hover:text-blue-600 transition duration-300">Services</a>
            <a href="#" class="text-gray-600 hover:text-blue-600 transition duration-300">Contact</a>
          </div>
          <div class="hidden md:flex items-center space-x-4">
            <button class="text-gray-600 hover:text-blue-600 transition duration-300">Sign In</button>
            <button class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition duration-300">Sign Up</button>
          </div>
        </div>
      </div>
    </nav>`,
  },
  tgBreadcrumbs: {
    name: "Breadcrumbs",
    htmlContent: `<nav class="flex" aria-label="Breadcrumb">
      <ol class="inline-flex items-center space-x-1 md:space-x-3">
        <li class="inline-flex items-center">
          <a href="#" class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600">
            <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
            </svg>
            Home
          </a>
        </li>
        <li>
          <div class="flex items-center">
            <svg class="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
            </svg>
            <a href="#" class="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2">Products</a>
          </div>
        </li>
        <li aria-current="page">
          <div class="flex items-center">
            <svg class="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
            </svg>
            <span class="ml-1 text-sm font-medium text-gray-500 md:ml-2">Current Page</span>
          </div>
        </li>
      </ol>
    </nav>`,
  },

  // TG - Data Display
  tgTable: {
    name: "Data Table",
    htmlContent: `<div class="overflow-x-auto">
      <table class="min-w-full bg-white border border-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr class="hover:bg-gray-50">
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">John Doe</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">john@example.com</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Admin</td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Active</span>
            </td>
          </tr>
          <tr class="hover:bg-gray-50">
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Jane Smith</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">jane@example.com</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">User</td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">Pending</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>`,
  },
  tgProgressBar: {
    name: "Progress Bar",
    htmlContent: `<div class="mb-4">
      <div class="flex justify-between items-center mb-2">
        <span class="text-sm font-medium text-gray-700">Progress</span>
        <span class="text-sm font-medium text-gray-700">75%</span>
      </div>
      <div class="w-full bg-gray-200 rounded-full h-2.5">
        <div class="bg-blue-600 h-2.5 rounded-full transition-all duration-300 ease-in-out" style="width: 75%"></div>
      </div>
    </div>`,
  },

  // TG - Marketing
  tgHeroSection: {
    name: "Hero Section",
    htmlContent: `<section class="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
      <div class="max-w-7xl mx-auto px-4 text-center">
        <h1 class="text-4xl md:text-6xl font-bold mb-6">Build Amazing Websites</h1>
        <p class="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">Create stunning, responsive websites with our powerful tools and components. Get started today and bring your vision to life.</p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <button class="bg-white text-blue-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition duration-300">
            Get Started Free
          </button>
          <button class="border-2 border-white text-white hover:bg-white hover:text-blue-600 font-semibold py-3 px-8 rounded-lg transition duration-300">
            Watch Demo
          </button>
        </div>
      </div>
    </section>`,
  },
  tgFeatureSection: {
    name: "Feature Section",
    htmlContent: `<section class="py-16 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Amazing Features</h2>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto">Discover the powerful features that make our platform the best choice for your projects.</p>
        </div>
        <div class="grid md:grid-cols-3 gap-8">
          <div class="text-center">
            <div class="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">Lightning Fast</h3>
            <p class="text-gray-600">Optimized for speed and performance to deliver the best user experience.</p>
          </div>
          <div class="text-center">
            <div class="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">Reliable</h3>
            <p class="text-gray-600">Built with reliability in mind, ensuring your projects run smoothly.</p>
          </div>
          <div class="text-center">
            <div class="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">Easy to Use</h3>
            <p class="text-gray-600">Intuitive design and user-friendly interface make it simple to get started.</p>
          </div>
        </div>
      </div>
    </section>`,
  },
  tgTestimonial: {
    name: "Testimonial",
    htmlContent: `<section class="py-16 bg-white">
      <div class="max-w-4xl mx-auto px-4 text-center">
        <div class="mb-8">
          <svg class="w-12 h-12 text-gray-400 mx-auto mb-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
          </svg>
        </div>
        <blockquote class="text-2xl font-medium text-gray-900 mb-8">
          "This platform has completely transformed how we build and deploy our applications. The ease of use and powerful features make it an essential tool for our team."
        </blockquote>
        <div class="flex items-center justify-center">
          <img src="/placeholder.svg?height=60&width=60" alt="Avatar" class="w-12 h-12 rounded-full mr-4">
          <div class="text-left">
            <div class="font-semibold text-gray-900">Sarah Johnson</div>
            <div class="text-gray-600">CTO, TechCorp</div>
          </div>
        </div>
      </div>
    </section>`,
  },
  tgPricingCard: {
    name: "Pricing Card",
    htmlContent: `<div class="bg-white rounded-lg shadow-lg p-8 relative">
      <div class="text-center">
        <h3 class="text-2xl font-bold text-gray-900 mb-4">Professional</h3>
        <div class="mb-6">
          <span class="text-4xl font-bold text-gray-900">$29</span>
          <span class="text-gray-600">/month</span>
        </div>
        <ul class="text-left space-y-3 mb-8">
          <li class="flex items-center">
            <svg class="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
            Up to 10 projects
          </li>
          <li class="flex items-center">
            <svg class="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
            Advanced analytics
          </li>
          <li class="flex items-center">
            <svg class="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
            Priority support
          </li>
          <li class="flex items-center">
            <svg class="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
            Custom integrations
          </li>
        </ul>
        <button class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300">
          Get Started
        </button>
      </div>
    </div>`,
  },

  // TG - E-Commerce
  tgProductGrid: {
    name: "Product Grid Item",
    htmlContent: `<div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div class="relative group">
        <img src="/placeholder.svg?height=300&width=300" alt="Product" class="w-full h-64 object-cover">
        <div class="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <button class="bg-white text-gray-900 px-4 py-2 rounded-md font-medium hover:bg-gray-100 transition duration-300">
            Quick View
          </button>
        </div>
        <div class="absolute top-2 left-2">
          <span class="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">-20%</span>
        </div>
      </div>
      <div class="p-4">
        <h3 class="text-lg font-semibold text-gray-900 mb-2">Premium Headphones</h3>
        <p class="text-gray-600 text-sm mb-3">High-quality wireless headphones with noise cancellation</p>
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-2">
            <span class="text-xl font-bold text-gray-900">$79.99</span>
            <span class="text-sm text-gray-500 line-through">$99.99</span>
          </div>
          <div class="flex items-center">
            <div class="flex text-yellow-400">
              <svg class="w-4 h-4 fill-current" viewBox="0 0 20 20">
                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
              </svg>
              <svg class="w-4 h-4 fill-current" viewBox="0 0 20 20">
                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
              </svg>
              <svg class="w-4 h-4 fill-current" viewBox="0 0 20 20">
                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
              </svg>
              <svg class="w-4 h-4 fill-current" viewBox="0 0 20 20">
                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
              </svg>
              <svg class="w-4 h-4 fill-current" viewBox="0 0 20 20">
                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
              </svg>
            </div>
            <span class="text-sm text-gray-600 ml-1">(24)</span>
          </div>
        </div>
        <button class="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition duration-300">
          Add to Cart
        </button>
      </div>
    </div>`,
  },
  tgShoppingCart: {
    name: "Shopping Cart Item",
    htmlContent: `<div class="bg-white border border-gray-200 rounded-lg p-4 flex items-center space-x-4">
      <img src="/placeholder.svg?height=80&width=80" alt="Product" class="w-20 h-20 object-cover rounded-md">
      <div class="flex-1">
        <h3 class="text-lg font-semibold text-gray-900">Wireless Earbuds</h3>
        <p class="text-gray-600 text-sm">Premium quality with noise cancellation</p>
        <div class="flex items-center justify-between mt-2">
          <div class="flex items-center space-x-2">
            <button class="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4"></path>
              </svg>
            </button>
            <span class="text-lg font-medium">2</span>
            <button class="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
            </button>
          </div>
          <div class="text-right">
            <div class="text-lg font-bold text-gray-900">$159.98</div>
            <button class="text-red-500 hover:text-red-700 text-sm">Remove</button>
          </div>
        </div>
      </div>
    </div>`,
  },

  // TG - Dashboard
  tgStatsCard: {
    name: "Statistics Card",
    htmlContent: `<div class="bg-white rounded-lg shadow-md p-6">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm font-medium text-gray-600">Total Revenue</p>
          <p class="text-3xl font-bold text-gray-900">$45,231</p>
          <p class="text-sm text-green-600 flex items-center mt-1">
            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 11l5-5m0 0l5 5m-5-5v12"></path>
            </svg>
            +20.1% from last month
          </p>
        </div>
        <div class="bg-blue-100 p-3 rounded-full">
          <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
          </svg>
        </div>
      </div>
    </div>`,
  },

  // TG - Application UI
  tg404Page: {
    name: "404 Error Page",
    htmlContent: `<div class="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
      <div class="text-center text-white px-4">
        <div class="relative">
          <h1 class="text-9xl font-bold opacity-20">404</h1>
          <div class="absolute inset-0 flex items-center justify-center">
            <div class="text-center">
              <h2 class="text-4xl font-bold mb-4">Here Is Some Problem</h2>
              <p class="text-xl mb-8">The page you are looking for it maybe deleted</p>
              <button class="bg-white text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition duration-300">
                Go To Home
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>`,
  },
  tgSignInForm: {
    name: "Sign In Form",
    htmlContent: `<div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-md w-full space-y-8">
        <div>
          <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
          <p class="mt-2 text-center text-sm text-gray-600">
            Or <a href="#" class="font-medium text-blue-600 hover:text-blue-500">start your 14-day free trial</a>
          </p>
        </div>
        <form class="mt-8 space-y-6">
          <div class="rounded-md shadow-sm -space-y-px">
            <div>
              <label for="email-address" class="sr-only">Email address</label>
              <input id="email-address" name="email" type="email" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm" placeholder="Email address">
            </div>
            <div>
              <label for="password" class="sr-only">Password</label>
              <input id="password" name="password" type="password" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm" placeholder="Password">
            </div>
          </div>
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input id="remember-me" name="remember-me" type="checkbox" class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded">
              <label for="remember-me" class="ml-2 block text-sm text-gray-900">Remember me</label>
            </div>
            <div class="text-sm">
              <a href="#" class="font-medium text-blue-600 hover:text-blue-500">Forgot your password?</a>
            </div>
          </div>
          <div>
            <button type="submit" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>`,
  },
  tgFooter: {
    name: "Footer",
    htmlContent: `<footer class="bg-gray-900 text-white">
      <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div class="col-span-1 md:col-span-2">
            <h3 class="text-2xl font-bold mb-4">Your Brand</h3>
            <p class="text-gray-300 mb-4">Building amazing digital experiences with cutting-edge technology and innovative design solutions.</p>
            <div class="flex space-x-4">
              <a href="#" class="text-gray-300 hover:text-white">
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a href="#" class="text-gray-300 hover:text-white">
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                </svg>
              </a>
              <a href="#" class="text-gray-300 hover:text-white">
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>
          <div>
            <h4 class="text-lg font-semibold mb-4">Quick Links</h4>
            <ul class="space-y-2">
              <li><a href="#" class="text-gray-300 hover:text-white">About Us</a></li>
              <li><a href="#" class="text-gray-300 hover:text-white">Services</a></li>
              <li><a href="#" class="text-gray-300 hover:text-white">Portfolio</a></li>
              <li><a href="#" class="text-gray-300 hover:text-white">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 class="text-lg font-semibold mb-4">Support</h4>
            <ul class="space-y-2">
              <li><a href="#" class="text-gray-300 hover:text-white">Help Center</a></li>
              <li><a href="#" class="text-gray-300 hover:text-white">Privacy Policy</a></li>
              <li><a href="#" class="text-gray-300 hover:text-white">Terms of Service</a></li>
              <li><a href="#" class="text-gray-300 hover:text-white">FAQ</a></li>
            </ul>
          </div>
        </div>
        <div class="mt-8 pt-8 border-t border-gray-700 text-center">
          <p class="text-gray-300">&copy; 2024 Your Brand. All rights reserved.</p>
        </div>
      </div>
    </footer>`,
  },
}

// Icon mapping for components
const iconMap: Record<string, React.ElementType> = {
  // Basic components
  heading: Type,
  paragraph: AlignLeft,
  image: ImageIcon,
  code: Code,
  button: ButtonIcon,
  card: CreditCard,
  divider: Minus,
  list: List,
  orderedList: ListOrdered,
  taskList: CheckSquare,
  blockquote: Quote,
  alert: AlertTriangle,
  spacer: Square,
  columns: Columns,
  table: Table,
  mermaid: BarChart3,

  // TailGrids components
  tgPrimaryButton: ButtonIcon,
  tgSecondaryButton: ButtonIcon,
  tgOutlineButton: ButtonIcon,
  tgGradientButton: ButtonIcon,
  tgIconButton: ButtonIcon,
  tgInfoAlert: Info,
  tgSuccessAlert: CheckCircle,
  tgWarningAlert: AlertTriangle,
  tgErrorAlert: XCircle,
  tgBasicCard: CreditCard,
  tgImageCard: ImageIcon,
  tgProductCard: ShoppingCart,
  tgProfileCard: User,
  tgInputField: FileText,
  tgTextarea: FileText,
  tgSelectField: FileText,
  tgCheckbox: CheckSquare,
  tgNavbar: Navigation,
  tgBreadcrumbs: Navigation,
  tgTable: Table,
  tgProgressBar: BarChart3,
  tgHeroSection: Star,
  tgFeatureSection: Zap,
  tgTestimonial: Quote,
  tgPricingCard: CreditCard,
  tgProductGrid: ShoppingCart,
  tgShoppingCart: ShoppingCart,
  tgStatsCard: PieChart,
  tg404Page: AlertCircle,
  tgSignInForm: User,
  tgFooter: FileText,
}

// Component categories with comprehensive TailGrids components
const componentCategories = [
  {
    name: "Basic Elements",
    color: "bg-blue-100 text-blue-800",
    components: [
      { type: "heading", label: "Heading", icon: iconMap.heading },
      { type: "paragraph", label: "Paragraph", icon: iconMap.paragraph },
      { type: "image", label: "Image", icon: iconMap.image },
      { type: "button", label: "Button", icon: iconMap.button },
      { type: "divider", label: "Divider", icon: iconMap.divider },
      { type: "spacer", label: "Spacer", icon: iconMap.spacer },
    ],
  },
  {
    name: "Content Blocks",
    color: "bg-green-100 text-green-800",
    components: [
      { type: "card", label: "Card", icon: iconMap.card },
      { type: "alert", label: "Alert", icon: iconMap.alert },
      { type: "blockquote", label: "Quote", icon: iconMap.blockquote },
      { type: "code", label: "Code Block", icon: iconMap.code },
      { type: "columns", label: "Columns", icon: iconMap.columns },
    ],
  },
  {
    name: "Lists & Tables",
    color: "bg-purple-100 text-purple-800",
    components: [
      { type: "list", label: "Bullet List", icon: iconMap.list },
      { type: "orderedList", label: "Numbered List", icon: iconMap.orderedList },
      { type: "taskList", label: "Task List", icon: iconMap.taskList },
      { type: "table", label: "Table", icon: iconMap.table },
    ],
  },
  {
    name: "TG - Buttons",
    color: "bg-indigo-100 text-indigo-800",
    components: [
      { type: "htmlBlock", label: "Primary Button", icon: iconMap.tgPrimaryButton, htmlBlockKey: "tgPrimaryButton" },
      {
        type: "htmlBlock",
        label: "Secondary Button",
        icon: iconMap.tgSecondaryButton,
        htmlBlockKey: "tgSecondaryButton",
      },
      { type: "htmlBlock", label: "Outline Button", icon: iconMap.tgOutlineButton, htmlBlockKey: "tgOutlineButton" },
      { type: "htmlBlock", label: "Gradient Button", icon: iconMap.tgGradientButton, htmlBlockKey: "tgGradientButton" },
      { type: "htmlBlock", label: "Icon Button", icon: iconMap.tgIconButton, htmlBlockKey: "tgIconButton" },
    ],
  },
  {
    name: "TG - Alerts",
    color: "bg-yellow-100 text-yellow-800",
    components: [
      { type: "htmlBlock", label: "Info Alert", icon: iconMap.tgInfoAlert, htmlBlockKey: "tgInfoAlert" },
      { type: "htmlBlock", label: "Success Alert", icon: iconMap.tgSuccessAlert, htmlBlockKey: "tgSuccessAlert" },
      { type: "htmlBlock", label: "Warning Alert", icon: iconMap.tgWarningAlert, htmlBlockKey: "tgWarningAlert" },
      { type: "htmlBlock", label: "Error Alert", icon: iconMap.tgErrorAlert, htmlBlockKey: "tgErrorAlert" },
    ],
  },
  {
    name: "TG - Cards",
    color: "bg-pink-100 text-pink-800",
    components: [
      { type: "htmlBlock", label: "Basic Card", icon: iconMap.tgBasicCard, htmlBlockKey: "tgBasicCard" },
      { type: "htmlBlock", label: "Image Card", icon: iconMap.tgImageCard, htmlBlockKey: "tgImageCard" },
      { type: "htmlBlock", label: "Product Card", icon: iconMap.tgProductCard, htmlBlockKey: "tgProductCard" },
      { type: "htmlBlock", label: "Profile Card", icon: iconMap.tgProfileCard, htmlBlockKey: "tgProfileCard" },
    ],
  },
  {
    name: "TG - Forms",
    color: "bg-teal-100 text-teal-800",
    components: [
      { type: "htmlBlock", label: "Input Field", icon: iconMap.tgInputField, htmlBlockKey: "tgInputField" },
      { type: "htmlBlock", label: "Textarea", icon: iconMap.tgTextarea, htmlBlockKey: "tgTextarea" },
      { type: "htmlBlock", label: "Select Field", icon: iconMap.tgSelectField, htmlBlockKey: "tgSelectField" },
      { type: "htmlBlock", label: "Checkbox", icon: iconMap.tgCheckbox, htmlBlockKey: "tgCheckbox" },
    ],
  },
  {
    name: "TG - Navigation",
    color: "bg-cyan-100 text-cyan-800",
    components: [
      { type: "htmlBlock", label: "Navigation Bar", icon: iconMap.tgNavbar, htmlBlockKey: "tgNavbar" },
      { type: "htmlBlock", label: "Breadcrumbs", icon: iconMap.tgBreadcrumbs, htmlBlockKey: "tgBreadcrumbs" },
    ],
  },
  {
    name: "TG - Data Display",
    color: "bg-orange-100 text-orange-800",
    components: [
      { type: "htmlBlock", label: "Data Table", icon: iconMap.tgTable, htmlBlockKey: "tgTable" },
      { type: "htmlBlock", label: "Progress Bar", icon: iconMap.tgProgressBar, htmlBlockKey: "tgProgressBar" },
    ],
  },
  {
    name: "TG - Marketing",
    color: "bg-red-100 text-red-800",
    components: [
      { type: "htmlBlock", label: "Hero Section", icon: iconMap.tgHeroSection, htmlBlockKey: "tgHeroSection" },
      { type: "htmlBlock", label: "Feature Section", icon: iconMap.tgFeatureSection, htmlBlockKey: "tgFeatureSection" },
      { type: "htmlBlock", label: "Testimonial", icon: iconMap.tgTestimonial, htmlBlockKey: "tgTestimonial" },
      { type: "htmlBlock", label: "Pricing Card", icon: iconMap.tgPricingCard, htmlBlockKey: "tgPricingCard" },
    ],
  },
  {
    name: "TG - E-Commerce",
    color: "bg-emerald-100 text-emerald-800",
    components: [
      { type: "htmlBlock", label: "Product Grid", icon: iconMap.tgProductGrid, htmlBlockKey: "tgProductGrid" },
      { type: "htmlBlock", label: "Shopping Cart", icon: iconMap.tgShoppingCart, htmlBlockKey: "tgShoppingCart" },
    ],
  },
  {
    name: "TG - Dashboard",
    color: "bg-violet-100 text-violet-800",
    components: [{ type: "htmlBlock", label: "Stats Card", icon: iconMap.tgStatsCard, htmlBlockKey: "tgStatsCard" }],
  },
  {
    name: "TG - Application UI",
    color: "bg-slate-100 text-slate-800",
    components: [
      { type: "htmlBlock", label: "404 Error Page", icon: iconMap.tg404Page, htmlBlockKey: "tg404Page" },
      { type: "htmlBlock", label: "Sign In Form", icon: iconMap.tgSignInForm, htmlBlockKey: "tgSignInForm" },
      { type: "htmlBlock", label: "Footer", icon: iconMap.tgFooter, htmlBlockKey: "tgFooter" },
    ],
  },
]

// Default content generator
export function getDefaultContent(type: MarkdownComponent["type"], htmlBlockKey?: string): any {
  switch (type) {
    case "heading":
      return { text: "New Heading", level: 2 }
    case "paragraph":
      return { text: "This is a new paragraph. Click to edit this text." }
    case "image":
      return {
        src: "/placeholder.svg?height=300&width=500",
        alt: "Sample image",
        caption: "",
      }
    case "code":
      return { code: "// Your code here\nconsole.log('Hello World!');", language: "javascript" }
    case "button":
      return { text: "Click Me", variant: "default", size: "default", link: "" }
    case "card":
      return {
        title: "Card Title",
        description: "This is a card description. You can edit this content.",
        imageUrl: "",
      }
    case "divider":
      return {}
    case "list":
      return { items: ["First item", "Second item", "Third item"] }
    case "orderedList":
      return { items: ["First item", "Second item", "Third item"], start: 1 }
    case "taskList":
      return {
        items: [
          { text: "Complete task 1", checked: false },
          { text: "Complete task 2", checked: true },
          { text: "Complete task 3", checked: false },
        ],
      }
    case "blockquote":
      return { text: "This is a quote that provides insight or emphasis to your content." }
    case "alert":
      return { text: "This is an alert message.", type: "info" }
    case "spacer":
      return { height: "40px" }
    case "columns":
      return {
        column1Text: "Content for the first column goes here.",
        column2Text: "Content for the second column goes here.",
      }
    case "table":
      return {
        headers: ["Name", "Email", "Role"],
        rows: [
          ["John Doe", "john@example.com", "Admin"],
          ["Jane Smith", "jane@example.com", "User"],
        ],
      }
    case "mermaid":
      return { code: "graph TD;\n    A[Start] --> B[Process];\n    B --> C[End];" }
    case "htmlBlock":
      if (htmlBlockKey && sampleTailGridsSnippets[htmlBlockKey]) {
        return {
          htmlContent: sampleTailGridsSnippets[htmlBlockKey].htmlContent,
          name: sampleTailGridsSnippets[htmlBlockKey].name,
        }
      }
      console.warn(`HTML block key "${htmlBlockKey}" not found in sampleTailGridsSnippets`)
      return {
        htmlContent:
          "<div class='p-4 border border-dashed border-gray-300 rounded-md text-center text-gray-500'>Custom HTML Block</div>",
        name: "Custom HTML Block",
      }
    default:
      console.warn(`Unknown component type: ${type}`)
      return {}
  }
}

// Draggable palette item component
function DraggablePaletteItem({
  component,
  id,
}: {
  component: { type: MarkdownComponent["type"]; label: string; icon: React.ElementType; htmlBlockKey?: string }
  id: string
}) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id,
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

  const Icon = component.icon

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`
        flex items-center space-x-3 p-3 rounded-lg border border-gray-200 
        hover:border-blue-300 hover:bg-blue-50 cursor-grab active:cursor-grabbing
        transition-all duration-200 ease-in-out
        ${isDragging ? "opacity-50 shadow-lg scale-105" : "hover:shadow-md"}
      `}
    >
      <Icon className="w-5 h-5 text-gray-600" />
      <span className="text-sm font-medium text-gray-700 truncate">{component.label}</span>
    </div>
  )
}

// Main component palette
export function ComponentPalette() {
  return (
    <div className="h-full flex flex-col bg-card dark:bg-neutral-800">
      <div className="p-4 border-b border-border dark:border-neutral-700">
        <h2 className="text-lg font-semibold text-foreground dark:text-neutral-100">Components</h2>
        <p className="text-sm text-muted-foreground dark:text-neutral-400">Drag components to the canvas</p>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4">
          <Accordion type="multiple" defaultValue={["Basic Elements", "TG - Buttons", "TG - Cards"]} className="w-full">
            {componentCategories.map((category) => (
              <AccordionItem
                key={category.name}
                value={category.name}
                className="border-b border-border dark:border-neutral-700"
              >
                <AccordionTrigger className="text-sm font-medium hover:no-underline py-3">
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary" className={category.color}>
                      {category.components.length}
                    </Badge>
                    <span className="text-foreground dark:text-neutral-100">{category.name}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-4">
                  <div className="space-y-2">
                    {category.components.map((component) => (
                      <DraggablePaletteItem
                        key={`${category.name}-${component.label}`}
                        component={component}
                        id={`palette-${category.name.replace(/\s+/g, "-").toLowerCase()}-${component.label.replace(/\s+/g, "-").toLowerCase()}`}
                      />
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </ScrollArea>
    </div>
  )
}
