type Props = {
  title: string;
  text: string;
};

export default function AssetCard({ title, text }: Props) {
  return (
    <div className="border border-gray-700 rounded-md p-4">
      <p className="font-semibold text-white mb-2">{title}</p>
      <p className="text-sm text-gray-300 whitespace-pre-line">{text}</p>
    </div>
  );
}