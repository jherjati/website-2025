export interface DropdownItem {
  title: string;
  subtitle: string;
  href: string;
  image: ImageMetadata;
}

export interface NavigationItem {
  href: string;
  label: string;
  dropdowns?: DropdownItem[];
}

export interface LayoutProps {
  theme?: string;
  orangeFooter?: boolean;
  hideGridOnMobile?: boolean;
  isBlack?: boolean
}