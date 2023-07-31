import type { MetaFunction } from "@remix-run/node";
import RecipesSection from "~/components/corporate/RecipesSection";
import { Site_Title } from "~/credentials";


export default function Recipes() {
    return (
        <>
            <div className="flex flex-col items-center space-y-2">
                <RecipesSection />
            </div>
        </>
    )

}
export const meta: MetaFunction = () => {
    return {
        title: `recipe Page - ${Site_Title}`
    }
}
