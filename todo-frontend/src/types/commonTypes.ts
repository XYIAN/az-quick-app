import { ReactNode } from "react";

export type AccordionItem = {
  header: string;
  content: string | ReactNode | ReactNode[];
};
