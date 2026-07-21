export interface Article {
  title: string;
  description: string;
  image: string;
  link: string;
  category: string;
  date: string;
  content?: string;
}

export interface Section {
  template: string;
  type: string;
  title: string;
  description: string;
  image: string;
  link: string;
  content?: string;
  articles?: Article[];
}

export interface BreadcrumbData {
  title: string;
  link?: string;
}

export interface SeoData {
  title: string;
  description: string;
  keywords: string;
  canonical: string;
  image: string;
  type: string;
  siteName: string;
  locale: string;
  imageAlt: string;
  imageType: string;
  imageWidth: string;
  imageHeight: string;
}

export interface PageSectionData {
  page_id: string;
  sectionData: Section[];
  seoData?: SeoData;
  breadcrumbData?: BreadcrumbData[];
}

export interface PageArticleData {
  page_id: string;
  articleData: Article[];
  seoData?: SeoData;
  breadcrumbData?: BreadcrumbData[];
}

export interface PageProps {
  params: Promise<{
    slug?: string;
    category?: string;
    sub_category?: string;
  }>;
}

export interface PageRendererProps {
  slug?: string;
  category?: string;
  sub_category?: string;
  type: string;
  data?: Section[] | Article[];
}

export interface MenuItem {
  label: string;
  href?: string;
  children?: MenuItem[];
  active?: boolean;
}

export interface Topic {
  text: string;
  value: number;
  href: string;
}

export interface TopicRendererProps {
  data?: Article[];
}

export interface GlobalData {
  siteName: string;
  HeaderRight: {
    id: number;
    HelpdeskText: string;
  };
  MainHeader: {
    id: number;
    Logo: ImageData;
    Search: {
      id: number;
      SearchTitle: string;
      ButtonText: string;
      searchclassfa: string;
    };
    header: {
      id: number;
      Title: string;
      Link: string | null;
      Target: string;
      page: {
        slug: string;
        Title: string;
      };
    }[];
    Button: {
      id: number;
      ButtonText: string;
      ButtonLink: string;
      Target: string;
    };
    SubHeader: {
      id: number;
      MenuItem: {
        id: number;
        Title: string;
        Link: string;
        Target: string;
        Submenuitem: {
          id: number;
          Title: string;
          Link: string;
          Target: string;
          page: {
            slug: string;
            Title: string;
          };
          service: {
            slug: string;
            Title: string;
          };
          rating: {
            id: number;
            Title: string;
            slug: string;
          };
        }[];
        page: {
          slug: string;
          Title: string;
        };
      }[];
    };
    MenuItem: {
      id: number;
      Title: string;
      Link: string;
    };
  };
  siteDescription: string;
  footer: FooterData;
  header: GlobalMenuItem[];
  SubHeader: SubHeaderData;
}

export interface SubHeaderData {
  id: number;
  Logo: ImageData;
  MenuItem: GlobalMenuItem[];
}

export interface FooterRowData {
  
    id: number;
    FooterColumn: FooterColumnData[];
  
}

export interface FooterColumnData {
  id: number;
  MenuItem: GlobalMenuItem[];
}



export interface FooterData {
  Address: {
    id: number;
    Title: string;
    AddressText: string;
  };
  FooterRow: FooterRowData[];
  FooterTop: {
    id: number;
    HelpdeskText: string;
    Logo: ImageData;
  };
  FooterBottom: {
    
    id: number;
    FooterLeft: FooterLeftData[];
    FooterSocial: SocialMediaData[];
  };
  FooterLeft: FooterLeftData;
  FooterRight: FooterRightData;
}

export interface FooterLeftData {
  id: number;
  Link: string;
  Target: string;
  Title: string;
  page: {
    slug: string;
    Title: string;
  };
  service: {
    slug: string;
    Title: string;
  };
  rating: {
    slug: string;
    Title: string;
  };
}

export interface SocialMediaData {
  id: number;
  Link: string;
  Target: string;
  Title: string;
  fontawesomeclass: string;
}

