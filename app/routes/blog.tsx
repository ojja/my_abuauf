import type { MetaFunction } from "@remix-run/node";
import BlogList from '~/components/BlogList';
import { Site_Title } from "~/credentials";

export default function Blog() {


    return (
        <div className="flex flex-col items-center space-y-2">
            <BlogList />
        </div>
    );
}
export const meta: MetaFunction = () => {
    return {
        title: `Blog - ${Site_Title}`
    }
}