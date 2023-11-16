import { appDomain } from "@/config";

export default function AppFooter() {
  return (
    <footer className="mt-32 sm:mt-40" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="px-6 pb-8 mx-auto max-w-7xl lg:px-8">
        <div className="pt-8 mt-16 border-t border-gray-900/10 sm:mt-20 md:flex md:items-center md:justify-between lg:mt-24">
          <p className="mt-8 text-xs leading-5 text-gray-500 md:order-1 md:mt-0">
            &copy; {new Date().getFullYear()} {appDomain}.
          </p>
        </div>
      </div>
    </footer>
  );
}
