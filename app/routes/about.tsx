import type { MetaFunction } from "@remix-run/node";
import AboutSection from "~/components/AboutSection";
import { Site_Title } from "~/credentials";

export default function About() {


    return (
        <div className="flex flex-col items-center space-y-2">
            <AboutSection />
        </div>
    );
}
export const meta: MetaFunction = () => {
    return {
        title: `About Page - ${Site_Title}`
    }
}