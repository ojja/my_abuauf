import type { MetaFunction } from "@remix-run/node";
import AppSection from "~/components/corporate/AppSection";
import { Site_Title } from "~/credentials";

export default function App() {


    return (
        <div className="flex flex-col items-center space-y-2">
            <AppSection />
        </div>
    );
}
export const meta: MetaFunction = () => {
    return {
        title: `APP Page - ${Site_Title}`
    }
}