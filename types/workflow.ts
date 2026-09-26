export interface WorkflowStep {
  stage: string;
  toolSlugs: string[];
  description: string;
  dataOutput?: string;
  authorizedScope?: string;
}

export interface Workflow {
  id: string;
  slug: string;
  title: string;
  discipline: string;
  summary: string;
  description: string;
  methodology: string;
  steps: WorkflowStep[];
  defensiveMitigation?: string;
}
