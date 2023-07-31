import type { MetaFunction } from "@remix-run/node";
import { Site_Title } from "~/credentials";


export default function Partners() {
    return (
        <>
            <div className="flex flex-col items-center space-y-2">
                <h1>Partners</h1>
            </div>
        </>
    )

}
export const meta: MetaFunction = () => {
    return {
        title: `Partners - ${Site_Title}`
    }
}
