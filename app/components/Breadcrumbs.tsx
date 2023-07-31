import { ChevronRightIcon } from '@heroicons/react/20/solid';
import React, { Fragment } from 'react';
import i18n from 'i18next';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';
import { Link } from '@remix-run/react';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function Breadcrumbs({ breadcrumbs, className }) {
  return (
    <nav
      aria-label="Breadcrumbs"
      className={classNames("order-first flex space-x-2 text-sm font-semibold items-center capitalize", className)}
    >
      {breadcrumbs.map((item, index, breadcrumbs) => (
        <Fragment key={index}>
          {index === 0 ? (
            ""
          ) : i18n.language === "ar" ? (
            <ChevronLeftIcon className="w-4 h-4 select-none text-slate-500" />
          ) : (
            <ChevronRightIcon className="w-4 h-4 select-none text-slate-500" />
          )}
          {index + 1 === breadcrumbs.length ? (
            <span className=" text-green-200 hover:text-slate-600 ">
              {item.name}
            </span>
          ) : (
            <Link to={item.href} className="text-gray-50 hover:text-slate-600">
              {item.name}
            </Link>
          )}
        </Fragment>
      ))}
    </nav>
  );
}
