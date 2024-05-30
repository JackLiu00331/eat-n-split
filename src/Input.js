export default function Input({
  type,
  inputValue,
  onAction,
  children,
  unable = false,
}) {
  return (
    <>
      {children}
      <input
        type={type}
        disabled={unable}
        value={inputValue}
        onChange={onAction}
      />
    </>
  );
}
