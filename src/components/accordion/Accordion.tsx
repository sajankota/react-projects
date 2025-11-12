import { useState } from "react";
import AccordionItem from "./AccordionItem";

type AccordionItemType = {
  id: number;
  title: string;
  content: string;
};

type AccordionProps = {
  items: AccordionItemType[];
};

export default function Accordion({ items }: AccordionProps) {
  const [openId, setOpenId] = useState<number | null>(null);

  const toggle = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="max-w-xl mx-auto border rounded-lg divide-y divide-gray-300">
      {items.map((item) => (
        <AccordionItem
          key={item.id}
          item={item}
          isOpen={item.id === openId}
          onToggle={() => toggle(item.id)}
        />
      ))}
    </div>
  );
}
