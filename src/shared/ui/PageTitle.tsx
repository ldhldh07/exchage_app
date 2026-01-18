interface PageTitleProps {
  title: string;
  subtitle?: string;
}

export function PageTitle({ title, subtitle }: Readonly<PageTitleProps>) {
  return (
    <header className="pt-10 px-20 pb-4 flex flex-col gap-2.5">
      <h1 className="text-page-title text-gray-800">{title}</h1>
      {subtitle && <p className="text-page-subtitle text-gray-700">{subtitle}</p>}
    </header>
  );
}
