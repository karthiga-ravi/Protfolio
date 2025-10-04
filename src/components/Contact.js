import { useSelector, useDispatch } from 'react-redux';
import { useRef, useEffect, useState } from 'react';
import { updateEmail, updatePhone } from '../redux/portfolioSlice';

export default function Contact() {
  const contact = useSelector((state) => state.portfolio.contact);
  const dispatch = useDispatch();

  const emailRef = useRef(null);
  const phoneRef = useRef(null);

  const [emailFontSize, setEmailFontSize] = useState(18); // initial font size in px
  const [phoneFontSize, setPhoneFontSize] = useState(18);

  const handleEmailChange = (e) => {
    dispatch(updateEmail(e.target.value));

    // Decrease font size if text is long, increase if short
    const length = e.target.value.length;
    const newSize = Math.max(14, 18 - Math.floor(length / 5)); // min 14px, reduce as length increases
    setEmailFontSize(newSize);
  };

  const handlePhoneChange = (e) => {
    dispatch(updatePhone(e.target.value));

    const length = e.target.value.length;
    const newSize = Math.max(14, 18 - Math.floor(length / 5));
    setPhoneFontSize(newSize);
  };

  return (
    <section
      id="contact"
      className="flex justify-center items-center bg-primary px-5 py-16 text-white"
    >
      <div className="flex flex-col items-center w-full max-w-md text-center">
        <h1 className="text-3xl font-bold border-b-4 border-[#692f75] mb-6 w-[140px] mx-auto">
          Contact
        </h1>
        <p className="mb-6 text-base">{contact.l1}</p>

        {/* Email Field */}
        <div className="w-full flex flex-col items-center mb-4">
          <label htmlFor="email" className="font-semibold mb-1 text-base">
            Email
          </label>
          <input
            id="email"
            type="email"
            ref={emailRef}
            value={contact.l2}
            onChange={handleEmailChange}
            className="p-2 rounded-lg border-2 border-[#692f75] bg-white text-black focus:outline-none focus:ring-2 focus:ring-[#692f75] transition-all duration-200"
            style={{ fontSize: `${emailFontSize}px`, width: '70%' }}
          />
        </div>

        {/* Phone Field */}
        <div className="w-full flex flex-col items-center">
          <label htmlFor="phone" className="font-semibold mb-1 text-base">
            Phone
          </label>
          <input
            id="phone"
            type="text"
            ref={phoneRef}
            value={contact.l3}
            onChange={handlePhoneChange}
            className="p-2 rounded-lg border-2 border-[#692f75] bg-white text-black focus:outline-none focus:ring-2 focus:ring-[#692f75] transition-all duration-200"
            style={{ fontSize: `${phoneFontSize}px`, width: '30%' }}
          />
        </div>
      </div>
    </section>
  );
}
