interface BackgroundProps {
  children?: React.ReactNode;
}

export default function Background({ children }: BackgroundProps) {
  return (
    <div className="relative size-full">
      <div className='absolute inset-0 bg-[url("/grid-light.svg")] bg-center bg-repeat [mask-image:linear-gradient(360deg,#0A0A0B,transparent)] dark:bg-[url("/grid-dark.svg")] dark:[mask-image:linear-gradient(360deg,#FFFFFF,transparent)]' />

      <div className="relative flex size-full flex-col">{children}</div>
    </div>
  );
}
