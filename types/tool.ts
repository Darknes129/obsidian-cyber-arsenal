export type ToolType = 
  | "cli" 
  | "gui" 
  | "desktop"
  | "web" 
  | "api" 
  | "docker" 
  | "self-hosted" 
  | "framework";

export type ToolPlatform = "Linux" | "macOS" | "Windows" | "Web" | "Docker";

export type ToolStatus = "Active" | "Maintained" | "Archived" | "Superseded" | "Legacy";

export interface ToolCommand {
  title: string;
  command: string;
  shell?: string;
  description?: string;
  note?: string;
  flagsExplained?: { flag: string; meaning: string }[];
}

export interface ToolInstallation {
  linux?: string[];
  macos?: string[];
  windows?: string[];
  docker?: string[];
  pip?: string[];
  go?: string[];
  notes?: string;
}

export interface Tool {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  primaryCategory: string;
  categories: string[];
  tags: string[];
  type: ToolType;
  platforms: ToolPlatform[];
  urls: {
    official?: string;
    github?: string;
    documentation?: string;
  };
  status: ToolStatus;
  successor?: {
    name: string;
    url: string;
  };
  lastVerified: string;
  dualUseNotice?: boolean;
  requirements?: string[];
  installation?: ToolInstallation;
  quickStart?: {
    command: string;
    shell?: string;
    note?: string;
  };
  capabilities: string[];
  useCases: string[];
  commands?: ToolCommand[];
  outputExplained?: string;
  workflows?: string[];
  troubleshooting?: { issue: string; resolution: string }[];
  relatedToolSlugs: string[];
}

export interface Category {
  slug: string;
  name: string;
  description: string;
  iconName: string;
  relatedCategorySlugs?: string[];
}
