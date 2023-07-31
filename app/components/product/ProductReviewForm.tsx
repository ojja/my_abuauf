import React, { useState } from 'react';

function ProductReviewForm() {
  const [selectedRating, setSelectedRating] = useState('1');

  const handleRatingChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setSelectedRating(e.target.value);
  };
  return (
    <div className="comments-container">
      <form action="" method="post" id="commentform" className="comment-form" >
        <div className="emojis">
          <ul className="new-emojis grid grid-cols-5 my-9 gap-x-3">
            <li className='relative'>

              <input type="radio" name="rating" checked={selectedRating === "1"} 
                onChange={handleRatingChange} value="1" className=' absolute opacity-0 h-full w-full !important top-0 left-0' />
              <div className={`flex flex-col items-center ${selectedRating === "1" ? " border-[3px] border-green-200" : " border-2 border-gray-400"} bg-white p-2.5 text-base text-gray-50 rounded-[20px]`}>
                <span>😍</span>
                ممتاز
              </div>
            </li>
            <li className='relative'>
              <input type="radio" name="rating" checked={selectedRating === "2"}
                onChange={handleRatingChange} value="2" className=' absolute opacity-0 h-full w-full !important top-0 left-0' />
              <div className={`flex flex-col items-center ${selectedRating === "2" ? " border-[3px] border-green-200" : " border-2 border-gray-400"} bg-white p-2.5 text-base text-gray-50 rounded-[20px]`}>
                <span>😄</span>
                جيد
              </div>
            </li>
            <li className='relative'>

              <input type="radio" name="rating" checked={selectedRating === "3"}
                onChange={handleRatingChange} value="3" className=' absolute opacity-0 h-full w-full !important top-0 left-0' />
              <div className={`flex flex-col items-center ${selectedRating === "3" ? " border-[3px] border-green-200" : " border-2 border-gray-400"} bg-white p-2.5 text-base text-gray-50 rounded-[20px]`}>
                <span>🙂</span>
                عادي
              </div>
            </li>
            <li className='relative'>

              <input type="radio" name="rating" checked={selectedRating === "4"}
                onChange={handleRatingChange} value="4" className=' absolute opacity-0 h-full w-full !important top-0 left-0' />
              <div className={`flex flex-col items-center ${selectedRating === "4" ? " border-[3px] border-green-200" : " border-2 border-gray-400"} bg-white p-2.5 text-base text-gray-50 rounded-[20px]`}>
                <span>🙁</span>
                سئ
              </div>
            </li>
            <li className='relative'>

              <input type="radio" name="rating" checked={selectedRating === "5"}
                onChange={handleRatingChange} value="5" className=' absolute opacity-0 h-full w-full !important top-0 left-0' />
              <div className={`flex flex-col items-center ${selectedRating === "5" ? " border-[3px] border-green-200" : " border-2 border-gray-400"} bg-white p-2.5 text-base text-gray-50 rounded-[20px]`}>
                <span>😫</span>
                سئ جداً
              </div>
            </li>
          </ul>
        </div>
        <div className='flex gap-x-9 mb-8'>
          <p className="w-full">
            <label htmlFor="author" className=' text-gray-50 font-semibold text-base block mb-2'>الاسم<span className="required">*</span></label>
            <input className='w-full rounded-[20px] h-[58px] focus:outline-none' id="author" name="author" type="text" value="" />
          </p>
          <p className="w-full">
            <label htmlFor="email" className=' text-gray-50 font-semibold text-base block mb-2'>الإيميل<span className="required">*</span></label>
            <input className='w-full rounded-[20px] h-[58px] focus:outline-none' id="email" name="email" type="email" value="" />
          </p>
        </div>


        <p className="w-full">
          <label htmlFor="comment" className=' text-gray-50 font-semibold text-base block mb-2'>أترك تقييم<span className="required">*</span></label>
          <textarea className='w-full rounded-[20px] h-[119px] resize-none focus:outline-none' id="comment" name="comment"></textarea>
        </p>
        <p className="form-submit">
          <button className=' mt-9 bg-green-200 hover:bg-green-400 text-white text-xl font-semibold w-full text-center rounded-100 py-2.5'>أضف التقييم</button>
        </p>

      </form>
      <p className=" mt-6 text-[#979797] font-medium text-base">لا يوجد تقييمات على هذا المنتج بعد، يمكنك البدء بكتابة أول تقييم</p>
    </div>
  );
}

export default ProductReviewForm;
