import type { MetaFunction } from "@remix-run/node";
import BranchesSection from "~/components/BranchesSection";
import { Site_Title } from "~/credentials";

export default function Branches() {


    return (
        <div className="flex flex-col items-center space-y-2">
            <BranchesSection />
        </div>
    );
}
export const meta: MetaFunction = () => {
    return {
        title: `Branches Page - ${Site_Title}`
    }
}