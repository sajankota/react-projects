import Accordion from "../../../components/accordion/Accordion";

const accordionItems = [
  {
    id: 1,
    title: "What is React?",
    content: "React is a JavaScript library for building UIs.",
  },
  {
    id: 2,
    title: "What is JSX?",
    content: "JSX is a syntax extension for writing React elements easily.",
  },
  {
    id: 3,
    title: "What are components?",
    content: "Components are reusable UI pieces in React.",
  },
];

export default function AccordionPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Accordion Project</h1>
      <Accordion items={accordionItems} />
    </div>
  );
}
