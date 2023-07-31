import { RadioGroup } from "@headlessui/react";
import { useState } from "react";
import { v4 } from "uuid";
import SizeGuide from "../SizeGuide";
interface SelectSizeProps {
    sizes: any;
    selectedSize: string;
    onSelectedSizeChange: (size: string) => void;
    // other props...
}

function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(' ')
}

export default function SelectSize({ sizes, selectedSize, onSelectedSizeChange }: SelectSizeProps) {
    const sizesList = Array.isArray(sizes) ? sizes : Object.values(sizes);

    // const [selectedSize, setSelectedSize] = useState(sizesList[0]);
    const checkSize = { inStock: true }
    return (
        <div className="">
            {/* <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-gray-900">Size</h3>
                <SizeGuide />
            </div> */}

            <RadioGroup value={selectedSize} onChange={onSelectedSizeChange} className="mt-4">
                <RadioGroup.Label className="sr-only"> Choose a size </RadioGroup.Label>
                {/* <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4"> */}
                <div className="flex gap-x-3">

                    {sizesList.map((size: any) => (
                        <RadioGroup.Option
                            key={v4()}
                            value={size}
                            // disabled={!size.inStock}
                            className={({ active }) =>
                                classNames(
                                    checkSize.inStock
                                        ? 'cursor-pointer bg-white text-gray-900 shadow-sm'
                                        : 'cursor-not-allowed bg-gray-50 text-gray-200',
                                    active ? 'border-green-400' : 'border-gray-400',
                                    'group relative flex items-center justify-center rounded-[16px] border py-2.5 px-8 text-xl font-semibold uppercase  focus:outline-none '
                                )
                            }
                        >
                            {({ active, checked }) => (
                                <>
                                    <RadioGroup.Label as="span">{size}</RadioGroup.Label>
                                    {checkSize.inStock ? (
                                        <span
                                            className={classNames(
                                                active ? 'border-2' : ' border-3',
                                                checked ? 'border-green-400' : 'border-gray-400',
                                                'pointer-events-none absolute -inset-px rounded-[16px]'
                                            )}
                                            aria-hidden="true"
                                        />
                                    ) : (
                                        <span
                                            aria-hidden="true"
                                            className="absolute border-2 border-gray-200 rounded-md pointer-events-none -inset-px"
                                        >
                                            <svg
                                                className="absolute inset-0 w-full h-full text-gray-200 stroke-2"
                                                viewBox="0 0 100 100"
                                                preserveAspectRatio="none"
                                                stroke="currentColor"
                                            >
                                                <line x1={0} y1={100} x2={100} y2={0} vectorEffect="non-scaling-stroke" />
                                            </svg>
                                        </span>
                                    )}
                                </>
                            )}
                        </RadioGroup.Option>
                    ))}
                </div>
            </RadioGroup>
        </div>
    )
}