export interface FooterLeftData {
  ContactDetails: string;
  Address: string;
  Logo: ImageData;
  footersocial: GlobalMenuItem[];
}

export interface FooterRightData {
  FooterRow1: FooterRow1Data;
  FooterRow2: {
    Title: string;
    FooterRow2Columns: FooterRow2ColumnsData[];
  };
  FooterRow3: {
    Copyright: string;
    DevelopmentDetails: string;
  };
}

export interface FooterRow2ColumnsData {
  id: number;
  MenuItemFooterColumn: GlobalMenuItem[];
}

export interface FooterRow1Data {
  id: number;
  FooterColumn: FooterColumn1AccordionMenu[];
}

export interface FooterColumn1AccordionMenu {
  id: number;
  AccordionMenu: FooterColumn1AccordionMenu[];
}

export interface FooterColumn1AccordionMenu {
  id: number;
  MenuItem: string;
  SubMenuItem: GlobalMenuItem[];
}

export interface ImageData {
  width: number;
  height: number;
  url: string;
  alternativeText: string;
  caption: string;
  name: string;
}

export interface GlobalMenuItem {
  showDropdown?: boolean;
  rating: {
    id: number;
    Title: string;
    slug: string;
  };
  service: {
    id: number;
    Title: string;
    slug: string;
  };
  id: number;
  Link: string;
  Target: string;
  Title?: string;
  fontawesomeclass?: string;
  Submenuitem?: GlobalMenuItem[];
  SubMenuItem?: GlobalMenuItem[];
  footer: {
    id: number;
    FooterTop: {
      id: number;
      HelpdeskText: string;
      Logo: ImageData;
    };
    FooterBottom: {
      id: number;
      FooterLeft: {
        id: number;
        Link: string;
        page: {
          slug: string;
          Title: string;
        };
        service: {
          slug: string;
          Title: string;
        };
        rating: {
          slug: string;
          Title: string;
        };
      }[];
      FooterSocial: {
        id: number;
        Link: string;
        Target: string;
        Title: string;
      }[];
    };
    Address: {
      id: number;
      Title: string;
      AddressText: string;
    }
  };
  page: {
    slug: string;
    Title: string;
  };
  location: {
    id: number;
    Title: string;
  };
}

export interface HeaderData {
  id: number;
}

export interface HomePageData {
  id: number;
  Title: string;
  slug: string;
  Banners: Banner[];
  blocks: Block[];
  cardswithimage: CardWithImageData[];
  MediaCoverage: MediaCoverageData;
  Seminar: SeminarData;
}

export interface SeminarData1 {
  ActiveSeminar: SeminarData;
  SeminarCard: SeminarData[];
}

export interface SeminarData {
  id: number;
  Date: string;
  Time: string;
  
  video: {
    id: number;
    Title: string;
    Description: string;
    VideoLink: string;
    YouTubeLink: string;
    VideoThumbnailUrl: string;
    VideoThumbnail: ImageData;
  };
  Title: string;
  Description: string;
  ButtonText: string;
  ButtonLink: string;
  Target: string;
  Thumbnail: ImageData;
  YoutubeVideoLink: string;
  VideoTitle: string;
  VideoFile?: string;
}
export interface MediaCoverageData {
  id: number;
  Title: string;
  Description: string;
  ButtonText: string;
  ButtonLink: string;
  Target: string;
  ImageLink: string;
  ImageTarget: string;
  Thumbnail: ImageData;
  Date: string;
  MediaCaption: string;
  MediaDesc: string;
}

export interface CardWithImageData {
  id: number;
  Title: string;
  CardTitle: string;
  CardDescription: string;
  Description: string;
  Link: string;
  BackgroundColor: string;
  ImagePosition: string;
  ButtonText: string;
  Target: string;
  SectionBackgroundColor: string;
  Image: ImageData;
  Cards: CardData[];
  Button: ButtonData;
}

export interface CardData {
  id: number;
  Title: string;
  Description: string;
  Link: string;
  Target: string;
  Icon: ImageData;
}

