import { TbPhone, TbLocation, TbClock, TbMail } from "react-icons/tb";
import Map from "./Map";

export default function Contact() {
  return (
    <section id="contact" className="grid grid-cols-2 bg-[#C1111F] pt-20 pb-20 px-[4.5rem] gap-8 mt-24">
      <div className="text-[#EBFADC] w-11/12">
        <h2 className="font-extrabold pb-4 text-3xl">GET IN TOUCH</h2>
        <section className="flex gap-2 pb-4">
          <div className="pt-1">
            <TbPhone className="text-xl icon-bold" />
          </div>
          <div>
            <h3 className="font-extrabold text-xl pb-1">Contact Number</h3>
            <p>(+63) 939 717 2394</p>
            <p>(+63) 967 380 5773</p>
          </div>
        </section>
        <section className="flex gap-2 pb-4">
          <div className="pt-1">
            <TbMail className="text-xl icon-bold" />
          </div>
          <div>
            <h3 className="font-extrabold text-xl pb-1">Email</h3>
            <a
              href="mailto:cenrosanjuancity@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              cenrosanjuancity@gmail.com
            </a>
            <br />
            <a
              href="mailto:cenrosanjuanpay@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
            >
             cenrosanjuanpay@gmail.com
            </a>
          </div>
        </section>
        <section className="flex gap-2 pb-4">
          <div className="pt-1">
            <TbLocation className="text-xl icon-bold" />
          </div>
          <div>
            <h3 className="font-extrabold text-xl pb-1">Location</h3>
            <address>
            137-135 Pinaglabanan Street, cor Dr.P.A. Narciso, San Juan, Metro Manila
            lower Ground Floor Cenro Office
            </address>
          </div>
        </section>
        <section className="flex gap-2 pb-4">
          <div className="pt-1">
            <TbClock className="text-xl icon-bold" />
          </div>
          <div>
            <h3 className="font-extrabold text-xl pb-1">Working Hours</h3>
            <p>Monday - Friday</p>
            <p>7:00AM - 4:00PM</p>
          </div>
        </section>
      </div>
      <div>
        <Map />
      </div>
    </section>
  );
}
