export interface Project {
  id: string;
  title: string;
  year: string;
  category: string;
  techs: string[];
  shortDescription: string;
  fullDescription: string;
  gitHubUrl?: string;
  gitHubBackendUrl?: string;
  gitHubFrontendUrl?: string;
  gitHubMobileUrl?: string;
  image: {
    src: string;
    alt: string;
  }[];
}