export interface Block {
  id: number;
  Title: string;
  Image?: ImageData;
  description?: string;
  Description?: string;
  TemplateName: string;
  services?: ServiceData[];
  companies?: CompanyData[];
  Subtitle?: string;
  Button?: ButtonData;
  category?: CategoryData;
  Limit?: number;
  BackgroundColor?: string;
  __component?: string;
  PublicationCard?: {
    id: number;
    Title: string;
    Date: string;
    slug: string;
    Link: string;
    Target: string;
    Document: DocumentData;
    category: CategoryData;
  }[];
}

export interface CategoryData {
  id: number;
  Title: string;
  slug: string;
}

export interface ButtonData {
  id: number;
  ButtonText: string;
  ButtonLink: string;
  Target: string;
  faclass?: string;
  page?: {
    id: number;
    slug: string;
    PageTitle: string;
  };
  DocumentFile: DocumentFile;
}

export interface ServiceData {
  id: number;
  Title: string;
  Subtitle: string;
  slug: string;
  Icon: ImageData;
}

export interface Banner {
  id: number;
  Title: string;
  Subtitle: string;
  Image: ImageData;
  MobileImage: ImageData;
  Link: string;
  Target: string;
}

export interface SectionData {
  id: number;
  Title: string;
  Subtitle: string;
  Description: string;
  Banner: ImageData;
  slug: string;
  MobileBanner: ImageData;
  ListingImage: ImageData;
  Accordion: AccordionData[];
  Document: DocumentData[];
}

export interface AccordionData {
  id: number;
  Title: string;
  Description: string;
  isActive: boolean;
}

export interface ContactPageData {
  id: number;
  PageTitle: string;
  Subtitle: string;
  PageBanner: ImageData;
  PageMobileBanner: ImageData;
  blocks: Block[];
}

export interface Block {
  FormTitle: string;
  BackgroundImage: ImageData;
  locations: LocationData[];
}

export interface LocationData {
  id: number;
  Title: string;
  LocationData: LocationData1;
}

export interface LocationData1 {
  id: number;
  Title: string;

  Address: string;
  WhatsAppLink: string;
  Latitude: number;
  Longitude: number;
  Emails: {
    id: number;
    Email: string;
  }[];
  PhoneNumbers: {
    id: number;
    PhoneNumber: string;
  }[];
}

export interface AboutPageData {
  id: number;
  PageTitle: string;
  Subtitle: string;
  PageBanner: ImageData;
  PageMobileBanner: ImageData;
  blocks: [
    Block1,
    Block2,
    Block3,
    Block4,
    Block5,
    CardWithImageData,
    CardWithImageData,
    Block6
  ];
}

export interface Block6 {
  id: number;
  Title: string;
  CardTitle: string;
  CardDescription: string;
  CardImage: ImageData;
  CardLink: string;
  CardTarget: string;
  Button: ButtonData;
  BgImage: ImageData;
}

export interface Block5 {
  id: number;
  Title: string;
  TabTitle: {
    id: number;
    TabTitle: string;
    Cards: TeamData[];
  }[];
}

export interface TeamData {
  id: number;
  Title: string;
  Subtitle: string;
  Description: string;
  Image: ImageData;
}

export interface Block4 {
  id: number;
  Title: string;
  Description: string;
  CardData:{
    id: number;
    Icon: ImageData;
    Title: string;
    Description: string;
    Image: ImageData;
    MobileImage: ImageData;
    TitleDescCard: {
      id: number;
      Title: string;
      Description: string;
    }[];
  }[];
  Data: {
    id: number;
    Title: string;
    Description: string | null;
    Image: ImageData;
    MobileImage: ImageData;
    TitleDescCard: {
      id: number;
      Title: string;
      Description: string;
    }[];
  };
}

export interface Block3 {
  id: number;
  Title: string;
  Description: string;
  Image: ImageData;
  MobileImage: ImageData;
  TabTitle:{
    id: number;
    TabTitle: string;
    Description: string;
    Cards: TeamData[];
  }[];
  
}

