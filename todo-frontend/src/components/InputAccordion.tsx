import { Accordion, AccordionTab } from "primereact/accordion";
import { AccordionItem } from "../types";

export interface InputAccordionProps {
  itemlist: AccordionItem[];
}

/**
 * @Description Accordion wrapper to free-up screen space when not all input fields are needed at once
 * @param itemlist List of AccordionItems to be displayed
 * @returns Accordion component with AccordionTabs for each AccordionItem
 * @author Kyle
 */
const InputAccordion = ({ itemlist }: InputAccordionProps) => {
  const AccordionTabs = () => {
    let x = 0;
    return itemlist.map((item) => {
      const { header, content } = item;
      x = x + 1;
      return (
        <AccordionTab key={`$AccordionTab_${x}_{header}`} header={header}>
          {content}
        </AccordionTab>
      );
    });
  };
  return (
    <Accordion>
      <AccordionTabs />
    </Accordion>
  );
};

export default InputAccordion;
