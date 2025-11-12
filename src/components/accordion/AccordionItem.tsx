type AccordionItemType = {
  id: number;
  title: string;
  content: string;
};

type AccordionItemProps = {
  item: AccordionItemType;
  isOpen: boolean;
  onToggle: () => void;
};

export default function AccordionItem({
  item,
  isOpen,
  onToggle,
}: AccordionItemProps) {
  return (
    <div className="p-4">
      <button
        onClick={onToggle}
        className="w-full text-left font-semibold text-lg flex justify-between items-center"
      >
        {item.title}
        <span>{isOpen ? "−" : "+"}</span>
      </button>
      {isOpen && <p className="mt-2 text-gray-600">{item.content}</p>}
    </div>
  );
}