export interface Block1 {
  id: number;
  Title: string;
  Description: string;
  ImagePosition: string;
  Image: ImageData;
}

export interface Block2 {
  Title: string;
  Description: string;
    AnnualGraph: {
      id: number;
      Title: string;
      Subtitle: string;
      Year: string;
      Description: string;
      BarData: {
        id: number;
        Title: string;
        Percentage: number;
        Subtitle: string;
        Year: string;
      }[];
    }[];
  id:number;
  cardswithimage: [
    {
      id: number;
      Title: string;
      Image: ImageData;
      LargeImage: ImageData;
    }
  ];
}

export interface RatingData {
  id: number;
  Title: string;
  slug: string;
  Link: string;
  MenuItem: RatingDetailsData1;
  Banner: ImageData;
  MobileBanner: ImageData;
  Document: DocumentData[];
}

export interface RatingDetailsData1 {
  id: number;
  Title: string;
  Link: string;
  Target: string;
  Description: string;
  Submenuitem: SubmenuitemData[];
  rating_lists: RatingListData[];
}

export interface RatingListData {
  id: number;
  Title: string;
  slug: string;
  Description: string;
  ArchiveRatings: ArchiveRatingsData[];
}

export interface ArchiveRatingsData {
  id: number;
  Title: string;
  ArchiveDate: string;
  // Description: string;
}

export interface DisplayData {
  id: number;
  Title: string;
  Description: string;
}

export interface SubmenuitemData {
  id: number;
  Title: string;
  Link: string;
  Target: string;
  Description: string;
  page?: {
    slug: string;
    Title: string;
  };
  service?: {
    slug: string;
    Title: string;
  };
}
export interface RatingDetailsData {
  id: number;
  Title: string;
  slug: string;
  MenuItems: MenuItem[];
}

export interface InfoCardWithImageData {
  id: number;
  Title: string;
  Subtitle: string;
  CardDescription: string;
  Description: string;
}

export interface Report {
  id: number;
  PressRelease: {
    Document: DocumentData;
    Link: string;
    Date: string;
  };
  Title: string;
  Subtitle: string;
  CompanyName: string;
  SubTitle: string;
  Date: string;
  Image: ImageData;
  MobileImage: ImageData;
  ListingImage: ImageData;
  ListingPageButton: {
    ButtonText: string;
    ButtonLink: string;
    Target: string;
    faclass: string;
    DocumentFile: DocumentFile;
  };
  companies: {
    id: number;
    CompanyName: string;
    SubTitle: string;
    Date: string;
    slug: string;
  }[];
  InnerPageBannerMobile: ImageData;
  slug: string;
  Link: string;
  Target: string;
  Documents?: DocumentData[];
  video: {
    YouTubeLink: string;
  };
  Button: {
    ButtonText: string;
    ButtonLink: string;
    Target: string;
    faclass: string;
    page: {
      id: number;
      slug: string;
      PageTitle: string;
    };
  };
}

export interface DocumentData {
  id: number;
  Title: string;
  Link: string;
  DocumentFile: DocumentFile;
  DocumentTitle: string;
  url: string;
  srNo: number;
}

export interface DocumentFile {
  url: string;
  name: string;
}

export interface ResponseData {
  id: number;
  slug: string;
  PageTitle: string;
  Subtitle: string;
  PageBanner: ImageData;
  PageMobileBanner: ImageData;
  blocks: Block[];
}

export interface ArticleData {
  id: number;
  Title: string;
  Subtitle: string;
  Description: string;

  Date: string;
  Image: ImageData;
  slug: string;
  category: {
    name: string;
    slug: string;
  };
  Documents: {
    DocumentTitle: string;
    DocumentFile: {
      url: string;
    };
  }[];
  InnerPageBanner: ImageData;
  InnerPageBannerMobile: ImageData;
  ListingImage: ImageData;
  video: {
    YouTubeLink: string;
  };
}

export interface CorporateGovernanceData {
  id: number;
  documentId: string;
  Title: string;
  slug: string;
  Description: string;
  ArchivePolicy: {
    id: number;
    ArchiveDate: string;
    Title: string;
  }[];
  Documents: {
    DocumentTitle: string;
    DocumentFile: {
      url: string;
    };
  }[];
}

