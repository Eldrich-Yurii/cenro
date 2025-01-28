import { TbFileCertificate, TbFileCheck, TbCircleCheck, TbMessageReport } from "react-icons/tb";


export default function ServicesCards() {

    const items = [
        {
            id: 1,
            icon: <TbFileCertificate />,
            size: "text-5xl",
            title: 'CERTIFICATE',
            description: 'Lorem ipsum dolor sit amet consectetur. Nunc a ut tellus quisque nec facilisis habitant. Quis consectetur nascetur in sagittis amet tempor nec nulla nunc.',
        },
        {
            id: 2,
            icon: <TbFileCheck />,
            size: "text-5xl",
            title: 'PERMIT',
            description: 'Lorem ipsum dolor sit amet consectetur. Nunc a ut tellus quisque nec facilisis habitant. Quis consectetur nascetur in sagittis amet tempor nec nulla nunc.',
        },
        {
            id: 3,
            icon: <TbCircleCheck />,
            size: "text-5xl",
            title: 'CLEARANCE',
            description: 'Lorem ipsum dolor sit amet consectetur. Nunc a ut tellus quisque nec facilisis habitant. Quis consectetur nascetur in sagittis amet tempor nec nulla nunc.',
        },
        {
            id: 4,
            icon: <TbMessageReport />,
            size: "text-5xl",
            title: 'COMPLAINTS',
            description: 'Lorem ipsum dolor sit amet consectetur. Nunc a ut tellus quisque nec facilisis habitant. Quis consectetur nascetur in sagittis amet tempor nec nulla nunc.',
        },
    ]

    // console.log(items)
    return (
        <div className="absolute w-full pt-8">
            <div className="flex justify-center gap-10 px-[4.5rem] ">
                {items.map((item) => {
                    return <div className="bg-[#001A49] w-72 rounded-lg lg:p-[1.5rem]" key={item.id}>
                                <div className="pb-2">
                                    <span className={item.size}>
                                        {item.icon}
                                    </span>
                                </div>
                                <div>
                                    <h2 className="pb-2">{item.title}</h2>
                                    <p className="text-base font-medium leading-[120%]">{item.description}</p>
                                </div>
                            </div>
                })}
            </div>
          </div>
    )
}