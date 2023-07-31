import type { MetaFunction } from "@remix-run/node";
import { Site_Title } from "~/credentials";


export default function GiveOpinion() {
    return (
        <>
            <div className="flex flex-col items-center space-y-2">
                <h1>Give Your Opinion</h1>
            </div>
        </>
    )

}
export const meta: MetaFunction = () => {
    return {
        title: `Give Your Opinion - ${Site_Title}`
    }
}
