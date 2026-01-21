import Link from "next/link";

export function Footer() {
    return (
        <footer className="py-6 md:px-8 md:py-0 border-t">
            <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row mx-auto px-4">
                <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
                    © 2026 实用工具箱 (Online Utilities). Built with{" "}
                    <a
                        href="https://nextjs.org"
                        target="_blank"
                        rel="noreferrer"
                        className="font-medium underline underline-offset-4"
                    >
                        Next.js
                    </a>
                    .
                </p>

            </div>
        </footer>
    );
}
