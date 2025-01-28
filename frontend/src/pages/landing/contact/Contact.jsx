import { TbPhone, TbLocation, TbClock, TbMail } from "react-icons/tb";
import Map from "./Map";

export default function Contact() {
    return (
        <div className="grid grid-cols-2 bg-red-700 pt-20 pb-20 px-[4.5rem] gap-8 mt-24">
            <div className="text-white w-9/12">
                <h2 className="font-extrabold pb-2">Get in touch</h2>
                <section className="flex gap-2 pb-4">
                    <div className="pt-1">
                        <TbPhone className="text-lg icon-bold"/>
                    </div>
                    <div>
                        <h3 className="font-extrabold text-lg pb-2">Contact Number</h3> 
                        <p>(02) 7729 0114</p>
                        <p>(63) 967 380 5773</p>
                    </div>
                </section>
                <section className="flex gap-2 pb-4">
                    <div className="pt-1">
                        <TbMail className="text-lg icon-bold"/>
                    </div>
                    <div>
                        <h3 className="font-extrabold text-lg pb-2">Email</h3>
                        <a href="mailto:cenrosanjuancity@gmail.com" target="_blank" rel="noopener noreferrer">cenrosanjuancity@gmail.com</a>
                    </div>
                </section>
                <section className="flex gap-2 pb-4">
                    <div className="pt-1">
                        <TbLocation className="text-lg icon-bold"/>
                    </div>
                    <div>
                        <h3 className="font-extrabold text-lg pb-2">Location</h3>
                        <p>City Environment and Natural Resources Office - City Government of San Juan, J24F+HCR, San Juan City Hall, N.Domingo Street, San Juan, 1500 Metro Manila</p>
                    </div>
                </section>
                <section className="flex gap-2 pb-4">
                    <div className="pt-1">
                        <TbClock className="text-lg icon-bold"/>
                    </div>
                    <div>
                        <h3 className="font-extrabold text-lg pb-2">Working Hours</h3>
                        <p>Monday - Friday</p>
                        <p>8:00AM - 5:00PM</p>
                    </div>
                </section>
            </div>
            <div>
            <Map />
            </div>
        </div>
    )
}