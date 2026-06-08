export type ProjectStatus = "live" | "in_progress";
export type ProjectType = "client" | "personal";

export type Project = {
  num: number;
  title: string;
  subHeading: string;
  description: string;
  tags: string[];
  status: ProjectStatus;
  type: ProjectType;
  href: string;
};
