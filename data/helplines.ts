export interface Helpline {
  name: string;
  description: string;
  url: string;
}

export const helplines: Helpline[] = [
  {
    name: "Crisis Text Line",
    description: "Connect with a trained Crisis Counselor for free, 24/7 support.",
    url: "https://www.crisistextline.org",
  },
  {
    name: "The Trevor Project",
    description: "Support for LGBTQ young people in crisis, 24/7, all year round.",
    url: "https://www.thetrevorproject.org",
  },
  {
    name: "NEDA",
    description: "The National Eating Disorders Association supports individuals and families affected by eating disorders.",
    url: "https://www.nationaleatingdisorders.org",
  },
   {
    name: "StopBullying.gov",
    description: "Find resources and support to prevent and address bullying.",
    url: "https://www.stopbullying.gov",
  }
];
