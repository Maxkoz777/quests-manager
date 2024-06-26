interface Props {
  text: string;
  className?: string;
}

export const TruncatedText = ({ text, className }: Props) => {
  return (
    <div
      className={`whitespace-nowrap overflow-hidden text-ellipsis ${className}`}
    >
      {text}
    </div>
  );
};
