import type { MetaFunction } from "@remix-run/node";
import RewardsSection from "~/components/corporate/RewardsSection";
import { Site_Title } from "~/credentials";

export default function Export() {


    return (
        <div className="flex flex-col items-center space-y-2">
            <RewardsSection />
        </div>
    );
}
export const meta: MetaFunction = () => {
    return {
        title: `Export Page - ${Site_Title}`
    }
}