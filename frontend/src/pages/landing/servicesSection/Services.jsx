import ServicesCards from "./ServicesCards"

export default function Services() {
    return (
        // services container
        <div className="bg-red-700 h-[15rem] pt-8 text-3xl text-white font-extrabold">
            <p className="font-extrabold text-center">Service We Provide</p>
            <ServicesCards />
        </div>

    )
}