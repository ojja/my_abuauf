import React, { Fragment, useEffect, memo } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { useShoppingCart } from "~/stores/cartStore";
import { v4 } from 'uuid';
import MiniCartItem from './cart/MiniCartItem';
import MiniCartUpSell from './cart/MiniCartUpSell';
import MiniCartTools from './cart/MiniCartTools';
import i18next from 'i18next';
import FormatCurrency from '~/utils/FormatCurrency';
import MiniCartItemLoader from './cart/MiniCartItemLoader';
import { Link } from '@remix-run/react';
import { useTranslation } from 'react-i18next';


const ShoppingCart = () => {
  const { t, i18n } = useTranslation();

  const { closeCart, cartItems, removeFromCart, openCart, decreaseCartQuantity, addToCart, isOpen, totalPrice } = useShoppingCart();
  const isClientRender = typeof window !== 'undefined';
  useEffect(() => {
    if (isClientRender) {
      closeCart();
    }
  }, [isClientRender]);
  return (
    <div>
      {isOpen && isClientRender && (
        <Transition appear show={isOpen} as="div">
          <Dialog as="div" className="relative z-30" onClose={closeCart}>
            <Transition.Child
              as='button'
              enter="ease-in-out duration-500"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in-out duration-500"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" onClick={() => closeCart} />
            </Transition.Child>

            <div className="fixed inset-0 overflow-hidden">
              <div className="absolute inset-0 overflow-hidden">
                <div className="fixed inset-y-0 right-0 flex md:max-w-[600px] pointer-events-none">
                  <Transition.Child
                    as="div"
                    enter="transform transition ease-in-out duration-500 sm:duration-700"
                    // enterFrom="-translate-x-full"
                    enterFrom={`${i18n.language === 'en' ? 'translate-x-full' : '-translate-x-full'}`}
                    enterTo="translate-x-0"
                    leave="transform transition ease-in-out duration-500 sm:duration-700"
                    leaveFrom="translate-x-0"
                    leaveTo={`${i18n.language === 'en' ? 'translate-x-full' : '-translate-x-full'}`}
                  >
                    <Dialog.Panel className="w-screen h-full max-w-[600px] pointer-events-auto">

                      <div className="relative flex flex-col h-full overflow-y-scroll bg-white shadow-xl">
                        <div className="relative flex-1 py-5 overflow-y-auto">
                          <div className="flex items-start justify-between px-5 pb-5 border-b border-[#C6C6C6]">
                            {cartItems.length > 0 && (
                              <Dialog.Title className="text-3xl font-bold text-black t">سلة التسوق</Dialog.Title>
                            )}
                            <div className="flex items-center ml-3 h-7">
                              <button
                                type="button"
                                className="p-2 -m-2 text-gray-400 border-2 border-gray-400 outline-none hover:text-gray-500 rounded-100"
                                onClick={closeCart}
                              >
                                <span className="sr-only">Close panel</span>
                                <XMarkIcon className="w-6 h-6" aria-hidden="true" />
                              </button>
                            </div>
                          </div>

                          {cartItems && cartItems.length > 0 ? (
                            <div className="px-4 mt-8 md:px-10">
                              <div className="flow-root">
                                <ul role="list" className="-my-6 ">
                                  {cartItems.map((item) => (
                                    <li key={v4()} className="flex py-6">

                                      <MiniCartItem
                                        id={item.id}
                                        price={item.price}
                                        quantity={item.quantity}
                                        // color={item.color} 
                                        // size={item.size} 
                                        slug={item.slug}
                                        thumbnail={item.thumbnail}
                                        removeFromCart={removeFromCart}
                                        decreaseCartQuantity={decreaseCartQuantity}
                                        addToCart={addToCart}
                                      />
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          ) : (
                            <div className='flex mt-auto items-center justify-center h-[90%]'>
                              <p className="mt-0.5 text text-slate-500">{t('empty_cart')}</p>
                            </div>
                          )}
                          {cartItems.length > 0 && (
                            <>
                              <MiniCartTools />
                              <MiniCartUpSell />
                            </>
                          )}
                        </div>
                        {cartItems.length > 0 && (
                          <div className="px-4 py-10 border-t border-gray-200 top-shadow">
                            <div className="flex justify-between text-base font-medium text-gray-900">
                              <p className='text-base font-semibold text-gray-50'>{t('shipping_subtotal')}</p>
                              <p className='text-xl font-bold text-black '><FormatCurrency value={totalPrice} /></p>
                            </div>
                            <div className="flex justify-between text-base font-medium text-gray-900">
                              <p className='text-base font-semibold text-gray-50'>{t('subtotal')}</p>
                              <p className='text-xl font-bold text-black '><FormatCurrency value={totalPrice} /></p>
                            </div>
                            <div className="flex flex-col justify-center gap-4 mt-4 text-center">
                              <button
                                onClick={closeCart}
                                className="flex items-center justify-center px-6 py-3 text-base font-semibold text-white bg-green-200 border border-transparent shadow-sm md:text-xl rounded-100 hover:bg-green-400"
                              >
                                {t('continue_shopping')}
                              </button>
                              <Link
                                to="/cart"
                                onClick={closeCart}
                                className="flex items-center justify-center px-6 py-3 text-base font-semibold text-green-200 bg-green-300 border border-transparent shadow-sm md:text-xl rounded-100 hover:bg-green-200 hover:text-white"
                              >
                                {t('view_cart')}
                              </Link>
                            </div>
                          </div>
                        )}
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </div>
          </Dialog>
        </Transition>
      )
      }
    </div >
  )
}
export default memo(ShoppingCart)