export interface RegulatoryDisclosersData {
  id: number;
  Title: string;
  Subtitle: string;
  Banner: ImageData;
  MobileBanner: ImageData;
  slug: string;
  Description: string;
  Documents: DocumentData[];
  isSEBI: boolean;
  ArchiveRegulatoryListing: ArchiveRegulatoryListingData[];
  Listing: {
    id: number;
    Title: string;
    Description: string;
    Document: DocumentData[];
    slug: string;
  }[];
  page: {
    slug: string;
    Title: string;
    Parent: {
      slug: string;
      Title: string;
    };
  };
}

export interface ArchiveRegulatoryListingData {
  id: number;
  Title: string;
  Date: string;
  url: string;
  ArchiveDate: string;
  Documents: DocumentData[];
  Listing: ListingData1[];
}

export interface DataValueDetail {
  id: number;
  Title: string;
  Description: string;
  Document: DocumentData[];
  regulatory_disclosure_listings: RegulatoryDisclosureListingData[];
  regulatory_disclosure_lists: ListingData1[];
  isSEBI: boolean;
  hasArchive: boolean;
}

export interface ListingData1 {
  Title: string;
  blocks: BlockData[];
  Type: string;
  hasArchive: boolean;
  isArchive: boolean;
}

export interface DescriptionData {
  id: number;
  Title: string;
  Description: string;
  active: BlockData;
  archived: ArchivedData[];
}
export interface BlockData {
  id: number;
  __component: string;
  DocumentTitle: string;
  DocumentFile: DocumentFile;
  Title: string;
  Description: string;
  Document: DocumentData[];
  isArchive: boolean;
  archived: ArchivedData[];
  DocumentData: DocumentData[];
  DescriptionData: DescriptionData[];
}

export interface ArchivedData {
  id: number;
  Title: string;
  ArchiveDate: string;
}

export interface RegulatoryDisclosureListingData {
  id: number;
  Title: string;
  Description: string;
  Document: DocumentData[];
  isSEBI: boolean;
  Listing: ListingData1[];
  slug: string;
  ArchiveRegulatoryListing: ArchiveRegulatoryListingData[];
}

export interface ArchiveRegulatoryListingData {
  id: number;
  Title: string;
  slug: string;
}

export interface ListingData1 {
  id: number;
  Title: string;
  Description: string;
  Documents: DocumentData[];
  slug: string;
}

export interface PoliciesAndProceduresData {
  id: number;
  Title: string;
  Subtitle: string;
  Description: string;
  Banner: ImageData;
  MobileBanner: ImageData;
}

export interface FilterData {
  industry: {
    id: number;
    IndustryTitle: string;
  }[];
  months: {
    monthNumber: number;
    monthName: string;
  }[];
  years: number[];
}

export interface SearchData {
  id: number;
  CompanyName: string;
  slug: string;
}

export interface PressReleaseData {
  companyInstrument: CompanyInstrumentData[];
  company: CompanyData;
  isPast: boolean;
}

export interface PastRationalesData {
  companyInstrument: CompanyInstrumentData[];
  company: CompanyData;
  isPast: boolean;
}
export interface PressReleaseListData {
  id: number;
  Title: string;
  Date: string;
  slug: string;
  Link: string;
  Target: string;
  Document: DocumentData;
}

export interface CompanyData {
  id: number;
  CompanyName: string;
  SubTitle: string;
  Date: string;
  slug: string;
  LenderDetail: LenderDetailsData;
}

export interface LenderDetailsData {
  id: number;
  Title: string;
  Document: {
    DocumentTitle: string;
    url: string;
    DocumentFile: {
      url: string;
      name: string;
    };
  };
  LenderDetailsRated: {
    TypeofFacility: string;
    Instrument: string;
    BankName: string;
    RatedAmount: string;
  }[];
}

