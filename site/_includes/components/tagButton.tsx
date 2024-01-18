type Props = {
  tag: string;
};

export function TagButton({ tag }: Props) {
  return <button>{tag}</button>;
}
