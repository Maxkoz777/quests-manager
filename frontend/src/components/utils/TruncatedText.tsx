interface Props {
  text: string;
  className?: string;
}

export const TruncatedText = ({ text, className }: Props) => {
  return (
    <div
      className={`w-48 md:w-56 whitespace-nowrap overflow-hidden text-ellipsis ${className}`}
    >
      {text}
    </div>
  );
};
