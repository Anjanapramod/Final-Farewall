"use client";

import FooterNew from "@/app/components/footer";
import InnerHeader from "@/app/components/inner-header";

const Layout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Header Section */}
            <InnerHeader />

            {/* Main Content Area */}
            <main className="flex flex-col flex-grow overflow-y-auto px-4 py-6 sm:px-6 lg:px-8 ">
                {children}
            </main>

            {/* Footer Section */}
            <FooterNew />
        </div>
    );
};

export default Layout;
