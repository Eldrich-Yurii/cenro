import {
  TbFileCertificate,
  TbMessageReport,
} from "react-icons/tb";

export default function ServicesCards() {
  // array of object para sa cards
  const items = [
    {
      id: 1,
      icon: <TbFileCertificate className="icon-semibold text-4xl" />,
      size: "text-[28px]",
      title: "BUSINESS CERTIFICATE",
      description:
        "Lorem ipsum dolor sit amet consectetur. Nunc a ut tellus quisque nec facilisis habitant. Quis consectetur nascetur in sagittis amet tempor nec nulla nunc.",
    },
    {
      id: 4,
      icon: <TbMessageReport className="icon-semibold text-4xl" />,
      size: "text-[28px]",
      title: "IEC (Information Education and Communication)",
      description:
        "Lorem ipsum dolor sit amet consectetur. Nunc a ut tellus quisque nec facilisis habitant. Quis consectetur nascetur in sagittis amet tempor nec nulla nunc.",
    },
  ];

  // console.log(items)
  return (
    // cards container
    <div className="absolute w-full pt-14">
      {/* single card container */}
      <div className="grid grid-flow-col px-[4.5rem] gap-6 ">
        {items.map((item) => {
          // card elements
          return (
            <div
              className="bg-[#001A49] rounded-xl lg:p-[1.5rem]"
              key={item.id}
            >
              {/* icons */}
              <div className="pb-2">
                <span className={item.size}>{item.icon}</span>
              </div>
              {/* title and description */}
              <div>
                <h2 className="pb-2 font-extrabold leading-[120%]">{item.title}</h2>
                <p className="text-lg leading-[120%]">{item.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
