import { TbPhone, TbLocation, TbClock, TbMail } from "react-icons/tb";
import Map from "./Map";

export default function Contact() {
    return (
        <div className="grid grid-cols-2 bg-red-700 pt-20 px-[4.5rem] gap-8 mt-24">
            <div className="text-white">
                <h2>Get in touch</h2>
                <section>
                    <div className="flex items-center">
                        <TbPhone />
                        <h3>Contact Number</h3> 
                    </div>
                    <div className="flex items-center">
                        <p>(02) 7729 0114</p>
                        <p>(63) 967 380 5773</p>
                    </div>
                </section>
                <section>
                    <div className="flex items-center">
                        <TbMail />
                        <h3>Email</h3>
                    </div>
                    <div>
                        <a href="mailto:cenrosanjuancity@gmail.com" target="_blank" rel="noopener noreferrer">cenrosanjuancity@gmail.com</a>
                    </div>
                </section>
                <section>
                    <div className="flex items-center">
                        <TbLocation />
                        <h3>Location</h3>
                    </div>
                    <div>
                        <p>City Environment and Natural Resources Office - City Government of San Juan, J24F+HCR, San Juan City Hall, N.Domingo Street, San Juan, 1500 Metro Manila</p>
                    </div>
                </section>
                <section>
                    <div className="flex items-center">
                        <TbClock />
                        <h3>Working Hours</h3>
                    </div>
                    <div>
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