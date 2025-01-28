import { TbFileCertificate, TbFileCheck, TbCircleCheck, TbMessageReport } from "react-icons/tb";


export default function ServicesCards() {

    const items = [
        {
            id: 1,
            icon: <TbFileCertificate />,
            title: 'CERTIFICATE',
            description: 'Lorem ipsum dolor sit amet consectetur. Nunc a ut tellus quisque nec facilisis habitant. Quis consectetur nascetur in sagittis amet tempor nec nulla nunc.',
        },
        {
            id: 2,
            icon: <TbFileCheck />,
            title: 'PERMIT',
            description: 'Lorem ipsum dolor sit amet consectetur. Nunc a ut tellus quisque nec facilisis habitant. Quis consectetur nascetur in sagittis amet tempor nec nulla nunc.',
        },
        {
            id: 3,
            icon: <TbCircleCheck />,
            title: 'CLEARANCE',
            description: 'Lorem ipsum dolor sit amet consectetur. Nunc a ut tellus quisque nec facilisis habitant. Quis consectetur nascetur in sagittis amet tempor nec nulla nunc.',
        },
        {
            id: 4,
            icon: <TbMessageReport />,
            title: 'COMPLAINTS',
            description: 'Lorem ipsum dolor sit amet consectetur. Nunc a ut tellus quisque nec facilisis habitant. Quis consectetur nascetur in sagittis amet tempor nec nulla nunc.',
        },
    ]

    console.log(items)
    return (
        <div className="absolute left-32 flex justify-center gap-10 bg-black">
            {items.map((item) => {
                return <div className="bg-pink-400 w-64 p-6" key={item.id}>
                            <div className="text-black">
                                {item.icon}
                            </div>
                            <div>
                                <h2>{item.title}</h2>
                                <p className="text-sm">{item.description}</p>
                            </div>
                        </div>
            })}
          </div>
    )
}