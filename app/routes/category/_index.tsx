import { json, LoaderFunction } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";

export const loader: LoaderFunction = async ({ params }) => {
  return json({ slug: params.slug })
};

export default function Category() {
  return (
    <Outlet />
  )
}
