import { useEffect, useState } from "react";
import { API_ENDPOINT } from "~/config";
import { useTranslation } from "react-i18next";
import { fetchAreas, fetchGovs } from "~/utils/general";
import Cookies from "js-cookie";
import SelectInput from "./SelectInput";
import { RiCheckboxBlankCircleLine, RiRadioButtonLine } from "react-icons/ri";
import { INPUT_CLASSES, LABEL_CLASSES } from "~/commonUIClasses";

export default function ShippingOptions({ setValue, register, errors, watch }: any) {
  const { t } = useTranslation('fields');
  const { i18n } = useTranslation();

  const [pickFromStore, setPickFromStore] = useState(false);
  const [typeApartment, setTypeApartment] = useState(true);

  const [govs, setGovs] = useState([]);
  // const [govs, setGovs] = useState([]);
  const [areas, setAreas] = useState<any[]>([]);
  const [street, setStreet] = useState('');
  // const [selectedGovId, setSelectedGovId] = useState();
  const [building_no, setBuilding_no] = useState('');
  const [floor_no, setFloor_no] = useState('');
  const [apartment_no, setApartment_no] = useState('');
  const [shippingMethod, setShippingMethod] = useState('');

  // const handleOptionChangeType = (event: any) => {
  //   if (event.target.value === "villa") {
  //     setTypeApartment(false);
  //   } else {
  //     setTypeApartment(true);
  //   }
  // };

  const handleAreaChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedAreaId = event.target.value;
    const selectedArea = areas.find((area: any) => area.area_id === selectedAreaId);
    //   handleChange(event);
    //   handleChange({
    //     target: {
    //         name: "shipping_fee",
    //         value: selectedArea ? selectedArea.rate : 0,
    //     },
    // });
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchGovs();
      if (response) {
        setGovs(response.govs);
      } else {
        // Handle the case when fetching the cities fails
      }
    };

    fetchData();
  }, []);

  const selectedGovId = watch("gov_id");
  const apartment_type = watch("apartment_type");
  const shipping_method = watch("shipping_method");
  // console.log('govs', govs)
  useEffect(() => {
    const fetchAreasByGovId = async () => {
      if (selectedGovId) {
        const response = await fetchAreas(selectedGovId);
        if (response === "Err in payload") {
          return;
        }
        if (response) {
          setAreas(response);
        } else {
          // Handle the case when fetching the areas fails
        }
      } else {
        setAreas([]);
      }
    };

    fetchAreasByGovId();
  }, [selectedGovId]);

  const selectedAreaId = watch("area_id");
  const formData = watch();
  console.log(formData);

  useEffect(() => {
    if (selectedGovId) {
      Cookies.set("selectedGovId", selectedGovId);
    }
  }, [selectedGovId]);

  useEffect(() => {
    if (selectedAreaId) {
      Cookies.set("selectedAreaId", selectedAreaId);
      const selectedArea = areas.find((area: any) => area.city_id === selectedAreaId);
      setValue("shipping_fee", selectedArea ? selectedArea.city_rate : 0);
    }
  }, [selectedAreaId]);

  // Check if cookies exist
  const selectedGovIdFromCookie = Cookies.get("selectedGovId");
  const selectedAreaIdFromCookie = Cookies.get("selectedAreaId");

  useEffect(() => {
    if (selectedGovIdFromCookie) {
      setValue("gov_id", selectedGovIdFromCookie);
    }
    if (selectedAreaIdFromCookie) {
      setValue("area_id", selectedAreaIdFromCookie);
    }
  }, []);

  return (
    <div>
      <ul className="grid w-full gap-6 md:grid-cols-2">
        <li className="relative">
          <input
            type="radio"
            id="shipping_method_delivery"
            value="Delivery"
            className="hidden peer"
            {...register('shipping_method')}
            defaultChecked
          />
          <label
            htmlFor="shipping_method_delivery"
            className="inline-flex items-center justify-between w-full px-5 py-3 text-gray-500 bg-white border-gray-200 rounded-[20px] cursor-pointer peer-checked:border-green-200 border-2 peer-checked:border-[3px] hover:border-green-200 "          >
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M3.5 6.74139C3.5 6.24024 3.89457 5.83398 4.38129 5.83398H15.0543C15.5411 5.83398 15.9356 6.24024 15.9356 6.74139V6.87125H20.3818C20.6819 6.87125 20.9614 7.02853 21.1235 7.28863L24.3604 12.4829C24.4516 12.6291 24.5 12.7992 24.5 12.9729V19.1859C24.5 19.4266 24.4071 19.6574 24.2419 19.8276C24.0766 19.9978 23.8524 20.0934 23.6187 20.0933L22.1913 20.0933C21.7973 21.3202 20.6263 22.1673 19.313 22.1673C18.0063 22.1673 16.8403 21.3286 16.4407 20.1115L11.4974 20.1113C11.0978 21.3285 9.9318 22.1673 8.62502 22.1673C7.31177 22.1673 6.14065 21.3201 5.74676 20.0932L4.38122 20.0931C3.89453 20.0931 3.5 19.6868 3.5 19.1857V6.74139ZM5.74679 18.2784C6.14072 17.0515 7.31181 16.2044 8.62502 16.2044C9.94469 16.2044 11.1208 17.0599 11.509 18.2965H14.173L14.1729 12.986C14.1729 12.9815 14.1728 12.9771 14.1728 12.9727C14.1728 12.9682 14.1729 12.9638 14.1729 12.9594L14.1728 7.77867C14.1728 7.77215 14.1729 7.76563 14.173 7.75912V7.64879H5.26257V18.2784L5.74679 18.2784ZM15.9356 18.2966V13.8801H22.7374V18.2785L22.1913 18.2785C21.7974 17.0516 20.6263 16.2044 19.313 16.2044C17.9933 16.2044 16.8171 17.0599 16.429 18.2967L15.9356 18.2966ZM22.006 12.0653L19.9001 8.68606H15.9356V12.0653H22.006ZM8.62502 18.0192C7.88106 18.0192 7.36862 18.5916 7.36862 19.1859C7.36862 19.7801 7.88106 20.3525 8.62502 20.3525C9.36898 20.3525 9.88142 19.7801 9.88142 19.1859C9.88142 18.5916 9.36898 18.0192 8.62502 18.0192ZM19.313 18.0192C18.5691 18.0192 18.0566 18.5916 18.0566 19.1859C18.0566 19.7801 18.5691 20.3525 19.313 20.3525C20.057 20.3525 20.5694 19.7801 20.5694 19.1859C20.5694 18.5916 20.057 18.0192 19.313 18.0192Z" fill="#163300" />
            </svg>

            <div className="block mr-auto ml-4">
              <div className="w-full text-xl font-semibold">{t('ship_to_me')}</div>
              <p className=" text-gray-50 text-base font-semibold">{t('message_to_me')}</p>
            </div>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.41418 11.272C7.33297 11.3494 7.26833 11.4425 7.22417 11.5456C7.18 11.6487 7.15723 11.7598 7.15723 11.872C7.15723 11.9842 7.18 12.0952 7.22417 12.1983C7.26833 12.3015 7.33297 12.3946 7.41418 12.472L15.9852 21.043L17.1852 19.843L9.21418 11.872L17.1852 3.89997L15.9852 2.69997L7.41418 11.272Z" fill="black" />
            </svg>

          </label>
        </li>
        <li className="relative">
          <input
            type="radio"
            id="shipping_method_from_branch"
            {...register('shipping_method')}
            value="Branch"
            className="hidden peer"
          />
          <label
            htmlFor="shipping_method_from_branch"
            className="inline-flex items-center justify-between w-full h-full px-5 py-3 text-gray-500 bg-white border-gray-200 rounded-[20px] cursor-pointer peer-checked:border-green-200 border-2 peer-checked:border-[3px] hover:border-green-200 " >
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M5.67148 4.09221C5.85313 3.72875 6.21883 3.5 6.61823 3.5H21.2298C21.6267 3.5 21.9905 3.72586 22.1733 4.08575L24.2607 8.19419C24.3401 8.35045 24.3811 8.52409 24.3803 8.70014C24.3728 10.2077 24.0926 11.5352 23.37 12.5055C23.0605 12.921 22.6918 13.2426 22.2767 13.4781V23.4138C22.2767 24.0137 21.8008 24.5 21.2136 24.5H6.61851C6.0314 24.5 5.55545 24.0137 5.55545 23.4138V13.4826C5.13451 13.2464 4.76161 12.9224 4.45108 12.5009C3.72892 11.5206 3.47422 10.183 3.50203 8.67422C3.50507 8.5094 3.54478 8.34746 3.61815 8.20065L5.67148 4.09221ZM7.68157 13.9848V22.3275H10.8223V17.1995C10.8223 16.5996 11.2982 16.1133 11.8853 16.1133H15.9654C16.5525 16.1133 17.0285 16.5996 17.0285 17.1995V22.3275H20.1506V13.9847C18.889 13.9766 17.7893 13.5347 17.0285 12.5494C16.2724 13.5398 15.1762 13.9848 13.9157 13.9848C12.6668 13.9848 11.5792 13.548 10.8223 12.5783C10.0584 13.5539 8.9482 13.9804 7.68157 13.9848ZM11.9467 9.78059C12.0527 10.4429 12.2401 10.8955 12.4595 11.1909C12.7416 11.5707 13.1663 11.8124 13.9157 11.8124C14.6652 11.8124 15.0878 11.5707 15.3676 11.1926C15.586 10.8974 15.7721 10.4444 15.876 9.78059H11.9467ZM18.1731 9.78059H22.1789C22.0808 10.4458 21.8962 10.897 21.6781 11.1898C21.3991 11.5645 20.9665 11.8124 20.1861 11.8124C19.4061 11.8124 18.9685 11.5644 18.6841 11.186C18.4635 10.8925 18.276 10.4422 18.1731 9.78059ZM22.1733 8.20065L20.5839 5.67246H7.26901L5.67603 8.20065H22.1733ZM5.67603 9.78059C5.75881 10.454 5.93669 10.9052 6.14973 11.1944C6.41813 11.5587 6.85108 11.8124 7.66192 11.8124C8.47234 11.8124 8.91122 11.5587 9.18594 11.1898C9.40192 10.8998 9.58312 10.4497 9.67182 9.78059H5.67603ZM14.9023 22.3275V18.2858H12.9484V22.3275H14.9023Z" fill="#163300" />
            </svg>

            <div className="block mr-auto ml-4">
              <div className="w-full text-xl font-semibold">
                {t('pick_from_branch')}
              </div>
            </div>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.41418 11.272C7.33297 11.3494 7.26833 11.4425 7.22417 11.5456C7.18 11.6487 7.15723 11.7598 7.15723 11.872C7.15723 11.9842 7.18 12.0952 7.22417 12.1983C7.26833 12.3015 7.33297 12.3946 7.41418 12.472L15.9852 21.043L17.1852 19.843L9.21418 11.872L17.1852 3.89997L15.9852 2.69997L7.41418 11.272Z" fill="black" />
            </svg>

          </label>
        </li>
      </ul>
      {shipping_method === 'Branch' ? (
        <div className="w-1/2 mt-5">
          <label htmlFor="" className={LABEL_CLASSES}>{t('choose_branch')}</label>
          <div className="mt-1">
            <SelectInput
              value={watch('pick_from_branch')} // Assuming you're using react-hook-form's watch function
              options={[
                { label: t('choose_branch'), value: '' },
                { label: `${t('cities.cairo')} ${t('branch')}`, value: 'cairo_branch' },
                { label: `${t('cities.giza')} ${t('branch')}`, value: 'giza_branch' },
                { label: `${t('cities.alexandria')} ${t('branch')}`, value: 'alexandria_branch' },
                { label: `${t('cities.aswan')} ${t('branch')}`, value: 'aswan_branch' },
              ]}
              register={register('pick_from_branch', {
                required: { value: true, message: t('pick_from_branch_required') }
              })}
              error={errors.pick_from_branch && errors.pick_from_branch.type === "required"}
            />
            {errors.pick_from_branch && errors.pick_from_branch.type === "required" && (<p className="mt-1 text-xs text-red-500">{errors.pick_from_branch.message}</p>)}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-4 mt-5">

          <div className="col-span-4">
            <label htmlFor="" className={LABEL_CLASSES}>{t('gov')}</label>
            <div className="mt-1">
              <select className={INPUT_CLASSES}>
                <option value="">Egypt</option>
                <option value="">Saudi Arabia</option>
                <option value="">United Arab Emirates</option>
              </select>
            </div>
          </div>

          <div className="col-span-2">
            <label className={LABEL_CLASSES}>
              {t('city')}
            </label>
            <div className="mt-1">
              <div>
                <SelectInput
                  value={watch('gov_id') || ''}
                  options={[
                    { label: t('select_city'), value: "" },
                    ...govs.map((item: any) => ({ label: i18n.language === 'ar' ? item.gov_name : item.gov_name_en, value: item.gov_id })),
                  ]}
                  register={register('gov_id', {
                    required: { value: true, message: t('gov_id_required') }
                  })}
                />
              </div>
              {errors.gov_id && errors.gov_id.type === "required" && (<p className="mt-1 text-xs text-red-500">{errors.gov_id.message}</p>)}
            </div>
          </div>

          <div className="col-span-2">
            <label htmlFor="" className={LABEL_CLASSES}>{t('area')}</label>
            <div className="mt-1">
              <SelectInput
                value={watch("area_id") || ""}
                options={[
                  { label: t("select_area"), value: "" },
                  ...areas?.map((area) => ({
                    label:
                      i18n.language === "ar" ? area.city_name : area.city_name_en,
                    value: area.city_id,
                  })),
                ]}
                register={register('area_id', {
                  required: { value: true, message: t('area_id_required') }
                })}
              />
              {errors.area_id && errors.area_id.type === "required" && (<p className="mt-1 text-xs text-red-500">{errors.area_id.message}</p>)}
            </div>
          </div>
          <div className="col-span-4">
            <div>
              <label htmlFor="" className={LABEL_CLASSES}>{t('street_name')}</label>
              <input
                type="text"
                id="full_address"
                {...register('full_address', {
                  required: { value: true, minLength: 10, message: t('street_name_required') }
                })}
                className={`${INPUT_CLASSES} ${errors.full_address && 'border-red-500'}`}
              />
              {errors.full_address && errors.full_address.type === "required" && (<p className="mt-1 text-xs text-red-500">{errors.full_address.message}</p>)}
            </div>
          </div>
          <div className="col-span-4">
            <h3 className={LABEL_CLASSES}>{t('property_type')}</h3>
            <div className="mt-1 space-x-5">
              <div>
                <div className="space-x-5">
                  <label htmlFor="Flat" className='inline-block text-black'>
                    <div className='relative flex items-center py-1 pl-3'>
                      <input
                        type="radio"
                        id="Flat"
                        className='hidden peer'
                        value='flat'
                        {...register('apartment_type')}
                        defaultChecked
                      />
                      <div className='absolute left-0 invisible mt-1 peer-checked:visible top-1'>
                        <RiRadioButtonLine className='peer-checked:bg-green-200' />
                      </div>
                      <div className='absolute left-0 visible mt-1 peer-checked:invisible top-1'>
                        <RiCheckboxBlankCircleLine className='peer-checked:bg-green-200' />
                      </div>
                      <span className='ml-2 text-base font-medium'>{t('apartment')}</span>
                    </div>
                  </label>
                  <label htmlFor="Villa" className='inline-block text-black'>
                    <div className='relative flex items-center py-1 pl-3'>
                      <input
                        type="radio"
                        id="Villa"
                        className='hidden peer'
                        value='villa'
                        {...register('apartment_type')}
                      />
                      <div className='absolute left-0 invisible mt-1 peer-checked:visible top-1'>
                        <RiRadioButtonLine className='peer-checked:bg-green-200' />
                      </div>
                      <div className='absolute left-0 visible mt-1 peer-checked:invisible top-1'>
                        <RiCheckboxBlankCircleLine className='peer-checked:bg-green-200' />
                      </div>
                      <span className='ml-2 text-base font-medium'>{t('villa')}</span>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </div>
          {apartment_type === 'flat' ? (
            <>
              <div>
                <label htmlFor="" className={LABEL_CLASSES}>{t('building_number')}</label>
                <input
                  type="text"
                  className={`${INPUT_CLASSES} ${errors.building_number && 'border-red-500'}`}
                  {...register('building_number', {
                    required: { value: true, message: t('building_number_required') }
                  })}
                />
                {errors.building_number && errors.building_number.type === "required" && (<p className="mt-1 text-xs text-red-500">{errors.building_number.message}</p>)}
              </div>
              <div>
                <label htmlFor="" className={LABEL_CLASSES}>{t('floor')}</label>
                <input
                  type="text"
                  id="floor"
                  className={`${INPUT_CLASSES} ${errors.floor && 'border-red-500'}`}
                  {...register('floor', {
                    required: { value: true, message: t('floor_required') }
                  })}
                />
                {errors.floor && errors.floor.type === "required" && (<p className="mt-1 text-xs text-red-500">{errors.floor.message}</p>)}
              </div>
              <div>
                <label htmlFor="" className={LABEL_CLASSES}>{t('apartment_number')}</label>
                <input
                  type="text"
                  {...register('apartment', {
                    required: { value: true, message: t('apartment_required') }
                  })}
                  className={`${INPUT_CLASSES} ${errors.apartment && 'border-red-500'}`}
                />
                {errors.apartment && errors.apartment.type === "required" && (<p className="mt-1 text-xs text-red-500">{errors.apartment.message}</p>)}
              </div>
            </>
          ) : (
            <div>
              <label htmlFor="" className={LABEL_CLASSES}>{t('building_number')}</label>
              <input
                type="text"
                className={`${INPUT_CLASSES} ${errors.building_number && 'border-red-500'}`}
                {...register('building_number', {
                  required: { value: true, message: t('building_number_required') }
                })}
              />
              {errors.building_number && errors.building_number.type === "required" && (<p className="mt-1 text-xs text-red-500">{errors.building_number.message}</p>)}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
