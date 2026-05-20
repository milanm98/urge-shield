import type { LucideIcon } from "lucide-react";
import { BookOpen, CalendarClock, HeartHandshake, LifeBuoy, Shield, Video } from "lucide-react";

export type ResourceFilter =
  | "urgent"
  | "motivation"
  | "education"
  | "meetings"
  | "blocking"
  | "after-relapse";

export type Resource = {
  id: string;
  title: string;
  description: string;
  href: string;
  filter: ResourceFilter;
  type: "video" | "book" | "support" | "tool" | "article";
};

export const dailyQuote = {
  text: "Delay is a decision. Ten clean minutes can protect the rest of the day.",
  author: "Steady Path"
};

export const filters: Array<{ id: ResourceFilter; label: string; icon: LucideIcon }> = [
  { id: "urgent", label: "Urgent", icon: LifeBuoy },
  { id: "motivation", label: "Motivation", icon: HeartHandshake },
  { id: "education", label: "Education", icon: BookOpen },
  { id: "meetings", label: "Meetings", icon: CalendarClock },
  { id: "blocking", label: "Blocking", icon: Shield },
  { id: "after-relapse", label: "After relapse", icon: Video }
];

export const urgentActions = [
  {
    label: "Text: I need ten minutes",
    description: "Open an SOS message you can send to a trusted person.",
    href: "sms:?&body=I%20am%20having%20a%20gambling%20urge.%20Can%20you%20talk%20with%20me%20for%2010%20minutes%3F"
  },
  {
    label: "Find an online meeting",
    description: "Go straight to a meeting directory.",
    href: "/resources?filter=meetings"
  },
  {
    label: "Block access now",
    description: "Open blocking and self-exclusion resources.",
    href: "/resources?filter=blocking"
  },
  {
    label: "I already gambled",
    description: "Use the no-shame damage-control flow.",
    href: "/slipped"
  }
];

export const resources: Resource[] = [
  {
    id: "ncpg-help",
    title: "National Problem Gambling Helpline",
    description: "U.S.-based help and treatment navigation from the National Council on Problem Gambling.",
    href: "https://www.ncpgambling.org/help-treatment/",
    filter: "urgent",
    type: "support"
  },
  {
    id: "ga-meetings",
    title: "Gamblers Anonymous meeting finder",
    description: "Find in-person and online GA meetings.",
    href: "https://gamblersanonymous.org/find-a-meeting/",
    filter: "meetings",
    type: "support"
  },
  {
    id: "ga-online",
    title: "Online GA meeting finder",
    description: "Search virtual recovery meetings available from many locations.",
    href: "https://www.gameetingfinder.com/",
    filter: "meetings",
    type: "support"
  },
  {
    id: "samhsa-locator",
    title: "SAMHSA treatment locators",
    description: "Find mental health and substance-use treatment services in the United States.",
    href: "https://www.samhsa.gov/find-help/locators",
    filter: "urgent",
    type: "support"
  },
  {
    id: "gamban",
    title: "Gamban blocking software",
    description: "Device-level blocking tool for gambling apps and websites.",
    href: "https://gamban.com/",
    filter: "blocking",
    type: "tool"
  },
  {
    id: "betblocker",
    title: "BetBlocker",
    description: "Free blocking software designed to restrict access to gambling sites.",
    href: "https://betblocker.org/",
    filter: "blocking",
    type: "tool"
  },
  {
    id: "self-exclusion",
    title: "Self-exclusion basics",
    description: "A practical starting point for blocking yourself from gambling services.",
    href: "https://www.ncpgambling.org/help-treatment/",
    filter: "blocking",
    type: "article"
  },
  {
    id: "allen-carr",
    title: "The Easy Way to Stop Gambling",
    description: "A common recovery book many people use as part of their support shelf.",
    href: "https://www.allencarr.com/easyway-stop-gambling/",
    filter: "education",
    type: "book"
  },
  {
    id: "after-slip",
    title: "After a slip: protect the next hour",
    description: "Return to the app's no-shame damage-control flow.",
    href: "/slipped",
    filter: "after-relapse",
    type: "support"
  },
  {
    id: "urge-video",
    title: "Search: gambling urge recovery videos",
    description: "Open a focused YouTube search for recovery and urge-surfing support.",
    href: "https://www.youtube.com/results?search_query=gambling+addiction+urge+recovery",
    filter: "urgent",
    type: "video"
  },
  {
    id: "motivation-video",
    title: "Search: gambling recovery stories",
    description: "Listen to people describe how they stopped and rebuilt.",
    href: "https://www.youtube.com/results?search_query=gambling+addiction+recovery+story",
    filter: "motivation",
    type: "video"
  },
  {
    id: "daily-reminder",
    title: "Today only",
    description: "You do not have to promise forever. Protect today, then repeat tomorrow.",
    href: "/dashboard",
    filter: "motivation",
    type: "article"
  }
];
