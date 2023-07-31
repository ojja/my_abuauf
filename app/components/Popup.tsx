import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

export default function Popup({ isOpen: initialOpenState, children, close, width }: any) {
    const [isOpen, setIsOpen] = useState(initialOpenState);

    function closeModal() {
        setIsOpen(false);
        setTimeout(() => {
            close();
        }, 100);
    }

    return (
        <>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-20" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex items-center justify-center min-h-full p-4">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className={`w-full overflow-hidden align-middle transition-all transform bg-white shadow-xl rounded-2xl ${width === 'full' ? 'max-w-3xl': 'max-w-lg'}`}>
                                    <button onClick={closeModal} type="button" className="absolute p-2 -m-2 text-gray-400 outline-none hover:text-gray-500 top-5 right-5 border border-gray-300 rounded-full">
                                        <span className="sr-only">Close panel</span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg>
                                    </button>
                                    {children}
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
}