export interface CompanyInstrumentData {
  id: number;
  Title: string;
  Rating: string;
  InstrumentAmount: string;
  Date: string;
  instrument: InstrumentData;
  outlook: OutlookData;
  InstrumentDetails: InstrumentDetailsData[];
  showInstrumentDetails: boolean;
  LenderDetail: LenderDetailsData;
  press_release: PressReleaseListData;
  PressRelease: PressReleaseListData;
}

export interface InstrumentDetailsData {
  id: number;
  Detail: string;
}

export interface OutlookData {
  id: number;
  Title: string;
  slug: string;
}

export interface InstrumentData {
  id: number;
  Title: string;
  slug: string;
}

export interface MaxCur {
  max: number;
  current: number;
}

export interface RegulatoryDisclosersUnacceptedRatingsData {
  data: UnacceptedRatingsData[];
  sectors: string[];
  securityTypes: string[];
  meta: {
    hasArchivedData: boolean;
    MasterData: {
      Title: string;
      uploadDate: string;
    };
    PageData: {
      PageTitle: string;
      slug: string;
      blocks: {
        id: number;
        DocumentTitle: string;
        DocumentFile: DocumentFile;
      }[];
    };
  };
}

export interface RegulatoryDisclosersUnacceptedRatingsArchiveData {
  data: {
    ArchiveDate: string;
    statement: UnacceptedRatingsData[];
  }[];
}

export interface UnacceptedRatingsData {
  id: number;
  srNo: number;
  IssuerName: string;
  CompanyName?: string;
  Sector: string;
  SecurityType: string;
  IssueSize: string;
  NonAcceptanceDate: string;
  ListingStatus: string;
  RatingAssigned: string;
  IssuerAcceptedRating: string;
  CRAGrantReview: string;
  isActive: boolean;
  SubsequentAcceptanceDate: string;
  IssuerAccerptedFinalRating: string;
  IssuerReviewRequest: string;
  DelayReasons?: string;
  LastReviewDate?: string;
  InstrumentName?: {
    id: number;
    Title: string;
    IssueSize: string;
  }[];
  PressRelease: DocumentData;
}

export interface CareersPageData {
  id: number;
  PageTitle: string;
  blocks: [
    TitleBannerBlock,
    DataCardsBlock,
    ImageInfoSliderBlock,
    CareerDataBlock,
    ImageOnlySliderBlock,
    TestimonialsBlock
  ];
}

export interface TestimonialsBlock {
  id: number;
  Title: string;
  SliderData: SliderData[];
}

export interface SliderData {
  id: number;
  Description: string;
  Position: string;
  Name: string;
  Image: ImageData;
}

export interface ImageOnlySliderBlock {
  id: number;
  Title: string;
  SliderImage: {
    id: number;
    Title: string;
    Image: ImageData[];
  };
}

export interface CareerDataBlock {
  id: number;
  Title: string;
  careers: careersData[];
}

export interface careersData {
  id: number;
  JobTitle: string;
  Skills: string;
  Experience: string;
  JobType: string;
  JobDescription: string;
  Salary: string;
  Qualfication: string;
  AboutCompany: string;
  RolesReponsibilities: string;
  job_locations: {
    id: number;
    Location: string;
  }[];
  job_category: {
    id: number;
    Title: string;
  };
}

export interface ImageInfoSliderBlock {
  id: number;
  Title: string;
  Image: ImageData;
  // Description: string;
  InfoSlider: InfoSliderData[];
}

export interface InfoSliderData {
  id: number;
  Title: string;
  Icon: ImageData;
}

export interface DataCardsBlock {
  id: number;
  Title: string;
  Data: {
    id: number;
    Title: string;
    TitleDescCard: TitleDescCard[];
  };
}

export interface TitleDescCard {
  id: number;
  Title: string;
}

export interface TitleBannerBlock {
  id: number;
  Title: string;
  Subtitle: string;
  Image: ImageData;
  Features: FeaturesData[];
  Banner: ImageData;
}

export interface FeaturesData {
  id: number;
  FeatureTitle: string;
  Image: ImageData;
}
