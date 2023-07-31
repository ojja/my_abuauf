import { LoaderArgs, MetaFunction } from "@remix-run/node";
import { Site_Title } from "~/credentials";
import {
    Link,
    useSearchParams,
  } from "@remix-run/react";
import ThanksComponent from "~/components/checkout/ThanksComponent";
  
export const meta: MetaFunction = () => {
    return {
        title: `Thank You - ${Site_Title}`
    }
}

export default function Thanks() {
    const [searchParams] = useSearchParams();
    const orderID = searchParams.get('orderID');
    return (
        <div className="bg-white">
            <section className="">
                <ThanksComponent orderID={orderID}/>
            </section>
        </div>
    )
}